import * as WebBrowser from "expo-web-browser";
import { Button, Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";

export default function LogIn() {
  const scheme = "cvnotion://";
  const url = process.env.EXPO_PUBLIC_OAUTH_URL!;
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(url);
  };

  return (
    <View>
      <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
      <Text>{result && JSON.stringify(result)}</Text>
    </View>
  );
}
