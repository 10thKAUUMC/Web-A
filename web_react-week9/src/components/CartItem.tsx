import type { CartItem as CartItemType } from '../types/cart';
import { useCartStore } from '../store/cartStore';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { increase, decrease, removeItem } = useCartStore();

  return (
    <li className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5 lg:px-10 lg:py-6">
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
        <img
          src={item.img}
          alt={item.title}
          className="h-14 w-14 flex-shrink-0 rounded-md object-cover sm:h-16 sm:w-16 lg:h-20 lg:w-20"
        />
        <div className="flex min-w-0 flex-col">
          <h3 className="truncate text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
            {item.title}
          </h3>
          <p className="truncate text-xs text-gray-500 sm:text-sm">
            {item.singer}
          </p>
          <p className="mt-1 text-sm font-bold text-gray-900 sm:text-base">
            ${item.price}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <button
          type="button"
          onClick={() => decrease(item.id)}
          className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 text-gray-700 hover:bg-gray-100 sm:h-8 sm:w-8 lg:h-9 lg:w-9"
        >
          -
        </button>
        <span className="flex h-7 w-7 items-center justify-center text-sm font-medium sm:h-8 sm:w-8 lg:h-9 lg:w-9 lg:text-base">
          {item.amount}
        </span>
        <button
          type="button"
          onClick={() => increase(item.id)}
          className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 text-gray-700 hover:bg-gray-100 sm:h-8 sm:w-8 lg:h-9 lg:w-9"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="ml-2 flex h-7 w-7 items-center justify-center rounded border border-red-300 text-red-500 hover:bg-red-50 sm:h-8 sm:w-8 lg:h-9 lg:w-9"
        >
          ✕
        </button>
      </div>
    </li>
  );
}
