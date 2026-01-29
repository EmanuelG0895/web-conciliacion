export interface TableColumn<T> {
  readonly key: string;
  readonly label: string;
  readonly sortable?: boolean;
  readonly render?: (row: T, index: number) => React.ReactNode;
  readonly align?: "left" | "center" | "right";
  readonly className?: string;
}

export interface TableProps<T extends object> {
  readonly data: T[];
  readonly columns: TableColumn<T>[];
  readonly keyExtractor: (row: T, index: number) => string | number;
  readonly onRowClick?: (row: T, index: number) => void;
  readonly className?: string;
  readonly emptyMessage?: string;
  readonly striped?: boolean;
  readonly hoverable?: boolean;
  readonly bordered?: boolean;
  readonly tableHeight?: string;
}


export type SortDirection = "asc" | "desc" | null;