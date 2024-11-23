import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

type ProgressBar = {
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  paused: boolean;
  time: number;
};

const ProgressBar = ({ setPaused, duration, setTime, time }: ProgressBar) => {
  const [totalWidth, setTotalWidth] = useState(0);
  const barWidth = useSharedValue(0);

  const gesturePan = Gesture.Pan()
    .minDistance(1)
    .onChange((e) => {
      const percent = Math.max(
        0,
        Math.min(e.absoluteX, totalWidth)
      ) / totalWidth;

      const time = Math.round(duration * barWidth.value);
      runOnJS(setTime)(time);
      barWidth.value = Math.max(0, Math.min(1, percent));
    })
    .onEnd(() => {
      const time = Math.round(duration * barWidth.value);
      barWidth.value = time / duration;

      runOnJS(setTime)(time);
    });

  const animatedStyles = useAnimatedStyle(() => ({
    width: barWidth.value * totalWidth,
  }));

  return (
    <GestureHandlerRootView
      style={{ width: "100%", height: "15%"}}
      onLayout={(e) => setTotalWidth(e.nativeEvent.layout.width)}
    >
      <GestureDetector gesture={gesturePan}>
        <View style={{ width: "100%", height: "100%", justifyContent: 'center' }}>
          <View style={styles.progressbar}>
            <Animated.View style={[animatedStyles, styles.innerBar]} />
          </View>
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.songTime}>{"0:" +
            Math.floor(time / 10).toString() +
            Math.floor(time % 10).toString()}</Text>
                    <Text style={styles.songTime}>
          {"0:" +
            Math.floor(duration / 10).toString() +
            Math.floor(duration % 10).toString()}
        </Text>
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
    height: "10%",
    backgroundColor: Colors.borderColor,
    opacity: 0.8,
    borderRadius: 100,
    overflow: 'hidden'
  },
  innerBar: {
    height: "100%",
    backgroundColor: "white",
  },
  songTime: {
    color: Colors.borderColor,
    marginTop: '1%',
    fontSize: 10,
  },
});
