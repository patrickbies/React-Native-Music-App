import {
  Dimensions,
  FlatList,
  LayoutRectangle,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import { api } from "@/convex/_generated/api";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import Animated, {
  measure,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { Id } from "@/convex/_generated/dataModel";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import PostPage from "../post/PostPage";

type ProfilePage = {
  userData: typeof api.tasks.queryUser._returnType;
};

type post = {
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

const { width: sw, height: sh } = Dimensions.get("screen");
const animateDuration = 500;

const ProfilePage = ({ userData }: ProfilePage) => {
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
      console.log(dim.value);

      dim.value = withTiming(
        { x: 0, y: 0, width: sw, height: sh },
        { duration: animateDuration }
      );
    });
  };

  const handleClose = () => {
    let fromSize = {
      x: 0, y: 0, width: 0, height: 0
    }
    if(userData)
    refs.current[userData.userPosts[index]._id].measureInWindow((x, y, width, height) => {
      fromSize = {x: x, y: y, width: width, height: height}
    })

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

  const renderItem = (item: post, index: number) => (
    <TouchableOpacity
      ref={(ref) => {
        if (ref) refs.current[item._id] = ref;
      }}
      style={styles.preview}
      onPress={() => handlePress(item, index)}
    >
      <Image source={item.mediaUrl} style={styles.image} />
      <Text style={defaultStyles.pTextM}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={userData?.userPosts}
        renderItem={({ item, index }) => renderItem(item, index)}
        style={styles.container}
        numColumns={2}
        onLayout={(e) => {}}
        ListHeaderComponent={() => (
          <>
            <ProfileHeader metadata={userData?.metadata} />
            <ProfileTabs />
          </>
        )}
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
                { backgroundColor: "red", position: "absolute" },
                animatedScreen,
              ]}
            >
              <PostPage
                index={index}
                posts={userData?.userPosts}
                vis={modalVisible}
                setIndex={setIndex}
              />
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Modal>
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
