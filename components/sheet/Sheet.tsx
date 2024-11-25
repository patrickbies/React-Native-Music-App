import React, { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, View, Modal } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

type SheetProps = {
  blur: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  base_height: number;
  orientation: "top" | "bottom";
  children: React.ReactNode;
};

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

const Sheet = ({
  blur = false,
  setOpen,
  open,
  base_height,
  children,
  orientation = "bottom",
}: SheetProps) => {
  const initialHeight = base_height * screenHeight;

  const height = useSharedValue(0);
  const prevHeight = useSharedValue(initialHeight);

  const animatedStyles = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const close = () => {
    height.value = withTiming(0, { easing: Easing.out(Easing.quad) }, () => {
      runOnJS(setOpen)(false);
    });
  };

  const pan = Gesture.Pan()
    .minDistance(1)
    .onUpdate((e) => {
      const newHeight =
        orientation === "bottom"
          ? Math.max(
              0,
              Math.min(prevHeight.value - e.translationY, initialHeight)
            )
          : Math.max(
              0,
              Math.min(prevHeight.value + e.translationY, initialHeight)
            );
      height.value = newHeight;
    })
    .onEnd((e) => {
      const velocityCheck =
        orientation === "bottom" ? e.velocityY < 1000 : e.velocityY > -1000;

      if (velocityCheck) {
        height.value = withTiming(initialHeight, {
          easing: Easing.out(Easing.quad),
        });
      } else {
        close();
      }
    })
    .runOnJS(true);

  useEffect(() => {
    if (open) {
      height.value = withTiming(initialHeight, {
        easing: Easing.out(Easing.quad),
      });
    }
  }, [open]);

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={close}
    >
      <View style={styles.fullScreen} >
        <GestureHandlerRootView>
          <Pressable onPress={close} style={styles.fullScreen} />
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[
                styles.container,
                animatedStyles,
                orientation === "top" ? styles.top : styles.bottom,
              ]}
            >
              {children}
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
};

export default Sheet;

const styles = StyleSheet.create({
  fullScreen: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#eee",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.1,
    overflow: "hidden",
  },
  bottom: {
    bottom: 0,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  top: {
    top: 0,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
});
