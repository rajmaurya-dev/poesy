import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  withDelay,
} from "react-native-reanimated";
import { useEffect } from "react";

export function PoemSkeleton() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="bg-[#FFF9FB] rounded-xl p-4 mb-4 ">
      <Animated.View
        className="h-7 bg-white rounded-md w-3/4 mb-2"
        style={animatedStyle}
      />
      <Animated.View
        className="h-5 bg-white rounded-md w-1/2 mb-4"
        style={animatedStyle}
      />
      <Animated.View
        className="h-4 bg-white rounded-md w-full mb-2"
        style={animatedStyle}
      />
      <Animated.View
        className="h-4 bg-white rounded-md w-5/6"
        style={animatedStyle}
      />
    </View>
  );
}
