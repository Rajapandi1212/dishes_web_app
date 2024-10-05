import dynamic from "next/dynamic";
const DishesTable = dynamic(
  () => import("@/components/organisms/DishesTable"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);
import { dishesSuggestion, getIngredients } from "@/helpers/apiCalls";
import { ApiResponse, Dish, DishSuggestionParams, Ingredient } from "@/types";
import React from "react";
import Loader from "@/components/molecules/Loader";
import Ingredients from "@/components/organisms/ingredient";
import { SubTitle } from "@/components/atoms/Text";

interface PageProps {
  searchParams: DishSuggestionParams;
}

const SuggestionsPage = async ({ searchParams }: PageProps) => {
  const [ingredientsRes, dishesRes]: [
    ApiResponse<Ingredient[]>,
    ApiResponse<Dish[]>
  ] = await Promise.all([
    getIngredients(),
    dishesSuggestion({ params: searchParams }),
  ]);
  return (
    <div className="mx-1 md:m-2 xl:mx-4">
      {ingredientsRes?.success ? (
        <Ingredients ingredientsData={ingredientsRes?.data} />
      ) : null}
      {/* @ts-ignore */}
      {searchParams?.ingredientsFilter?.length > 0 ? (
        <>
          {/* @ts-ignore */}
          <SubTitle className="my-2">{`Avilable Dishes - ${dishesRes?.data?.length}`}</SubTitle>
          <DishesTable dishesData={dishesRes} sortedByASC={false} />
        </>
      ) : null}
    </div>
  );
};

export default SuggestionsPage;
