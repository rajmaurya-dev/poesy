import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import SavedQuotes from "@/components/SavedQuote";

const Quotes = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-6">
        <View className="mb-4">
          <Text className="text-3xl font-semibold text-gray-900">
            Saved Quotes
          </Text>
        </View>
        <SavedQuotes />
      </View>
    </SafeAreaView>
  );
};

export default Quotes;
