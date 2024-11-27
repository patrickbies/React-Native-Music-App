import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import PostFooter from "./PostFooter";
import { Colors } from "@/constants/Colors";
import Animated from "react-native-reanimated";
import { Image } from "expo-image";

type posts =
  | {
      _id: Id<"posts">;
      _creationTime: number;
      createdAt: number;
      userId: Id<"users">;
      gifBackground: boolean;
      name: string;
      mediaUrl: string;
      shares: number;
      saves: number;
      likes: number;
      mediaId: string;
    }[]
  | undefined;

type PostPage = {
  posts: posts;
  index: number;
  vis: boolean;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const PostPage = ({
  posts,
  index,
  setIndex,
  vis,
}: PostPage) => {
  if (!posts || !vis) return null;

  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [time, setTime] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        style={{ height: screenHeight * 0.2 }}
        renderItem={({item}) => (
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={item.mediaUrl} />
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
        time={time}
        setTime={setTime}
        duration={30}
        paused={paused}
        setPaused={setPaused}
        hasPrev={!!index}
        hasNext={index < posts.length - 1}
        liked={liked}
        saved={saved}
        setLiked={setLiked}
        setSaved={setSaved}
      />
    </View>
  );
};

export default PostPage;

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
