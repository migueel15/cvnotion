import { useAuth } from "@/features/auth/useAuth";
import { Redirect, Tabs } from "expo-router";

export default function Layout() {
  const auth = useAuth();

  if (!auth.isReady) {
    return null;
  }

  if (!auth.isLoggedIn) {
    return <Redirect href={"/(auth)/login"} />;
  }

  if (auth.user?.databases === undefined) {
    return <Redirect href={"/(config)/newDatabase"} />;
  }

  return <Tabs />;
}
