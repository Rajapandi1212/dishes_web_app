import { GET } from "./axiosInstance";

export const listDishes = async (config?: any) => {
  return await GET("/dishes", config);
};

export const autoSuggestion = async (config?: any) => {
  return await GET("/dishes/autoSuggest", config);
};

export const getDish = async (id: string) => {
  return await GET(`/dishes/${id}`)?.then((res) => res?.data?.[0]);
};
