import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import PostFooter from "@/components/post/PostFooter";

const DATA = [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }];

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const Feed = () => {
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        style={{ height: screenHeight * 0.2 }}
        renderItem={() => (
          <View style={styles.imageContainer}>
            <View style={styles.image} />
          </View>
        )}
        viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
        onViewableItemsChanged={(e) =>
          e.viewableItems[0] && setIndex(e.viewableItems[0].index!)
        }
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
      />
      <PostFooter
        paused={paused}
        setPaused={setPaused}
        hasPrev={!!index}
        hasNext={index < DATA.length - 1}
        liked={liked}
        saved={saved}
        setLiked={setLiked}
        setSaved={setSaved}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  imageContainer: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    aspectRatio: 1,
    backgroundColor: "#333",
    borderRadius: 10,
  },
});
