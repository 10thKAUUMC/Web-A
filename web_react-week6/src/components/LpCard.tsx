import { useNavigate } from 'react-router-dom';
import { type Lp } from '../types/lp';
import { FaHeart } from 'react-icons/fa';

export function LpCardSkeleton() {
  return (
    <div className="relative aspect-square bg-[#1f1f22] rounded overflow-hidden">
      {/* shimmer sweep */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* 하단 정보 영역 힌트 */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-2">
        <div className="h-3 rounded bg-white/10 w-3/4" />
        <div className="h-2 rounded bg-white/10 w-1/3" />
      </div>
    </div>
  );
}

interface LpCardProps {
  lp: Lp;
}

const timeAgo = (dateString: string): string => {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (mins < 60) return `${mins}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 30) return `${days}일 전`;
  return new Date(dateString).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function LpCard({ lp }: LpCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lp/${lp.id}`)}
      className="group relative aspect-square cursor-pointer bg-[#121212] rounded overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
    >
      <img
        src={lp.thumbnail || 'https://placehold.co/400x400/1f1f22/555?text=LP'}
        alt={lp.title}
        className="w-full h-full object-cover"
      />

      {/* 호버 오버레이 */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
        <h3 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2 mb-2">
          {lp.title}
        </h3>

        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-xs font-medium">
            {timeAgo(lp.createdAt)}
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold">
            <FaHeart size={12} className="text-pink-500" />
            <span className="text-white">{lp.likes?.length ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
