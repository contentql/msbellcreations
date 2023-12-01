import {create} from "zustand";
import {persist} from 'zustand/middleware';

export const useWish = create(persist((set) => ({
    wishItems: [],
    wishaddProduct: (newProduct) =>
      set((state) => ({
        wishItems: [...state.wishItems, { ...newProduct, quantity: 1 }],
      })),
    wishdeleteProduct: (productId) =>
      set((state) => ({
        wishItems: state.wishItems.filter((product) => product.id !== productId),
      })),
    wishupdateQuantity: (productId, quantity) =>
      set((state) => ({
        wishItems: state.wishItems.map((product) =>
          product.id === productId ? { ...product, quantity } : product
        ),
      })),
      wishempty: () =>
      set((state) => ({
        wishItems: state.wishItems.filter(() =>false),
      })),  
}),
{
    name: 'wishlist-items', 
  },
));
