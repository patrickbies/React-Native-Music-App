import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import {
  BookmarkSimple,
  FastForward,
  Heart,
  Pause,
  Play,
  Rewind,
  ShareFat,
} from "phosphor-react-native";
import ScrollText from "../text/ScrollText";
import * as Haptics from "expo-haptics";


type PostFooter = {
  paused: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  liked: boolean;
  saved: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setSaved: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostFooter = ({
  paused,
  setPaused,
  hasPrev,
  hasNext,
  liked,
  setLiked,
  saved,
  setSaved,
}: PostFooter) => {
  return (
    <View style={styles.container}>
      <View style={styles.highContainer}>
        <View style={styles.metaContainer}>
          <ScrollText
            style={defaultStyles.displaynameText}
            text={"Song Name"}
          />
          <Text style={defaultStyles.usernameText}>Artist Name</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {
            setLiked(!liked)
            Haptics.selectionAsync()
          }}>
            <Heart weight="fill" size={34} color={liked ? "#ff3729" : "white"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setSaved(!saved)
            Haptics.selectionAsync()
          }}>
            <BookmarkSimple weight="fill" size={34} color={saved ? "#F5D51E" : "white"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <ShareFat weight="fill" size={34} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.progressbar}></View>
      <View style={styles.controller}>
        <Text style={styles.songTime}>0:00</Text>
        <View
          style={[styles.controller, { alignItems: "center", width: "55%" }]}
        >
          <TouchableOpacity>
            <Rewind
              size={35}
              weight="fill"
              color={hasPrev ? "white" : Colors.borderColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPaused(!paused)}>
            {paused ? (
              <Play size={40} weight="fill" color="white" />
            ) : (
              <Pause size={40} weight="fill" color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <FastForward
              size={35}
              weight="fill"
              color={hasNext ? "white" : Colors.borderColor}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.songTime}>0:30</Text>
      </View>
    </View>
  );
};

export default PostFooter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "5%",
  },
  highContainer: {
    marginVertical: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaContainer: {
    gap: 10,
    width: "70%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressbar: {
    marginVertical: "5%",
    backgroundColor: Colors.borderColor,
    opacity: 0.8,
    borderRadius: 100,
    width: "100%",
    height: "2%",
  },
  controller: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  songTime: {
    color: Colors.borderColor,
    top: 0,
    fontSize: 10,
  },
});
