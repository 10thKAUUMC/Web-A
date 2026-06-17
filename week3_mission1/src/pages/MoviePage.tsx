import { useEffect, useState } from "react";
import axios from 'axios';
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage(){
    const [movies, setMovies] = useState<Movie[]>([]);
    
    useEffect(() : void => {
        const fetchMovies = async () : Promise<void>  => {
            const API_KEY = import.meta.env.VITE_TMDB_KEY;
            const {data} = await axios(
                `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
            );
            //지금 방식대로라면 API를 호출하는 모든 곳에서 키를 매번 적어줘야 함. but Axios를 활용하는 이유는 Axios 인터셉터(Interceptors)를 활용하기 위해서 이다.
            //const result = await response.json(); //axios를 가져오면 이걸 안해도 됌

            setMovies(data.results); 
        };
        
        fetchMovies();
    }, []);

    //console.log(movies[0]?.adult);  log를 앞에서 찍어놔서 문제 생김

    return (
    <div className ='p-10 grid gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:
    grid-cols-5 xl:grid-cols-6'>
        {movies && movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie}/>
    ))}
    </div>
    );
}

