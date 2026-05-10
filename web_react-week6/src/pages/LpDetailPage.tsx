import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {
  FiX,
  FiHeart,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiSend,
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import useGetLpDetail from '../hooks/queries/useGetLpDetail';
import useGetLpComments from '../hooks/queries/useGetLpComments';
import { postLpComment } from '../apis/lp';
import type { Comment } from '../types/lp';

const MAX_COMMENT_LENGTH = 300;

// ────────────────────────────── Skeleton ──────────────────────────────

function CommentSkeleton() {
  return (
    <div className="relative flex gap-3 p-4 rounded-xl bg-[#1a1a1d] overflow-hidden">
      <div className="w-9 h-9 rounded-full bg-white/10 shrink-0" />
      <div className="flex-1 flex flex-col gap-2 pt-0.5">
        <div className="h-2.5 bg-white/10 rounded w-1/4" />
        <div className="h-2.5 bg-white/10 rounded w-full" />
        <div className="h-2.5 bg-white/10 rounded w-3/4" />
      </div>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </div>
  );
}

const SKELETON_COUNT_INITIAL = 5;
const SKELETON_COUNT_NEXT = 3;

function CommentSkeletonList({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <CommentSkeleton key={i} />
      ))}
    </div>
  );
}

// ────────────────────────────── Comment Card ──────────────────────────────

