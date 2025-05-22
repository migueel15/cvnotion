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

export const useAuth = () => {
  const context = useAuthContext();
  const router = useRouter();

  const isLoggedIn = context.isLoggedIn;
  const isReady = context.isReady;

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
    context.setIsLoggedIn(true);
    router.replace("/");
  };

  const logout = async () => {
    const token = await getSecureItem("notion_token");
    if (!token) {
      console.error("Error retrieving token from secure storage");
      return;
    }
    revokeToken(token);

    context.setIsLoggedIn(false);
    // remove token from secure storage
    removeSecureItem("notion_token");
    router.replace("/login");
  };

  return {
    isLoggedIn,
    isReady,
    login,
    logout,
    retrieveTokenFromCodeAndStore,
  };
};
