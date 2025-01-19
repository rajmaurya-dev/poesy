import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { usePoems } from "@/hooks/usePoems";
import { PoemList } from "@/components/home/PoemList";
import { icon } from "@/constants/image";
const Home = () => {
  const { poems, loading, error, fetchRandomPoems } = usePoems();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRandomPoems(10);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchRandomPoems(5);
  }, []);

  return (
    <View>
      <View className="px-8 py-2">
        <Text className="text-sm font-medium">Poet of the Day</Text>
      </View>
      <PoemList
        poems={poems}
        loading={loading}
        error={error}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

export default Home;
