"use client";

import { createContext, useContext, useState } from "react";

import { createClient } from "@/lib/supabase/supabase-client";
import type { SupabaseClient } from "@supabase/supabase-js";

type SupabaseContext = {
  supabase: SupabaseClient;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

interface SupabaseProviderProp {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProp> = ({ children }) => {
  const [supabase] = useState(() => createClient());

  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>;
};

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }
  return context;
};

export default SupabaseProvider;
