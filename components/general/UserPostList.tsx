import {
  Dimensions,
  LayoutRectangle,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Id } from "@/convex/_generated/dataModel";
import {
  FlatList,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Image } from "expo-image";
import { defaultStyles } from "@/constants/Styles";
import { Href, router } from "expo-router";
import { Colors } from "@/constants/Colors";
import PostPage from "../post/PostPage";

type post = {
  isPost: boolean;
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
};

type user = {
  isPost: boolean;
  _id: Id<"users">;
  _creationTime: number;
  profilePictureUrl?: string | undefined;
  profilePictureId?: string | undefined;
  createdAt: number;
  username: string;
  displayName: string;
  email: string;
  clerkId: string;
};

type combination = post | user;

type ProfilePage = {
  posts: combination[];
  listHeader: React.ReactNode;
};

const { width: sw, height: sh } = Dimensions.get("screen");
const animateDuration = 500;

const UserPostList = ({ posts, listHeader }: ProfilePage) => {
  const refs = useRef<Record<Id<"posts">, View>>({});
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const dim = useSharedValue<LayoutRectangle>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const handlePress = (item: post, index: number) => {
    setIndex(index);

    refs.current[item._id].measureInWindow((x, y, width, height) => {
      dim.value = {
        x: x,
        y: y,
        width: width,
        height: height,
      };
      setModalVisible(true);

      dim.value = withTiming(
        { x: 0, y: 0, width: sw, height: sh },
        { duration: animateDuration }
      );
    });
  };

  const handleClose = () => {
    let fromSize = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    refs.current[posts[index]._id as Id<"posts">].measureInWindow(
      (x, y, width, height) => {
        fromSize = { x: x, y: y, width: width, height: height };
      }
    );

    dim.value = withTiming(
      {
        x: fromSize.x,
        y: fromSize.y,
        width: fromSize.width,
        height: fromSize.height,
      },
      { duration: animateDuration },
      () => runOnJS(setModalVisible)(false)
    );
  };

  const animatedScreen = useAnimatedStyle(() => ({
    width: dim.value.width,
    height: dim.value.height,
    top: dim.value.y,
    left: dim.value.x,
  }));

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart((e) => {
      if (e.translationY < e.translationX) return;
    })
    .onChange((e) => {
      dim.value = {
        x: e.translationX,
        y: e.translationY,
        width: dim.value.width,
        height: dim.value.height,
      };
    })
    .onEnd((e) => {
      const dist =
        e.translationX * e.translationX + e.translationY * e.translationY;
      const vel = e.velocityX * e.velocityX + e.velocityY * e.velocityY;
      if (dist > 1000 * 100 || vel > 1000 * 1000) {
        runOnJS(handleClose)();
        return;
      }

      dim.value = withTiming({
        x: 0,
        y: 0,
        width: dim.value.width,
        height: dim.value.height,
      });
    });

  const renderItem = (item: post | user, index: number) => {
    if (item.isPost)
      return (
        <TouchableOpacity
          ref={(ref) => {
            if (ref) refs.current[item._id as Id<"posts">] = ref;
          }}
          style={styles.preview}
          onPress={() => handlePress(item as post, index)}
        >
          <Image source={(item as post).mediaUrl} style={styles.image} />
          <Text style={defaultStyles.pTextM}>{(item as post).name}</Text>
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity
        onPress={() => {
          router.navigate(`/(pages)/(profile)/${(item as user).clerkId}` as Href);
        }}
        style={{
          width: "45%",
          marginTop: "3.33%",
          marginLeft: "3.33%",
        }}
      >
        <View
          style={{
            width: '100%',
            aspectRatio: 1,
            borderRadius: 100,
            backgroundColor: Colors.lightBg,
          }}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={defaultStyles.usernameText}>{(item as user).displayName}</Text>
          <Text
            style={[defaultStyles.usernameText, { color: Colors.borderColor }]}
          >
            @{(item as user).username}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => renderItem(item, index)}
        style={styles.container}
        numColumns={2}
        onLayout={(e) => {}}
        ListHeaderComponent={() => listHeader}
      />
      {/* Make the animation to fullscreen here: */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none" // Disable default animations
        onRequestClose={() => handleClose()}
      >
        <GestureHandlerRootView>
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[
                { position: "absolute", borderRadius: 20, overflow: "hidden" },
                animatedScreen,
              ]}
            >
              <PostPage
                index={0}
                posts={[posts[index] as post]}
                vis={modalVisible}
                setIndex={() => {}}
              />
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
};

export default UserPostList;

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
