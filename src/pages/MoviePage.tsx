import { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import useCustomFetch from '../hooks/useCustomFetch'; 

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const { category = 'popular' } = useParams<{ category: string }>();

  const { data, loading, error } = useCustomFetch<MovieResponse>(
    `https://api.themoviedb.org/3/movie/${category}?page=${page}`
  );

  if (error) {
    return (
      <div className='p-10 flex justify-center items-center h-64'>
        <span className='text-red-500 text-2xl font-bold'>에러가 발생했습니다: {error}</span>
      </div>
    );
  }

  return (
    <div className='p-10'>
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className='flex items-center justify-center gap-6 mb-10'>
              <button
              className='bg-sky-100 text-sky-600 px-10 py-3 rounded-full font-bold
                        hover:bg-purple-100 hover:text-purple-600 
                        transition-all duration-300 shadow-sm
                        
                        disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-400'
              
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              
              disabled={page === 1}
            >
              이전
            </button>

            <span className='font-bold text-xl text-sky-800'>{page}</span>

            <button
              className='bg-sky-100 text-sky-600 px-10 py-3 rounded-full font-bold
                        hover:bg-purple-100 hover:text-purple-600 
                        transition-all duration-300 shadow-sm'
              onClick={() => setPage((prev) => prev + 1)}
            >
              다음
            </button>
          </div>

          <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {data?.results?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}