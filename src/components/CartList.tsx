import { useAppSelector } from '../hooks/useCustomRedux';
import CartItem from './CartItem';

export default function CartList() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="px-6 py-16 text-center text-gray-500 sm:py-24">
        장바구니가 비어 있습니다.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
