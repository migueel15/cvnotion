import NotionService from "@/application/services/NotionService";
import colors from "@/colors";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { NotionDatabase } from "@/types/types";
import { Button } from "@expo/ui/jetpack-compose";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useState } from "react";
import { Image, Text, View } from "react-native";

export default function Home() {
  const auth = useAuth();
  const notion = NotionService;
  const [databases, setDatabases] = useState<NotionDatabase[]>([]);
  const [props, setProps] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDatabases = async () => {
      setLoading(true);
      const databases = await auth.user?.databases;
      if (!databases) return;
      setDatabases(databases);
      setLoading(false);

      const props = await notion.getDatabaseProperties(databases[0]?.id ?? "");
      setProps(props);
    };
    getDatabases();
  }, []);

  return (
    <View>
      {loading && <Text>Loading...</Text>}
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
      <Button
        elementColors={{
          containerColor: colors.dark,
          contentColor: colors.primary,
        }}
        onPress={() => {
          AsyncStorage.clear();
        }}
      >
        BORRAR BASE DE DATOS
      </Button>
      <Text>
        {databases
          .map((database) => `${database.icon ?? ""} ${database.name}`)
          .join("\n")}
      </Text>
      <Text>{props ? JSON.stringify(props) : "No properties found"}</Text>
    </View>
  );
}
