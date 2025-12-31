import { z } from 'zod';

export const bucketSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  client: z.string().optional(),
  hostname: z.string().optional(),
  created: z.string().optional()
});

export const bucketsResponseSchema = z.array(bucketSchema);

export type Bucket = z.infer<typeof bucketSchema>;
