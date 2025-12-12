import React, { useState, useMemo } from "react";

export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<T> {
  readonly key: string;
  readonly label: string;
  readonly sortable?: boolean;
  readonly render?: (row: T, index: number) => React.ReactNode;
  readonly align?: "left" | "center" | "right";
  readonly className?: string;
}

export interface TableProps<T> {
  readonly data: T[];
  readonly columns: TableColumn<T>[];
  readonly keyExtractor: (row: T, index: number) => string | number;
  readonly onRowClick?: (row: T, index: number) => void;
  readonly className?: string;
  readonly emptyMessage?: string;
  readonly striped?: boolean;
  readonly hoverable?: boolean;
  readonly bordered?: boolean;
}

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
        className="w-4 h-4 ml-1 text-gs-gray-medium"
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
      className="w-4 h-4 ml-1 text-gs-yellow"
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
      className="w-4 h-4 ml-1 text-gs-yellow"
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

export default function Table<T extends Record<string, unknown>>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  className,
  emptyMessage = "No hay datos disponibles",
  striped = false,
  hoverable = true,
  bordered = true,
}: TableProps<T>) {
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
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDirection === "asc" ? comparison : -comparison;
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

  return (
    <div className="w-full overflow-x-auto">
      <table
        className={`w-full text-sm ${getAlignClass("left")} rtl:text-right text-gs-black dark:text-gs-white ${className || ""}`}
      >
        <thead
          className={`text-sm uppercase ${
            bordered
              ? "border-b border-gs-gray-medium dark:border-gs-gray-dark"
              : ""
          }`}
        >
          <tr className="bg-gs-yellow dark:bg-gs-yellow-dark text-gs-black font-bold">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 font-medium ${
                  column.sortable
                    ? "cursor-pointer hover:bg-gs-yellow-dark dark:hover:bg-gs-yellow"
                    : ""
                } ${getAlignClass(column.align)} ${column.className || ""}`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center">
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
                className="px-6 py-8 text-center text-gs-gray-medium"
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
                  bg-gs-white dark:bg-gs-gray-dark
                  ${
                    hoverable
                      ? "hover:bg-gs-gray-light dark:hover:bg-gs-gray-medium"
                      : ""
                  }
                  ${
                    striped && index % 2 === 1
                      ? "bg-gs-gray-light dark:bg-gs-gray-medium"
                      : ""
                  }
                  ${
                    bordered && index < sortedData.length - 1
                      ? "border-b border-gs-gray-light dark:border-gs-gray-dark"
                      : ""
                  }
                  ${onRowClick ? "cursor-pointer" : ""}
                  transition-colors duration-150
                `}
              >
                {columns.map((column, colIndex) => {
                  const CellTag = colIndex === 0 ? "th" : "td";
                  const content = column.render
                    ? column.render(row, index)
                    : (row[column.key] as React.ReactNode);

                  return (
                    <CellTag
                      key={column.key}
                      scope={colIndex === 0 ? "row" : undefined}
                      className={`px-6 py-4 ${
                        colIndex === 0 ? "font-medium whitespace-nowrap" : ""
                      } ${getAlignClass(column.align)} ${column.className || ""}`}
                    >
                      {content}
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
