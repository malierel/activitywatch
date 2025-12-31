import { z } from 'zod';

export const bucketSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  client: z.string().optional(),
  hostname: z.string().optional(),
  created: z.string().optional()
});

export const bucketsResponseSchema = z.array(bucketSchema);

export const hostSchema = z.object({
  hostname: z.string(),
  last_seen: z.string().optional()
});

export const hostsResponseSchema = z.array(hostSchema);

export type Bucket = z.infer<typeof bucketSchema>;
export type Host = z.infer<typeof hostSchema>;
