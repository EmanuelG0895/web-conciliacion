"use client";
import {  Table } from "@repo/ui";
import {  CreditCard,  } from "lucide-react";

interface CuentaContable extends Record<string, unknown> {
  id: number;
  numeroCuenta: string;
  nombre: string;
  sociedadesAsociadas: string[];
  activa: boolean;
}

export default function Page() {
  const cuentasContables: CuentaContable[] = [
    {
      id: 1,
      numeroCuenta: "DUMMY001",
      nombre: "Cuenta Dummy 1",
      sociedadesAsociadas: ["DUMMY_SOC1"],
      activa: true,
    },
    {
      id: 2,
      numeroCuenta: "DUMMY002",
      nombre: "Cuenta Dummy 2",
      sociedadesAsociadas: ["DUMMY_SOC1", "DUMMY_SOC2"],
      activa: false,
    },
  ];

  const cuentasColumns = [
    { key: "numeroCuenta", label: "Número de Cuenta", sortable: true },
    { key: "nombre", label: "Nombre", sortable: true },
    {
      key: "sociedadesAsociadas",
      label: "Sociedades",
      sortable: false,
      render: (cuenta: CuentaContable) => (
        <span>{cuenta.sociedadesAsociadas.join(", ")}</span>
      ),
    },
    {
      key: "activa",
      label: "Estado",
      sortable: true,
      render: (cuenta: CuentaContable) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            cuenta.activa
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {cuenta.activa ? "Activa" : "Inactiva"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Cuentas Contables
        </h2>
      </div>

      <div className="relative overflow-x-auto bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <Table
          data={cuentasContables}
          columns={cuentasColumns}
          keyExtractor={(cuenta) => cuenta.id}
          emptyMessage="No hay cuentas contables registradas"
          hoverable
          bordered
        />
      </div>
    </div>
  );
}
