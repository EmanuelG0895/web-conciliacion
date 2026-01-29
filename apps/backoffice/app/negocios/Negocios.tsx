"use client";
import { Button, Table } from "@repo/ui";
import React from "react";
import { NegociosParams } from "./types";
import { Key, Plus } from "lucide-react";

export default function Negocios({ BusinessList }: Readonly<NegociosParams>) {
  const columns = [
    ...BusinessList,
    { key: "editar", label: "editar" },
    { key: "eliminar", label: "eliminar" },
  ];

  return (
    <div className="space-y-2">
      <Button icon={<Plus />} iconPosition="right">
        Agregar nuevo negocio
      </Button>
      <Table
        columns={[
          { key: "tipo_negocio_id", label: "ID" },
          { key: "tipo_negocio", label: "Tipo de Negocio" },
          { key: "tipo_negocio", label: "Acciones" },
        ]}
        data={BusinessList}
        keyExtractor={(row) => row.tipo_negocio_id.toString()}
      />
    </div>
  );
}
