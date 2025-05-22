import { useRoute } from "@react-navigation/native";
import base64 from "react-native-base64";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getTokenFromCode } from "@/features/auth/services/notionAuth";
import { getSecureItem } from "@/store/secureStorageHandler";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Callback() {
  const route = useRoute();
  const auth = useAuth();

  useEffect(() => {
    const { code } = route.params || {};
    auth.retrieveTokenFromCodeAndStore(code);
  }, [route.params]);

  return null;
}
