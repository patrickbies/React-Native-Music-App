import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useUID } from "@/context/UIDContext";
import { useNavigation } from "expo-router";
import { CaretDown, UserCircle } from "phosphor-react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import ProfileTabs from "@/components/profile/ProfileTabs";

const buttonPadding = Dimensions.get('screen').width * 0.04;

const Profile = () => {
  const { userData } = useUID();
  const { signOut } = useAuth();
  const nav = useNavigation();

  useEffect(() => {
    nav.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => signOut()}
          style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
        >
          <Text
            style={[
              defaultStyles.displaynameText,
              { fontSize: 22, color: Colors.unselected },
            ]}
          >
            {userData?.username}
          </Text>
          <CaretDown size={20} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [nav, userData?.username]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.profileImage}>
          {userData?.profilePictureUrl == undefined ? (
            <UserCircle size={"100%"} color={Colors.borderColor} weight="fill" />
          ) : (
            <Image source={userData.profilePictureUrl} />
          )}
        </View>
        <Text style={[defaultStyles.displaynameText, { fontSize: 22 }]}>
          {userData?.displayName}
        </Text>
        <View
          style={{
            paddingVertical: '2%',
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "center", width: '25%' }}>
            <Text style={defaultStyles.pTextM}>Followers</Text>
            <Text style={defaultStyles.pTextM}>0</Text>
          </View>
          <View style={{ alignItems: "center", width: '25%' }}>
            <Text style={defaultStyles.pTextM}>Following</Text>
            <Text style={defaultStyles.pTextM}>0</Text>
          </View>
          <View style={{ alignItems: "center", width: '25%' }}>
            <Text style={defaultStyles.pTextM}>Streams</Text>
            <Text style={defaultStyles.pTextM}>0</Text>
          </View>
        </View>
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>        
          <TouchableOpacity
            style={{width: '47.5%'}}
            onPress={() => {}}
          >
            <View style={[styles.buttonContainer, styles.buttonStylesFilled]}>
              <Text style={defaultStyles.pTextD}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '47.5%'}}
            onPress={() => {}}
          >
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
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonStylesFilled: {
    backgroundColor: Colors.unselected
  },
});
