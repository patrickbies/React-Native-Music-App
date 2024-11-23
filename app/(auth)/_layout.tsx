import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="login" options={{}} />
      <Stack.Screen
        name="(createaccount)/[email]"
        options={{
          headerShown: true,
          title: "Create Account",
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: {color: Colors.selected},
          headerTransparent: true
        }}
      />
    </Stack>
  );
}
