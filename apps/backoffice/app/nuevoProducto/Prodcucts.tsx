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
  TableColumn,
} from "@repo/ui";
import { Pen, Plus, Trash2 } from "lucide-react";
import { NuevoProductoFormData, Product, ProductParams } from "./types";
import { Delete } from "./acctions";

export default function NuevoProducto({
  data,
  tableHeader,
}: Readonly<ProductParams>) {
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [productDeleteName, setProductDeleteName] = useState<string | null>(
    null,
  );

  const [confirmationDeletion, setConfirmationDeletion] = useState(Boolean);
  const handleEdit = (row: Product) => {
    // setModalContent(
    //   <Form
    //     onSubmit={onsubmit}
    //     className="flex flex-col"
    //     defaultValues={{
    //       nombre: row.nombre,
    //       codigo: row.codigo,
    //       tipoNegocio: row.tipoNegocio,
    //     }}
    //   >
    //     <Form.Field label="Nombre del Producto" name="nombre" required />
    //     <Form.Field label="Código del Producto" name="codigo" required />
    //     <Form.Select
    //       fullWidth={true}
    //       label="Tipo de Negocio"
    //       name="tipoNegocio"
    //       options={[{ label: row.nombre, value: row.tipoNegocio }]}
    //       required
    //     />
    //     <FormActions>
    //       <Form.SubmitButton>Guardar Producto</Form.SubmitButton>
    //     </FormActions>
    //   </Form>,
    // );
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
      </Form>,
    );
    setOpenModal(true);
  };

  const handleDelete = (row: Product) => {
    setOpenAlert(true);
    if (confirmationDeletion) {
      const response = Delete({ id: row.product_id });
      console.log(response);
      setOpenAlert(false);
    }
  };
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const onsubmit = (data: NuevoProductoFormData & Record<string, unknown>) => {
    console.log("Formulario enviado:", data);
  };

  const dynamicColumns: TableColumn<Product>[] = tableHeader.map((key) => ({
    key: key,
    label: key.replace("_", " ").toUpperCase(),
    sortable: true,
  }));

  const columns: TableColumn<Product>[] = [
    ...dynamicColumns,
    {
      key: "acciones",
      label: "Acciones",
      render: (row: Product) => (
        <div className="flex items-end gap-2">
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
        data={data as Product[]}
        keyExtractor={(row) => row.product_id}
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
            <AlertDialogAction onClick={() => setConfirmationDeletion(true)}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
