import { useAuth } from "@/features/auth/hooks/useAuth";
import { Image, Text, View } from "react-native";
import { Button } from "@expo/ui/jetpack-compose";
import colors from "@/colors";
import useNotion from "@/features/notion/hooks/useNotion";
import { useEffect } from "react";

export default function Home() {
  const auth = useAuth();

  return (
    <View>
      <Text>{auth.isLoggedIn ? "Sesion iniciada" : "No hay token"}</Text>

      <Text>{auth.user?.name}</Text>
      <Image
        source={{ uri: auth.user?.image }}
        className="w-20 h-20 rounded-full"
      />

      <Button
        elementColors={{
          containerColor: colors.dark,
          contentColor: colors.primary,
        }}
        onPress={() => {
          auth.logout();
        }}
      >
        LOG OUT
      </Button>
    </View>
  );
}
