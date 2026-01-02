"use client";
import React, { useState } from "react";
import { Table, Button, AlertDialogRoot, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@repo/ui";
import { CreditCard, Edit2, Trash2 } from "lucide-react";

interface CuentaContable extends Record<string, unknown> {
  id: number;
  numeroCuenta: string;
  nombre: string;
  sociedadesAsociadas: string[];
  activa: boolean;
}

export default function Page() {
  const [cuentasContables, setCuentasContables] = useState<CuentaContable[]>([
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
  ]);

  const [deleteCuenta, setDeleteCuenta] = useState<CuentaContable | null>(null);

  const handleEdit = (cuenta: CuentaContable) => {
    alert(`Editar cuenta: ${cuenta.nombre}`);
  };

  const handleDelete = () => {
    if (deleteCuenta) {
      setCuentasContables((prev) => prev.filter((c) => c.id !== deleteCuenta.id));
      setDeleteCuenta(null);
    }
  };

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
    {
      key: "acciones",
      label: "Acciones",
      sortable: false,
      render: (cuenta: CuentaContable) => (
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={() => handleEdit(cuenta)} title="Editar">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setDeleteCuenta(cuenta)} title="Eliminar">
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
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

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialogRoot open={!!deleteCuenta} onOpenChange={() => setDeleteCuenta(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar la cuenta <b>{deleteCuenta?.nombre}</b>? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteCuenta(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
