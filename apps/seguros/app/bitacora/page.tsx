"use client";

import { Table, TableColumn } from "@repo/ui";
import { Columns3Cog } from "lucide-react";

interface BitacoraRecord extends Record<string, unknown> {
  proceso: string;
  sistema: string;
  sociedad: string;
  fechaEjecucion: string;
  fechaProceso: string;
  accion: string;
}
const data = [
  {
    proceso: "ETL",
    sistema: "ACSEL",
    sociedad: "SAZ000925N86",
    fechaEjecucion: "12/12/2025 00:00:00",
    fechaProceso: "12/12/2025",
    accion: "Inicia ETL",
  },
  {
    proceso: "ETL",
    sistema: "ACSEL",
    sociedad: "SAZ000925N87",
    fechaEjecucion: "12/12/2025 00:00:01",
    fechaProceso: "12/13/2025",
    accion: "Inicia extracción",
  },
  {
    proceso: "ETL",
    sistema: "ACSEL",
    sociedad: "SAZ000925N88",
    fechaEjecucion: "12/12/2025 00:00:02",
    fechaProceso: "12/14/2025",
    accion: "Termina extracción",
  },
  {
    proceso: "ETL",
    sistema: "ACSEL",
    sociedad: "SAZ000925N89",
    fechaEjecucion: "12/12/2025 00:00:03",
    fechaProceso: "12/15/2025",
    accion: "Inicia transformación",
  },
  {
    proceso: "ETL",
    sistema: "ACSEL",
    sociedad: "SAZ000925N90",
    fechaEjecucion: "12/12/2025 00:00:04",
    fechaProceso: "12/16/2025",
    accion: "Termina transformación",
  },
  {
    proceso: "ETL",
    sistema: "ACSEL",
    sociedad: "SAZ000925N91",
    fechaEjecucion: "12/12/2025 00:00:05",
    fechaProceso: "12/17/2025",
    accion: "Inicia carga",
  },
  {
    proceso: "ETL",
    sistema: "ACSEL",
    sociedad: "SAZ000925N92",
    fechaEjecucion: "12/12/2025 00:00:06",
    fechaProceso: "12/18/2025",
    accion: "Termina carga",
  },
  {
    proceso: "ETL",
    sistema: "ACSEL",
    sociedad: "SAZ000925N93",
    fechaEjecucion: "12/12/2025 00:00:07",
    fechaProceso: "12/19/2025",
    accion: "Termina ETL",
  },
];

const columns: TableColumn<BitacoraRecord>[] = [
  { key: "proceso", label: "Proceso", sortable: true },
  { key: "sistema", label: "Sistema", sortable: true },
  { key: "sociedad", label: "Sociedad", sortable: true },
  { key: "fechaEjecucion", label: "Fecha ejecución", sortable: true },
  { key: "fechaProceso", label: "Fecha proceso", sortable: true },
  { key: "accion", label: "Acción", sortable: true },
];

export default function Page() {
  
  return (
    <div className="w-full p-4">
      <h1 className="text-3xl flex items-center font-bold mb-6 text-center dark:text-white">
        <Columns3Cog size={30} className="mr-3" />
        Bitácora de procesos
      </h1>
      <Table<BitacoraRecord>
        columns={columns}
        data={data}
        keyExtractor={(row) => row.sociedad}
        striped
        hoverable
        bordered
        tableHeight="h-[600px]"
      />
    </div>
  );
}
