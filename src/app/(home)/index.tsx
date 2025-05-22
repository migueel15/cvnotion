import { useAuth } from "@/features/auth/hooks/useAuth";
import { getSecureItem } from "@/store/secureStorageHandler";
import { Button } from "@react-navigation/elements";
import { Text, View } from "react-native";

export default function Home() {
  const auth = useAuth();
  return (
    <View>
      <Text>{auth.isLoggedIn ? "Sesion iniciada" : "No hay token"}</Text>
      <Button
        onPress={() => {
          getSecureItem("notion_token").then((token) => {
            console.log(token);
          });
        }}
      >
        CURRENT TOKEN
      </Button>
      <Button
        onPress={() => {
          auth.logout();
        }}
      >
        LOG OUT
      </Button>
    </View>
  );
}
