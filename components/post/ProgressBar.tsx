import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const ProgressBar = () => {
  const {width : screenWidth} = Dimensions.get('screen')
  const [totalWidth, setTotalWidth] = useState(0);
  const barWidth = useSharedValue(0);

  const left = 

  const gesturePan = Gesture.Pan()
    .minDistance(1)
    .onChange((e) => {
      barWidth.value = e.absoluteX;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    width: barWidth.value
  }));

  return (
    <GestureHandlerRootView
      style={{ width: "100%", height: "10%"}}
      onLayout={e => setTotalWidth(e.nativeEvent.layout.width)}
    >
      <GestureDetector gesture={gesturePan}>
        <View style={{width: '100%', height: '100%'}}>
        <View style={styles.progressbar}>
          <Animated.View style={[animatedStyles, styles.innerBar]} />
        </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressbar: {
    width: "100%",
    height: "20%",
    backgroundColor: Colors.borderColor,
    opacity: 0.8,
    borderRadius: 100,
  },
  innerBar: {
    height: '100%',
    backgroundColor: 'white'
  },
});
