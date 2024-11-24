import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
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
import ProgressBar from "./ProgressBar";
import Sheet from "../sheet/Sheet";

type PostFooter = {
  duration: number;
  time: number;
  paused: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  liked: boolean;
  saved: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
};

const PostFooter = ({
  duration,
  time,
  paused,
  hasPrev,
  hasNext,
  liked,
  saved,
  setLiked,
  setPaused,
  setSaved,
  setTime,
}: PostFooter) => {
  const [shareOpen, setShareOpen] = useState(false);

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
          <TouchableOpacity
            onPress={() => {
              setLiked(!liked);
              Haptics.selectionAsync();
            }}
          >
            <Heart
              weight="fill"
              size={34}
              color={liked ? Colors.red : Colors.selected}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSaved(!saved);
              Haptics.selectionAsync();
            }}
          >
            <BookmarkSimple
              weight="fill"
              size={34}
              color={saved ? Colors.yellow : Colors.selected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShareOpen(true)}>
            <ShareFat weight="fill" size={34} color={Colors.selected} />
          </TouchableOpacity>
        </View>
      </View>
      <ProgressBar
        setPaused={setPaused}
        paused={paused}
        duration={duration}
        setTime={setTime}
        time={time}
      />
      <View style={[styles.controller, { alignSelf: "center", width: "55%" }]}>
        <TouchableOpacity>
          <Rewind
            size={35}
            weight="fill"
            color={hasPrev ? Colors.selected : Colors.borderColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPaused(!paused)}>
          {paused ? (
            <Play size={40} weight="fill" color={Colors.selected} />
          ) : (
            <Pause size={40} weight="fill" color={Colors.selected}/>
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <FastForward
            size={35}
            weight="fill"
            color={hasNext ? Colors.selected : Colors.borderColor}
          />
        </TouchableOpacity>
      </View>
      <Sheet
        base_height={0.3}
        open={shareOpen}
        orientation="bottom"
        setOpen={setShareOpen}
      >
        <Text>Share</Text>
      </Sheet>
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
  controller: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
