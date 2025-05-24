import { getSecureItem } from "@/application/services/SecureStorageService";
import { User } from "@/types/types";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import * as AuthService from "@/application/services/AuthService";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type AuthState = {
  isReady: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isValid = await AuthService.tryRestoreSession();
        if (isValid) {
          setIsLoggedIn(true);
          const user = await AuthService.getUser();
          setUser(user);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }

      setIsReady(true);
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isReady, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
