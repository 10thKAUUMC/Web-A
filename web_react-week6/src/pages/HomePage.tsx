import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetLpList from '../hooks/queries/useGetLpList';
import LpCard, { LpCardSkeleton } from '../components/LpCard';
import { type Lp } from '../types/lp';
import { useAuth } from '../context/AuthContext';

const SKELETON_COUNT_INITIAL = 10;
const SKELETON_COUNT_NEXT = 5;

const SkeletonGrid = ({ count }: { count: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <LpCardSkeleton key={i} />
    ))}
  </div>
);

export default function HomePage() {
  const [sort, setSort] = useState<'desc' | 'asc'>('desc');
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetLpList(sort);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

  const lps: Lp[] = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">

      {/* 정렬 버튼 */}
      <div className="flex justify-end px-2">
        <div className="flex border border-gray-600 rounded text-sm font-bold overflow-hidden">
          <button
            onClick={() => setSort('asc')}
            className={`px-4 py-1.5 transition-colors ${
              sort === 'asc' ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            오래된순
          </button>
          <div className="w-px bg-gray-600" />
          <button
            onClick={() => setSort('desc')}
            className={`px-4 py-1.5 transition-colors ${
              sort === 'desc' ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      {/* 초기 로딩: 상단 스켈레톤 */}
      {isLoading && <SkeletonGrid count={SKELETON_COUNT_INITIAL} />}

      {/* 에러 */}
      {!isLoading && isError && (
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

      {/* 데이터 그리드 */}
      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {lps.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}
          </div>

          {lps.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              표시할 LP가 없습니다.
            </div>
          )}

          {/* IntersectionObserver 트리거 */}
          <div ref={sentinelRef} className="h-1" />

          {/* 다음 페이지 로딩: 하단 스켈레톤 */}
          {isFetchingNextPage && <SkeletonGrid count={SKELETON_COUNT_NEXT} />}
        </>
      )}
    </div>
  );
}
