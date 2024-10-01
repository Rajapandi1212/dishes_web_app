"use client";
import React, { ReactNode, useRef, useState } from "react";
import { Button } from "../atoms/Button";
import useClickOutside from "@/helpers/hooks/useClickOutside";
import { RadioButton } from "../atoms/RadioButton";
import { radioOptions } from "@/helpers/constants";
import InputBox from "../atoms/InputBox";
import { DishFilterParams } from "@/types";
import { useRouter } from "next/navigation";
import { createQueryString } from "@/helpers/common";

interface Props {
  handleFiltersUpdate: (newFilters: DishFilterParams) => void;
  filterState: DishFilterParams;
}
const FiltersOverlay = ({ filterState, handleFiltersUpdate }: Props) => {
  const [show, setShow] = useState(false);
  const [sortForCT, setSortForCT] = useState(
    filterState?.["cookTime[lte]"]
      ? "lte"
      : filterState?.["cookTime[gte]"]
      ? "gte"
      : ""
  );
  const [cookingTime, setCookingTime] = useState<string | undefined>(
    filterState?.["cookTime[lte]"] || filterState?.["cookTime[gte]"]
  );
  const [sortForPT, setSortForPT] = useState(
    filterState?.["prepTime[lte]"]
      ? "lte"
      : filterState?.["prepTime[gte]"]
      ? "gte"
      : ""
  );
  const [prepTime, setPrepTime] = useState<string | undefined>(
    filterState?.["prepTime[lte]"] || filterState?.["cookTime[gte]"]
  );
  const router = useRouter();
  const filtersRef = useRef<HTMLDivElement>(null);

  const handleResetFilters = () => {
    setCookingTime(undefined);
    setPrepTime(undefined);
    setSortForCT("");
    setSortForPT("");
    router.push(
      `/?${createQueryString({
        sortBy: filterState?.sortBy,
        sortDirection: filterState?.sortDirection,
      })}`
    );
    setShow(false);
  };

  const handleApplyFilters = () => {
    let payload: DishFilterParams = {};
    if (cookingTime) {
      if (sortForCT === "lte") {
        payload["cookTime[lte]"] = cookingTime;
      } else if (sortForCT === "gte") {
        payload["cookTime[gte]"] = cookingTime;
      }
    }
    if (prepTime) {
      if (sortForPT === "lte") {
        payload["prepTime[lte]"] = prepTime;
      } else if (sortForPT === "gte") {
        payload["prepTime[gte]"] = prepTime;
      }
    }
    const createdQuery = createQueryString({ ...filterState, ...payload });
    router.push(`/?${createdQuery}`);
    setShow(false);
  };

  useClickOutside(filtersRef, () => setShow(false));

  const SelectionContainer = ({ isPT }: { isPT?: boolean }) => {
    return (
      <div className="border border-slate-600 rounded-sm p-3 flex gap-3">
        <div>
          <RadioButton
            label={isPT ? "Prepare Time" : "Cooking Time"}
            value={isPT ? sortForPT : sortForCT}
            setValue={isPT ? setSortForPT : setSortForCT}
            choices={radioOptions}
          />
        </div>
        <InputBox
          label="Time"
          value={isPT ? prepTime : cookingTime}
          setValue={isPT ? setPrepTime : setCookingTime}
        />
      </div>
    );
  };
  return (
    <div className="relative" ref={filtersRef}>
      <Button
        onclick={() => setShow((prevState) => !prevState)}
        appearance="outline"
        size="large"
      >
        Filters
      </Button>
      {show && (
        <div className="absolute w-[90vw] right-0 z-[8] h-[75vh] mt-1 overflow-y-auto shadow-2xl p-2 md:p-6 backdrop-blur-lg bg-slate-100 border flex flex-col gap-6">
          <div className="flex justify-end gap-4">
            <Button
              onclick={handleResetFilters}
              appearance="outline"
              size="medium"
            >
              Reset
            </Button>

            <Button
              onclick={handleApplyFilters}
              appearance="primary"
              size="medium"
            >
              APPLY
            </Button>
          </div>
          <div className="flex flex-col gap-y-4 md:grid md:grid-cols-2 gap-10">
            <SelectionContainer />
            <SelectionContainer isPT={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersOverlay;
