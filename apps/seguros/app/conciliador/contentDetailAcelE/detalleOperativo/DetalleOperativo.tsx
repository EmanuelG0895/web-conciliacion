import React from "react";
import { TypesDetalleOperativo } from "./types";
import { Table, TableColumn } from "@repo/ui";

export default function DetalleOperativo() {
  const datosDetalle: TypesDetalleOperativo[] = [
    {
      id: 1,
      certificado: "78901234",
      producto: "ICAR",
      sociedad: "Vida",
      fechaEmision: "2025-05-10",
      movimiento: "Emisión",
      prima: 1500.0,
      iva: 240.0,
      total: 1740.0,
    },
    {
      id: 2,
      certificado: "78901235",
      producto: "PCAR",
      sociedad: "Vida",
      fechaEmision: "2025-05-10",
      movimiento: "Emisión",
      prima: 2200.0,
      iva: 352.0,
      total: 2552.0,
    },
    {
      id: 3,
      certificado: "45600122",
      producto: "AUTO TOTAL",
      sociedad: "Daños",
      fechaEmision: "2025-05-10",
      movimiento: "Cancelación",
      prima: -3400.0,
      iva: -544.0,
      total: -3944.0,
    },
  ];

  const columnasDetalle: TableColumn<TypesDetalleOperativo>[] = [
    { key: "certificado", label: "Certificado", sortable: true },
    { key: "producto", label: "Producto", sortable: true },
    { key: "sociedad", label: "Sociedad", sortable: true },
    { key: "fechaEmision", label: "Fec. Emisión", sortable: true },
    { key: "movimiento", label: "Movimiento", sortable: true },
    { key: "prima", label: "Prima (PX_000)", sortable: true },
    { key: "iva", label: "IVA (Calc)", sortable: true },
    { key: "total", label: "Total", sortable: true },
  ];
  return (
    <div className="py-4">
      <Table
        data={datosDetalle}
        columns={columnasDetalle}
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
