import { View, Text, Image, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { usePoems } from "@/hooks/usePoems";
import { PoemList } from "@/components/home/PoemList";
import { logo } from "@/constants/image";
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
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-8 py-2 flex-row items-center justify-between">
        <Image source={logo} className="w-5 h-5" resizeMode="contain" />
        <Text className="text-sm font-medium">Poet of the Day</Text>
      </View>
      <PoemList
        poems={poems}
        loading={loading}
        error={error}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

export default Home;
