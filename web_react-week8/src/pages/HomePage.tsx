import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import useGetLpList from '../hooks/queries/useGetLpList';
import LpCard from '../components/LpCard';
import { LpCardSkeleton } from '../components/Skeleton';
import { type Lp } from '../types/lp';
import useThrottle from '../hooks/useThrottle';

export default function HomePage() {
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');
  const [search] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 200);
  const rawCount = useRef(0);
  const throttledCount = useRef(0);
  const [debugCounts, setDebugCounts] = useState({ raw: 0, throttled: 0 });

  useEffect(() => {
    const handleScroll = () => {
      rawCount.current += 1;
      console.log(`🔴 raw scroll 이벤트 #${rawCount.current} — scrollY: ${Math.round(window.scrollY)}`);
      setScrollY(window.scrollY);
      setDebugCounts(prev => ({ ...prev, raw: rawCount.current }));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    throttledCount.current += 1;
    console.log(`%c🟢 throttle 업데이트 #${throttledCount.current} — throttledScrollY: ${Math.round(throttledScrollY)}`, 'color: #4ade80; font-weight: bold');
    setDebugCounts(prev => ({ ...prev, throttled: throttledCount.current }));
  }, [throttledScrollY]);
  
  const { 
    data, 
    isLoading, 
    isError, 
    refetch, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useGetLpList(order, search);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-4">
        <p className="text-red-500 text-lg">데이터 로드 실패</p>
        <button onClick={() => refetch()} className="px-4 py-2 bg-pink-500 text-white rounded">
          재시도
        </button>
      </div>
    );
  }

  const lpList = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto pb-10">
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
          <div className="w-px bg-gray-600"></div>
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {isLoading && Array.from({ length: 10 }).map((_, i) => <LpCardSkeleton key={`init-skel-${i}`} />)}

        {lpList.map((lp: Lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}

        {isFetchingNextPage && Array.from({ length: 5 }).map((_, i) => <LpCardSkeleton key={`next-skel-${i}`} />)}
      </div>
      
      {!isLoading && lpList.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          표시할 LP가 없습니다.
        </div>
      )}

      <div ref={ref} className="h-10 w-full" />

      {/* 성능 비교 디버그 오버레이 — 확인 후 삭제 */}
      <div className="fixed top-4 left-4 bg-black/80 text-white text-xs rounded-lg p-3 z-50 font-mono space-y-1 border border-gray-600">
        <div className="text-gray-400 mb-1">useThrottle 성능 비교</div>
        <div>🔴 raw scroll 이벤트: <span className="text-red-400 font-bold">{debugCounts.raw}</span></div>
        <div>🟢 throttle 업데이트: <span className="text-green-400 font-bold">{debugCounts.throttled}</span></div>
        {debugCounts.raw > 0 && (
          <div className="text-yellow-300 mt-1">
            절감율: {Math.round((1 - debugCounts.throttled / debugCounts.raw) * 100)}%
          </div>
        )}
      </div>

      {throttledScrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-colors z-50"
          aria-label="맨 위로"
        >
          ↑
        </button>
      )}
    </div>
  );
}