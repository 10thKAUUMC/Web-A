import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { axiosInstance } from '../../apis/axios';
import { useAuth } from '../../context/AuthContext';

const fetchLpList = async (order: 'asc' | 'desc') => {
  const response = await axiosInstance.get('/lps', {
    params: { order, limit: 20 },
  });
  return response.data.data;
};

export default function useGetLpList(order: 'asc' | 'desc') {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ['lps', order],        // order 변경 시 자동 리패칭
    queryFn: () => fetchLpList(order),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,       // 5분: 재방문 시 네트워크 요청 없음
    gcTime: 1000 * 60 * 10,         // 10분: 언마운트 후 캐시 유지
    retry: 1,                        // 에러 시 1회 재시도 후 즉시 노출
    placeholderData: keepPreviousData, // 정렬 전환 시 이전 데이터 유지
  });
}