import { useState, useCallback, useMemo } from "react";
import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { FlashList } from "@shopify/flash-list";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";

type AuthorSelectProps = {
  authors: string[];
  selectedAuthor: string | null;
  onSelectAuthor: (author: string | null) => void;
};

export function AuthorSelect({
  authors,
  selectedAuthor,
  onSelectAuthor,
}: AuthorSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery("");
    }
  };

  const handleSelect = (author: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelectAuthor(author);
    setIsOpen(false);
    setSearchQuery("");
  };

  const filteredAuthors = useMemo(() => {
    if (!searchQuery.trim()) return authors;
    return authors.filter((author) =>
      author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [authors, searchQuery]);

  const renderAuthorItem = useCallback(
    ({ item }: { item: string }) => (
      <Pressable
        onPress={() => handleSelect(item)}
        className={`px-4 py-3 ${selectedAuthor === item ? "bg-pink-50" : ""}`}
      >
        <Text
          className={`${
            selectedAuthor === item ? "text-pink-500" : "text-gray-900"
          }`}
          numberOfLines={1}
        >
          {item}
        </Text>
      </Pressable>
    ),
    [selectedAuthor]
  );

  return (
    <View className="z-50">
      <Pressable
        onPress={toggleDropdown}
        className="flex-row items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100"
      >
        <Text className="text-gray-900 text-base flex-1 mr-2" numberOfLines={1}>
          {selectedAuthor || "Select Author"}
        </Text>
        <Feather
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#666"
        />
      </Pressable>

      {isOpen && (
        <Animated.View
          entering={SlideInDown.duration(200)}
          exiting={SlideOutDown.duration(200)}
          className="absolute top-16 left-0 right-0 bg-gray-100 rounded-xl shadow-lg z-50 border border-gray-100"
          style={{ height: 400 }}
        >
          <View className="p-3 border-b border-gray-100">
            <View className="flex-row items-center bg-gray-50 rounded-lg px-3">
              <Feather name="search" size={16} color="#666" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search authors..."
                className="flex-1 py-2 px-2 text-base text-gray-900"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery("")}>
                  <Feather name="x" size={16} color="#666" />
                </Pressable>
              )}
            </View>
          </View>

          <Pressable
            onPress={() => {
              onSelectAuthor(null);
              setIsOpen(false);
              setSearchQuery("");
            }}
            className="px-4 py-3 border-b border-gray-100"
          >
            <Text className="text-gray-900">All Authors</Text>
          </Pressable>

          <FlashList
            data={filteredAuthors}
            renderItem={renderAuthorItem}
            keyExtractor={(item) => item}
            className="max-h-80"
            keyboardShouldPersistTaps="handled"
            estimatedItemSize={48}
            ListEmptyComponent={() => (
              <View className="py-4">
                <Text className="text-gray-500 text-center">
                  No authors found
                </Text>
              </View>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
}
