import { DishFilterParams } from "@/types";
import React from "react";

interface Props {
  handleFiltersUpdate: (newFilters: DishFilterParams) => void;
  filterState: DishFilterParams;
}

const PerPage: React.FC<Props> = ({ filterState, handleFiltersUpdate }) => {
  return (
    <div className="flex items-center justify-end mb-3">
      <span className="mr-2 text-sm">Items per page:</span>
      <select
        value={filterState?.limit || "10"}
        onChange={(e) =>
          handleFiltersUpdate({ page: "1", limit: e?.target?.value })
        }
        className="p-2 border rounded-md bg-white text-gray-700"
      >
        {["10", "20", "50", "100"].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PerPage;
