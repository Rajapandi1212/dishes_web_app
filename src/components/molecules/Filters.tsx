import { DishFilterParams } from "@/types";
import DropdownSelector from "./DropdownSelector";
import { dishColumnsArray, orderDirections } from "@/helpers/constants";
import FiltersOverlay from "./FiltersOverlay";

interface Props {
  handleFiltersUpdate: (newFilters: DishFilterParams) => void;
  filterState: DishFilterParams;
  order?: string;
  sortedByASC?: boolean;
}

const Filters = ({ filterState, handleFiltersUpdate }: Props) => {
  return (
    <div className="flex gap-4 justify-end items-end mb-4">
      <div>
        <DropdownSelector
          title="Sort By"
          dropDownValue="sortBy"
          selectedValue={filterState?.sortBy}
          options={dishColumnsArray?.filter((col) => col?.key !== "state")}
          handleFiltersUpdate={handleFiltersUpdate}
        />
      </div>
      <div>
        <DropdownSelector
          isHideNone={true}
          title="Sort Direction"
          dropDownValue="sortDirection"
          selectedValue={filterState?.sortDirection}
          options={orderDirections}
          handleFiltersUpdate={handleFiltersUpdate}
        />
      </div>
      <FiltersOverlay
        filterState={filterState}
        handleFiltersUpdate={handleFiltersUpdate}
      />
    </div>
  );
};

export default Filters;

{
  /* <button onClick={() => handleFiltersUpdate({ ...filterState, diet: "1" })}>
Filters
</button> */
}
