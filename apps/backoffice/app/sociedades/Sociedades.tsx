"use client";
import {
  AlertTriangle,
  Edit2,
  Plus,
  Trash2,
  Building2,
  Pen,
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
  Button,
  Modal,
  Table,
  Form,
  FormActions,
  TableColumn,
} from "@repo/ui";
import React, { useState, useTransition } from "react";
import { SociedadParams } from "./types";
import { Delete, Edit, Create } from "./accions";
import { SocietyType } from "@repo/api";

export default function Sociedades({
  data,
  tableHeader,
}: Readonly<SociedadParams>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editSociedad, setEditSociedad] = useState<SocietyType | null>(null);
  const [deleteSociedad, setDeleteSociedad] = useState<SocietyType | null>(
    null,
  );
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const getSubmitButtonText = () => {
    if (isPending) {
      return editSociedad ? "Guardando..." : "Creando...";
    }
    return editSociedad ? "Guardar Cambios" : "Crear Sociedad";
  };

  const handleOpenCreate = () => {
    setEditSociedad(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (soc: SocietyType) => {
    setEditSociedad(soc);
    setModalOpen(true);
  };

  const handleSave = (formData: any) => {
    startTransition(async () => {
      try {
        let response;
        if (editSociedad) {
          // Solo enviar RFC y razón social para edición
          response = await Edit({
            rfc: editSociedad.rfc,
            razon_social: formData.razon_social,
          });
        } else {
          response = await Create(formData as SocietyType);
        }

        if (response && "success" in response && response.success === true) {
          const action = editSociedad ? "editada" : "creada";
          setSuccessMessage(
            `Sociedad "${formData.razon_social}" ${action} correctamente`,
          );
          setOpenSuccessAlert(true);
          setModalOpen(false);
        } else {
          const errorMsg =
            response && "message" in response
              ? response.message
              : "Error en la operación";
          setErrorMessage(`Error: ${errorMsg}`);
          setOpenErrorAlert(true);
        }
      } catch (error) {
        console.error("Error en operación:", error);
        setErrorMessage(
          `Error: ${error instanceof Error ? error.message : "Error desconocido"}`,
        );
        setOpenErrorAlert(true);
      }
    });
  };

  const handleDelete = () => {
    if (deleteSociedad) {
      startTransition(async () => {
        try {
          const response = await Delete({ id: deleteSociedad.rfc });

          if (response && "success" in response && response.success === true) {
            setSuccessMessage(
              `Sociedad "${deleteSociedad.razon_social}" eliminada correctamente`,
            );
            setOpenSuccessAlert(true);
          } else {
            const errorMsg =
              response && "message" in response
                ? response.message
                : "Error al eliminar la sociedad";
            setErrorMessage(`Error: ${errorMsg}`);
            setOpenErrorAlert(true);
          }

          setDeleteSociedad(null);
        } catch (error) {
          console.error("Error eliminando sociedad:", error);
          setErrorMessage(
            `Error: ${error instanceof Error ? error.message : "Error desconocido"}`,
          );
          setOpenErrorAlert(true);
          setDeleteSociedad(null);
        }
      });
    }
  };

  const dynamicColumns: TableColumn<SocietyType>[] = tableHeader
    .filter((column) => column.key !== "ramo_id")
    .map((column) => ({
      key: column.key,
      label:
        typeof column.key === "string"
          ? column.key.replaceAll("_", " ").toUpperCase()
          : String(column.key),
      sortable: true,
    }));

  const sociedadesColumns: TableColumn<SocietyType>[] = [
    ...dynamicColumns,
    {
      key: "acciones",
      label: "Acciones",
      sortable: false,
      render: (sociedad: SocietyType) => (
        <div className="flex gap-2">
          <Button
            icon={<Pen />}
            iconPosition="right"
            size="sm"
            variant="default"
            title="Editar"
            onClick={() => handleOpenEdit(sociedad)}
          >
            Editar
          </Button>
          <Button
            icon={<Trash2 />}
            iconPosition="right"
            size="sm"
            variant="danger"
            title="Eliminar"
            onClick={() => setDeleteSociedad(sociedad)}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="space-y-4 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Building2 className="w-6 h-6 mr-2" />
            Gestión de Sociedades
          </h1>
          <Button
            onClick={handleOpenCreate}
            variant="default"
            size="sm"
            icon={<Plus />}
            iconPosition="right"
          >
            Nueva Sociedad
          </Button>
        </div>
        <Table<SocietyType>
          data={data}
          columns={sociedadesColumns}
          keyExtractor={(sociedad) => sociedad.rfc}
          emptyMessage="No hay sociedades registradas"
          hoverable
          bordered
        />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editSociedad ? "Editar Sociedad" : "Nueva Sociedad"}
      >
        <Form
          onSubmit={handleSave}
          defaultValues={
            editSociedad
              ? {
                  razon_social: editSociedad.razon_social,
                }
              : {
                  razon_social: "",
                  rfc: "",
                  num_sociedad_sap: "",
                  ramo_id: "",
                  topico_kafka: "",
                }
          }
          className="space-y-4"
        >
          {!editSociedad && (
            <>
              <Form.Field name="ramo_id" label="ID Ramo" required />
              <Form.Field name="rfc" label="RFC" required />
              <Form.Field
                name="num_sociedad_sap"
                label="No. Sociedad SAP"
                type="number"
                required
              />
              <Form.Field name="topico_kafka" label="Tópico Kafka" required />
            </>
          )}
          <Form.Field name="razon_social" label="Razón Social" required />
          <FormActions className="flex">
            <Form.CancelButton onClick={() => setModalOpen(false)}>
              Cancelar
            </Form.CancelButton>
            <Form.SubmitButton variant="danger" disabled={isPending}>
              {getSubmitButtonText()}
            </Form.SubmitButton>
          </FormActions>
        </Form>
      </Modal>

      <AlertDialogRoot
        open={!!deleteSociedad}
        onOpenChange={() => setDeleteSociedad(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <AlertTriangle className="w-5 h-5 mr-2 text-red-500 inline" />
              Confirmar eliminación
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar la sociedad{" "}
              <b>{deleteSociedad?.razon_social}</b>? Esta acción no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteSociedad(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
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
            <AlertDialogTitle>¡Operación exitosa!</AlertDialogTitle>
            <AlertDialogDescription>{successMessage}</AlertDialogDescription>
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
            <AlertDialogTitle>¡Error en la operación!</AlertDialogTitle>
            <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenErrorAlert(false)}>
              Entendido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
