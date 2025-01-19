import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();
  SplashScreen.setOptions({
    duration: 1000,
    fade: true,
  });

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
    </Stack>
  );
}
