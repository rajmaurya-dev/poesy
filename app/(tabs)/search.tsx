import { SafeAreaView, View } from "react-native";
import { useEffect, useState } from "react";
import { usePoems } from "@/hooks/usePoems";
import { SearchBar } from "@/components/search/SearchBar";
import { AuthorSelect } from "@/components/search/AuthorSelect";
import { PoemList } from "@/components/home/PoemList";

const Search = () => {
  const {
    poems,
    authors,
    loading,
    error,
    fetchAuthors,
    searchPoems,
    fetchPoemsByAuthor,
  } = usePoems();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await searchPoems("lines", searchQuery.trim());
    } else if (selectedAuthor) {
      await fetchPoemsByAuthor(selectedAuthor);
    }
  };

  const handleAuthorSelect = async (author: string | null) => {
    setSelectedAuthor(author);
    if (author) {
      await fetchPoemsByAuthor(author);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (searchQuery.trim()) {
      await searchPoems("lines", searchQuery.trim());
    } else if (selectedAuthor) {
      await fetchPoemsByAuthor(selectedAuthor);
    }
    setIsRefreshing(false);
  };

  console.log("poems", poems.length);
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4 gap-4">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
        />
      </View>

      <PoemList
        poems={poems}
        loading={loading}
        error={error}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
};

export default Search;
