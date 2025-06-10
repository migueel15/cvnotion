import { useAuth } from "@/features/auth/hooks/useAuth";
import { Redirect, Tabs } from "expo-router";
import * as AuthService from "@/application/services/AuthService";

export default function Layout() {
  const auth = useAuth();

  if (!auth.isReady) {
    return null;
  }

  if (!auth.isLoggedIn) {
    return <Redirect href={"/(auth)/login"} />;
  }

  if (auth.user?.databases === undefined) {
    console.log("redireccionando");
    return <Redirect href={"/(config)/newDatabase"} />;
  }

  return <Tabs />;
}
