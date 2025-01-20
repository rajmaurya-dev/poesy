import { normalizeAndEncode } from "@/utils/stringUtils";
import { apiClient } from "./client";
import { FullPoem, PoemTitle } from "@/types/poem";
type AuthorsData = {
  authors: string[];
};
export const poemsAPI = {
  async getAuthors(): Promise<AuthorsData> {
    return await apiClient.fetchAPI("/author");
  },

  //   async getPoemsByAuthor(author: string): Promise<FullPoem[]> {
  //     return await apiClient.fetchAPI(
  //       `/author/${normalizeAndEncode(author)}/title`
  //     );
  //   },

  async getPoemsByAuthor(author: string): Promise<FullPoem[]> {
    const titlesResponse = await apiClient.fetchAPI(
      `/author/${encodeURIComponent(author)}/title`
    );
    const titles = titlesResponse as PoemTitle[];
    const fullPoemsPromises = titles.map(({ title }) =>
      apiClient
        .fetchAPI(
          `/author,title/${encodeURIComponent(author)};${encodeURIComponent(
            title
          )}`
        )
        .then((response) => {
          const [poem] = response as FullPoem[];
          return poem;
        })
    );

    const fullPoems = await Promise.all(fullPoemsPromises);
    return fullPoems;
  },

  async getPoemByAuthorAndTitle(
    author: string,
    title: string
  ): Promise<FullPoem[]> {
    return await apiClient.fetchAPI(
      `/author,title/${normalizeAndEncode(author)};${normalizeAndEncode(title)}`
    );
  },

  async searchPoems(field: string, term: string): Promise<FullPoem[]> {
    return await apiClient.fetchAPI(`/${field}/${normalizeAndEncode(term)}`);
  },

  async getRandomPoems(count: number = 1): Promise<FullPoem[]> {
    return await apiClient.fetchAPI(`/random/${count}`);
  },
};
