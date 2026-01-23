"use client";
import { JSX, useState, useTransition } from "react";
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
import { Product, ProductParams } from "./types";
import { Delete, Edit, Create } from "./acctions";
import { AddInfo, ProductType } from "@repo/api";

export default function NuevoProducto({
  data,
  tableHeader,
}: Readonly<ProductParams>) {
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [productDeleteName, setProductDeleteName] = useState<string | null>(
    null,
  );
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [isPending, startTransition] = useTransition();
  const handleEdit = (row: Product) => {
    setModalContent(
      <Form
        onSubmit={(data) => handleSubmitEdit(row.product_id, data)}
        className="flex flex-col"
        defaultValues={{
          producto: row.producto,
          codigo: row.codigo,
          rfc: row.rfc,
        }}
      >
        <Form.Field label="Nombre del Producto" name="producto" required />
        <Form.Field label="Código del Producto" name="codigo" required />
        <Form.Field label="RFC" name="rfc" required />
        <FormActions>
          <Form.SubmitButton disabled={isPending}>
            {isPending ? "Guardando..." : "Guardar Cambios"}
          </Form.SubmitButton>
        </FormActions>
      </Form>,
    );
    setOpenModal(true);
  };

  const handleCreate = () => {
    setModalContent(
      <Form
        onSubmit={handleSubmitCreate}
        className="flex flex-col"
        defaultValues={{
          producto: "",
          codigo: "",
          rfc: "",
          product_id: "",
          tipo_negocio_id: 1,
          status: 1,
        }}
      >
        <Form.Field label="ID del Producto" name="product_id" required />
        <Form.Field label="Nombre del Producto" name="producto" required />
        <Form.Field label="Código del Producto" name="codigo" required />
        <Form.Field label="RFC" name="rfc" required />
        <Form.Field
          label="Tipo de Negocio ID"
          name="tipo_negocio_id"
          type="number"
          required
        />
        <Form.Field
          label="Estado"
          name="status"
          type="number"
          required
        />
        <FormActions>
          <Form.SubmitButton disabled={isPending}>
            {isPending ? "Creando..." : "Crear Producto"}
          </Form.SubmitButton>
        </FormActions>
      </Form>,
    );
    setOpenModal(true);
  };

  const handleDelete = (row: Product) => {
    setProductDeleteName(row.producto);
    setProductToDelete(row.product_id);
    setOpenAlert(true);
  };

  const handleSubmitCreate = (data: AddInfo) => {
    startTransition(async () => {
      try {
        const response = await Create(data);
        console.log("Producto creado:", response);
        
        // Verificar si la operación fue exitosa basándose en la respuesta
        if (response?.success === true) {
          setSuccessMessage(`Producto "${data.producto}" creado correctamente`);
          setOpenSuccessAlert(true);
          setOpenModal(false);
        } else {
          // Manejar error de la API
          const errorMsg = response?.message || "Error al crear el producto";
          setErrorMessage(`Error al crear producto: ${errorMsg}`);
          setOpenErrorAlert(true);
        }
      } catch (error) {
        console.error("Error al crear producto:", error);
        setErrorMessage(`Error al crear producto: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        setOpenErrorAlert(true);
      }
    });
  };

  const handleSubmitEdit = (id: string, data: Partial<ProductType>) => {
    startTransition(async () => {
      try {
        const response = await Edit({ id, ...data });
        console.log("Producto editado:", response);
        
        // Verificar si la operación fue exitosa basándose en la respuesta
        if (response?.success === true) {
          setSuccessMessage(`Producto "${data.producto || 'ID: ' + id}" editado correctamente`);
          setOpenSuccessAlert(true);
          setOpenModal(false);
        } else {
          // Manejar error de la API
          const errorMsg = response?.message || "Error al editar el producto";
          setErrorMessage(`Error al editar producto: ${errorMsg}`);
          setOpenErrorAlert(true);
        }
      } catch (error) {
        console.error("Error al editar producto:", error);
        setErrorMessage(`Error al editar producto: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        setOpenErrorAlert(true);
      }
    });
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      startTransition(async () => {
        try {
          const response = await Delete({ id: productToDelete });
          console.log("Producto eliminado:", response);
          
          // Verificar si la operación fue exitosa basándose en la respuesta
          if (response?.success === true) {
            setSuccessMessage(`Producto "${productDeleteName}" eliminado correctamente`);
            setOpenSuccessAlert(true);
          } else {
            // Manejar error de la API
            const errorMsg = response?.message || "Error al eliminar el producto";
            setErrorMessage(`Error al eliminar producto: ${errorMsg}`);
            setOpenErrorAlert(true);
          }
          
          setOpenAlert(false);
          setProductToDelete(null);
          setProductDeleteName(null);
        } catch (error) {
          console.error("Error al eliminar producto:", error);
          setErrorMessage(`Error al eliminar producto: ${error instanceof Error ? error.message : 'Error desconocido'}`);
          setOpenErrorAlert(true);
          setOpenAlert(false);
          setProductToDelete(null);
          setProductDeleteName(null);
        }
      });
    }
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
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isPending}
            >
              {isPending ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>

      <AlertDialogRoot
        open={openSuccessAlert}
        onOpenChange={() => setOpenSuccessAlert(!openSuccessAlert)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¡Operación exitosa!
            </AlertDialogTitle>
            <AlertDialogDescription>
              {successMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenSuccessAlert(false)}>
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>

      <AlertDialogRoot
        open={openErrorAlert}
        onOpenChange={() => setOpenErrorAlert(!openErrorAlert)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¡Error en la operación!
            </AlertDialogTitle>
            <AlertDialogDescription>
              {errorMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setOpenErrorAlert(false)}
            >
              Entendido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
