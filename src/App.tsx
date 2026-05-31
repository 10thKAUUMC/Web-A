import { useEffect } from 'react';
import Navbar from './components/Navbar';
import CartList from './components/CartList';
import PriceBox from './components/PriceBox';
import { useAppDispatch, useAppSelector } from './hooks/useCustomRedux';
import { calculateTotals } from './slices/cartSlice';

export default function App() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="min-h-screen w-full bg-black px-2 py-4 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col overflow-hidden rounded-md bg-white shadow-2xl">
        <Navbar />
        <CartList />
        <PriceBox />
      </div>
    </div>
  );
}
