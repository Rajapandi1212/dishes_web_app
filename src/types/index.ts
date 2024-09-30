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
