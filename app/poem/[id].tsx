import { View, Text, ScrollView, Pressable, SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePoems } from "@/hooks/usePoems";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useBookmarks } from "@/hooks/useBookmark";
import PoetryDisplay from "@/components/PoetryDisplay";
import PoetrySelector from "@/components/PoetrySelector";

export default function Poem() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { poems, loading, error, searchPoems } = usePoems();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [isSelectingLines, setIsSelectingLines] = useState(false);

  useEffect(() => {
    if (id) {
      searchPoems("title", decodeURIComponent(id as string));
    }
  }, [id]);

  const poem = poems[0];

  if (loading) {
    return (
      <SafeAreaView>
        <View className="flex-1 bg-white p-6">
          <View className="h-8 bg-gray-200 rounded-md w-3/4 mb-4" />
          <View className="h-6 bg-gray-200 rounded-md w-1/2 mb-6" />
          <View className="h-4 bg-gray-200 rounded-md w-full mb-3" />
          <View className="h-4 bg-gray-200 rounded-md w-5/6 mb-3" />
          <View className="h-4 bg-gray-200 rounded-md w-4/5 mb-3" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-center">{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!poem) {
    return (
      <SafeAreaView>
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-gray-600 text-center">Poem not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isPoemBookmarked = isBookmarked(poem.title, poem.author);

  const handleBookmarkPress = () => {
    if (isPoemBookmarked) {
      removeBookmark(poem.title, poem.author);
    } else {
      addBookmark(poem);
    }
  };

  console.log(poem.linecount, "poem.linecount");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-2">
          <Feather name="arrow-left" size={24} color="#666" />
        </Pressable>
        <View className="flex-row gap-4">
          <Pressable
            onPress={() => setIsSelectingLines(!isSelectingLines)}
            hitSlop={8}
            className="p-2"
          >
            <Feather
              name={isSelectingLines ? "check" : "edit"}
              size={24}
              color="#666"
            />
          </Pressable>
          <Pressable onPress={handleBookmarkPress} hitSlop={8} className="p-2">
            <Feather
              name={isPoemBookmarked ? "check-circle" : "bookmark"}
              size={24}
              color={isPoemBookmarked ? "#FF4196" : "#666"}
            />
          </Pressable>
        </View>
      </View>

      {isSelectingLines ? (
        <PoetrySelector
          poem={poem}
          onClose={() => setIsSelectingLines(false)}
        />
      ) : (
        <PoetryDisplay poem={poem} />
      )}
    </SafeAreaView>
  );
}


