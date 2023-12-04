import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const store = persist(
  (set) => ({
    UserData: {
      authToken: '',
      userName: '',
      isLoggedIn: false,
      email:''
    },
    updateUserData: (userData) => {
      set(() => ({
        UserData: userData,
      }));
    },
    updateImage: (image) => {
      set((state) => ({
        ...state.UserData,
      }));
    },
    removeUserData: () => {
      set(() => ({
        UserData: {
          authToken: '',
          userName: '',
          isLoggedIn: false,
        },
      }));
    },
  }),
  {
    name: 'user-data',
  }
);

export const useUserStore = create(store);