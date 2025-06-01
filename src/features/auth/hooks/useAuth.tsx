import { notionClient } from "@/features/notion/client";
import { useAuthContext } from "@/context/authContext";
import {
  getSecureItem,
  removeSecureItem,
  setSecureItem,
} from "@/application/services/SecureStorageService";
import { useRouter } from "expo-router";
import type { User } from "@/types/types";
import * as AuthService from "@/application/services/AuthService";

export const useAuth = () => {
  const context = useAuthContext();
  const router = useRouter();

  const isLoggedIn = context.isLoggedIn;
  const isReady = context.isReady;
  const user = context.user;

  const login = async (code: string) => {
    const user = await AuthService.login(code);
    if (!user) return;
    context.setUser(user);
    context.setIsLoggedIn(true);
    router.replace("/");
  };

  /**
   * Logs out the user by revoking the token and removing it from secure storage
   */
  const logout = async () => {
    await AuthService.logout();
    router.replace("/login");
  };

  return {
    isLoggedIn,
    isReady,
    user,
    login,
    logout,
  };
};
