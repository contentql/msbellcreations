import { create } from "zustand";
import { persist } from 'zustand/middleware';

export const useOrder = create(persist((set) => ({
  orderItems: [],
  userDetails:{},
  updateValues: (newValues) => set((state) => ({ userDetails: { ...state, ...newValues } })),

  orderaddAll: (products) =>
    set((state) => ({
      orderItems: [...state.orderItems, ...products],
    })),

    deleteAllOrders: () =>
    set((state) => ({
      orderItems: state.orderItems.filter(() => false)
    })),
    
    resetUpdateValues: () => set({ userDetails: {} }),
}),
  {
    name: 'order-items',
  },
));
