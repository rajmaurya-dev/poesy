import { useState, useCallback } from "react";
import { FullPoem, Poem } from "@/types/poem";
import { poemsAPI } from "@/services/api/poem";

export function usePoems() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [poems, setPoems] = useState<FullPoem[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

  const fetchAuthors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await poemsAPI.getAuthors();
      setAuthors(data.authors);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch authors")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPoemsByAuthor = useCallback(async (author: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await poemsAPI.getPoemsByAuthor(author);
      setPoems(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch poems"));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRandomPoems = useCallback(async (count: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await poemsAPI.getRandomPoems(count);
      setPoems(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch random poems")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPoems = useCallback(async (field: string, term: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await poemsAPI.searchPoems(field, term);
      setPoems(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to search poems")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    poems,
    authors,
    fetchAuthors,
    fetchPoemsByAuthor,
    fetchRandomPoems,
    searchPoems,
  };
}
