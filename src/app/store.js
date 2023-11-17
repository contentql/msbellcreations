import {create} from "zustand";
import { persist  } from 'zustand/middleware';

export const useCart = create(persist((set) => ({
    cartItems: [],
    addProduct: (newProduct) =>
      set((state) => ({
        cartItems: [...state.cartItems, { ...newProduct, quantity: 1 }],
      })),
    deleteProduct: (productId) =>
      set((state) => ({
        cartItems: state.cartItems.filter((product) => product.id !== productId),
      })),
    updateQuantity: (productId, quantity) =>
      set((state) => ({
        cartItems: state.cartItems.map((product) =>
          product.id === productId ? { ...product, quantity } : product
        ),
      })),
}),
{
    name: 'cart-items', // name of the item in the storage (must be unique)
  },
));
