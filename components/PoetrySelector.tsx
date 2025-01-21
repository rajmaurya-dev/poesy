import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface Poem {
  title?: string;
  author?: string;
  lines: string[];
}

interface SavedQuote {
  id: string;
  title: string;
  lines: string[];
  sourcePoem?: string;
  sourceAuthor?: string;
  createdAt: number;
}

interface PoetrySelectorProps {
  poem: Poem;
  onClose?: () => void;
}

const STORAGE_KEY = "@poetry_quotes";

const PoetrySelector: React.FC<PoetrySelectorProps> = ({ poem, onClose }) => {
  const [selectedLines, setSelectedLines] = useState<Set<number>>(new Set());
  const [quoteTitle, setQuoteTitle] = useState("");
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [isCreatingQuote, setIsCreatingQuote] = useState(false);

  useEffect(() => {
    loadSavedQuotes();
  }, []);

  const loadSavedQuotes = async () => {
    try {
      const quotesString = await AsyncStorage.getItem(STORAGE_KEY);
      if (quotesString) {
        setSavedQuotes(JSON.parse(quotesString));
      }
    } catch (error) {
      console.error("Error loading quotes:", error);
    }
  };

  const toggleLineSelection = (index: number) => {
    const newSelection = new Set(selectedLines);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      newSelection.add(index);
    }
    setSelectedLines(newSelection);
  };

  const saveQuote = async () => {
    if (selectedLines.size === 0) {
      Alert.alert("Error", "Please select at least one line");
      return;
    }

    if (!quoteTitle.trim()) {
      Alert.alert("Error", "Please enter a title for your quote");
      return;
    }

    try {
      const selectedLinesList = Array.from(selectedLines)
        .sort((a, b) => a - b)
        .map((index) => poem.lines[index]);

      const newQuote: SavedQuote = {
        id: Date.now().toString(),
        title: quoteTitle.trim(),
        lines: selectedLinesList,
        sourcePoem: poem.title,
        sourceAuthor: poem.author,
        createdAt: Date.now(),
      };

      const updatedQuotes = [...savedQuotes, newQuote];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuotes));
      setSavedQuotes(updatedQuotes);

      setSelectedLines(new Set());
      setQuoteTitle("");
      setIsCreatingQuote(false);

      Alert.alert("Success", "Quote saved successfully!");
    } catch (error) {
      console.error("Error saving quote:", error);
      Alert.alert("Error", "Failed to save quote");
    }
  };

  const deleteQuote = async (id: string) => {
    try {
      const updatedQuotes = savedQuotes.filter((quote) => quote.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuotes));
      setSavedQuotes(updatedQuotes);
    } catch (error) {
      console.error("Error deleting quote:", error);
      Alert.alert("Error", "Failed to delete quote");
    }
  };

  const renderQuoteCreator = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      className="flex-1"
    >
      <Animated.View
        className="bg-white rounded-t-3xl shadow-lg"
        entering={SlideInRight}
        exiting={SlideOutLeft}
      >
        <View className="p-6">
          <Text className="text-xl font-semibold mb-4">Create New Quote</Text>
          <TextInput
            className="border border-gray-200 rounded-lg p-3 mb-4"
            placeholder="Enter quote title..."
            value={quoteTitle}
            onChangeText={setQuoteTitle}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          <ScrollView className="max-h-32 mb-4">
            <Text className="text-gray-600 mb-2">Selected Lines:</Text>
            {Array.from(selectedLines)
              .sort((a, b) => a - b)
              .map((index) => (
                <Text key={index} className="text-gray-800 mb-1">
                  • {poem.lines[index]}
                </Text>
              ))}
          </ScrollView>
          <View className="flex-row gap-4">
            <TouchableOpacity
              className="flex-1 bg-gray-100 rounded-lg p-3 items-center"
              onPress={() => {
                setIsCreatingQuote(false);
                Keyboard.dismiss();
              }}
            >
              <Text className="text-gray-600">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-pink-500 rounded-lg p-3 items-center"
              onPress={saveQuote}
            >
              <Text className="text-white">Save Quote</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        {poem.lines.map((line, index) => (
          <AnimatedTouchableOpacity
            key={index}
            onPress={() => toggleLineSelection(index)}
            className={`p-3 rounded-lg mb-2 border ${
              selectedLines.has(index)
                ? "border-pink-500 bg-blue-50"
                : "border-gray-100"
            }`}
            entering={FadeIn.delay(index * 50)}
            exiting={FadeOut}
          >
            <Text
              className={`text-lg ${
                selectedLines.has(index) ? "text-blue-700" : "text-gray-800"
              }`}
            >
              {line || "⋯"}
            </Text>
          </AnimatedTouchableOpacity>
        ))}
      </ScrollView>

      {selectedLines.size > 0 && !isCreatingQuote && (
        <TouchableOpacity
          className="absolute bottom-6 right-6 bg-blue-500 rounded-full p-4 shadow-lg"
          onPress={() => setIsCreatingQuote(true)}
        >
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      )}

      {isCreatingQuote && renderQuoteCreator()}
    </View>
  );
};

export default PoetrySelector;
