import { useEffect, useState } from "react";
import axios from 'axios';
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function MoviePage(){
    const [movies, setMovies] = useState<Movie[]>([]);
    //console.log("읽어온 토큰 값:", import.meta.env.VITE_TMDB_KEY);

    //1. 로딩 상태
    const [isPending, setIsPending] = useState(false);
    //2. 에러 상태
    const [isError, setIsError] = useState(false);
    //3. 페이지
    const [page, setPage] = useState(1);

    // 주소 upcomingq부분 동적으로 받기

    const { category } = useParams<{
        category: string;
    }>();


    useEffect(() : void => {
        const fetchMovies = async () : Promise<void>  => {
            setIsPending(true); //true인 상태
            
            try{
                const {data} = await axios(
                    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );
                //지금 방식대로라면 API를 호출하는 모든 곳에서 키를 매번 적어줘야 함. but Axios를 활용하는 이유는 Axios 인터셉터(Interceptors)를 활용하기 위해서 이다.
                //const result = await response.json(); //axios를 가져오면 이걸 안해도 됌
    
                setMovies(data.results); 
                setIsPending(false); //false인 상태
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        
        fetchMovies();
    }, [page, category]);

    //if (!isPending) return <LoadingSpinner />;  //여기에 pending을 하면 아래 ui 다 안보임ㅁ
    if (isError) {
        return(
            <div>
                <span className = 'text-red-500 text-2xl'> 에러가 발생하였습니다.</span>
            </div>
        );
    }

    return (
    <>
    <div className='flex items-center justify-center gap-6 mt-5'>
        <button 
        className = 'bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed'
        disabled = {page === 1} onClick = {() : void => setPage((prev): number => prev -1)}>{`<`}</button>
        <span> {page} 페이지 </span>

        <button 
        className = 'bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer'
        onClick = {() : void => setPage((prev): number => prev + 1)}>{`>`}</button>
    </div>
    {isPending && (
        <div className='flex items-center justify-center h-dvh'>
        <LoadingSpinner/>
        </div>
    )}

    {!isPending && (
        <div className ='p-10 grid gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:
        grid-cols-5 xl:grid-cols-6'>
            {movies && movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
        ))}
        
        </div>
    )}
    
    </>
    );
}

