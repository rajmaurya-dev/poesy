import { Stack, useLocalSearchParams } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        // options={{
        //   headerShown: true,
        //   headerTransparent: true,
        //   headerTintColor: "#fff",
        //   headerTitle: "",
        //   headerBackVisible: true,
        //   headerStyle: {
        //     backgroundColor: "transparent",
        //   },
        //   headerShadowVisible: false,
        // }}
      />
    </Stack>
  );
}
