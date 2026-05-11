import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../apis/axios';
import { queryClient } from '../../App';

const postLike = async (lpId: number) => {
  const response = await axiosInstance.post(`/lps/${lpId}/likes`);
  return response.data;
};

export default function usePostLike() {
  return useMutation({
    mutationFn: (lpId: number) => postLike(lpId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['lp', variables],
      });
    },
  });
}