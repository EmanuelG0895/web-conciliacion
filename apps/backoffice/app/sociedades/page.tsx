"use client";
import { AlertTriangle, Edit2, Plus, Trash2, Building2 } from "lucide-react";
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
  DynamicTabs,
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

import React, { useState } from "react";

export default function Sociedades() {
  // Estado para sociedades
  const [sociedades, setSociedades] = useState<Sociedad[]>([
    {
      id: 1,
      rfc: "DUMMY123456",
      razonSocial: "Sociedad Dummy S.A. de C.V.",
      numeroSociedadSAP: "0001",
      productos: [],
    },
    {
      id: 2,
      rfc: "DUMMY654321",
      razonSocial: "Sociedad Ficticia S.A.",
      numeroSociedadSAP: "0002",
      productos: [],
    },
  ]);

  // Estado para modal y formulario
  const [modalOpen, setModalOpen] = useState(false);
  const [editSociedad, setEditSociedad] = useState<Sociedad | null>(null);
  const [deleteSociedad, setDeleteSociedad] = useState<Sociedad | null>(null);

  // Abrir modal para crear
  const handleOpenCreate = () => {
    setEditSociedad(null);
    setModalOpen(true);
  };

  // Abrir modal para editar
  const handleOpenEdit = (soc: Sociedad) => {
    setEditSociedad(soc);
    setModalOpen(true);
  };

  // Guardar sociedad (crear o editar)
  const handleSave = (data: {
    rfc: string;
    razonSocial: string;
    numeroSociedadSAP: string;
  }) => {
    if (editSociedad) {
      setSociedades((prev) =>
        prev.map((s) => (s.id === editSociedad.id ? { ...s, ...data } : s))
      );
    } else {
      setSociedades((prev) => [
        ...prev,
        {
          id: prev.length ? Math.max(...prev.map((s) => s.id)) + 1 : 1,
          ...data,
          productos: [],
        },
      ]);
    }
    setModalOpen(false);
  };

  // Eliminar sociedad
  const handleDelete = () => {
    if (deleteSociedad) {
      setSociedades((prev) => prev.filter((s) => s.id !== deleteSociedad.id));
      setDeleteSociedad(null);
    }
  };

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
      key: "acciones",
      label: "Acciones",
      sortable: false,
      render: (sociedad: Sociedad) => (
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="default"
            onClick={() => handleOpenEdit(sociedad)}
            title="Editar"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setDeleteSociedad(sociedad)}
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
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
        <Table
          data={sociedades}
          columns={sociedadesColumns}
          keyExtractor={(sociedad) => sociedad.id}
          emptyMessage="No hay sociedades registradas"
          hoverable
          bordered
        />
      </div>

      {/* Modal Crear/Editar Sociedad */}

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
                  rfc: editSociedad.rfc,
                  razonSocial: editSociedad.razonSocial,
                  numeroSociedadSAP: editSociedad.numeroSociedadSAP,
                }
              : {
                  rfc: "",
                  razonSocial: "",
                  numeroSociedadSAP: "",
                }
          }
          className="space-y-4"
        >
          <Form.Select
            fullWidth={true}
            name="ramo"
            placeholder="Ramo"
            label="Seleccione un ramo"
            required
            options={[
              { label: "Ramo Uno", value: "Uno" },
              { label: "Ramo Dos", value: "Dos" },
              { label: "Ramo Tres", value: "Tres" },
            ]}
          />
          <Form.Field name="rfc" label="RFC" required />
          <Form.Field name="Topico Kafca" label="Kafca" required />
          <Form.Field name="razonSocial" label="Razón Social" required />
          <Form.Field
            name="numeroSociedadSAP"
            label="No. Sociedad SAP"
            required
          />
          <Form.Actions>
            <Form.CancelButton onClick={() => setModalOpen(false)}>
              Cancelar
            </Form.CancelButton>
            <Form.SubmitButton variant="danger">
              {editSociedad ? "Guardar Cambios" : "Crear"}
            </Form.SubmitButton>
          </Form.Actions>
        </Form>
      </Modal>

      {/* Diálogo de confirmación para eliminar */}
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
              <b>{deleteSociedad?.razonSocial}</b>? Esta acción no se puede
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
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
