import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import React, { createContext, useContext, ReactNode } from "react";

interface UIDContextProps {
  userData: (typeof api.tasks.queryUser._returnType) | undefined;
}

const UIDContext = createContext<UIDContextProps | null>(null);

interface UIDProviderProps {
  children: ReactNode;
}

export const UIDProvider = ({ children }: UIDProviderProps) => {
  const { userId: uid } = useAuth();
  const ud_tmp = useQuery(api.tasks.queryUser, { uid: uid || "" });
  const userData = uid && ud_tmp ? ud_tmp : undefined;

  return (
    <UIDContext.Provider value={{ userData }}>{children}</UIDContext.Provider>
  );
};

export const useUID = (): UIDContextProps => {
  const context = useContext(UIDContext);
  if (!context) {
    throw new Error("useUID must be used within a UIDProvider");
  }
  return context;
};
