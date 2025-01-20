import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { FullPoem, Poem } from "@/types/poem";

interface PoemListProps {
  poems: FullPoem[];
  loading: boolean;
  error: string | null;
}

export const PoemList = ({ poems, loading, error }: PoemListProps) => {
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text className="text-red-500">{error}</Text>;
  }

  return (
    <FlatList
      data={poems}
      keyExtractor={(item) => item.title.toString()}
      renderItem={({ item }) => (
        <View className="p-4 mb-4 bg-white rounded-lg shadow">
          <Text className="text-xl font-bold mb-2">{item.title}</Text>
          <Text className="text-gray-600 mb-1">{item.author}</Text>
          <Text>{item.lines}</Text>
        </View>
      )}
    />
  );
};
