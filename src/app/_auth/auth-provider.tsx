"use client";

import { useEffect, ReactNode, useRef } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useAuthStore } from "../../stores/auth-store";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const { setUser } = useAuthStore();
  const initializedRef = useRef(false);

  useEffect(() => {
    // 초기 사용자 상태 설정
    if (!initializedRef.current) {
      setUser(user);
      initializedRef.current = true;
    }
  }, [user, setUser]);

  useEffect(() => {
    // auth state 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);

      if (event === "SIGNED_IN") {
        setUser(session?.user ?? null);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      } else if (event === "TOKEN_REFRESHED") {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, setUser]);

  return <>{children}</>;
}
