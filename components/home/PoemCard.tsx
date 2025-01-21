import { View, Text, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { FullPoem, Poem } from "@/types/poem";
import { useBookmarks } from "@/hooks/useBookmark";

type PoemCardProps = {
  poem: FullPoem;
};

export function PoemCard({ poem }: PoemCardProps) {
  const router = useRouter();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();

  const isPoemBookmarked = isBookmarked(poem.title, poem.author);

  const handleBookmarkPress = () => {
    if (isPoemBookmarked) {
      removeBookmark(poem.title, poem.author);
    } else {
      addBookmark(poem);
    }
  };

  return (
    <View className="bg-[#FFF9FB] rounded-xl px-6 py-5 mb-4">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-xl font-semibold text-gray-900 flex-1 mr-4">
          {poem.title}
        </Text>
        <Pressable onPress={handleBookmarkPress} hitSlop={8} className="p-2">
          <Feather
            name={isPoemBookmarked ? "check-circle" : "bookmark"}
            size={20}
            color={isPoemBookmarked ? "#FF4196" : "#666"}
          />
        </Pressable>
      </View>

      <Text className="text-[#8F0C3B] mb-3 underline">{poem.author}</Text>

      <View className="mb-3">
        <Text numberOfLines={4} className="text-gray-700 leading-6">
          {poem.lines.slice(0, 4).join("\n\n")}
        </Text>
      </View>

      <Pressable
        onPress={() =>
          router.push({
            pathname: "/poem/[id]",
            params: {
              id: encodeURIComponent(poem.title),
              poemData: JSON.stringify(poem),
            },
          })
        }
        className="flex-row items-center self-end"
      >
        <Text className="text-pink-500 font-medium mr-1">Read more</Text>
        <Feather name="chevron-right" size={16} color="#FF4196" />
      </Pressable>
    </View>
  );
}
