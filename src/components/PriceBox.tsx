import { useAppDispatch, useAppSelector } from '../hooks/useCustomRedux';
import { clearCart } from '../slices/cartSlice';

export default function PriceBox() {
  const dispatch = useAppDispatch();
  const { cartItems, total } = useAppSelector((state) => state.cart);

  if (cartItems.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-4 border-t border-gray-200 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-medium text-gray-700 sm:text-base lg:text-lg">
          총 금액
        </span>
        <span className="text-base font-bold text-gray-900 sm:text-lg lg:text-xl">
          ${total}
        </span>
      </div>
      <button
        type="button"
        onClick={() => dispatch(clearCart())}
        className="rounded border border-gray-400 bg-white px-6 py-2 text-sm text-gray-800 hover:bg-gray-100 sm:px-8 sm:py-2.5 sm:text-base"
      >
        전체 삭제
      </button>
    </div>
  );
}
