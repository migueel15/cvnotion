import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";

export default function Callback() {
  const route = useRoute();
  const { code } = route.params || {};

  return (
    <View>
      <Text>Código: {code}</Text>
    </View>
  );
}
