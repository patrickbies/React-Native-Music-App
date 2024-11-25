import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { router, useLocalSearchParams, useNavigation, } from "expo-router";
import { UserCircle } from "phosphor-react-native";
import { Image } from "expo-image";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { useConvex } from "convex/react";
import { useLoading } from "@/context/LoadingContext";
import { api } from "@/convex/_generated/api";

const buttonPadding = Dimensions.get("screen").width * 0.04;

const Profile = () => {
  const {clerkId: userId} = useLocalSearchParams<{ clerkId: string }>();
  const conv = useConvex();
  const {showLoading, hideLoading} = useLoading();
  const [userData, setUserData] = useState<typeof api.tasks.queryUser._returnType[0]>();
  const nav = useNavigation();

  const grabProfile = async () => {
    if (!userId) {
      console.error("Invalid clerkId. Redirecting...");
      router.back();
      return;
    }
  
    const data = await conv.query(api.tasks.queryUser, { uid: userId });
  
    if (!data.length) {
      console.warn("No user found. Redirecting...");
      router.back();
      return;
    }
  
    setUserData(data[0]);
  };

  useEffect(() => {
    showLoading();
    grabProfile().then(() => hideLoading());
  }, [userId])

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[1]}>
      <View style={styles.top}>
        <View style={styles.profileImage}>
          {userData?.profilePictureUrl == undefined ? (
            <UserCircle
              size={"100%"}
              color={Colors.borderColor}
              weight="fill"
            />
          ) : (
            <Image source={userData.profilePictureUrl} />
          )}
        </View>
        <View style={{alignItems: 'center', gap: 5}}>
        <Text style={[defaultStyles.displaynameText, { fontSize: 22 }]}>
          {userData?.displayName}
        </Text>
        <Text style={[defaultStyles.usernameText]}>
          @{userData?.username}
        </Text>
        </View>
        <View
          style={{
            paddingVertical: "2%",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "center", width: "25%" }}>
            <Text style={defaultStyles.pTextM}>Followers</Text>
            <Text style={defaultStyles.pTextM}>0</Text>
          </View>
          <View style={{ alignItems: "center", width: "25%" }}>
            <Text style={defaultStyles.pTextM}>Following</Text>
            <Text style={defaultStyles.pTextM}>0</Text>
          </View>
          <View style={{ alignItems: "center", width: "25%" }}>
            <Text style={defaultStyles.pTextM}>Streams</Text>
            <Text style={defaultStyles.pTextM}>0</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style={{ width: "47.5%" }} onPress={() => {}}>
            <View style={[styles.buttonContainer, {backgroundColor: Colors.blue}]}>
              <Text style={defaultStyles.pTextL}>Follow</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "47.5%" }} onPress={() => {}}>
            <View style={[styles.buttonContainer, styles.buttonStylesFilled]}>
              <Text style={defaultStyles.pTextD}>Share Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ProfileTabs />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  top: {
    paddingHorizontal: "5%",
    paddingBottom: "2%",
    alignItems: "center",
    gap: 15,
  },
  profileImage: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: Colors.darkHighlight,
  },
  bottom: {},
  buttonContainer: {
    flexDirection: "row",
    padding: buttonPadding,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonStylesFilled: {
    backgroundColor: Colors.unselected,
  },
});
