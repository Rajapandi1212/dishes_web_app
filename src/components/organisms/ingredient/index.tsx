"use client";
import { Button } from "@/components/atoms/Button";
import { SubTitle } from "@/components/atoms/Text";
import { parseQueryString } from "@/helpers/common";
import { ApiResponse, DishSuggestionParams, Ingredient } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React, { useState } from "react";

interface Props {
  ingredientsData: Ingredient[];
}

const Ingredients = ({ ingredientsData }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialFilterState: DishSuggestionParams = queryString.parse(
    searchParams.toString()
  );
  const [filterState, setFilterState] = useState(initialFilterState);
  const handleUpdateFilters = (newFilter: string) => {
    const updatedFilter: DishSuggestionParams = {
      ingredientsFilter: filterState?.ingredientsFilter?.includes(newFilter)
        ? filterState?.ingredientsFilter?.filter((ing) => ing !== newFilter)
        : //@ts-ignore
          [...(filterState?.ingredientsFilter || []), newFilter],
    };
    setFilterState(updatedFilter);
    const query = queryString.stringify(updatedFilter);
    router.push(`/suggestions?${query}`);
  };
  return (
    <>
      <SubTitle className="my-1">Choose the Ingredients</SubTitle>
      <div className="flex flex-wrap gap-4 border-2 p-2 md:px--6 py-4 max-h-[60vh] overflow-y-auto mb-4">
        {ingredientsData?.map((ingredients) => (
          <button
            key={ingredients?.name}
            onClick={() => handleUpdateFilters(ingredients?.name)}
            className={`capitalize border px-2 py-1  ${
              filterState?.ingredientsFilter?.includes(ingredients?.name)
                ? "border-blue-500"
                : "border-black"
            }`}
          >
            {ingredients?.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Ingredients;
