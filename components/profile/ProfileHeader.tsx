import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Id } from '@/convex/_generated/dataModel';
import { Image } from 'expo-image';
import { UserCircle } from 'phosphor-react-native';
import { defaultStyles } from '@/constants/Styles';
import { useUser } from '@clerk/clerk-expo';

type metadata = {
  _id: Id<"users">;
  _creationTime: number;
  profilePictureUrl?: string | undefined;
  profilePictureId?: string | undefined;
  displayName: string;
  username: string;
  email: string;
  createdAt: number;
  clerkId: string;
} | undefined

type ProfileHeader = {
  metadata: metadata;

}

const buttonPadding = Dimensions.get("screen").width * 0.04;

const ProfileHeader = ({metadata} : ProfileHeader) => {
  const { user } = useUser();
  const ownAccount = user?.id == metadata?.clerkId;

  return (
    <View style={styles.top}>
        <View style={styles.profileImage}>
          {metadata?.profilePictureUrl == undefined ? (
            <UserCircle
              size={"100%"}
              color={Colors.borderColor}
              weight="fill"
            />
          ) : (
            <Image source={metadata?.profilePictureUrl} />
          )}
        </View>
        <Text style={[defaultStyles.displaynameText, { fontSize: 22 }]}>
          {metadata?.displayName}
        </Text>
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
            <View style={[styles.buttonContainer, styles.buttonStylesFilled]}>
              <Text style={defaultStyles.pTextD}>{ownAccount ? 'Edit Profile' : 'Follow'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "47.5%" }} onPress={() => {}}>
            <View style={[styles.buttonContainer, styles.buttonStylesFilled]}>
              <Text style={defaultStyles.pTextD}>Share Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
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
})