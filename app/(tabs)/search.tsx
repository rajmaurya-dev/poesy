import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { usePoems } from "@/hooks/usePoems";
import { SearchBar } from "@/components/search/SearchBar";
import { AuthorSelect } from "@/components/search/AuthorSelect";
import { PoemList } from "@/components/home/PoemList";
import { SearchResults } from "@/components/search/SearchResults";
import { useDebouncedCallback } from "use-debounce";

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
  useEffect(() => {
    fetchAuthors();
  }, []);

  const debouncedSearch = useDebouncedCallback(async (query: string) => {
    if (query.trim()) {
      if (selectedAuthor) {
        await searchPoems("author,title", `${selectedAuthor};${query}`);
      } else {
        await searchPoems("title", query);
      }
    } else if (selectedAuthor) {
      await fetchPoemsByAuthor(selectedAuthor);
    }
  }, 300);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      debouncedSearch(query);
    },
    [selectedAuthor]
  );

  const handleAuthorSelect = useCallback(
    async (author: string | null) => {
      setSelectedAuthor(author);
      Keyboard.dismiss();

      if (author) {
        if (searchQuery.trim()) {
          await searchPoems("author,title", `${author};${searchQuery}`);
        } else {
          await fetchPoemsByAuthor(author);
        }
      } else {
        if (searchQuery.trim()) {
          await searchPoems("title", searchQuery);
        }
      }
    },
    [searchQuery]
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (searchQuery.trim()) {
      if (selectedAuthor) {
        await searchPoems("author,title", `${selectedAuthor};${searchQuery}`);
      } else {
        await searchPoems("title", searchQuery);
      }
    } else if (selectedAuthor) {
      await fetchPoemsByAuthor(selectedAuthor);
    }
    setIsRefreshing(false);
  };

  console.log("poems", poems);
  //   console.log("11");
  const encodedTitle = encodeURIComponent(searchQuery.trim());
  console.log(encodedTitle);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-gray-50"
      >
        <View className="p-4 gap-4 border-b border-gray-100 bg-white">
          <SearchBar
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmit={() => handleSearch(searchQuery)}
            placeholder={
              selectedAuthor
                ? `Search ${selectedAuthor}'s poems...`
                : "Search poems by title..."
            }
          />
          <AuthorSelect
            authors={authors}
            selectedAuthor={selectedAuthor}
            onSelectAuthor={handleAuthorSelect}
          />
        </View>

        <SearchResults
          poems={poems}
          loading={loading}
          error={error}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          searchQuery={searchQuery}
          selectedAuthor={selectedAuthor}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Search;
