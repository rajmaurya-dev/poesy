import { View, SafeAreaView, Text, ActivityIndicator } from "react-native";
import { PoemList } from "@/components/home/PoemList";
import SavedQuotes from "@/components/SavedQuote";
import { useBookmarks } from "@/hooks/useBookmark";

const Bookmark = () => {
  const { bookmarks, loading, error, removeBookmark } = useBookmarks();
console.log(bookmarks.length, "bookmarks hell");
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#F43F5E" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center p-4">
        <Text className="text-red-500 text-center">{error.message}</Text>
      </SafeAreaView>
    );
  }

  // console.log(bookmarks, "bookmarks");
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-3xl font-semibold text-gray-900 mb-2">
          Bookmarks
        </Text>
        <Text className="text-gray-500 mb-6">
          {bookmarks.length} saved poems
        </Text>
      </View>

      {bookmarks.length === 0 ? (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-gray-500 text-center text-lg">
            No bookmarks yet. Save some poems to read later!
          </Text>
        </View>
      ) : (
        <PoemList
          poems={bookmarks}
          // onRemove={(title, author) => removeBookmark(title, author)}
        />
      )}
    </SafeAreaView>
  );
};

export default Bookmark;
