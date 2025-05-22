import { useAuth } from "@/features/auth/hooks/useAuth";
import { Redirect, Tabs } from "expo-router";

export default function Layout() {
  const auth = useAuth();

  if (!auth.isReady) {
    return null;
  }

  if (!auth.isLoggedIn) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return <Tabs />;
}
