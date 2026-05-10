import { useInfiniteQuery } from '@tanstack/react-query';
import { getLpList } from '../../apis/lp';
import { useAuth } from '../../context/AuthContext';

export default function useGetLpList(sort: 'asc' | 'desc') {
  const { accessToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ['lps', sort],
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam ?? undefined, limit: 10, order: sort }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
