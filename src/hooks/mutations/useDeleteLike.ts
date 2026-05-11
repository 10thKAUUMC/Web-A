import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../apis/axios';
import { queryClient } from '../../App';

const deleteLike = async (lpId: number) => {
  const response = await axiosInstance.delete(`/lps/${lpId}/likes`);
  return response.data;
};

export default function useDeleteLike() {
  return useMutation({
    mutationFn: (lpId: number) => deleteLike(lpId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['lp', variables],
      });
    },
  });
}