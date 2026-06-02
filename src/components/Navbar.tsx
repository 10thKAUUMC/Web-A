import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: '홈' },
  { to: '/movies/popular', label: '인기 영화' },
  { to: '/movies/now_playing', label: '상영 중' },
  { to: '/movies/top_rated', label: '평점 높은' },
  { to: '/movies/upcoming', label: '개봉 예정' },
];

export const Navbar = () => {
  return (
    <nav className='w-full border-b border-gray-300 bg-white sticky top-0 z-50'>
      <div className='flex gap-6 p-5 max-w-[1200px] mx-auto'> 
        {LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => 
              `transition-colors duration-200 ${isActive ? 'text-[#dda5e3] font-bold' : 'text-gray-500 hover:text-[#dda5e3]'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};