import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { usePoems } from "@/hooks/usePoems";
import { PoemList } from "@/components/PoemList";

const Home = () => {
  const { poems, loading, error, fetchRandomPoems } = usePoems();

  useEffect(() => {
    fetchRandomPoems(5);
  }, []);

  return (
    <View>
      <PoemList
        poems={poems}
        loading={loading}
        error={error ? error.message : null}
      />
    </View>
  );
};

export default Home;
