import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Movie, MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // 방법 1: 가장 안전한 api_key 파라미터 전달 방식 사용
        const response = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/popular`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_KEY, // .env에 저장된 키
              language: 'ko-KR',
              page: 2,
            },
          }
        );

        console.log("🎬 불러온 영화 데이터:", response.data);
        setMovies(response.data.results);
      } catch (error) {
        console.error("❌ 데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="text-white text-center p-20">영화 데이터를 불러오는 중...</div>;

  return (
    <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 bg-black min-h-screen'>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <div className="text-white text-center col-span-full">표시할 영화가 없습니다. API 키를 확인해주세요.</div>
      )}
    </div>
  );
}