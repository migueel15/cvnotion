import { useRoute } from "@react-navigation/native";
import base64 from "react-native-base64";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Callback() {
  const route = useRoute();
  const [token, setToken] = useState("");
  const clientId = process.env.EXPO_PUBLIC_OAUTH_ID!;
  const clientSecret = process.env.EXPO_PUBLIC_OAUTH_SECRET!;
  const redirectUri = process.env.EXPO_PUBLIC_OAUTH_REDIRECT_URL!;

  useEffect(() => {
    const { code } = route.params || {};
    const requestToken = async (code: string) => {
      if (code) {
        console.log("aa");
        console.log(code);

        const credentials = `${clientId}:${clientSecret}`;
        const encodedCredentials = base64.encode(credentials);

        const response = await fetch("https://api.notion.com/v1/oauth/token", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${encodedCredentials}`,
          },
          body: JSON.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectUri,
          }),
        });

        const data = await response.json();

        console.log(data);
        // setToken(response.access_token);
      }
    };
    requestToken(code);
  }, [route.params]);

  return (
    <View>
      <Text>Código: {token}</Text>
    </View>
  );
}

// {
//     "access_token": "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",
//     "token_type": "bearer",
//     "bot_id": "712337ca-b4be-4642-980d-ad0c9d253f7e",
//     "workspace_name": "Personal",
//     "workspace_icon": "https://lh3.googleusercontent.com/a-/AOh14GiX-EomRrzGy_GkDJl9dLb49-3t3NoQXZwuu2Z09g=s100",
//     "workspace_id": "4d8ddfa6-0724-4f43-b337-5dd74adad6a4",
//     "owner": {
//         "type": "user",
//         "user": {
//             "object": "user",
//             "id": "ad5994af-cc5f-419d-a41b-8b521f27f209",
//             "name": "Miguel A. Dorado",
//             "avatar_url": "https://s3-us-west-2.amazonaws.com/public.notion-static.com/7ce762b4-3716-488d-a51a-ed2bf3bc1c00/Frame_1.png",
//             "type": "person",
//             "person": {
//                 "email": "miguelangeldorado10@gmail.com"
//             }
//         }
//     },
//     "duplicated_template_id": null,
//     "request_id": "95a1997e-6f9c-4a60-8c75-bb7d03b04b44"
// }
