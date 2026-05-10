import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLp } from '../apis/lp';

export default function LpWritePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await postLp({ title, content, published: true });
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('LP 생성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-8">새 LP 만들기</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-400">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="LP 제목을 입력하세요"
            className="w-full bg-[#151518] border border-gray-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-400">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="LP 내용을 입력하세요"
            rows={6}
            className="w-full bg-[#151518] border border-gray-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 resize-none"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!title.trim() || !content.trim() || isSubmitting}
            className="px-6 py-3 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-600 disabled:bg-[#1f1f22] disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? '생성 중...' : '완료'}
          </button>
        </div>
      </form>
    </div>
  );
}
