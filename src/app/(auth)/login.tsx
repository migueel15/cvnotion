import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import NotionLogo from "@/features/auth/components/NotionLogo";

export default function LogIn() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isLoggedIn) {
      <Redirect href={"/(home)"} />;
    }
  }, [auth.isLoggedIn]);

  const url = process.env.EXPO_PUBLIC_OAUTH_URL!;

  const _handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <SafeAreaView className="flex flex-col justify-center items-center h-full">
      <Text
        className="text-center text-7xl mt-40"
        style={{
          fontFamily: "Tagesschrift-Regular",
        }}
      >
        Welcome to CVNotion
      </Text>
      <TouchableOpacity
        className="mt-auto mb-10 flex-row justify-center items-center gap-2 bg-gray-700 p-6 rounded-xl"
        onPress={_handlePressButtonAsync}
      >
        <NotionLogo color="white" />
        <Text className="text-2xl text-gray-100">Login with Notion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
