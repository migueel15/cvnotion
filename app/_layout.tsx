import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen 
          name="users" 
          options={{
            headerShown: true,
            title: 'Tareas',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#f5f5f5',
            },
          }}
        />
        <Stack.Screen name="pokemons" />
      </Stack>
    </SafeAreaProvider>
  );
}
