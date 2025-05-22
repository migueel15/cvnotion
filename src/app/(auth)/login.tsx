import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import NotionLogo from "@/features/auth/components/NotionLogo";
import * as Linking from "expo-linking";
import NotionLogoSvg from "@/assets/svg/notion-logo.svg";
import CVNotionLogo from "@/features/auth/components/CVNotionLogo";

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
    <SafeAreaView className="flex flex-col items-center h-full bg-light-dark">
      <Text className="text-center text-6xl mt-20 text-white font-bold">
        Welcome to CVNotion
      </Text>
      <View className="mt-auto">
        <CVNotionLogo width={200} height={200} />
      </View>
      <TouchableOpacity
        className="mt-auto mb-20 flex-row justify-center items-center gap-4 bg-dark rounded-xl p-5"
        onPress={_handlePressButtonAsync}
      >
        <NotionLogoSvg width={40} height={40} color="white" />
        <Text className="text-2xl text-white">Login with Notion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
