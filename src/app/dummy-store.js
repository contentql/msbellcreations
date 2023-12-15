import {create} from "zustand";
import { persist  } from 'zustand/middleware';

export const useDummy = create(persist((set) => ({
    dummyItems: [],
    addtodummy: (newProduct) =>
      set((state) => ({
        dummyItems: [ ...newProduct],
      })),
   
      dummyempty: () =>
      set((state) => ({
        dummyItems: state.dummyItems.filter(() =>
          false
        ),
      })),
}),
{
    name: 'dummy', 
  },
));
