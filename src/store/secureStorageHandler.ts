import * as SecureStore from "expo-secure-store";

export const setSecureItem = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Error saving to SecureStore:", error);
  }
};

export const getSecureItem = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.error("Error retrieving from SecureStore:", error);
    return null;
  }
};

export const removeSecureItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error removing from SecureStore:", error);
  }
};
