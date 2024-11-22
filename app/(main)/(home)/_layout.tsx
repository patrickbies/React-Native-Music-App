import { Href, router, Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import { Text, TouchableOpacity, View } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { House, MagnifyingGlass, MusicNotesPlus, User, Waveform, WaveSine } from "phosphor-react-native"

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.backgroundColor },
        headerTitleStyle: { display: "none" },
        tabBarStyle: {
          backgroundColor: Colors.backgroundColor,
          borderColor: Colors.borderColor,
        },
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="(feed)/index"
        listeners={{
          tabPress: (e) => {
            Haptics.selectionAsync();
          },
        }}
        options={{
          title: "Home",
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: "7%", paddingTop: "5%" }}
              onPress={() => router.navigate('(search)' as Href)}
            >
              <MagnifyingGlass size={28} color={'white'} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity style={{ paddingLeft: "12%", paddingTop: "5%" }}>
              <Text style={[defaultStyles.displaynameText, { fontSize: 24 }]}>
                Sonundra
              </Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ size, color, focused }) => (
            <House size={size} color={color} weight={!focused ? 'regular' : 'fill'}/>
          ),
        }}
      />
      <Tabs.Screen
        name="upload_button"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Haptics.selectionAsync();
            router.navigate("(upload)/edit_song" as Href);
          },
        }}
        options={{
          title: "Upload",
          tabBarButton: () => (
            <TouchableOpacity style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <MusicNotesPlus size={40} weight="fill" color="white"  />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)/index"
        listeners={{
          tabPress: (e) => {
            Haptics.selectionAsync();
          },
        }}
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color, focused }) => (
            <User size={size} color={color} weight={!focused ? 'regular' : 'fill'}/>
          ),
        }}
      />
    </Tabs>
  );
}
