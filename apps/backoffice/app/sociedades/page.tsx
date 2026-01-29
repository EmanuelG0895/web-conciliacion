// app/sociedades/page.tsx
import { getBranchList, SocietyType } from "@repo/api";
import { GetSocieties } from "./accions";
import { TableColumn } from "@repo/ui";
import Sociedades from "./Sociedades";

export default async function Page() {
  
  const [societiesResponse, ramos] = await Promise.all([
    GetSocieties(),
    getBranchList(),
  ]);

  const sociedades = societiesResponse.success
    ? societiesResponse.data || []
    : [];
      
  const tableHeader: TableColumn<SocietyType>[] = [
    { key: "razon_social", label: "Razón Social", sortable: true },
    { key: "rfc", label: "RFC" },
    { key: "num_sociedad_sap", label: "Sociedad SAP", align: "center" },
    { key: "topico_kafka", label: "Kafka Topic" },
  ];
  
  return (
    <Sociedades
      data={sociedades}
      tableHeader={tableHeader}
      branchList={ramos} // Ejemplo: si lo necesitas en el Form
    />
  );
}
