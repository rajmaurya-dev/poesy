import { Stack, useLocalSearchParams } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
