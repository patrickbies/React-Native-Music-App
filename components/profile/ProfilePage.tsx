import {
  FlatList,
  LayoutRectangle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import { api } from "@/convex/_generated/api";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { useSharedValue } from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";

type ProfilePage = {
  userData: typeof api.tasks.queryUser._returnType;
};

const ProfilePage = ({ userData }: ProfilePage) => {
  const dim = useSharedValue<LayoutRectangle>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  return (
    <View style={{flex: 1}}>
    <FlatList
      data={userData?.userPosts}
      renderItem={(e) => (
        <TouchableOpacity
          style={styles.preview}
          onLayout={({ nativeEvent }) => (dim.value = nativeEvent.layout)}
          onPress={() => {}} // Open current post
        >
          <Image source={e.item.mediaUrl} style={styles.image} />
          <Text style={defaultStyles.pTextM}>{e.item.name}</Text>
        </TouchableOpacity>
      )}
      style={styles.container}
      numColumns={2}
      ListHeaderComponent={() => (
        <>
          <ProfileHeader metadata={userData?.metadata} />
          <ProfileTabs />
        </>
      )}
    />
    {/* Make the animation to fullscreen here: */}

    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  preview: {
    width: "45%",
    marginTop: "3.33%",
    marginLeft: "3.33%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#333",
    borderRadius: 5,
  },
});
