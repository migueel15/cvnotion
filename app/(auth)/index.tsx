import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Auth() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return <View></View>;
}
