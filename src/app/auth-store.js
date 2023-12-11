import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const store = persist(
  (set) => ({
    UserData: {
      id:"",
      authToken: '',
      userName: '',
      isLoggedIn: false,
      email:'',
      zipCode:'',
      birthday:'',
      city:'',
      country:'',
      streetAddress:'',
      phoneNumber:'',
      gender:'',
      guest:false
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
          email:'',
        },
      }));
    },
  }),
  {
    name: 'user-data',
  }
);

export const useUserStore = create(store);