import { create } from 'zustand';
import type { CartItem } from '../types/cart';
import cartItems from '../constants/cartItems';

interface CartStore {
  cartItems: CartItem[];
  amount: number;
  total: number;
  isModalOpen: boolean;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const computeTotals = (items: CartItem[]) =>
  items.reduce(
    (acc, item) => ({
      amount: acc.amount + item.amount,
      total: acc.total + item.amount * Number(item.price),
    }),
    { amount: 0, total: 0 },
  );

export const useCartStore = create<CartStore>()((set, get) => ({
  cartItems,
  ...computeTotals(cartItems),
  isModalOpen: false,

  increase: (id) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item,
      ),
    }));
    get().calculateTotals();
  },

  decrease: (id) => {
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item,
        )
        .filter((item) => item.amount > 0),
    }));
    get().calculateTotals();
  },

  removeItem: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
    get().calculateTotals();
  },

  clearCart: () => {
    set({ cartItems: [], amount: 0, total: 0 });
  },

  calculateTotals: () => {
    const totals = computeTotals(get().cartItems);
    set(totals);
  },

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
