import { TableColumn } from "../table/types";

export interface GenericCrudProps<T extends object> {
  title: string;
  data: T[];
  columns: TableColumn<T>[];
  keyExtractor: (item: T, index: number) => string | number;
  onEdit?: (item: T) => void | Promise<void>;
  // CORRECCIÓN: Añade | Promise<void> aquí también
  onDelete?: (item: T) => void | Promise<void>;
  // Opcional: También a onCreate para mantener consistencia
  onCreate?: () => void | Promise<void>;
  labelCreate?: string;
  modalContent: React.JSX.Element;
}
