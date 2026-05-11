import { useMutation } from '@tanstack/react-query';
import { patchMyInfo } from '../../apis/user';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';

export default function useUpdateMyInfo() {
  return useMutation({
    mutationFn: patchMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
      alert('프로필이 성공적으로 수정되었습니다.');
    },
    onError: () => {
      alert('프로필 수정에 실패했습니다.');
    }
  });
}