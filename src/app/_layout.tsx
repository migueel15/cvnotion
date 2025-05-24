import { AuthProvider } from "@/context/authContext";
import { Slot } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import "../../global.css";

export default function RootLayout() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ApplicationProvider>
  );
}
