import { Colors } from "@/constants/Colors";
import { Href, router, Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.backgroundColor },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="(search)/index"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerTitle: '',
          headerSearchBarOptions: {
            
          }
        }}
      />
      <Stack.Screen
        name="(upload)/edit_song"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          title: "Choose Audio",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.navigate("(upload)/upload_song" as Href)}
            >
              <Text>Next</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(upload)/upload_song"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          title: "Edit Post",
          headerRight: () => (
            <TouchableOpacity>
              <Text>Post</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
