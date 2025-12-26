"use client";
import React, { useState } from "react";
import { Button, Modal, Table, Form } from "@repo/ui";
import { AlertTriangle, Edit2, Plus, Trash2 } from "lucide-react";
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

interface Usuario extends Record<string, unknown> {
  id: number;
  fullName: string;
  email: string;
  group: string;
}

type ListaUsuarios = Usuario[];

const initialUsers: ListaUsuarios = [
  {
    id: 1,
    fullName: "Danilo Sousa",
    email: "danilo@example.com",
    group: "Developer",
  },
  {
    id: 2,
    fullName: "Zahra Ambessa",
    email: "zahra@example.com",
    group: "Admin",
  },
  {
    id: 3,
    fullName: "Jasper Eriksson",
    email: "jasper@example.com",
    group: "Developer",
  },
  {
    id: 4,
    fullName: "Alice Smith",
    email: "alice@example.com",
    group: "Guest",
  },
  {
    id: 5,
    fullName: "Charlie Brown",
    email: "charlie@example.com",
    group: "Admin",
  },
];

interface UserFormProps {
  user: Usuario | null;
  onSave: (user: Usuario) => void;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onClose }) => {
  const defaultValues = user || {
    id: 0,
    fullName: "",
    email: "",
    group: "Developer",
  };

  const handleSubmit = (formData: Usuario) => {
    const finalData = { ...formData, group: formData.group || "Developer" };
    onSave(finalData);
  };

  const groupOptions = [
    { value: "Developer", label: "Developer" },
    { value: "Admin", label: "Admin" },
    { value: "Guest", label: "Guest" },
  ];

  return (
    <Form<Usuario>
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      className="space-y-4"
    >
      {user && (
        <Form.Field
          name="id"
          label="Numero de empleado"
          disabled
          fullWidth
        />
      )}
      
      <Form.Field
        name="fullName"
        label="Nombre Completo"
        placeholder="Ingresa el nombre completo"
        required
        fullWidth
      />
      
      <Form.Field
        name="email"
        label="Email"
        type="email"
        placeholder="correo@ejemplo.com"
        required
        fullWidth
      />
      
      <Form.Select
        name="group"
        label="Grupo"
        options={groupOptions}
        placeholder="Selecciona un grupo"
        required
        fullWidth
      />
      
      <Form.Actions>
        <Form.CancelButton onClick={onClose}>
          Cancelar
        </Form.CancelButton>
        <Form.SubmitButton>
          {user ? "Guardar Cambios" : "Agregar Usuario"}
        </Form.SubmitButton>
      </Form.Actions>
    </Form>
  );
};

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<ListaUsuarios>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState<number | null>(null);

  const handleCreateClick = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleUpdateClick = (userId: number) => {
    const userToEdit = usuarios.find((u) => u.id === userId);
    if (userToEdit) {
      setEditingUser(userToEdit);
      setIsModalOpen(true);
    }
  };

  const handleSave = (userData: Usuario) => {
    if (userData.id === 0) {
      const newId = Math.max(...usuarios.map((u) => u.id), 0) + 1;
      const nuevoUsuario: Usuario = { ...userData, id: newId };
      setUsuarios([...usuarios, nuevoUsuario]);
    } else {
      setUsuarios(usuarios.map((u) => (u.id === userData.id ? userData : u)));
    }
    setIsModalOpen(false);
  };

  const handlePrepareDelete = (userId: number) => {
    setUserToDeleteId(userId);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDeleteId !== null) {
      setUsuarios(usuarios.filter((u) => u.id !== userToDeleteId));
      setUserToDeleteId(null);
    }
    setIsAlertOpen(false);
  };

  const modalTitle = editingUser
    ? `Editar Usuario: ${editingUser.fullName}`
    : "Crear Nuevo Usuario";
  const userToDeleteName =
    usuarios.find((u) => u.id === userToDeleteId)?.fullName || "este usuario";

  // Configurar columnas para la tabla
  const columns = [
    {
      key: "fullName",
      label: "Nombre Completo",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "group",
      label: "Grupo",
      sortable: true,
    },
    {
      key: "actions",
      label: "Acciones",
      sortable: false,
      render: (usuario: Usuario) => {
        return (
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => handleUpdateClick(usuario.id)}
              className="flex items-center font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              <Edit2 className="w-4 h-4 mr-1" /> Editar
            </button>
            <button
              onClick={() => handlePrepareDelete(usuario.id)}
              className="flex items-center font-medium text-red-600 hover:text-red-800 hover:underline"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Eliminar
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <div className="flex justify-end">
        <Button onClick={handleCreateClick} variant="default">
          <Plus className="w-4 h-4 mr-2" /> Crear Nuevo Usuario
        </Button>
      </div>

      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-gray-300">
        <Table
          data={usuarios}
          columns={columns}
          keyExtractor={(usuario: Usuario) => usuario.id}
          emptyMessage="No hay usuarios disponibles"
          hoverable
          bordered
        />
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          title={modalTitle}
          size="small"
        >
          <UserForm
            user={editingUser}
            onSave={handleSave}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}

      <AlertDialogRoot open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="border-2 border-red-500 shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Confirmar Eliminación de Usuario
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2 p-3 rounded-md bg-red-50 text-red-700">
              ¿Estás seguro de que deseas eliminar al usuario{" "}
              <span className="font-semibold">{userToDeleteName}</span>? Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-gray-300 hover:bg-gray-100">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400"
            >
              <AlertTriangle className="w-4 h-4 mr-2 text-white" />
              Sí, Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
