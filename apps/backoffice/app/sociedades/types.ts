import { RamosType, Society } from "@repo/api";
import { TableColumn } from "@repo/ui";

export interface SociedadParams {
  data: Society[];
  tableHeader: TableColumn<Society>[];
  branchList: RamosType[];
}

export interface FormType {
  ramo_id: string;
  razon_social: string;
  rfc: string;
  num_sociedad_sap: number;
  topico_kafka: string;
}
