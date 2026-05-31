import { FaShoppingCart } from 'react-icons/fa';
import { useAppSelector } from '../hooks/useCustomRedux';

export default function Navbar() {
  const amount = useAppSelector((state) => state.cart.amount);

  return (
    <nav className="flex items-center justify-between bg-slate-800 px-4 py-4 sm:px-8 sm:py-5 lg:px-12 lg:py-6">
      <h1 className="text-lg font-bold text-white sm:text-2xl lg:text-3xl">
        Ohtani Ahn
      </h1>
      <div className="relative">
        <FaShoppingCart className="text-xl text-white sm:text-2xl lg:text-3xl" />
        <span className="absolute -top-2 -right-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-400 px-1 text-xs font-bold text-white sm:-right-4 sm:h-6 sm:min-w-6 sm:text-sm">
          {amount}
        </span>
      </div>
    </nav>
  );
}
