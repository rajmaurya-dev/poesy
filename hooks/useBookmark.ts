import { useEffect, useState, useCallback } from "react";
import { Q } from "@nozbe/watermelondb";
import { database } from "@/model/database";
import { FullPoem } from "@/types/poem";
import { Platform } from "react-native";
import withObservables from "@nozbe/with-observables";
import { Bookmark } from "@/model/bookmark";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<FullPoem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const bookmarksCollection = database.collections.get<Bookmark>("bookmarks");

  // Load bookmarks
  useEffect(() => {
    const subscription = bookmarksCollection
      .query()
      .observeWithColumns(["title", "author", "lines", "linecount"])
      .subscribe(
        (bookmarkRecords) => {
          const formattedBookmarks = bookmarkRecords.map(
            (record): FullPoem => ({
              title: record.title,
              author: record.author,
              lines: JSON.parse(record.lines),
              linecount: record.linecount,
            })
          );
          setBookmarks(formattedBookmarks);
          setLoading(false);
        },
        (error) => {
          console.error("Failed to observe bookmarks:", error);
          setError(new Error("Failed to load bookmarks"));
          setLoading(false);
        }
      );

    return () => subscription.unsubscribe();
  }, []);

  const addBookmark = useCallback(async (poem: FullPoem) => {
    try {
      setError(null);
      await database.write(async () => {
        await bookmarksCollection.create((record) => {
          record.title = poem.title;
          record.author = poem.author;
          record.lines = JSON.stringify(poem.lines);
          record.linecount = poem.linecount;
          record.createdAt = new Date();
        });
      });
    } catch (err) {
      console.error("Failed to add bookmark:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to add bookmark")
      );
    }
  }, []);

  const removeBookmark = useCallback(async (title: string, author: string) => {
    try {
      setError(null);
      await database.write(async () => {
        const bookmarkToDelete = await bookmarksCollection
          .query(Q.and(Q.where("title", title), Q.where("author", author)))
          .fetch();

        if (bookmarkToDelete.length > 0) {
          await bookmarkToDelete[0].destroyPermanently();
        }
      });
    } catch (err) {
      console.error("Failed to remove bookmark:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to remove bookmark")
      );
    }
  }, []);

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
  };
}
