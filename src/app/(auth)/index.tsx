import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Auth() {
  return <Redirect href={"/(auth)/login"} />;
  return <View></View>;
}
