import { GET } from "./axiosInstance";

// export const listDishes = async (config?: any) => await GET(url, config);
export const autoSuggestion = async (config?: any) => {
  return await GET("/dishes/autoSuggest", config);
};
