import { PoemList } from "@/components/home/PoemList";
import { useBookmarks } from "@/hooks/useBookmark";
import { SafeAreaView } from "react-native";

const Bookmark = () => {
  const { bookmarks, loading, error, removeBookmark } = useBookmarks();

  // if (loading) return <LoadingSpinner />;
  // if (error) return <ErrorMessage message={error.message} />;
  console.log(bookmarks.length, "bookmarks");
  return (
    <SafeAreaView>
      <PoemList
        poems={bookmarks}
        // onRemove={(title, author) => removeBookmark(title, author)}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
