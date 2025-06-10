import { User } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // Manejo de errores
    console.error("Error al guardar en AsyncStorage:", e);
  }
};

export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
  } catch (e) {
    // Manejo de errores
    console.error("Error al obtener de AsyncStorage:", e);
    return null;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // Manejo de errores
    console.error("Error al eliminar de AsyncStorage:", e);
  }
};

export const storeUserData = async (
  id: User["id"],
  json: Partial<User>
): Promise<void> => {
  try {
    const currentUserData = await AsyncStorage.getItem(id);

    if (!currentUserData) {
      await AsyncStorage.setItem(id, JSON.stringify(json));
    } else {
      await AsyncStorage.mergeItem(id, JSON.stringify(json));
    }
  } catch (e) {
    console.error("Error al actualizar el usuario en AsyncStorage:", e);
  }
};
