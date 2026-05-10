import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../apis/axios';
import LpCard from '../components/LpCard';
import type { Lp } from '../types/lp';

interface UserInfo {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
}

export default function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [myLps, setMyLps] = useState<Lp[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, lpRes] = await Promise.all([
          axiosInstance.get('/users/me'),
          axiosInstance.get('/lps/user', { params: { limit: 20, order: 'desc' } }),
        ]);
        setUser(userRes.data.data);
        setMyLps(lpRes.data.data?.data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto text-white flex flex-col gap-10">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-[#1f1f22] flex items-center justify-center text-3xl text-gray-400 shrink-0">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            '👤'
          )}
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <h1 className="text-xl font-bold truncate">{user?.name}</h1>
          <p className="text-gray-400 text-sm truncate">{user?.email}</p>
          {user?.bio && <p className="text-gray-300 text-sm">{user.bio}</p>}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">내가 만든 LP</h2>
        {myLps.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-gray-500">
            <p>아직 만든 LP가 없습니다.</p>
            <button
              onClick={() => navigate('/lp/write')}
              className="px-5 py-2.5 bg-pink-500 text-white text-sm font-bold rounded-xl hover:bg-pink-600 transition-colors"
            >
              첫 LP 만들기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {myLps.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
