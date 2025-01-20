import { View, Text } from "react-native";
import { PoemList } from "@/components/home/PoemList";
import { FullPoem, Poem } from "@/types/poem";
import { ActivityIndicator } from "react-native";

type SearchResultsProps = {
  poems: FullPoem[];
  loading: boolean;
  error: Error | null;
  onRefresh: () => void;
  refreshing: boolean;
  searchQuery: string;
  selectedAuthor: string | null;
};

export function SearchResults({
  poems,
  loading,
  error,
  onRefresh,
  refreshing,
  searchQuery,
  selectedAuthor,
}: SearchResultsProps) {
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#FF4196" />
      </View>
    );
  }

  if (!searchQuery && !selectedAuthor) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-500 text-center mb-2">
          Search for poems by title or select an author
        </Text>
        <Text className="text-gray-400 text-sm text-center">
          Try searching for a specific title or browse poems by your favorite
          author
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-center mb-2">{error.message}</Text>
        <Text className="text-gray-500 text-center">Pull to try again</Text>
      </View>
    );
  }

  if (poems.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-500 text-center mb-2">No poems found</Text>
        <Text className="text-gray-400 text-sm text-center">
          {selectedAuthor
            ? `No poems found for ${selectedAuthor}`
            : "Try adjusting your search"}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="px-4 py-2">
        <Text className="text-gray-500 text-sm">
          {selectedAuthor
            ? searchQuery
              ? `Searching "${searchQuery}" in ${selectedAuthor}'s poems`
              : `All poems by ${selectedAuthor}`
            : `Results for "${searchQuery}"`}
        </Text>
      </View>
      <PoemList
        poems={poems}
        loading={loading}
        error={error}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}
