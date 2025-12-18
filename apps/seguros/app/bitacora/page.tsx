"use client";
import React, { useState } from "react";
import { Button, Table, Form, Card } from "@repo/ui";
import type { SelectOption } from "@repo/ui";
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

interface FiltrosBitacora extends Record<string, unknown> {
  fechaInicio: string;
  fechaFin: string;
  usuarioId: string;
  accion: string;
}

// Datos iniciales de ejemplo
const initialRegistros: RegistroBitacora[] = [
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
  {
    id: 5,
    usuarioId: "user002",
    fechaInicioSesion: "2025-12-11 08:45:20",
    fechaCierreSesion: "2025-12-11 17:30:10",
    accionRealizada: "Gestión de Productos",
    detalles: "Configuración de productos de seguros",
  },
  {
    id: 6,
    usuarioId: "admin001",
    fechaInicioSesion: "2025-12-11 07:30:00",
    fechaCierreSesion: "2025-12-11 19:45:15",
    accionRealizada: "Administración del Sistema",
    detalles: "Configuración y mantenimiento general",
  },
];

export default function Bitacora() {
  const [registros, setRegistros] =
    useState<RegistroBitacora[]>(initialRegistros);
  const [filteredRegistros, setFilteredRegistros] =
    useState<RegistroBitacora[]>(initialRegistros);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Función para descargar TXT
  const handleDownloadTXT = () => {
    const txtContent = generateTXTContent(filteredRegistros);
    const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bitacora_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Generar contenido TXT
  const generateTXTContent = (data: RegistroBitacora[]): string => {
    let content = "BITÁCORA DEL SISTEMA\\n";
    content += "========================\\n";
    content += `Generado el: ${new Date().toLocaleString("es-ES")}\\n`;
    content += `Total de registros: ${data.length}\\n\\n`;

    data.forEach((registro, index) => {
      content += `Registro ${index + 1}:\\n`;
      content += `ID Usuario: ${registro.usuarioId}\\n`;
      content += `Inicio de Sesión: ${registro.fechaInicioSesion}\\n`;
      content += `Cierre de Sesión: ${registro.fechaCierreSesion || "Sesión activa"}\\n`;
      content += `Acción Realizada: ${registro.accionRealizada}\\n`;
      if (registro.detalles) {
        content += `Detalles: ${registro.detalles}\\n`;
      }
      content += "------------------------\\n";
    });

    content += "\\nFin del reporte";
    return content;
  };

  // Función para aplicar filtros
  const handleFilter = (filtros: FiltrosBitacora) => {
    let filtered = [...registros];

    if (filtros.usuarioId && filtros.usuarioId !== "all") {
      filtered = filtered.filter((r) =>
        r.usuarioId.toLowerCase().includes(filtros.usuarioId.toLowerCase())
      );
    }

    if (filtros.accion && filtros.accion !== "all") {
      filtered = filtered.filter((r) =>
        r.accionRealizada.toLowerCase().includes(filtros.accion.toLowerCase())
      );
    }

    if (filtros.fechaInicio) {
      filtered = filtered.filter(
        (r) => r.fechaInicioSesion >= filtros.fechaInicio
      );
    }

    if (filtros.fechaFin) {
      filtered = filtered.filter(
        (r) => r.fechaInicioSesion <= filtros.fechaFin + " 23:59:59"
      );
    }

    setFilteredRegistros(filtered);
    setIsFilterOpen(false);
  };

  // Limpiar filtros
  const handleClearFilters = () => {
    setFilteredRegistros(registros);
    setIsFilterOpen(false);
  };

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
          className={`text-sm ${!registro.fechaCierreSesion ? "text-green-600 font-medium" : ""}`}
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

  const accionesOptions: SelectOption[] = [
    { value: "all", label: "Todas las acciones" },
    { value: "Login/Logout", label: "Login/Logout" },
    { value: "Gestión de Sociedades", label: "Gestión de Sociedades" },
    { value: "Gestión de Usuarios", label: "Gestión de Usuarios" },
    { value: "Gestión de Productos", label: "Gestión de Productos" },
    { value: "Consulta de Reportes", label: "Consulta de Reportes" },
    {
      value: "Administración del Sistema",
      label: "Administración del Sistema",
    },
  ];

  const usuariosOptions: SelectOption[] = [
    { value: "all", label: "Todos los usuarios" },
    { value: "admin001", label: "Administrador 001" },
    { value: "user002", label: "Usuario 002" },
    { value: "user003", label: "Usuario 003" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bitácora del Sistema
          </h1>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Filtros
          </Button>
          <Button
            onClick={handleDownloadTXT}
            variant="default"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Descargar TXT
          </Button>
        </div>
      </div>

      {/* Panel de Filtros */}
      {isFilterOpen && (
        <Card title="Filtros de Búsqueda" className="shadow-sm">
          <Form<FiltrosBitacora>
            onSubmit={handleFilter}
            defaultValues={{
              fechaInicio: "",
              fechaFin: "",
              usuarioId: "all",
              accion: "all",
            }}
            mode="onChange"
          >
            <Form.Section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Form.Select
                  name="usuarioId"
                  label="Usuario"
                  options={usuariosOptions}
                  placeholder="Seleccionar usuario"
                  variant="outlined"
                  size="md"
                  helperText="Filtrar por usuario específico"
                  fullWidth
                />

                <Form.Select
                  name="accion"
                  label="Tipo de Acción"
                  options={accionesOptions}
                  placeholder="Seleccionar acción"
                  variant="outlined"
                  size="md"
                  helperText="Filtrar por tipo de actividad"
                  fullWidth
                />

                <Form.Field
                  name="fechaInicio"
                  label="Fecha de Inicio"
                  type="date"
                  variant="outlined"
                  size="md"
                  fullWidth
                />

                <Form.Field
                  name="fechaFin"
                  label="Fecha de Fin"
                  type="date"
                  variant="outlined"
                  size="md"
                  fullWidth
                />
              </div>

              <Form.Actions align="left">
                <Form.SubmitButton variant="default">
                  <Search className="w-4 h-4 mr-2" />
                  Aplicar Filtros
                </Form.SubmitButton>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearFilters}
                >
                  Limpiar Filtros
                </Button>
              </Form.Actions>
            </Form.Section>
          </Form>
        </Card>
      )}

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Registros">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {filteredRegistros.length}
            </p>
          </div>
        </Card>

        <Card title="Sesiones Activas">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {filteredRegistros.filter((r) => !r.fechaCierreSesion).length}
            </p>
          </div>
        </Card>

        <Card title="Usuarios Únicos">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {new Set(filteredRegistros.map((r) => r.usuarioId)).size}
            </p>
          </div>
        </Card>

        <Card title="Último Acceso">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-orange-600" />
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
              {filteredRegistros.length > 0
                ? new Date(
                    Math.max(
                      ...filteredRegistros.map((r) =>
                        new Date(r.fechaInicioSesion).getTime()
                      )
                    )
                  ).toLocaleString("es-ES")
                : "N/A"}
            </p>
          </div>
        </Card>
      </div>

      {/* Tabla de Registros */}
      <div className="relative overflow-x-auto bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <Table
          data={filteredRegistros}
          columns={bitacoraColumns}
          keyExtractor={(registro) => registro.id}
          emptyMessage="No hay registros de bitácora disponibles"
          hoverable
          bordered
        />
      </div>
    </div>
  );
}
