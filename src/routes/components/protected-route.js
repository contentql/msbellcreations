'use client';
 
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
 
import { useUserStore } from 'src/app/auth-store';
import { SplashScreen } from 'src/components/loading-screen';
 
import { paths } from '../paths';
 
// ----------------------------------------------------------------------
 
export default function ProtectedRoute({ children }) {
  const router = useRouter();
 
  const { UserData } = useUserStore();
 
  useEffect(() => {
    if (!(UserData.isLoggedIn)) {
      router.push(paths.loginBackground);
    }
  }, [UserData.isLoggedIn, router]);
 

  return UserData.isLoggedIn||UserData.guest ? children : <SplashScreen />;

}
 
ProtectedRoute.propTypes = {
  children: PropTypes.node,
};