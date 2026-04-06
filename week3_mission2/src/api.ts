import type { MovieDetail } from "./types/MovieDetail";


const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovieDetail = async (id: string): Promise<MovieDetail> => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?language=ko-KR`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
      }
    }
  );
  return response.json();
};