"use client";
import React, { useState } from "react";
import { Button, Table, Card } from "@repo/ui";
import { Download, Search, Calendar, User, Activity } from "lucide-react";

// Interfaces
interface RegistroBitacora extends Record<string, unknown> {
  id: number;
  usuarioId: string;
  fechaInicioSesion: string;
  fechaCierreSesion: string | null;
  accionRealizada: string;
  detalles?: string;
}

// Datos dummy estáticos
const DUMMY_REGISTROS: RegistroBitacora[] = [
  {
    id: 1,
    usuarioId: "admin001",
    fechaInicioSesion: "2025-12-12 08:30:15",
    fechaCierreSesion: "2025-12-12 17:45:22",
    accionRealizada: "Login/Logout",
    detalles: "Sesión normal de trabajo",
  },
  {
    id: 2,
    usuarioId: "user002",
    fechaInicioSesion: "2025-12-12 09:15:30",
    fechaCierreSesion: "2025-12-12 18:20:45",
    accionRealizada: "Gestión de Sociedades",
    detalles: "Creación de nueva sociedad ABC S.A.",
  },
  {
    id: 3,
    usuarioId: "admin001",
    fechaInicioSesion: "2025-12-12 10:00:00",
    fechaCierreSesion: null,
    accionRealizada: "Consulta de Reportes",
    detalles: "Sesión activa - consultando bitácora",
  },
  {
    id: 4,
    usuarioId: "user003",
    fechaInicioSesion: "2025-12-12 14:30:15",
    fechaCierreSesion: "2025-12-12 16:15:30",
    accionRealizada: "Gestión de Usuarios",
    detalles: "Edición de perfiles de usuario",
  },
];

export default function Bitacora() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Configuración de columnas para la tabla
  const bitacoraColumns = [
    {
      key: "usuarioId",
      label: "ID Usuario",
      sortable: true,
      render: (registro: RegistroBitacora) => (
        <span className="font-mono text-sm">{registro.usuarioId}</span>
      ),
    },
    {
      key: "fechaInicioSesion",
      label: "Inicio de Sesión",
      sortable: true,
      render: (registro: RegistroBitacora) => (
        <span className="text-sm">{registro.fechaInicioSesion}</span>
      ),
    },
    {
      key: "fechaCierreSesion",
      label: "Cierre de Sesión",
      sortable: true,
      render: (registro: RegistroBitacora) => (
        <span
          className={`text-sm ${
            !registro.fechaCierreSesion ? "text-green-600 font-medium" : ""
          }`}
        >
          {registro.fechaCierreSesion || "Sesión Activa"}
        </span>
      ),
    },
    {
      key: "accionRealizada",
      label: "Acción Realizada",
      sortable: true,
      render: (registro: RegistroBitacora) => (
        <div>
          <span className="text-sm font-medium">
            {registro.accionRealizada}
          </span>
          {registro.detalles && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {registro.detalles}
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bitácora del Usuarios
          </h1>
        </div>
      </div>

      {/* Estadísticas con datos estáticos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Registros">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {DUMMY_REGISTROS.length}
            </p>
          </div>
        </Card>

        <Card title="Sesiones Activas">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              1
            </p>
          </div>
        </Card>

        <Card title="Usuarios Únicos">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              3
            </p>
          </div>
        </Card>

        <Card title="Último Acceso">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-orange-600" />
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
              12/12/2025 14:30
            </p>
          </div>
        </Card>
      </div>

      {/* Tabla de Registros con datos estáticos */}
      <div className="relative overflow-x-auto bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <Table
          data={DUMMY_REGISTROS}
          columns={bitacoraColumns}
          keyExtractor={(registro: RegistroBitacora) => registro.id.toString()}
          emptyMessage="No hay registros de bitácora disponibles"
          hoverable
          bordered
        />
      </div>
    </div>
  );
}
