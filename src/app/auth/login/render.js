"use client";

import { useRouter } from "next/navigation";

import { useUserStore } from "src/app/auth-store"; // Import useRouter for Next.js

// eslint-disable-next-line react/prop-types
export const Rend = ({ children }) => {
  const { UserData } = useUserStore();
  const router = useRouter(); // Use useRouter hook for navigation

  // Check if the user is logged in, and navigate accordingly
  // console.log("UserData.isLoggedIn:",UserData.isLoggedIn)
  if (UserData.isLoggedIn) {
    router.push("/");
    return null; // Returning null since navigation will happen
  }

  // If the user is not logged in, render the children
  return <>{children}</>;
};
