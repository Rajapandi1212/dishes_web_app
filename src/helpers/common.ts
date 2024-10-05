import queryString from "query-string";
import { dishColumnsMap } from "./constants";
import { DishFilterParams } from "@/types";

export const convertToMins = (value: string | number | undefined) =>
  typeof value === "number" ? value + " Mins" : value;

export const getOrderByName = (orderBy?: string) => {
  return dishColumnsMap?.[orderBy as string];
};

export const isSortedASC = (sortDirection?: string) => sortDirection === "ASC";

export const createQueryString = (state: DishFilterParams): string => {
  return queryString.stringify(state);
};

export const parseQueryString = (search: string): DishFilterParams => {
  return queryString.parse(search);
};
