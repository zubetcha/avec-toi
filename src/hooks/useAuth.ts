"use client";

import { useAuthStore } from "../stores/auth-store";

export const useAuth = () => {
  const { user, isLoading, isAuthenticated, setUser, setLoading, logout } = useAuthStore();

  return {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setLoading,
    logout,
    // 편의 메서드들
    userId: user?.id || null,
    userEmail: user?.email || null,
    userName: user?.user_metadata?.full_name || user?.email || null,
  };
};
