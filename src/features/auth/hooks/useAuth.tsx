import { useAuthContext } from "@/context/authContext";
import {
  getSecureItem,
  removeSecureItem,
  setSecureItem,
} from "@/store/secureStorageHandler";
import { useRouter } from "expo-router";
import {
  getTokenFromCode,
  revokeToken,
  validateToken,
} from "../services/notionAuth";
import { setItemAsync } from "expo-secure-store";
import { getItem, removeItem } from "@/store/asyncStorageHandler";
import { User } from "@/types/types";

export const useAuth = () => {
  const context = useAuthContext();
  const router = useRouter();

  const isLoggedIn = context.isLoggedIn;
  const isReady = context.isReady;
  const user = context.user;

  const retrieveTokenFromCodeAndStore = async (code: string) => {
    const token = await getTokenFromCode(code);

    if (!token) {
      console.error("Error retrieving token from code");
      return;
    }

    // save token to secure storage
    setSecureItem("notion_token", token);
    login();
  };

  const login = async () => {
    // get tokens
    const token = await getSecureItem("notion_token");
    console.log(token);
    if (!token) {
      console.error("Error retrieving token from secure storage");
      return;
    }
    // validate token
    const isValid = await validateToken(token);
    if (!isValid) {
      console.error("Token is not valid");
      return;
    }
    const storedUserId = await getItem<string>("user");
    if (!storedUserId) {
      console.error("Error retrieving user from async storage");
      return;
    }
    const userData = await getItem<User>(storedUserId);
    context.setUser(userData);
    context.setIsLoggedIn(true);
    router.replace("/");
  };

  /**
   * Logs out the user by revoking the token and removing it from secure storage
   */
  const logout = async () => {
    const token = await getSecureItem("notion_token");
    if (!token) {
      console.error("Error retrieving token from secure storage");
      return;
    }
    // revoke token
    revokeToken(token);

    context.setIsLoggedIn(false);
    // remove token from secure storage
    await removeSecureItem("notion_token");
    await removeItem("user");
    router.replace("/login");
  };

  return {
    isLoggedIn,
    isReady,
    user,
    login,
    logout,
    retrieveTokenFromCodeAndStore,
  };
};
