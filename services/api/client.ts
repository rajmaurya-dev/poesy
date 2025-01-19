const BASE_URL = "https://poetrydb.org";

class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "APIError";
  }
}

async function fetchAPI(endpoint: string) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new APIError("API request failed", response.status);
    }
    const data = await response.json();

    if (data.status === 404) {
      return [];
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError("Network request failed");
  }
}

export const apiClient = {
  fetchAPI,
};
