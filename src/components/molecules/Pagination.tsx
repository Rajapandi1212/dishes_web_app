import { DishFilterParams } from "@/types";
import React from "react";
interface Props {
  handleFiltersUpdate: (newFilters: DishFilterParams) => void;
  filterState: DishFilterParams;
  total: number;
}

const Pagination: React.FC<Props> = ({
  filterState,
  total,
  handleFiltersUpdate,
}) => {
  const currentPage = filterState?.page
    ? parseInt(filterState?.page) > 0
      ? parseInt(filterState?.page)
      : 1
    : 1;
  const limit = filterState?.limit
    ? parseInt(filterState?.limit) > 0
      ? parseInt(filterState?.limit)
      : 10
    : 10;
  const totalPages = total < 1 ? 1 : Math.ceil(total / limit);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      handleFiltersUpdate({ page: page?.toString() });
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const maxVisiblePages = 4;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(currentPage + halfVisible, totalPages);

    // Adjust if we are near the start or end of pages
    if (currentPage <= halfVisible) {
      endPage = Math.min(maxVisiblePages, totalPages);
    } else if (currentPage + halfVisible >= totalPages) {
      startPage = Math.max(totalPages - maxVisiblePages + 1, 1);
    }

    // Push left dots if startPage is greater than 1
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key="1"
          className={`mx-1 px-2 py-1 rounded-md ${
            currentPage === 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-300`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      pageNumbers.push(<span key="dots-left">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`mx-1 px-2 py-1 rounded-md ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-300`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Push right dots if endPage is less than totalPages
    if (endPage < totalPages) {
      pageNumbers.push(<span key="dots-right">...</span>);
      pageNumbers.push(
        <button
          key={totalPages}
          className={`mx-1 px-2 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-300`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="text-sm text-gray-600 text-end mr-2">
        Showing {(currentPage - 1) * limit + 1} -{" "}
        {Math.min(currentPage * limit, total)} of {total} items
      </div>
      <div className="flex justify-end items-center mt-4">
        <button
          className="mx-1 px-2 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-blue-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Prev
        </button>

        {renderPageNumbers()}

        <button
          className="mx-1 px-2 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-blue-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
