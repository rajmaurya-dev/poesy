import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { database } from "@/model/database";
import { DatabaseProvider } from "@nozbe/watermelondb/DatabaseProvider";

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();
  SplashScreen.setOptions({
    duration: 1000,
    fade: true,
  });

  return (
    <DatabaseProvider database={database}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: {
            backgroundColor: "#fff",
          },
        }}
      >
        <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
      </Stack>
    </DatabaseProvider>
  );
}
