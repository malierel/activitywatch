import { z, ZodSchema } from 'zod';
import { bucketsResponseSchema, type Bucket } from './schemas';

const API_PREFIX = '/api';

export type ApiRequestError = Error & {
  status?: number;
  statusText?: string;
  url?: string;
  responseText?: string;
};

async function request<T>(path: string, schema: ZodSchema<T>, init?: RequestInit): Promise<T> {
  const url = path.startsWith('/api') ? path : `${API_PREFIX}${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      ...init
    });

    const responseText = await response.text();

    if (!response.ok) {
      const error: ApiRequestError = new Error(`Request failed: ${response.status} ${response.statusText}`);
      error.status = response.status;
      error.statusText = response.statusText;
      error.url = url;
      error.responseText = responseText;
      throw error;
    }

    const json = responseText ? JSON.parse(responseText) : null;
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      const error: ApiRequestError = new Error(parsed.error.message);
      error.url = url;
      error.responseText = responseText;
      throw error;
    }

    return parsed.data;
  } catch (err) {
    const error: ApiRequestError = err instanceof Error ? err : new Error('Unknown error');
    if (!('url' in error)) {
      error.url = url;
    }
    throw error;
  }
}

function deriveHostsFromBuckets(buckets: Bucket[]): string[] {
  const hosts = new Set<string>();
  for (const bucket of buckets) {
    if (bucket.hostname) hosts.add(bucket.hostname);
  }
  if (hosts.size === 0) hosts.add('local');
  return Array.from(hosts);
}

export const api = {
  async listBuckets(): Promise<Bucket[]> {
    return request('/api/0/buckets/', bucketsResponseSchema);
  },
  async listHostsFromBuckets(): Promise<string[]> {
    const buckets = await api.listBuckets();
    return deriveHostsFromBuckets(buckets);
  }
};

export type ApiError = z.ZodError | ApiRequestError;

export function formatApiError(error: ApiError): string {
  if ('issues' in error) {
    return error.message;
  }

  const parts = [
    error.message,
    error.status ? `status: ${error.status} ${error.statusText ?? ''}`.trim() : null,
    error.url ? `url: ${error.url}` : null,
    error.responseText ? `response: ${error.responseText.slice(0, 400)}` : null,
    error.stack ? `stack: ${error.stack.split('\n').slice(0, 5).join('\n')}` : null
  ].filter(Boolean);

  return parts.join('\n');
}
