import { Link } from "expo-router";
import { Text, View } from "react-native";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Este es el index</Text>
      <Link href="/users">Ir a users</Link>
      <Link href="/pokemons">Ir a pokemons</Link>
    </View>
  );
}
