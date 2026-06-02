import { useEffect, useState } from 'react';
import axios from 'axios';

const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 표시
        setError(null);   // 예전 에러 치우기
        
        const response = await axios.get(url, {
          params: {
            api_key: import.meta.env.VITE_TMDB_KEY,
            language: 'ko-KR',
          },
        });
        
        setData(response.data); // 성공적으로 가져온 데이터 저장
      } catch (err) {
        setError("데이터를 불러오는 중 문제가 발생했습니다."); // 사고 발생 보고
      } finally {
        setLoading(false); // 5. 성공하든 실패하든 종료
      }
    };

    fetchData();
  }, [url]); // 주소(url)가 바뀌면 자동으로 재기동

  return { data, loading, error }; // 화면(컴포넌트)에 보고할 내용들
};

export default useCustomFetch;