import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetail } from '../api';
import type { MovieDetail } from '../types/MovieDetail';

const MovieDetailpage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    console.log('movieId:', movieId);
    if (movieId) getMovieDetail(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <div className = 'text-center mt-20'>로딩 중...</div>;

  return (
    <>
        <div>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='block mx-auto rounded-lg w-60 shadow-lg'/> 
        <h1 className = 'text-center text-3xl font-bold'>{movie.title}</h1>
        <p>{movie.tagline}</p>
        <p>{movie.overview}</p>
        <div className = "flex justify-center gap-4">
            <p>개봉일: {movie.release_date}</p>
            <p>상영시간: {movie.runtime}분</p>
            <p>평점: {movie.vote_average}</p>
        </div>
        </div>
    </>
  );
};

export default MovieDetailpage;