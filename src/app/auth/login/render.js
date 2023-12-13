
"use client";

import { useRouter } from "next/navigation";

import { useUserStore } from "src/app/auth-store"; // Import useRouter for Next.js
import { SplashScreen } from "src/components/loading-screen";

// eslint-disable-next-line react/prop-types
export const Rend = ({ children }) => {
  const { UserData } = useUserStore();
  const router = useRouter(); // Use useRouter hook for navigation

  if (UserData.isLoggedIn) {
    router.push("/");
    return <SplashScreen />; // Returning null since navigation will happen
  }

  // If the user is not logged in, render the children
  return <>{children}</>;
};
