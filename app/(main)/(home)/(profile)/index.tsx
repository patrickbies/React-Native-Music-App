import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useUID } from "@/context/UIDContext";
import { useNavigation } from "expo-router";
import { CaretDown } from "phosphor-react-native";
import { useAuth } from "@clerk/clerk-expo";
import ProfileTabs from "@/components/profile/ProfileTabs";
import Sheet from "@/components/sheet/Sheet";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePage from "@/components/profile/ProfilePage";

const buttonPadding = Dimensions.get("screen").width * 0.04;

const Profile = () => {
  const { userData } = useUID();
  const { signOut } = useAuth();
  const nav = useNavigation();

  const [profileChangeSheet, setProfileChangeSheet] = useState(false);

  useEffect(() => {
    nav.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => setProfileChangeSheet(true)}
          style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
        >
          <Text
            style={[
              defaultStyles.displaynameText,
              { fontSize: 22, color: Colors.unselected },
            ]}
          >
            {userData?.metadata?.username}
          </Text>
          <CaretDown size={20} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [nav, userData?.metadata?.username]);

  return (
    <>
      <ProfilePage userData={userData!} />
      <Sheet
        orientation="bottom"
        base_height={0.2}
        open={profileChangeSheet}
        setOpen={setProfileChangeSheet}
      >
        <View>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              styles.buttonStylesFilled,
              {
                margin: "5%",
              },
            ]}
            onPress={() => signOut()}
          >
            <Text style={defaultStyles.pTextD}>
              Sign out of @{userData?.metadata?.username}
            </Text>
          </TouchableOpacity>
        </View>
      </Sheet>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
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
