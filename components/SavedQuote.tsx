import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

const AnimatedView = Animated.createAnimatedComponent(View);

interface SavedQuote {
  id: string;
  title: string;
  lines: string[];
  sourcePoem?: string;
  sourceAuthor?: string;
  createdAt: number;
}

const STORAGE_KEY = "@poetry_quotes";

const SavedQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const quotesString = await AsyncStorage.getItem(STORAGE_KEY);
      if (quotesString) {
        const parsedQuotes = JSON.parse(quotesString);
        setQuotes(
          parsedQuotes.sort(
            (a: SavedQuote, b: SavedQuote) => b.createdAt - a.createdAt
          )
        );
      }
    } catch (error) {
      console.error("Error loading quotes:", error);
      Alert.alert("Error", "Failed to load saved quotes");
    }
  };

  const deleteQuote = async (id: string) => {
    try {
      const updatedQuotes = quotes.filter((quote) => quote.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuotes));
      setQuotes(updatedQuotes);
    } catch (error) {
      console.error("Error deleting quote:", error);
      Alert.alert("Error", "Failed to delete quote");
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  if (quotes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-gray-500 text-lg text-center">
          No saved quotes yet. Create some by selecting your favorite lines from
          poems!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4 min-h-svh">
      {quotes.map((quote) => (
        <AnimatedView
          key={quote.id}
          entering={FadeIn}
          exiting={FadeOut}
          layout={Layout.springify()}
          className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden border border-gray-100"
        >
          <View className="p-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold text-gray-900">
                {quote.title}
              </Text>
              <TouchableOpacity
                onPress={() => deleteQuote(quote.id)}
                hitSlop={8}
              >
                <Feather name="trash-2" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View className="mb-3">
              {quote.lines.map((line, index) => (
                <Text
                  key={index}
                  className="text-gray-800 text-base leading-relaxed"
                >
                  {line}
                </Text>
              ))}
            </View>

            <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
              <Text className="text-sm text-gray-500">
                From: {quote.sourcePoem} by {quote.sourceAuthor}
              </Text>
              <Text className="text-sm text-gray-400">
                {formatDate(quote.createdAt)}
              </Text>
            </View>
          </View>
        </AnimatedView>
      ))}
    </ScrollView>
  );
};

export default SavedQuotes;
