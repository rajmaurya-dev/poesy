import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  useSharedValue,
  FadeIn,
  SlideInDown,
  SlideInLeft,
  FadeOutLeft,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

interface Poem {
  title?: string;
  author?: string;
  lines: string[];
  linecount: string;
}

interface PoetryDisplayProps {
  poem: Poem;
  customStyles?: {
    container?: ViewStyle;
    title?: TextStyle;
    author?: TextStyle;
    lineText?: TextStyle;
  };
}

interface LineItem {
  id: string;
  content: string;
  index: number;
}

const LineRenderer = React.memo(({ item }: { item: LineItem }) => {
  if (!item.content.trim()) {
    return <View className="h-5" />;
  }

  return (
    <AnimatedView entering={FadeIn.duration(300)} className="w-full">
      <Text className="text-lg text-gray-800 mb-2 px-6" selectable={true}>
        {item.content || "\u200B"}
      </Text>
    </AnimatedView>
  );
});

const PoetryDisplay: React.FC<PoetryDisplayProps> = ({
  poem,
  customStyles,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const data = React.useMemo(
    () =>
      poem.lines.map((line, index) => ({
        id: `${index}`,
        content: line,
        index,
      })),
    [poem.lines]
  );

  const renderItem = useCallback(
    ({ item }: { item: LineItem }) => <LineRenderer item={item} />,
    []
  );

  const keyExtractor = useCallback((item: LineItem) => item.id, []);

  const ListHeaderComponent = useCallback(
    () => (
      <View className="px-6">
        {poem.title && (
          <AnimatedText
            className="text-2xl font-bold text-gray-900 mb-3 text-center"
            entering={FadeIn.duration(500)}
          >
            {poem.title}
          </AnimatedText>
        )}

        {poem.author && (
          <AnimatedText
            className="text-lg text-gray-600 mb-6 text-center italic"
            entering={FadeIn.duration(500).delay(100)}
          >
            {poem.author}
          </AnimatedText>
        )}
      </View>
    ),
    [poem.title, poem.author]
  );

  const estimatedItemSize = 30;

  // const renderLine = (line: string, index: number) => {
  //   if (!line.trim()) {
  //     return <View key={`empty-${index}`} className="h-5" />;
  //   }

  //   const indentation = line.match(/^\s*/)?.[0].length || 0;
  //   const trimmedLine = line.trim();

  //   return (
  //     <AnimatedView
  //       key={`line-${index}`}
  //       // entering={FadeIn.delay(index * 50).springify()}
  //       className="w-full"
  //       // style={{ marginLeft: indentation * 8 }}
  //     >
  //       <Text className="text-lg text-gray-800 mb-2" selectable={true}>
  //         {trimmedLine || "\u200B"}
  //       </Text>
  //     </AnimatedView>
  //   );
  // };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24 }}
      >
        <AnimatedView className="flex-1" style={animatedStyle}>
          <FlashList
            data={data}
            renderItem={renderItem}
            estimatedItemSize={estimatedItemSize}
            keyExtractor={keyExtractor}
            ListHeaderComponent={ListHeaderComponent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        </AnimatedView>
      </ScrollView>
    </View>
  );
};

export default PoetryDisplay;
