"use client";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogCancel, // Importado correctamente de tu librería UI
  Button,
  Modal,
  Table,
  TableColumn,
} from "@repo/ui";
import { useMemo, useState } from "react";
import { Trash2, Pen, Plus } from "lucide-react";
import { GenericCrudProps } from "./types";

export function GlobalCrud<T extends object>({
  title,
  data,
  columns,
  keyExtractor,
  onEdit,
  onDelete,
  onCreate,
  labelCreate = "Añadir Nuevo",
  modalContent,
}: Readonly<GenericCrudProps<T>>) {
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  // Estado para saber qué ítem estamos a punto de borrar
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const finalColumns = useMemo(() => {
    if (!onEdit && !onDelete) return columns;
    const actionColumn: TableColumn<T> = {
      key: "actions",
      label: "Acciones",
      align: "right",
      render: (row: T) => (
        <div className="space-x-4">
          {onEdit && (
            <Button
              icon={<Pen />}
              iconPosition="left"
              size="sm"
              variant="default"
              title="Editar"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(row);
                setOpenModal(true);
              }}
            >
              Editar
            </Button>
          )}
          {onDelete && (
            <Button
              icon={<Trash2 />}
              iconPosition="left"
              size="sm"
              variant="danger"
              title="Eliminar"
              onClick={(e) => {
                e.stopPropagation();
                setItemToDelete(row);
                setOpenAlert(true);
              }}
            >
              Eliminar
            </Button>
          )}
        </div>
      ),
    };
    return [...columns, actionColumn];
  }, [columns, onEdit, onDelete]);

  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (itemToDelete && onDelete) {
      setIsDeleting(true);
      try {
        await onDelete(itemToDelete);
        setOpenAlert(false);
        setItemToDelete(null);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCancelDelete = () => {
    if (!isDeleting) {
      setOpenAlert(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gs-text-dark dark:text-gs-text-light">
          {title}
        </h1>
        {onCreate && (
          <Button
            iconPosition="right"
            onClick={() => {
              onCreate();
              setOpenModal(true);
            }}
            variant="default"
            size="lg"
            icon={<Plus />}
          >
            {labelCreate}
          </Button>
        )}
      </div>

      <Table<T>
        data={data}
        columns={finalColumns}
        keyExtractor={keyExtractor}
        striped={true}
        bordered={true}
        hoverable={true}
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        {modalContent}
      </Modal>

      <AlertDialogRoot open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el registro de nuestros servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleCancelDelete}
              disabled={isDeleting}
            >
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault(); // Evitamos que Radix cierre el modal automáticamente
                confirmDelete();
              }}
              disabled={isDeleting}
              className={isDeleting ? "opacity-70 cursor-not-allowed" : ""}
            >
              {isDeleting ? "Eliminando..." : "Sí, eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
