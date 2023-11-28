import { create } from "zustand";
import { persist } from 'zustand/middleware';

export const useCheckout = create(persist((set) => ({
  checkItems: [],
  checkaddProducts: (newProducts) =>
    set((state) => ({
      checkItems: [...state.checkItems, newProducts],
    })),
  checkdeleteProduct: (productId) =>
    set((state) => ({
      checkItems: state.checkItems.filter((product) => product.id !== productId),
    })),
  checkupdateQuantity: (productId, quantity) =>
    set((state) => ({
      checkItems: state.checkItems.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      ),
    })),
  deleteAll: () =>
    set((state) => ({
      checkItems: state.checkItems.filter(() => false)
    })),
  addAll: (products) =>
    set((state) => ({
      checkItems: [...state.checkItems, ...products],
    })),

}),
  {
    name: 'checkout-items',
  },
));
