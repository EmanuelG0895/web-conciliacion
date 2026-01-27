import { SocietyType } from "@repo/api";
import { TableColumn } from "@repo/ui";

export interface SociedadParams {
  data: SocietyType[];
  tableHeader: TableColumn<SocietyType>[];
}
