import { useInfiniteQuery } from '@tanstack/react-query';
import { getLpComments } from '../../apis/lp';

export default function useGetLpComments(lpId: number, order: 'asc' | 'desc') {
  return useInfiniteQuery({
    queryKey: ['lpComments', lpId, order],
    queryFn: ({ pageParam }) =>
      getLpComments(lpId, { cursor: pageParam ?? undefined, limit: 10, order }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!lpId,
    staleTime: 1000 * 60 * 2,
  });
}
