"use client";
import { JSX, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  FormActions,
  AlertDialogRoot,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@repo/ui";
import { Pen, Plus, Trash2 } from "lucide-react";
import { NuevoProductoFormData, Product } from "./types";

// Dummy data
const mockProductos: Product[] = [
  {
    id: "1",
    nombre: "Seguro de Vida Individual",
    codigo: "SVI001",
    tipoNegocio: "masivo",
    cuentasContables: [
      { id: "1", codigo: "1100001", nombre: "Caja" },
      { id: "3", codigo: "4100001", nombre: "Ingresos por Primas" },
    ],
    fechaCreacion: "2024-01-15",
  },
  {
    id: "2",
    nombre: "Seguro Corporativo Empresarial",
    codigo: "SCE002",
    tipoNegocio: "corporativo",
    cuentasContables: [
      { id: "4", codigo: "2100001", nombre: "Reservas Técnicas" },
      { id: "7", codigo: "2200001", nombre: "Siniestros por Pagar" },
    ],
    fechaCreacion: "2024-02-20",
  },
];

export default function NuevoProducto() {
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [productDeleteName, setProductDeleteName] = useState<string | null>(
    null
  );

  const handleEdit = (row: Product) => {
    setModalContent(
      <Form
        onSubmit={onsubmit}
        className="flex flex-col"
        defaultValues={{
          nombre: row.nombre,
          codigo: row.codigo,
          tipoNegocio: row.tipoNegocio,
        }}
      >
        <Form.Field label="Nombre del Producto" name="nombre" required />
        <Form.Field label="Código del Producto" name="codigo" required />
        <Form.Select
          fullWidth={true}
          label="Tipo de Negocio"
          name="tipoNegocio"
          options={[{ label: row.nombre, value: row.tipoNegocio }]}
          required
        />
        <FormActions>
          <Form.SubmitButton>Guardar Producto</Form.SubmitButton>
        </FormActions>
      </Form>
    );
    setOpenModal(true);
  };

  const handleCreate = () => {
    setModalContent(
      <Form
        onSubmit={onsubmit}
        className="flex flex-col"
        defaultValues={{
          nombre: "",
          codigo: "",
          tipoNegocio: "",
        }}
      >
        <Form.Field label="Nombre del Producto" name="nombre" required />
        <Form.Field label="Código del Producto" name="codigo" required />
        <Form.Select
          fullWidth={true}
          label="Tipo de Negocio"
          name="tipoNegocio"
          options={[
            { label: "Masivo", value: "masivo" },
            { label: "Corporativo", value: "corporativo" },
          ]}
          required
        />
        <FormActions>
          <Form.SubmitButton>Guardar Producto</Form.SubmitButton>
        </FormActions>
      </Form>
    );
    setOpenModal(true);
  };

  const handleDelete = (row: Product) => {
    setProductDeleteName(row.nombre);
    setOpenAlert(true);
  };
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const onsubmit = (data: NuevoProductoFormData & Record<string, unknown>) => {
    console.log("Formulario enviado:", data);
    //setOpenModal(false);
  };

  const columns = [
    {
      key: "nombre",
      label: "Nombre",
      sortable: true,
    },
    {
      key: "codigo",
      label: "Código",
      sortable: true,
    },
    {
      key: "tipoNegocio",
      label: "Tipo de Negocio",
      sortable: true,
      render: (row: Product) =>
        row.tipoNegocio === "masivo" ? "Masivo" : "Corporativo",
    },
    {
      key: "cuentasContables",
      label: "Cuentas Contables",
      render: (row: Product) =>
        row.cuentasContables.map((c) => c.nombre).join(", "),
    },
    {
      key: "fechaCreacion",
      label: "Fecha Creación",
      sortable: true,
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (row: Product) => (
        <div className="flex gap-2">
          <Button
            icon={<Pen />}
            iconPosition="right"
            size="sm"
            variant="default"
            onClick={() => handleEdit(row)}
          >
            Editar
          </Button>
          <Button
            icon={<Trash2 />}
            iconPosition="right"
            size="sm"
            variant="danger"
            onClick={() => handleDelete(row)}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6 text-center">Productos</h1>
        <Button
          icon={<Plus />}
          iconPosition="right"
          onClick={() => handleCreate()}
        >
          Nuevo Producto
        </Button>
      </div>
      <Table<Product>
        columns={columns}
        data={mockProductos}
        keyExtractor={(row) => row.id}
      />

      <Modal
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
        title="editar?eliminar"
      >
        {modalContent}
      </Modal>

      <AlertDialogRoot
        open={openAlert}
        onOpenChange={() => setOpenAlert(!openAlert)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro de eliminar {productDeleteName}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
