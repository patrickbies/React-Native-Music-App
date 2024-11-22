import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  StyleProp,
  TextStyle,
  ScrollView,
  Text,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type ScrollTextProps = {
  text: string;
  style: StyleProp<TextStyle>;
};

const ScrollText = ({ text, style }: ScrollTextProps) => {
  const [contentWidth, setContentWidth] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const scrollPosition = useSharedValue(0);

  useEffect(() => {
    const translateAmt = contentWidth - viewWidth;

    if (translateAmt > 0) {
      scrollPosition.value = withRepeat(
        withTiming(-translateAmt, {
          duration: 5000,
        }),
        -1,
        true
      );
    } else scrollPosition.value = 0;
  }, [contentWidth, scrollPosition, text]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: scrollPosition.value}]
  }))

  return (
    <ScrollView
      onLayout={(e) => setViewWidth(e.nativeEvent.layout.width)}
      horizontal
      onContentSizeChange={(width) => setContentWidth(width)}
      scrollEnabled={false}
    >
      <Animated.Text style={[animatedStyle, style]}>{text}</Animated.Text>
    </ScrollView>
  );
};

export default ScrollText;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
