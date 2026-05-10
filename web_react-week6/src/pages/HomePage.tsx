import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetLpList from '../hooks/queries/useGetLpList';
import LpCard from '../components/LpCard';
import { type Lp } from '../types/lp';
import { useAuth } from '../context/AuthContext';

const LpSkeleton = () => (
  <div className="aspect-square bg-[#1f1f22] animate-pulse rounded" />
);

export default function HomePage() {
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const { data, isPending, isFetching, isError, refetch } = useGetLpList(order);

  if (!accessToken) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-4 text-white">
        <p className="text-lg text-gray-300">LP 목록을 보려면 로그인이 필요합니다.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-colors"
        >
          로그인하러 가기
        </button>
      </div>
    );
  }

  const isInitialLoading = isPending && isFetching;
  const lps: Lp[] = data?.data ?? [];

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">

      {/* 정렬 버튼: 항상 표시 */}
      <div className="flex justify-end px-2">
        <div className="flex border border-gray-600 rounded text-sm font-bold overflow-hidden">
          <button
            onClick={() => setOrder('asc')}
            className={`px-4 py-1.5 transition-colors ${
              order === 'asc' ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            오래된순
          </button>
          <div className="w-px bg-gray-600" />
          <button
            onClick={() => setOrder('desc')}
            className={`px-4 py-1.5 transition-colors ${
              order === 'desc' ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      {/* 초기 로딩: 스켈레톤 */}
      {isInitialLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <LpSkeleton key={i} />
          ))}
        </div>
      )}

      {/* 에러: 정렬 버튼은 유지, 그리드 영역만 에러 표시 */}
      {!isInitialLoading && isError && (
        <div className="flex flex-col items-center gap-4 py-20 text-white">
          <p className="text-red-400 text-lg">데이터를 불러오지 못했습니다.</p>
          <button
            onClick={() => refetch()}
            className="px-5 py-2.5 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition-colors"
          >
            재시도
          </button>
        </div>
      )}

      {/* 데이터: 정렬 전환 리패칭 중에는 흐리게 처리 */}
      {!isInitialLoading && !isError && (
        <>
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 transition-opacity duration-200 ${
              isFetching ? 'opacity-50' : 'opacity-100'
            }`}
          >
            {lps.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}
          </div>

          {lps.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              표시할 LP가 없습니다.
            </div>
          )}
        </>
      )}
    </div>
  );
}
