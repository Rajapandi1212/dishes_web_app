"use client";
import { ApiResponse, Dish, DishFilterParams } from "@/types";
import {
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  TableColumnDefinition,
} from "@fluentui/react-components";
import {
  ArrowCircleUp20Regular,
  ArrowCircleDown20Regular,
} from "@fluentui/react-icons";
import React, { useEffect, useState } from "react";
import Capitalize from "../atoms/Text";
import { convertToMins, getOrderByName } from "@/helpers/common";
import NoResultsFound from "./NoResultsFound";
import Link from "next/link";
import { Button } from "../atoms/Button";

interface Props {
  dishesData: ApiResponse<Dish[]>;
  order?: string;
  sortedByASC: boolean;
}

const columnSizingOptions = {
  name: {
    defaultWidth: 150,
    minWidth: 100,
    idealWidth: 150,
  },
  diet: {
    defaultWidth: 100,
    minWidth: 70,
    idealWidth: 100,
  },
  ingredients: {
    defaultWidth: 160,
    minWidth: 140,
    idealWidth: 150,
  },
  prepTime: {
    defaultWidth: 200,
    minWidth: 130,
    idealWidth: 200,
  },
  cookTime: {
    defaultWidth: 200,
    minWidth: 140,
    idealWidth: 200,
  },
};

const DishesTable = ({ dishesData, order, sortedByASC }: Props) => {
  const HeaderName = ({ label }: { label: string }) => {
    if (order === label) {
      return (
        <div className="flex gap-x-1 items-center">
          <span className="text-blue-600 text-lg font-semibold cursor-pointer">
            {label}
          </span>
          {sortedByASC ? (
            <ArrowCircleDown20Regular />
          ) : (
            <ArrowCircleUp20Regular />
          )}
        </div>
      );
    } else {
      return (
        <span className="text-blue-600 text-lg font-semibold cursor-pointer">
          {label}
        </span>
      );
    }
  };

  const columns: TableColumnDefinition<Dish>[] = [
    createTableColumn<Dish>({
      columnId: "name",
      renderHeaderCell: () => {
        return <HeaderName label="Name" />;
      },
      renderCell: (item) => {
        return (
          <TableCellLayout className="capitalize">{item?.name}</TableCellLayout>
        );
      },
    }),
    createTableColumn<Dish>({
      columnId: "view",
      renderHeaderCell: () => {
        return <HeaderName label="View" />;
      },
      renderCell: (item) => {
        return (
          <TableCellLayout>
            <Link href={`/dish/${item?.id}`} className="">
              <Button>View</Button>
            </Link>
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Dish>({
      columnId: "diet",
      renderHeaderCell: () => {
        return <HeaderName label="Diet" />;
      },
      renderCell: (item) => {
        return (
          <TableCellLayout className="capitalize">
            <span
              className={`${
                item?.diet ? "bg-green-700" : "bg-red-700"
              } rounded-full h-5 w-5 block`}
            ></span>
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Dish>({
      columnId: "ingredients",
      renderHeaderCell: () => {
        return <HeaderName label="Ingredients" />;
      },
      renderCell: (item) => {
        return (
          <TableCellLayout truncate>
            <div className="flex my-1 flex-col gap-2 justify-start">
              {item?.ingredient_names?.map((ingredient, i) => (
                <Capitalize key={ingredient + i}>{ingredient}</Capitalize>
              ))}
            </div>
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Dish>({
      columnId: "prepTime",
      renderHeaderCell: () => {
        return <HeaderName label="Prep Time" />;
      },
      renderCell: (item) => {
        return (
          <TableCellLayout truncate className="capitalize">
            {convertToMins(item?.prep_time || 0)}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Dish>({
      columnId: "cookTime",
      renderHeaderCell: () => {
        return <HeaderName label="Cook Time" />;
      },
      renderCell: (item) => {
        return (
          <TableCellLayout truncate className="capitalize">
            {convertToMins(item?.cook_time || 0)}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Dish>({
      columnId: "flavor",
      renderHeaderCell: () => {
        return <HeaderName label="Flavor" />;
      },
      renderCell: (item) => {
        return (
          <TableCellLayout truncate className="capitalize">
            {item?.flavor}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Dish>({
      columnId: "course",
      renderHeaderCell: () => {
        return <HeaderName label="Course" />;
      },
      renderCell: (item) => {
        return (
          <TableCellLayout truncate className="capitalize">
            {item?.course}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Dish>({
      columnId: "state",
      renderHeaderCell: () => {
        return <HeaderName label="State" />;
      },
      renderCell: (item) => {
        return (
          <TableCellLayout truncate className="capitalize">
            {item?.state}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Dish>({
      columnId: "region",
      renderHeaderCell: () => {
        return <HeaderName label="Region" />;
      },
      renderCell: (item) => {
        return (
          <TableCellLayout truncate className="capitalize">
            {item?.region}
          </TableCellLayout>
        );
      },
    }),
  ];

  return (
    <div className="overflow-x-auto">
      <DataGrid
        //@ts-ignore
        items={dishesData?.data ?? []}
        columns={columns}
        columnSizingOptions={columnSizingOptions}
        resizableColumns
        getRowId={(item: Dish) => item?.id}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell, columnId }) => (
              <DataGridHeaderCell
                onClick={() => console.log(columnId)}
                className="cursor-pointer"
              >
                {renderHeaderCell()}
              </DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        {!dishesData?.success || dishesData?.count < 1 ? (
          <NoResultsFound />
        ) : (
          <DataGridBody<Dish>>
            {({ item, rowId }) => (
              <DataGridRow<Dish> key={rowId}>
                {({ renderCell, columnId }) => (
                  <DataGridCell onClick={() => {}}>
                    {renderCell(item)}
                  </DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        )}
      </DataGrid>
    </div>
  );
};

export default DishesTable;
