import { TextInput, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
};

export function SearchBar({ value, onChangeText, onSubmit }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`flex-row items-center bg-white rounded-xl px-4 shadow-sm border ${
        isFocused ? "border-pink-300" : "border-gray-100"
      }`}
    >
      <Feather name="search" size={20} color="#666" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder="Search poems..."
        returnKeyType="search"
        className="flex-1 py-4 px-3 text-base text-gray-900"
        placeholderTextColor="#999"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")} hitSlop={8}>
          <Feather name="x" size={20} color="#666" />
        </Pressable>
      )}
    </View>
  );
}
