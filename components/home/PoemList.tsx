import { View, FlatList, Text, RefreshControl } from "react-native";
import { FullPoem, Poem } from "@/types/poem";
import { PoemCard } from "./PoemCard";
import { PoemSkeleton } from "./PoemSkeleton";

type PoemListProps = {
  poems: FullPoem[];
  loading?: boolean;
  error?: Error | null;
  onRefresh?: () => void;
  refreshing?: boolean;
};

export function PoemList({
  poems,
  loading,
  error,
  onRefresh,
  refreshing = false,
}: PoemListProps) {
  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-center mb-2">{error.message}</Text>
        <Text className="text-gray-600 text-center">
          Pull down to try again
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <PoemSkeleton />}
        contentContainerStyle={{ padding: 16 }}
      />
    );
  }

  if (poems.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-600 text-center">No poems found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={poems}
      keyExtractor={(item) => `${item.title}-${item.author}`}
      renderItem={({ item }) => <PoemCard poem={item} />}
      contentContainerStyle={{ padding: 16 }}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF4196"
            colors={["#FF4196"]}
          />
        ) : undefined
      }
    />
  );
}
