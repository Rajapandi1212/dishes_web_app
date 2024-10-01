"use client";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";
import React, { useState } from "react";
import Loader from "../molecules/Loader";
import dynamic from "next/dynamic";
const DishesTable = dynamic(() => import("./DishesTable"), {
  ssr: false,
  loading: () => <Loader />,
});
import { ApiResponse, Dish, DishFilterParams } from "@/types";
import Filters from "../molecules/Filters";
import { getOrderByName, isSortedASC } from "@/helpers/common";
// import DishesTable from "./DishesTable";
interface Props {
  tableData: ApiResponse<Dish[]>;
}

const CustomTable = ({ tableData }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialState: DishFilterParams = qs.parse(searchParams.toString());
  const [filterState, setFilterState] = useState(initialState);
  const order = getOrderByName(filterState?.sortBy);
  const sortedByASC = isSortedASC(filterState?.sortDirection);

  const handlleSettingFilters = (newFilters: DishFilterParams) => {
    const updatedState = { ...filterState, ...newFilters };

    setFilterState(updatedState);

    // Update the URL with the new state
    const queryString = qs.stringify(updatedState);
    router.push(`/?${queryString}`);
  };

  return (
    <div className="mx-1 md:m-2 xl:mx-4">
      <Filters
        handleFiltersUpdate={handlleSettingFilters}
        filterState={filterState}
        order={order}
        sortedByASC={sortedByASC}
      />
      <DishesTable
        dishesData={tableData}
        order={order}
        sortedByASC={sortedByASC}
      />
    </div>
  );
};

export default CustomTable;