function CommentCard({ comment }: { comment: Comment }) {
  const timeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (mins < 1) return '방금 전';
    if (mins < 60) return `${mins}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 30) return `${days}일 전`;
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex gap-3 p-4 rounded-xl bg-[#1a1a1d] border border-[#222226]">
      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 flex items-center justify-center shrink-0 text-white font-bold text-sm shadow">
        {comment.author?.name?.[0]?.toUpperCase() ?? '?'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white font-semibold text-sm">
            {comment.author?.name ?? '익명'}
          </span>
          <span className="text-gray-500 text-xs">{timeAgo(comment.createdAt)}</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed break-words whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>
    </div>
  );
}

// ────────────────────────────── Comment Form ──────────────────────────────

function CommentForm({
  lpId,
  onSuccess,
}: {
  lpId: number;
  onSuccess: () => void;
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEmpty = value.trim().length === 0;
  const isOverLimit = value.length > MAX_COMMENT_LENGTH;

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmpty) {
      setError('댓글 내용을 입력해주세요.');
      return;
    }
    if (isOverLimit) return;

    setError('');
    setIsSubmitting(true);
    try {
      await postLpComment(lpId, value.trim());
      setValue('');
      onSuccess();
    } catch {
      setError('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div
        className={`flex gap-2 p-3 rounded-xl border bg-[#1a1a1d] transition-colors ${
          error
            ? 'border-red-500/70 focus-within:border-red-500'
            : isOverLimit
            ? 'border-red-500/70'
            : 'border-[#333338] focus-within:border-pink-500/60'
        }`}
      >
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error && e.target.value.trim().length > 0) setError('');
          }}
          placeholder="댓글을 입력해주세요..."
          rows={3}
          className="flex-1 bg-transparent text-gray-200 placeholder-gray-500 text-sm resize-none outline-none leading-relaxed"
        />
        <button
          type="submit"
          disabled={isEmpty || isOverLimit || isSubmitting}
          className={`self-end p-2 rounded-lg transition-all ${
            isEmpty || isOverLimit || isSubmitting
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 active:scale-95'
          }`}
        >
          <FiSend size={18} />
        </button>
      </div>

      {/* 유효성 안내 영역 */}
      <div className="flex items-center justify-between px-1">
        <span className={`text-xs ${error ? 'text-red-400' : 'opacity-0'}`}>
          {error || '·'}
        </span>
        <span
          className={`text-xs tabular-nums ${
            isOverLimit ? 'text-red-400' : 'text-gray-500'
          }`}
        >
          {value.length} / {MAX_COMMENT_LENGTH}
        </span>
      </div>
    </form>
  );
}

// ────────────────────────────── Sort Button ──────────────────────────────

function SortToggle({
  order,
  onChange,
}: {
  order: 'asc' | 'desc';
  onChange: (v: 'asc' | 'desc') => void;
}) {
  return (
    <div className="flex border border-gray-600 rounded text-xs font-bold overflow-hidden">
      <button
        type="button"
        onClick={() => onChange('asc')}
        className={`px-3 py-1 transition-colors ${
          order === 'asc' ? 'bg-white text-black' : 'bg-transparent text-gray-400 hover:text-white'
        }`}
      >
        오래된순
      </button>
      <div className="w-px bg-gray-600" />
      <button
        type="button"
        onClick={() => onChange('desc')}
        className={`px-3 py-1 transition-colors ${
          order === 'desc' ? 'bg-white text-black' : 'bg-transparent text-gray-400 hover:text-white'
        }`}
      >
        최신순
      </button>
    </div>
  );
}

// ────────────────────────────── Page ──────────────────────────────

export default function LpDetailPage() {
  const { lpid } = useParams();
  const navigate = useNavigate();
  const lpIdNumber = Number(lpid);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [commentOrder, setCommentOrder] = useState<'asc' | 'desc'>('asc');
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, isPending, isError, refetch } = useGetLpDetail(lpIdNumber);

  const {
    data: commentData,
    isLoading: isCommentsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch: refetchComments,
  } = useGetLpComments(lpIdNumber, commentOrder);

  // order 변경 → queryKey 변경으로 자동 첫 페이지 재요청
  const handleOrderChange = (newOrder: 'asc' | 'desc') => {
    setCommentOrder(newOrder);
  };

  // 스크롤 끝 트리거
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ── LP 로딩/에러 ──
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-4 text-gray-300">
        <p className="text-lg">정보를 불러오는 데 문제가 발생했습니다.</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2.5 bg-[#2a2a2d] hover:bg-[#3a3a3d] text-white rounded-lg transition-colors font-semibold"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!data) return null;

  const comments: Comment[] = commentData?.pages.flatMap((p) => p.data) ?? [];

  return (
    <div className="max-w-4xl mx-auto w-full pb-20 mt-4 md:mt-8">

      {/* ── LP 카드 ── */}
      <div className="bg-[#151518] border border-[#222226] rounded-3xl p-8 sm:p-12 shadow-2xl relative">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">
                {data.author?.name?.[0]?.toUpperCase() || '익'}
              </span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">
                {data.author?.name || '익명 사용자'}
              </h3>
              <span className="text-gray-500 text-sm font-medium">
                {new Date(data.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2d] rounded-full transition-colors"
              >
                <FiMoreHorizontal size={24} />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[#222226] border border-[#333338] rounded-xl shadow-xl overflow-hidden z-20">
                  <button className="w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-[#2a2a2d] flex items-center gap-2 transition-colors">
                    <FiEdit2 size={16} /> 수정
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-[#2a2a2d] flex items-center gap-2 transition-colors">
                    <FiTrash2 size={16} /> 삭제
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2d] rounded-full transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-16 text-center leading-tight">
          {data.title}
        </h1>

        {/* LP 앨범 */}
        <div className="flex justify-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#0a0a0a] animate-[spin_12s_linear_infinite] group">
            <img
              src={data.thumbnail || 'https://placehold.co/600x600/121212/555?text=LP'}
              alt={data.title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-white/20 backdrop-blur-sm bg-black/40 flex items-center justify-center shadow-inner">
                <div className="w-6 h-6 bg-[#151518] rounded-full shadow-inner" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* 내용 */}
        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-gray-300 text-center text-lg leading-relaxed whitespace-pre-wrap font-medium">
            {data.content}
          </p>
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {data?.tags?.map((tag: any, index: number) => (
            <span
              key={tag?.id ?? index}
              className="px-4 py-1.5 bg-[#2a2a2d] text-gray-300 rounded-full text-sm font-semibold hover:bg-[#333338] hover:text-white transition-colors cursor-default"
            >
              # {typeof tag === 'string' ? tag : tag.name}
            </span>
          ))}
        </div>

        {/* 좋아요 */}
        <div className="flex justify-center border-t border-[#222226] pt-10">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center gap-2 transition-all transform active:scale-95 text-gray-300 hover:text-white"
          >
            {isLiked ? (
              <FaHeart size={26} className="text-red-500" />
            ) : (
              <FiHeart size={26} />
            )}
            <span className="font-bold text-xl ml-1">
              {Number(data.likes?.length || 0) + (isLiked ? 1 : 0)}
            </span>
          </button>
        </div>
      </div>

      {/* ── 댓글 섹션 ── */}
      <div className="mt-8 flex flex-col gap-5">

        {/* 댓글 헤더 */}
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">
            댓글
            {comments.length > 0 && (
              <span className="ml-2 text-gray-500 font-normal text-sm">
                {comments.length}
                {commentData?.pages.at(-1)?.hasNext ? '+' : ''}
              </span>
            )}
          </h2>
          <SortToggle order={commentOrder} onChange={handleOrderChange} />
        </div>

        {/* 댓글 입력 폼 */}
        <CommentForm
          lpId={lpIdNumber}
          onSuccess={() => refetchComments()}
        />

        {/* 초기 로딩: 상단 스켈레톤 */}
        {isCommentsLoading && <CommentSkeletonList count={SKELETON_COUNT_INITIAL} />}

        {/* 댓글 목록 */}
        {!isCommentsLoading && (
          <>
            {comments.length === 0 ? (
              <div className="text-center text-gray-500 py-10 text-sm">
                아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            )}

            {/* IntersectionObserver 트리거 */}
            <div ref={sentinelRef} className="h-1" />

            {/* 다음 페이지 로딩: 하단 스켈레톤 */}
            {isFetchingNextPage && <CommentSkeletonList count={SKELETON_COUNT_NEXT} />}
          </>
        )}
      </div>
    </div>
  );
}
