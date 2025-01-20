import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

type TabBarIconProps = {
  name: "home" | "bookmark" | "search" | "star";
  color: string;
  focused?: boolean;
  index: number;
  activeIndex: number;
};

const SPRING_CONFIG = {
  damping: 10,
  stiffness: 100,
  mass: 1,
};

export function TabBarIcon({
  name,
  color,
  focused,
  index,
  activeIndex,
}: TabBarIconProps) {
  const animatedContainerStyle = useAnimatedStyle(() => {
    const isActive = index === activeIndex;

    const scale = withSpring(isActive ? 1.2 : 1, SPRING_CONFIG);

    const translateX = withSpring(
      isActive ? 0 : (index - activeIndex) * 8,
      SPRING_CONFIG
    );

    const backgroundColor = withTiming(isActive ? "#FF4196" : "transparent", {
      duration: 200,
    });

    return {
      transform: [{ scale }, { translateX }],
      backgroundColor,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const isActive = index === activeIndex;

    return {
      color: withTiming(isActive ? "#FFF" : "#000000", { duration: 200 }),
    };
  });

  const AnimatedFeather = Animated.createAnimatedComponent(Feather);

  return (
    <Animated.View
      style={[
        {
          padding: 10,
          borderRadius: 999,
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        },
        animatedContainerStyle,
      ]}
    >
      <AnimatedFeather name={name} size={20} style={animatedIconStyle} />
    </Animated.View>
  );
}
