'use client';
import React, { useState } from 'react';
import { Button, Input, Select, Modal, Card, DynamicTabs } from '@repo/ui';
import { 
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@repo/ui';
import type { SelectOption } from '@repo/ui';

interface ProductForm {
  nombre: string;
  codigo: string;
  tipoNegocio: 'masivo' | 'corporativo' | '';
  cuentasContables: CuentaContable[];
}

interface Product extends ProductForm {
  id: string;
  fechaCreacion: string;
}

interface CuentaContable {
  id: string;
  codigo: string;
  nombre: string;
  descripcion?: string;
}

// Mock de cuentas SAP - en un caso real vendrían de una API
const mockCuentasSAP: CuentaContable[] = [
  { id: '1', codigo: '1100001', nombre: 'Caja', descripcion: 'Cuenta de caja general' },
  { id: '2', codigo: '1100002', nombre: 'Bancos', descripcion: 'Cuentas bancarias' },
  { id: '3', codigo: '4100001', nombre: 'Ingresos por Primas', descripcion: 'Ingresos principales' },
  { id: '4', codigo: '2100001', nombre: 'Reservas Técnicas', descripcion: 'Reservas obligatorias' },
  { id: '5', codigo: '5100001', nombre: 'Gastos Administrativos', descripcion: 'Gastos operativos' },
  { id: '6', codigo: '1200001', nombre: 'Inversiones', descripcion: 'Cartera de inversiones' },
  { id: '7', codigo: '2200001', nombre: 'Siniestros por Pagar', descripcion: 'Obligaciones por siniestros' },
  { id: '8', codigo: '3100001', nombre: 'Capital Social', descripcion: 'Capital de la compañía' },
];

// Mock de productos existentes
const mockProductosExistentes: Product[] = [
  {
    id: '1',
    nombre: 'Seguro de Vida Individual',
    codigo: 'SVI001',
    tipoNegocio: 'masivo',
    cuentasContables: [
      { id: '1', codigo: '1100001', nombre: 'Caja', descripcion: 'Cuenta de caja general' },
      { id: '3', codigo: '4100001', nombre: 'Ingresos por Primas', descripcion: 'Ingresos principales' }
    ],
    fechaCreacion: '2024-01-15'
  },
  {
    id: '2',
    nombre: 'Seguro Corporativo Empresarial',
    codigo: 'SCE002',
    tipoNegocio: 'corporativo',
    cuentasContables: [
      { id: '4', codigo: '2100001', nombre: 'Reservas Técnicas', descripcion: 'Reservas obligatorias' },
      { id: '7', codigo: '2200001', nombre: 'Siniestros por Pagar', descripcion: 'Obligaciones por siniestros' }
    ],
    fechaCreacion: '2024-02-20'
  }
];

// Componente para el formulario (reutilizable para agregar/editar)
const FormularioProducto = ({ 
  getCurrentFormData, 
  handleInputChange, 
  handleTipoNegocioChange, 
  handleOpenModal, 
  handleSubmit, 
  handleCancelEdit, 
  isSubmitting, 
  editingProduct,
  tipoNegocioOptions 
}: {
  getCurrentFormData: () => ProductForm;
  handleInputChange: (field: keyof ProductForm, value: string) => void;
  handleTipoNegocioChange: (value: string) => void;
  handleOpenModal: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleCancelEdit: () => void;
  isSubmitting: boolean;
  editingProduct: Product | null;
  tipoNegocioOptions: SelectOption[];
}) => {
  const currentData = getCurrentFormData();
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {editingProduct && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-200">
            Editando producto: <strong>{editingProduct.nombre}</strong>
          </p>
        </div>
      )}

      {/* Nombre del Producto */}
      <div>
        <Input
          label="Nombre del Producto"
          placeholder="Ingrese el nombre del producto"
          value={currentData.nombre || ''}
          onChange={(e) => handleInputChange('nombre', e.target.value)}
          fullWidth
          required
        />
      </div>

      {/* Código del Producto */}
      <div>
        <Input
          label="Código"
          placeholder="Ingrese el código del producto"
          value={currentData.codigo || ''}
          onChange={(e) => handleInputChange('codigo', e.target.value)}
          fullWidth
          required
        />
      </div>

      {/* Tipo de Negocio */}
      <div>
        <Select
          label="Tipo de Negocio"
          placeholder="Seleccione el tipo de negocio"
          options={tipoNegocioOptions}
          value={currentData.tipoNegocio || ''}
          onValueChange={handleTipoNegocioChange}
          fullWidth
          required
        />
      </div>

      {/* Cuentas Contables Asociadas */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">
          Cuentas Contables Asociadas
        </label>
        
        <Button
          type="button"
          variant="outline"
          onClick={handleOpenModal}
          className="w-full justify-start"
        >
          {currentData.cuentasContables.length > 0 
            ? `${currentData.cuentasContables.length} cuenta(s) seleccionada(s)`
            : 'Seleccionar cuentas contables'
          }
        </Button>

        {/* Lista de cuentas seleccionadas */}
        {currentData.cuentasContables.length > 0 && (
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Cuentas seleccionadas:</h4>
            <div className="space-y-1">
              {currentData.cuentasContables.map(cuenta => (
                <div key={cuenta.id} className="text-sm">
                  <span className="font-mono">{cuenta.codigo}</span> - {cuenta.nombre}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex justify-center gap-3 pt-6">
        {editingProduct && (
          <Button
            type="button"
            variant="outline"
            onClick={handleCancelEdit}
          >
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting 
            ? (editingProduct ? 'Actualizando...' : 'Guardando...') 
            : (editingProduct ? 'Actualizar Producto' : 'Guardar Producto')
          }
        </Button>
      </div>
    </form>
  );
};

// Componente para la lista de productos
const ListaProductos = ({ 
  productos, 
  handleEditProduct, 
  handleDeleteProduct 
}: {
  productos: Product[];
  handleEditProduct: (product: Product) => void;
  handleDeleteProduct: (productId: string) => void;
}) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold mb-4">Productos Existentes</h2>
    
    {productos.length === 0 ? (
      <div className="text-center py-12 text-gray-500">
        No hay productos registrados
      </div>
    ) : (
      <div className="grid gap-4">
        {productos.map(product => (
          <Card key={product.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{product.nombre}</h3>
                <p className="text-gray-600 dark:text-gray-400">Código: {product.codigo}</p>
                <p className="text-sm text-gray-500">
                  Tipo: {product.tipoNegocio === 'masivo' ? 'Masivo' : 'Corporativo'} | 
                  Creado: {product.fechaCreacion}
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditProduct(product)}
                >
                  Editar
                </Button>
                <AlertDialogRoot>
                  <AlertDialogTrigger>
                    <Button variant="danger" size="sm">
                      Eliminar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Se eliminará permanentemente el producto 
                        &quot;{product.nombre}&quot; del sistema.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogRoot>
              </div>
            </div>
            
            {product.cuentasContables.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Cuentas contables asociadas:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.cuentasContables.map(cuenta => (
                    <div key={cuenta.id} className="text-sm">
                      <span className="font-mono">{cuenta.codigo}</span> - {cuenta.nombre}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    )}
  </div>
);

export default function NuevoProducto() {
  const [formData, setFormData] = useState<ProductForm>({
    nombre: '',
    codigo: '',
    tipoNegocio: '',
    cuentasContables: []
  });
  
  const [showModal, setShowModal] = useState(false);
  const [selectedCuentas, setSelectedCuentas] = useState<CuentaContable[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productos, setProductos] = useState<Product[]>(mockProductosExistentes);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState<string | null>(null);
  const [showErrorAlert, setShowErrorAlert] = useState<string | null>(null);

  const tipoNegocioOptions: SelectOption[] = [
    { value: 'masivo', label: 'Masivo' },
    { value: 'corporativo', label: 'Corporativo' }
  ];

  const handleInputChange = (field: keyof ProductForm, value: string) => {
    if (editingProduct) {
      setEditingProduct(prev => prev ? ({
        ...prev,
        [field]: value
      }) : null);
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleTipoNegocioChange = (value: string) => {
    if (editingProduct) {
      setEditingProduct(prev => prev ? ({
        ...prev,
        tipoNegocio: value as 'masivo' | 'corporativo'
      }) : null);
    } else {
      setFormData(prev => ({
        ...prev,
        tipoNegocio: value as 'masivo' | 'corporativo'
      }));
    }
  };

  const handleToggleCuenta = (cuenta: CuentaContable) => {
    setSelectedCuentas(prev => {
      const isSelected = prev.find(c => c.id === cuenta.id);
      if (isSelected) {
        return prev.filter(c => c.id !== cuenta.id);
      } else {
        return [...prev, cuenta];
      }
    });
  };

  const handleConfirmSelection = () => {
    if (editingProduct) {
      setEditingProduct(prev => prev ? ({
        ...prev,
        cuentasContables: selectedCuentas
      }) : null);
    } else {
      setFormData(prev => ({
        ...prev,
        cuentasContables: selectedCuentas
      }));
    }
    setShowModal(false);
  };

  const handleOpenModal = () => {
    const currentCuentas = editingProduct ? editingProduct.cuentasContables : formData.cuentasContables;
    setSelectedCuentas([...currentCuentas]);
    setShowModal(true);
  };

  const getCurrentFormData = (): ProductForm => editingProduct || formData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const currentData = getCurrentFormData();
      
      // Validaciones
      if (!currentData.nombre.trim()) {
        setShowErrorAlert('El nombre es requerido');
        return;
      }
      
      if (!currentData.codigo.trim()) {
        setShowErrorAlert('El código es requerido');
        return;
      }
      
      if (!currentData.tipoNegocio) {
        setShowErrorAlert('El tipo de negocio es requerido');
        return;
      }
      
      if (currentData.cuentasContables.length === 0) {
        setShowErrorAlert('Debe seleccionar al menos una cuenta contable');
        return;
      }

      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingProduct) {
        // Actualizar producto existente
        setProductos(prev => prev.map(p => 
          p.id === editingProduct.id 
            ? { ...editingProduct }
            : p
        ));
        setShowSuccessAlert('Producto actualizado exitosamente');
        setEditingProduct(null);
      } else {
        // Crear nuevo producto
        const newProduct: Product = {
          ...currentData,
          id: Date.now().toString(),
          fechaCreacion: new Date().toISOString().split('T')[0] || ''
        };
        setProductos(prev => [...prev, newProduct]);
        setShowSuccessAlert('Producto creado exitosamente');
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          codigo: '',
          tipoNegocio: '',
          cuentasContables: []
        });
      }
      
    } catch (error) {
      console.error('Error al guardar producto:', error);
      setShowErrorAlert('Error al guardar el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductos(prev => prev.filter(p => p.id !== productId));
    setShowSuccessAlert('Producto eliminado exitosamente');
    setShowDeleteAlert(null);
  };

  const tabOptions = [
    {
      label: editingProduct ? 'Editar Producto' : 'Agregar Producto',
      content: (
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
          </h1>
          <FormularioProducto
            getCurrentFormData={getCurrentFormData}
            handleInputChange={handleInputChange}
            handleTipoNegocioChange={handleTipoNegocioChange}
            handleOpenModal={handleOpenModal}
            handleSubmit={handleSubmit}
            handleCancelEdit={handleCancelEdit}
            isSubmitting={isSubmitting}
            editingProduct={editingProduct}
            tipoNegocioOptions={tipoNegocioOptions}
          />
        </Card>
      )
    },
    {
      label: 'Ver Productos',
      content: (
        <ListaProductos
          productos={productos}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      )
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <DynamicTabs options={tabOptions} />

      {/* Modal para seleccionar cuentas SAP */}
      {showModal && (
        <Modal
          title="Seleccionar Cuentas Contables SAP"
          onClose={() => setShowModal(false)}
          size="large"
        >
          <div className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Seleccione las cuentas contables que estarán asociadas al producto:
              </p>
            </div>

            <div className="max-h-96 overflow-y-auto border rounded-lg">
              <div className="space-y-1 p-2">
                {mockCuentasSAP.map(cuenta => {
                  const isSelected = selectedCuentas.find(c => c.id === cuenta.id);
                  return (
                    <div
                      key={cuenta.id}
                      className={`p-3 rounded border cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-900 border-blue-300 dark:border-blue-600'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => handleToggleCuenta(cuenta)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={!!isSelected}
                              onChange={() => handleToggleCuenta(cuenta)}
                              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <span className="font-mono text-sm font-medium">{cuenta.codigo}</span>
                          </div>
                          <h4 className="font-medium mt-1">{cuenta.nombre}</h4>
                          {cuenta.descripcion && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {cuenta.descripcion}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedCuentas.length} cuenta(s) seleccionada(s)
              </span>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirmSelection}
                  disabled={selectedCuentas.length === 0}
                >
                  Confirmar Selección
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Alert Dialogs para notificaciones */}
      <AlertDialogRoot open={!!showSuccessAlert} onOpenChange={() => setShowSuccessAlert(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¡Éxito!</AlertDialogTitle>
            <AlertDialogDescription>
              {showSuccessAlert}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessAlert(null)}>
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>

      <AlertDialogRoot open={!!showErrorAlert} onOpenChange={() => setShowErrorAlert(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>
              {showErrorAlert}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorAlert(null)}>
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
