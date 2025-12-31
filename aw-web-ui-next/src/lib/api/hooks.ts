import { useQuery } from '@tanstack/react-query';
import { api } from './client';

export function useHosts() {
  return useQuery({
    queryKey: ['hosts'],
    queryFn: () => api.listHostsFromBuckets()
  });
}

export function useBuckets() {
  return useQuery({
    queryKey: ['buckets'],
    queryFn: () => api.listBuckets()
  });
}
