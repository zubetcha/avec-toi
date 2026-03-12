"use client";

import { useEffect, ReactNode, useRef } from "react";
import { useSupabase } from "@/app/_provider/supabase-provider";
import { useAuthStore } from "@/stores/auth-store";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { supabase } = useSupabase();
  const { setUser } = useAuthStore();
  const initializedRef = useRef(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (initializedRef.current) return;
      initializedRef.current = true;

      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    initializeAuth();
  }, [supabase, setUser]);

  useEffect(() => {
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
