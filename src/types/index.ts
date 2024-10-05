export interface Dish {
  id: number;
  name: string;
  diet: boolean;
  flavor?: string;
  course?: string;
  state?: string;
  region?: string;
  prep_time?: number;
  cook_time?: number;
  diet_label?: string;
  ingredient_names: string[];
}

export interface Ingredient {
  id: number;
  name: string;
}

export interface BaseSuccessResponse<T> {
  success: true;
  count: number;
  total?: number;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error: any;
}

export type ApiResponse<T> = BaseSuccessResponse<T> | ErrorResponse;

export interface DishFilterParams {
  limit?: string;
  page?: string;
  "cookTime[lte]"?: string;
  "cookTime[gte]"?: string;
  "prepTime[lte]"?: string;
  "prepTime[gte]"?: string;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  region?: string;
  diet?: string;
}

export interface DishSuggestionParams {
  ingredientsFilter?: string[];
}
