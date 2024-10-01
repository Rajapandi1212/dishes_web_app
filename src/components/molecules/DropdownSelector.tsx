"use client";
import { DishFilterParams } from "@/types";
import React, { useState } from "react";

interface Props {
  title: string;
  dropDownValue: keyof DishFilterParams;
  handleFiltersUpdate: (newFilters: DishFilterParams) => void;
  selectedValue?: string;
  options: {
    key: string;
    value: string;
  }[];
  isHideNone?: boolean;
}

const DropdownSelector = ({
  title,
  dropDownValue,
  selectedValue,
  handleFiltersUpdate,
  options,
  isHideNone = false,
}: Props) => {
  return (
    <div className="max-w-24 md:max-w-60 mx-auto">
      <label
        htmlFor="sortbyvalues"
        className="block mb-1 text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <select
        id="sortbyvalues"
        value={selectedValue}
        onChange={(e) =>
          handleFiltersUpdate({ [dropDownValue]: e.target.value })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {!isHideNone ? <option>None</option> : null}
        {options?.map((opt, i) => (
          <option value={opt?.key} key={opt?.key + i}>
            {opt?.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelector;
