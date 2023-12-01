import { create } from "zustand";


export const useProducts = create((set) => ({
  prod: [{}],
  Productsadd: (newProducts) =>
    set((state) => ({
        products: [...state.prod, newProducts],
    })),
  
}),

);
