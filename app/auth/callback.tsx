import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Callback() {
  const route = useRoute();
  const { code } = route.params || {};
  const [token, setToken] = useState("");

  const requestToken = async (code) => {
    console.log("llama");
    if (code) {
      console.log("entra");
      const clientId = process.env.EXPO_PUBLIC_OAUTH_ID!;
      const clientSecret = process.env.EXPO_PUBLIC_OAUTH_SECRET!;
      const redirectUri = process.env.EXPO_PUBLIC_OAUTH_URL!;

      const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString(
        "base64",
      );

      const response = await fetch("https://api.notion.com/v1/oauth/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${encoded}`,
        },
        body: JSON.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
        }),
      });
      console.log(response);

      setToken(response.access_token);
    }
  };

  requestToken(code);
  console.log(code);

  return (
    <View>
      <Text>Código: {code}</Text>
    </View>
  );
}
