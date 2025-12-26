"use client";
import React, { useState } from "react";
import { Button, Modal, Table, Form, DynamicTabs } from "@repo/ui";
import {
  AlertTriangle,
  Edit2,
  Plus,
  Trash2,
  Building2,
  Package,
  CreditCard,
} from "lucide-react";
import {
  AlertDialogRoot,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@repo/ui";

// Interfaces para entidades
interface Sociedad extends Record<string, unknown> {
  id: number;
  rfc: string;
  razonSocial: string;
  numeroSociedadSAP: string;
  productos: Producto[];
}

interface Producto extends Record<string, unknown> {
  id: number;
  nombre: string;
  codigo: string;
  tipoNegocio: string;
  cuentasContables: number[];
}

interface CuentaContable extends Record<string, unknown> {
  id: number;
  numeroCuenta: string;
  nombre: string;
  sociedadesAsociadas: string[];
  activa: boolean;
}

// Interfaces para formularios (sin campos autogenerados)
interface SociedadForm extends Record<string, unknown> {
  rfc: string;
  razonSocial: string;
  numeroSociedadSAP: string;
}

interface ProductoForm extends Record<string, unknown> {
  nombre: string;
  codigo: string;
  tipoNegocio: string;
}

interface CuentaForm extends Record<string, unknown> {
  numeroCuenta: string;
  nombre: string;
}

// Datos iniciales
const initialSociedades: Sociedad[] = [
  {
    id: 1,
    rfc: "ABC123456789",
    razonSocial: "Sociedad ABC S.A. de C.V.",
    numeroSociedadSAP: "1001",
    productos: [
      {
        id: 1,
        nombre: "Seguro Vida",
        codigo: "SV001",
        tipoNegocio: "Vida",
        cuentasContables: [1, 2],
      },
    ],
  },
  {
    id: 2,
    rfc: "DEF987654321",
    razonSocial: "Corporativo DEF S.A.",
    numeroSociedadSAP: "1002",
    productos: [
      {
        id: 2,
        nombre: "Seguro Auto",
        codigo: "SA001",
        tipoNegocio: "Daños",
        cuentasContables: [2, 3],
      },
    ],
  },
];

const initialCuentasContables: CuentaContable[] = [
  {
    id: 1,
    numeroCuenta: "1100001",
    nombre: "Caja y Bancos",
    sociedadesAsociadas: ["ABC123456789"],
    activa: true,
  },
  {
    id: 2,
    numeroCuenta: "1200001",
    nombre: "Inversiones",
    sociedadesAsociadas: ["ABC123456789", "DEF987654321"],
    activa: true,
  },
  {
    id: 3,
    numeroCuenta: "2100001",
    nombre: "Reservas Técnicas",
    sociedadesAsociadas: ["DEF987654321"],
    activa: true,
  },
];

export default function Sociedades() {
  // Estados para sociedades
  const [sociedades, setSociedades] = useState<Sociedad[]>(initialSociedades);
  const [isSociedadModalOpen, setIsSociedadModalOpen] = useState(false);
  const [editingSociedad, setEditingSociedad] = useState<Sociedad | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [sociedadToDelete, setSociedadToDelete] = useState<number | null>(null);

  // Estados para productos
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedSociedadForProduct, setSelectedSociedadForProduct] = useState<
    number | null
  >(null);

  // Estados para cuentas contables
  const [cuentasContables, setCuentasContables] = useState<CuentaContable[]>(
    initialCuentasContables
  );
  const [isCuentaModalOpen, setIsCuentaModalOpen] = useState(false);
  const [editingCuenta, setEditingCuenta] = useState<CuentaContable | null>(
    null
  );
  const [cuentaToToggle, setCuentaToToggle] = useState<number | null>(null);
  const [isToggleAlertOpen, setIsToggleAlertOpen] = useState(false);

  // Handlers para sociedades
  const handleCreateSociedad = () => {
    setEditingSociedad(null);
    setIsSociedadModalOpen(true);
  };

  const handleEditSociedad = (id: number) => {
    const sociedad = sociedades.find((s) => s.id === id);
    if (sociedad) {
      setEditingSociedad(sociedad);
      setIsSociedadModalOpen(true);
    }
  };

  const handleSaveSociedad = (data: SociedadForm) => {
    if (editingSociedad) {
      setSociedades((prev) =>
        prev.map((s) => (s.id === editingSociedad.id ? { ...s, ...data } : s))
      );
    } else {
      const newId = Math.max(...sociedades.map((s) => s.id), 0) + 1;
      setSociedades((prev) => [...prev, { id: newId, productos: [], ...data }]);
    }
    setIsSociedadModalOpen(false);
  };

  const handleDeleteSociedad = (id: number) => {
    setSociedadToDelete(id);
    setIsDeleteAlertOpen(true);
  };

  const confirmDeleteSociedad = () => {
    if (sociedadToDelete) {
      setSociedades((prev) => prev.filter((s) => s.id !== sociedadToDelete));
      setSociedadToDelete(null);
    }
    setIsDeleteAlertOpen(false);
  };

  // Handlers para productos
  const handleAddProduct = (sociedadId: number) => {
    setSelectedSociedadForProduct(sociedadId);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (data: ProductoForm) => {
    if (selectedSociedadForProduct) {
      const newProductId =
        Math.max(
          ...sociedades.flatMap((s) => s.productos).map((p) => p.id),
          0
        ) + 1;
      setSociedades((prev) =>
        prev.map((s) =>
          s.id === selectedSociedadForProduct
            ? {
                ...s,
                productos: [
                  ...s.productos,
                  { id: newProductId, cuentasContables: [], ...data },
                ],
              }
            : s
        )
      );
    }
    setIsProductModalOpen(false);
    setSelectedSociedadForProduct(null);
  };

  // Handlers para cuentas contables
  const handleCreateCuenta = () => {
    setEditingCuenta(null);
    setIsCuentaModalOpen(true);
  };

  const handleEditCuenta = (id: number) => {
    const cuenta = cuentasContables.find((c) => c.id === id);
    if (cuenta) {
      setEditingCuenta(cuenta);
      setIsCuentaModalOpen(true);
    }
  };

  const handleSaveCuenta = (data: CuentaForm) => {
    if (editingCuenta) {
      setCuentasContables((prev) =>
        prev.map((c) => (c.id === editingCuenta.id ? { ...c, ...data } : c))
      );
    } else {
      const newId = Math.max(...cuentasContables.map((c) => c.id), 0) + 1;
      setCuentasContables((prev) => [
        ...prev,
        { id: newId, sociedadesAsociadas: [], activa: true, ...data },
      ]);
    }
    setIsCuentaModalOpen(false);
  };

  const handleToggleCuenta = (id: number) => {
    setCuentaToToggle(id);
    setIsToggleAlertOpen(true);
  };

  const confirmToggleCuenta = () => {
    if (cuentaToToggle) {
      setCuentasContables((prev) =>
        prev.map((c) =>
          c.id === cuentaToToggle ? { ...c, activa: !c.activa } : c
        )
      );
      setCuentaToToggle(null);
    }
    setIsToggleAlertOpen(false);
  };

  // Configuración de columnas para tabla de sociedades
  const sociedadesColumns = [
    { key: "rfc", label: "RFC", sortable: true },
    { key: "razonSocial", label: "Razón Social", sortable: true },
    { key: "numeroSociedadSAP", label: "No. SAP", sortable: true },
    {
      key: "productos",
      label: "Productos",
      sortable: false,
      render: (sociedad: Sociedad) => (
        <span>{sociedad.productos.length} producto(s)</span>
      ),
    },
    {
      key: "actions",
      label: "Acciones",
      sortable: false,
      render: (sociedad: Sociedad) => (
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleAddProduct(sociedad.id)}
            className="flex items-center text-sm font-medium text-green-600 hover:text-green-800 hover:underline"
          >
            <Package className="w-4 h-4 mr-1" /> Productos
          </button>
          <button
            onClick={() => handleEditSociedad(sociedad.id)}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            <Edit2 className="w-4 h-4 mr-1" /> Editar
          </button>
          <button
            onClick={() => handleDeleteSociedad(sociedad.id)}
            className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 hover:underline"
          >
            <Trash2 className="w-4 h-4 mr-1" /> Eliminar
          </button>
        </div>
      ),
    },
  ];

  // Configuración de columnas para tabla de cuentas contables
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
      key: "actions",
      label: "Acciones",
      sortable: false,
      render: (cuenta: CuentaContable) => (
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleEditCuenta(cuenta.id)}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            <Edit2 className="w-4 h-4 mr-1" /> Editar
          </button>
          <button
            onClick={() => handleToggleCuenta(cuenta.id)}
            className={`flex items-center text-sm font-medium hover:underline ${
              cuenta.activa
                ? "text-red-600 hover:text-red-800"
                : "text-green-600 hover:text-green-800"
            }`}
          >
            <AlertTriangle className="w-4 h-4 mr-1" />
            {cuenta.activa ? "Inhabilitar" : "Activar"}
          </button>
        </div>
      ),
    },
  ];

  const tiposNegocioOptions = [
    { value: "Vida", label: "Vida" },
    { value: "Daños", label: "Daños" },
    { value: "Fianzas", label: "Fianzas" },
    { value: "Accidentes", label: "Accidentes y Enfermedades" },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <DynamicTabs
        options={[
          {
            label: "Gestión de sociedades",
            content: (
              <>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold flex items-center">
                      <Building2 className="w-6 h-6 mr-2" />
                      Gestión de Sociedades
                    </h1>
                    <Button onClick={handleCreateSociedad} variant="default">
                      <Plus className="w-4 h-4 mr-2" /> Nueva Sociedad
                    </Button>
                  </div>

                  <div className="relative overflow-x-auto bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                    <Table
                      data={sociedades}
                      columns={sociedadesColumns}
                      keyExtractor={(sociedad) => sociedad.id}
                      emptyMessage="No hay sociedades registradas"
                      hoverable
                      bordered
                    />
                  </div>
                </div>
              </>
            ),
          },
          {
            label: "Gestión de cuentas contables",
            content: (
              <>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Cuentas Contables
                    </h2>
                    <Button onClick={handleCreateCuenta} variant="default">
                      <Plus className="w-4 h-4 mr-2" /> Nueva Cuenta
                    </Button>
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
              </>
            ),
          },
        ]}
      />

      {/* Sección de Cuentas Contables */}

      {/* Modal Sociedad */}
      {isSociedadModalOpen && (
        <Modal
          onClose={() => setIsSociedadModalOpen(false)}
          title={
            editingSociedad
              ? `Editar Sociedad: ${editingSociedad.razonSocial}`
              : "Nueva Sociedad"
          }
          size="medium"
        >
          <Form<SociedadForm>
            onSubmit={handleSaveSociedad}
            defaultValues={
              editingSociedad || {
                rfc: "",
                razonSocial: "",
                numeroSociedadSAP: "",
              }
            }
            className="space-y-4"
          >
            <Form.Field
              name="rfc"
              label="RFC"
              placeholder="ABC123456789"
              required
              fullWidth
            />
            <Form.Field
              name="razonSocial"
              label="Razón Social"
              placeholder="Sociedad Example S.A. de C.V."
              required
              fullWidth
            />
            <Form.Field
              name="numeroSociedadSAP"
              label="Número de Sociedad SAP"
              placeholder="1001"
              required
              fullWidth
            />

            <Form.Actions>
              <Form.CancelButton onClick={() => setIsSociedadModalOpen(false)}>
                Cancelar
              </Form.CancelButton>
              <Form.SubmitButton>
                {editingSociedad ? "Guardar Cambios" : "Crear Sociedad"}
              </Form.SubmitButton>
            </Form.Actions>
          </Form>
        </Modal>
      )}

      {/* Modal Producto */}
      {isProductModalOpen && (
        <Modal
          onClose={() => setIsProductModalOpen(false)}
          title="Agregar Producto a Sociedad"
          size="medium"
        >
          <Form<ProductoForm>
            onSubmit={handleSaveProduct}
            defaultValues={{ nombre: "", codigo: "", tipoNegocio: "" }}
            className="space-y-4"
          >
            <Form.Field
              name="nombre"
              label="Nombre del Producto"
              placeholder="Seguro de Vida Individual"
              required
              fullWidth
            />
            <Form.Field
              name="codigo"
              label="Código del Producto"
              placeholder="SVI001"
              required
              fullWidth
            />
            <Form.Select
              name="tipoNegocio"
              label="Tipo de Negocio"
              options={tiposNegocioOptions}
              placeholder="Selecciona el tipo"
              required
              fullWidth
            />

            <Form.Actions>
              <Form.CancelButton onClick={() => setIsProductModalOpen(false)}>
                Cancelar
              </Form.CancelButton>
              <Form.SubmitButton>Agregar Producto</Form.SubmitButton>
            </Form.Actions>
          </Form>
        </Modal>
      )}

      {/* Modal Cuenta Contable */}
      {isCuentaModalOpen && (
        <Modal
          onClose={() => setIsCuentaModalOpen(false)}
          title={
            editingCuenta
              ? `Editar Cuenta: ${editingCuenta.numeroCuenta}`
              : "Nueva Cuenta Contable"
          }
          size="medium"
        >
          <Form<CuentaForm>
            onSubmit={handleSaveCuenta}
            defaultValues={editingCuenta || { numeroCuenta: "", nombre: "" }}
            className="space-y-4"
          >
            <Form.Field
              name="numeroCuenta"
              label="Número de Cuenta"
              placeholder="1100001"
              required
              fullWidth
            />
            <Form.Field
              name="nombre"
              label="Nombre de la Cuenta"
              placeholder="Caja y Bancos"
              required
              fullWidth
            />

            <Form.Actions>
              <Form.CancelButton onClick={() => setIsCuentaModalOpen(false)}>
                Cancelar
              </Form.CancelButton>
              <Form.SubmitButton>
                {editingCuenta ? "Guardar Cambios" : "Crear Cuenta"}
              </Form.SubmitButton>
            </Form.Actions>
          </Form>
        </Modal>
      )}

      {/* Alert Dialog Delete Sociedad */}
      <AlertDialogRoot
        open={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
      >
        <AlertDialogContent className="border-2 border-red-500 shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Confirmar Eliminación de Sociedad
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2 p-3 rounded-md bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300">
              ¿Estás seguro de que deseas eliminar esta sociedad? Esta acción
              eliminará también todos los productos asociados y no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteAlertOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteSociedad}
              className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400"
            >
              <AlertTriangle className="w-4 h-4 mr-2 text-white" />
              Sí, Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>

      {/* Alert Dialog Toggle Cuenta */}
      <AlertDialogRoot
        open={isToggleAlertOpen}
        onOpenChange={setIsToggleAlertOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {cuentaToToggle &&
              cuentasContables.find((c) => c.id === cuentaToToggle)?.activa
                ? "Inhabilitar Cuenta"
                : "Activar Cuenta"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas{" "}
              {cuentaToToggle &&
              cuentasContables.find((c) => c.id === cuentaToToggle)?.activa
                ? "inhabilitar"
                : "activar"}{" "}
              esta cuenta contable?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsToggleAlertOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmToggleCuenta}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
