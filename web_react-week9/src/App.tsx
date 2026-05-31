import Navbar from './components/Navbar';
import CartList from './components/CartList';
import PriceBox from './components/PriceBox';

export default function App() {
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
