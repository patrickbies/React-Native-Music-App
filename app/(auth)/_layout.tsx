import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="login" options={{
          headerShown: true,
          title: "",
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitleStyle: {color: Colors.selected},
        }} />
      <Stack.Screen
        name="(createaccount)/[email]"
        options={{
          headerShown: true,
          title: "Create Account",
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitleStyle: {color: Colors.selected},
        }}
      />
    </Stack>
  );
}
