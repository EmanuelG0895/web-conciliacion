import React from "react";
import { ResumenTasa } from "./types";
import { Table, TableColumn } from "@repo/ui";

function Iva() {
  const columnas: TableColumn<ResumenTasa>[] = [
    { key: "tasa", label: "Tasa %", sortable: true },
    { key: "certificados", label: "# Certificados", sortable: true },
    { key: "prima", label: "Prima", sortable: true },
    { key: "derechos", label: "Derechos", sortable: true },
    { key: "recargos", label: "Recargos", sortable: true },
    { key: "subTotal", label: "Sub Total", sortable: true },
    { key: "iva", label: "IVA", sortable: true },
    { key: "total", label: "Total", sortable: true },
  ];

  const datos: ResumenTasa[] = [
    {
      id: 1,
      tasa: "IVA 0%",
      certificados: 0,
      prima: 0,
      derechos: 0,
      recargos: 0,
      subTotal: 0,
      iva: 0,
      total: 0,
    },
    {
      id: 2,
      tasa: "IVA 8%",
      certificados: 35,
      prima: 9074.1,
      derechos: 0,
      recargos: 0,
      subTotal: 9074.1,
      iva: 725.93,
      total: 9800.03,
    },
    {
      id: 3,
      tasa: "IVA 16%",
      certificados: 248,
      prima: 63103.28,
      derechos: 0,
      recargos: 0,
      subTotal: 63103.28,
      iva: 10096.52,
      total: 73199.8,
    },
    {
      id: 4, // Fila de Totales
      tasa: "Totales",
      certificados: 283,
      prima: 72177.38,
      derechos: 0,
      recargos: 0,
      subTotal: 72177.38,
      iva: 10822.45,
      total: 82999.83,
    },
    {
      id: 4, // Fila de Totales
      tasa: "Totales",
      certificados: 283,
      prima: 72177.38,
      derechos: 0,
      recargos: 0,
      subTotal: 72177.38,
      iva: 10822.45,
      total: 82999.83,
    },
    {
      id: 4, // Fila de Totales
      tasa: "Totales",
      certificados: 283,
      prima: 72177.38,
      derechos: 0,
      recargos: 0,
      subTotal: 72177.38,
      iva: 10822.45,
      total: 82999.83,
    },
    {
      id: 4, // Fila de Totales
      tasa: "Totales",
      certificados: 283,
      prima: 72177.38,
      derechos: 0,
      recargos: 0,
      subTotal: 72177.38,
      iva: 10822.45,
      total: 82999.83,
    },
    {
      id: 4, // Fila de Totales
      tasa: "Totales",
      certificados: 283,
      prima: 72177.38,
      derechos: 0,
      recargos: 0,
      subTotal: 72177.38,
      iva: 10822.45,
      total: 82999.83,
    },
    {
      id: 4, // Fila de Totales
      tasa: "Totales",
      certificados: 283,
      prima: 72177.38,
      derechos: 0,
      recargos: 0,
      subTotal: 72177.38,
      iva: 10822.45,
      total: 82999.83,
    },
    {
      id: 4, // Fila de Totales
      tasa: "Totales",
      certificados: 283,
      prima: 72177.38,
      derechos: 0,
      recargos: 0,
      subTotal: 72177.38,
      iva: 10822.45,
      total: 82999.83,
    },
    {
      id: 4, // Fila de Totales
      tasa: "Totales",
      certificados: 283,
      prima: 72177.38,
      derechos: 0,
      recargos: 0,
      subTotal: 72177.38,
      iva: 10822.45,
      total: 82999.83,
    },
    {
      id: 4, // Fila de Totales
      tasa: "Totales",
      certificados: 283,
      prima: 72177.38,
      derechos: 0,
      recargos: 0,
      subTotal: 72177.38,
      iva: 10822.45,
      total: 82999.83,
    },
    {
      id: 4, // Fila de Totales
      tasa: "Totales",
      certificados: 283,
      prima: 72177.38,
      derechos: 0,
      recargos: 0,
      subTotal: 72177.38,
      iva: 10822.45,
      total: 82999.83,
    },
    {
      id: 4, // Fila de Totales
      tasa: "Totales",
      certificados: 283,
      prima: 72177.38,
      derechos: 0,
      recargos: 0,
      subTotal: 72177.38,
      iva: 10822.45,
      total: 82999.83,
    },
    {
      id: 4, // Fila de Totales
      tasa: "Totales",
      certificados: 283,
      prima: 72177.38,
      derechos: 0,
      recargos: 0,
      subTotal: 72177.38,
      iva: 10822.45,
      total: 82999.83,
    },
  ];
  return (
    <div className="space-y-4 flex flex-col text-center ">
      <h2 className="font-bold">Operativo Acsel (Cifras control)</h2>
      <Table
        tableHeight="h-80"
        data={datos}
        columns={columnas}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => alert(row.nombre)}
        striped
        hoverable
        bordered
        emptyMessage="Sin usuarios"
      />

      <h2 className="font-bold">SAP (Cifra Contable) </h2>
      <Table
        tableHeight="h-80"
        data={datos}
        columns={columnas}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => alert(row.nombre)}
        striped
        hoverable
        bordered
        emptyMessage="Sin usuarios"
      />
    </div>
  );
}

export default Iva;
