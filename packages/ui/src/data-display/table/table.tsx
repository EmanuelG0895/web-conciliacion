"use client";
import React, { useState, useMemo } from "react";
import { SortDirection, TableProps } from "./types";

const ColumnSortIndicator = ({
  isActive,
  direction,
}: {
  isActive: boolean;
  direction: SortDirection;
}) => {
  if (!isActive) {
    return (
      <svg
        className="w-4 h-4 ml-1 text-gs-tonal-dark dark:text-gs-tonal-medium"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    );
  }

  return direction === "asc" ? (
    <svg
      className="w-4 h-4 ml-1 text-gs-text-dark dark:text-gs-text-light"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  ) : (
    <svg
      className="w-4 h-4 ml-1 text-gs-text-dark dark:text-gs-text-light"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

export default function Table<T extends object>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  className,
  emptyMessage = "No hay datos disponibles",
  striped = false,
  hoverable = true,
  bordered = true,
  tableHeight = "",
}: Readonly<TableProps<T>>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (columnKey: string) => {
    if (sortKey === columnKey) {
      // Ciclo: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortKey(null);
        setSortDirection(null);
      }
    } else {
      setSortKey(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return data;

    return [...data].sort((a, b) => {
      // Usamos 'keyof T' para asegurar que estamos accediendo a una propiedad válida
      const aVal = a[sortKey as keyof T];
      const bVal = b[sortKey as keyof T];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      // Para comparar valores unknown, debemos asegurar que son comparables
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDirection]);

  const getAlignClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const getJustifyClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "justify-center";
      case "right":
        return "justify-end";
      default:
        return "justify-start";
    }
  };

  return (
    <div
      className={`min:w-full overflow-x-auto overflow-y-auto ${tableHeight}`}
    >
      <table
        className={`overflow-auto w-full text-sm ${getAlignClass("left")} rtl:text-right text-gs-text-dark dark:text-gs-text-light ${className || ""}`}
      >
        <thead
          className={`text-sm uppercase sticky top-0 ${
            bordered
              ? "border-b border-gs-surface-medium dark:border-gs-tonal-dark"
              : ""
          }`}
        >
          <tr className="bg-gs-primary-light dark:bg-gs-primary-dark text-gs-text-dark dark:text-gs-text-light font-bold">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 font-medium ${
                  column.sortable
                    ? "cursor-pointer hover:bg-gs-primary-medium dark:hover:bg-gs-primary-medium"
                    : ""
                } ${getAlignClass(column.align)} ${column.className || ""}`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div
                  className={`flex items-center ${getJustifyClass(column.align)}`}
                >
                  {column.label}
                  {column.sortable && (
                    <ColumnSortIndicator
                      isActive={sortKey === column.key}
                      direction={sortDirection}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-gs-tonal-dark dark:text-gs-tonal-medium"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => (
              <tr
                key={keyExtractor(row, index)}
                onClick={() => onRowClick?.(row, index)}
                className={`
                  bg-gs-surface-light dark:bg-gs-surface-dark
                  ${
                    hoverable
                      ? "hover:bg-gs-surface-medium  dark:hover:bg-gs-tonal-dark dark:hover:text-gs-text-dark"
                      : ""
                  }
                  ${
                    striped && index % 2 === 1
                      ? "bg-gs-surface-medium dark:bg-gs-tonal-dark dark:text-gs-black"
                      : ""
                  }
                  ${
                    bordered && index < sortedData.length - 1
                      ? "border-b border-gs-surface-medium dark:border-gs-tonal-dark"
                      : ""
                  }
                  ${onRowClick ? "cursor-pointer" : ""}
                  transition-colors duration-150
                `}
              >
                {columns.map((column, colIndex) => {
                  const CellTag = colIndex === 0 ? "th" : "td";

                  // Obtenemos el contenido de forma segura
                  const content = column.render
                    ? column.render(row, index)
                    : (row as Record<string, unknown>)[column.key]; // <--- Cambio clave aquí

                  return (
                    <CellTag
                      key={column.key}
                      scope={colIndex === 0 ? "row" : undefined}
                      className={`px-6 py-4 ${
                        colIndex === 0 ? "font-medium whitespace-nowrap" : ""
                      } ${getAlignClass(column.align)} ${column.className || ""}`}
                    >
                      {/* Casteamos a ReactNode solo al final para el renderizado, 
         esto es seguro para strings, numbers y nulls.
      */}
                      {content as React.ReactNode}
                    </CellTag>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
