import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Poem } from "@/types/poem";

const BOOKMARK_KEY = "poesy_bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AsyncStorage.getItem(BOOKMARK_KEY);
      setBookmarks(data ? JSON.parse(data) : []);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load bookmarks")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const addBookmark = useCallback(
    async (poem: Poem) => {
      try {
        setError(null);
        const updatedBookmarks = [...bookmarks, poem];
        await AsyncStorage.setItem(
          BOOKMARK_KEY,
          JSON.stringify(updatedBookmarks)
        );
        setBookmarks(updatedBookmarks);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to add bookmark")
        );
      }
    },
    [bookmarks]
  );

  const removeBookmark = useCallback(
    async (title: string, author: string) => {
      try {
        setError(null);
        const updatedBookmarks = bookmarks.filter(
          (bookmark) =>
            !(bookmark.title === title && bookmark.author === author)
        );
        await AsyncStorage.setItem(
          BOOKMARK_KEY,
          JSON.stringify(updatedBookmarks)
        );
        setBookmarks(updatedBookmarks);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to remove bookmark")
        );
      }
    },
    [bookmarks]
  );

  const isBookmarked = useCallback(
    (title: string, author: string) => {
      return bookmarks.some(
        (bookmark) => bookmark.title === title && bookmark.author === author
      );
    },
    [bookmarks]
  );

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    removeBookmark,
    isBookmarked,
    refreshBookmarks: loadBookmarks,
  };
}
