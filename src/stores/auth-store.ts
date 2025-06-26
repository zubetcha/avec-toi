"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { User } from "@supabase/auth-helpers-nextjs";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

interface AuthStore extends AuthState, AuthActions {}

export const useAuthStore = create<AuthStore>()(
  devtools(
    immer((set) => ({
      // 초기 상태
      user: null,
      isLoading: true,
      isAuthenticated: false,

      // 액션들
      setUser: (user) =>
        set((state) => {
          state.user = user;
          state.isAuthenticated = !!user;
          state.isLoading = false;
        }),

      setLoading: (loading) =>
        set((state) => {
          state.isLoading = loading;
        }),

      logout: () =>
        set((state) => {
          state.user = null;
          state.isAuthenticated = false;
          state.isLoading = false;
        }),
    })),
    {
      name: "auth-store",
    }
  )
);
