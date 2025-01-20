import { apiClient } from "./client";
import { Poem } from "@/types/poem";
type AuthorsData = {
  authors: string[];
};
export const poemsAPI = {
  async getAuthors(): Promise<AuthorsData> {
    return await apiClient.fetchAPI("/author");
  },

  async getPoemsByAuthor(author: string): Promise<Poem[]> {
    return await apiClient.fetchAPI(
      `/author/${encodeURIComponent(author)}/title`
    );
  },

  async getPoemByAuthorAndTitle(
    author: string,
    title: string
  ): Promise<Poem[]> {
    return await apiClient.fetchAPI(
      `/author,title/${encodeURIComponent(author)};${encodeURIComponent(title)}`
    );
  },

  async searchPoems(field: string, term: string): Promise<Poem[]> {
    return await apiClient.fetchAPI(`/${field}/${encodeURIComponent(term)}`);
  },

  async getRandomPoems(count: number = 1): Promise<Poem[]> {
    return await apiClient.fetchAPI(`/random/${count}`);
  },
};
