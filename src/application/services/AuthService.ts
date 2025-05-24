import base64 from "react-native-base64";
import * as SecureStorage from "@/application/services/SecureStorageService";
import * as AsyncStorage from "@/application/services/AsyncStorageService";
import { User } from "@/types/types";
import NotionService from "./NotionService";

const CLIENT_ID = process.env.EXPO_PUBLIC_OAUTH_ID!;
const CLIENT_SECRET = process.env.EXPO_PUBLIC_OAUTH_SECRET!;
const REDIRECT_URI = process.env.EXPO_PUBLIC_OAUTH_REDIRECT_URL!;
const REQUEST_ENDPOINT = "https://api.notion.com/v1/oauth/token";

const encodedAuthorization = () => {
  const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
  return base64.encode(credentials);
};

export const exchangeCodeForToken = async (
  code: string
): Promise<{ token: string; user: User } | null> => {
  if (!code) return null;

  const encodedCredentials = encodedAuthorization();

  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${encodedCredentials}`,
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
  };

  const response = await fetch(REQUEST_ENDPOINT, config);

  if (!response.ok) {
    console.error("Error converting code to token (notion):", response);
    return null;
  }

  const dataJson = await response.json();
  const userData = dataJson.owner.user;
  const user: User = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    image: userData.avatar_url,
  };
  return { token: dataJson.access_token, user };
};

export const validateToken = async (token: string): Promise<boolean> => {
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${encodedAuthorization()}`,
    },
    body: JSON.stringify({
      token: token,
    }),
  };

  const response = await fetch(
    "https://api.notion.com/v1/oauth/introspect",
    config
  );

  if (!response.ok) {
    console.error("Error validating token (notion):", response);
    return false;
  }

  const dataJson = await response.json();
  return dataJson.active;
};

export const revokeToken = async (token: string): Promise<boolean> => {
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${encodedAuthorization()}`,
    },
    body: JSON.stringify({
      token: token,
    }),
  };

  const response = await fetch(
    "https://api.notion.com/v1/oauth/revoke",
    config
  );
  const dataJson = await response.json();
  console.log("revokeToken", dataJson);

  if (!response.ok) {
    console.error("Error revoking token (notion):", dataJson);
    return false;
  }

  return true;
};

export const tryRestoreSession = async (): Promise<boolean> => {
  const token = await SecureStorage.getSecureItem("notion_token");
  if (!token) return false;
  const isValid = await validateToken(token);
  if (!isValid) return false;
  NotionService.initialize(token);
  return true;
};

export const login = async (code: string): Promise<User | null> => {
  const response = await exchangeCodeForToken(code);
  if (!response) return null;

  const { token, user } = response;

  await SecureStorage.setSecureItem("notion_token", token);
  await AsyncStorage.setItem("user", user.id);
  await AsyncStorage.storeUserData(user.id, user);

  NotionService.initialize(token);

  return user;
};

export const logout = async () => {
  const token = await SecureStorage.getSecureItem("notion_token");
  if (!token) return;
  await revokeToken(token);
  NotionService.reset();
  await SecureStorage.removeSecureItem("notion_token");
  await AsyncStorage.removeItem("user");
};

export const getUser = async (): Promise<User | null> => {
  const userId = await AsyncStorage.getItem<string>("user");
  if (!userId) return null;
  const user = await AsyncStorage.getItem<User>(userId);
  return user;
};
