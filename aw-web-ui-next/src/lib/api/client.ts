import { z, ZodSchema } from 'zod';
import { bucketsResponseSchema, hostsResponseSchema, type Bucket, type Host } from './schemas';

const API_PREFIX = '/api/0';

async function request<T>(path: string, schema: ZodSchema<T>, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_PREFIX}${path}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...init
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || response.statusText);
  }

  const data = await response.json();
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
}

export const api = {
  async listHosts(): Promise<Host[]> {
    return request('/hosts', hostsResponseSchema);
  },
  async listBuckets(): Promise<Bucket[]> {
    return request('/buckets', bucketsResponseSchema);
  }
};

export type ApiError = z.ZodError | Error;
