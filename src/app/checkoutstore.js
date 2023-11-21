import {create} from "zustand";
import { persist  } from 'zustand/middleware';

export const useCheckout = create(persist((set) => ({
    checkItems: [],
    addProducts: (newProducts) =>
      set((state) => ({
        checkItems: [...newProducts],
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
}),
{
    name: 'checkout-items',
  },
));
