import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LuSearch, LuUser } from 'react-icons/lu';

const BurgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/>
  </svg>
);

export default function HomeLayout() {
  const navigate = useNavigate();
  const { accessToken, logout, userName } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col h-screen bg-[#0f0f11] text-white overflow-hidden">
      <header className="h-16 flex items-center justify-between px-6 bg-[#0f0f11] shrink-0 z-50 border-b border-[#1f1f22]">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-gray-200 transition-colors">
            <BurgerIcon />
          </button>
          <span className="text-pink-500 font-extrabold text-xl cursor-pointer tracking-tight" onClick={() => navigate('/')}>
            돌려돌려LP판
          </span>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-6 text-sm font-semibold min-w-0">
          <button className="text-gray-300 hover:text-white hidden sm:block shrink-0">
            <LuSearch size={20} />
          </button>

          {accessToken ? (
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <span className="text-gray-300 truncate hidden sm:block">{userName ?? '회원'}님 반갑습니다.</span>
              <button onClick={logout} className="text-gray-400 hover:text-white shrink-0">로그아웃</button>
            </div>
          ) : (
            <div className="flex gap-2 sm:gap-3 shrink-0">
              <button onClick={() => navigate('/login')} className="text-gray-300 hover:text-white">로그인</button>
              <button onClick={() => navigate('/signup')} className="px-3 sm:px-4 py-1.5 bg-pink-500 text-white rounded-md hover:bg-pink-600">회원가입</button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside
          className={`bg-[#121212] flex flex-col transition-all duration-300 overflow-hidden shrink-0 border-r border-[#1f1f22]
            absolute inset-y-0 left-0 z-50
            md:static md:z-auto
            ${isSidebarOpen ? 'w-56' : 'w-0'}
          `}
        >
          <div className="flex-1 p-6 flex flex-col gap-6 mt-2 whitespace-nowrap">
            <button onClick={() => navigate('/')} className="text-left text-gray-300 hover:text-white flex items-center gap-3 text-sm font-semibold">
              <LuSearch size={20} /> 찾기
            </button>
            <button onClick={() => navigate('/my')} className="text-left text-gray-300 hover:text-white flex items-center gap-3 text-sm font-semibold">
              <LuUser size={20} /> 마이페이지
            </button>
          </div>
          <div className="p-6 whitespace-nowrap">
            <button className="text-gray-500 text-xs hover:text-gray-300">탈퇴하기</button>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden top-16"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0f0f11] min-w-0">
          <Outlet />
        </main>

        {accessToken && (
          <button
            onClick={() => navigate('/lp/write')}
            className="fixed bottom-8 right-8 md:bottom-10 md:right-10 w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg hover:bg-pink-600 hover:scale-105 transition-all z-50"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}