"use client";

import { Input, Modal, Select, SelectOption, StatusIndicator } from "@repo/ui";
import { Button, Card, DynamicTabs } from "@repo/ui";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

interface Inputs {
  fechaInicio: string;
  fechaFin: string;
  tipoNegocio: string;
  tipoProducto: string;
}

export default function Conciliador() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = [
    {
      id: 1,
      title: "ACSEL-E vs SAP FI",
      sourceA: "ACSEL-E (Operativo)",
      sourceB: "SAP FI (Contable)",
      amountA: 819204736518.2198,
      amountB: 55215000.0,
      variation: 15000.5,
      currency: "MXN",
      status: "DISPONIBLE",
    },
    {
      id: 2,
      title: "ACSEL-E vs Facturación",
      sourceA: "ACSEL-E (Operativo)",
      sourceB: "Facturación",
      amountA: 74851290376482195638472910475862,
      amountB: 55230001.05,
      variation: -0.55,
      currency: "MXN",
      status: "DISPONIBLE",
    },
    {
      id: 3,
      title: "SAP FI vs Facturación",
      sourceA: "SAP FI (Contable)",
      sourceB: "Facturación",
      amountA: 55215000.0,
      amountB: 55230001.05,
      variation: -15001.05,
      currency: "MXN",
      status: "EN_PROCESO",
    },
    {
      id: 4,
      title: "Facturación vs SAT Meta Data",
      sourceA: "Facturación",
      sourceB: "SAT (Fiscal)",
      amountA: 55230001.05,
      amountB: 55230001.05,
      variation: 0.0,
      currency: "MXN",
      status: "SIN_INFO",
    },
    {
      id: 5,
      title: "ACSEL-E vs SAP FI",
      sourceA: "ACSEL-E (Operativo)",
      sourceB: "SAP FI (Contable)",
      amountA: 55230000.5,
      amountB: 55215000.0,
      variation: 15000.5,
      currency: "MXN",
      status: "DISPONIBLE",
    },
    {
      id: 6,
      title: "ACSEL-E vs Facturación",
      sourceA: "ACSEL-E (Operativo)",
      sourceB: "Facturación",
      amountA: 55230000.5,
      amountB: 55230001.05,
      variation: -0.55,
      currency: "MXN",
      status: "DISPONIBLE",
    },
    {
      id: 7,
      title: "SAP FI vs Facturación",
      sourceA: "SAP FI (Contable)",
      sourceB: "Facturación",
      amountA: 55215000.0,
      amountB: 55230001.05,
      variation: -15001.05,
      currency: "MXN",
      status: "EN_PROCESO",
    },
  ];
  const onClick = () => setIsModalOpen(true);

  const fechaMaximaAyer = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .split("T")[0];

  const businessOptions: SelectOption[] = [
    { value: "1", label: "MASIVO" },
    { value: "2", label: "CORPORATIVO" },
  ];

  const productOptions: SelectOption[] = [
    { value: "1", label: "Seguro Auto Total" },
    { value: "2", label: "Seguro Vida Plena" },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="bg-gs-white dark:bg-gs-black text-gs-black dark:text-gs-text-light w-full space-y-3 p-2 sm:p-4">
      <DynamicTabs
        options={[
          {
            label: "Vida",
            content: (
              <div className="space-y-4">
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                  <div className="bg-gs-white dark:bg-gs-gray-dark p-4 rounded-xl shadow-md w-full lg:w-auto">
                    <form
                      className="text-gs-gray-medium flex flex-col items-start lg:items-center gap-2 lg:flex-row"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <Input
                        fullWidth={true}
                        type="date"
                        placeholder="Fecha Inicio"
                        max={fechaMaximaAyer}
                        {...register("fechaInicio", { required: true })}
                        error={errors.fechaInicio && "Seleccione una opción"}
                      />
                      <Input
                        fullWidth={true}
                        type="date"
                        placeholder="Fecha Fin"
                        max={fechaMaximaAyer}
                        {...register("fechaFin", { required: true })}
                        error={errors.fechaFin && "Seleccione una opción"}
                      />
                      <Controller
                        name="tipoNegocio"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            field={field}
                            variant="default"
                            options={businessOptions}
                            placeholder="Tipo de negocio"
                            error={
                              errors.tipoNegocio && "Seleccione una opción"
                            }
                          />
                        )}
                      />
                      <Controller
                        name="tipoProducto"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            field={field}
                            variant="default"
                            options={productOptions}
                            placeholder="Tipo de producto"
                            error={
                              errors.tipoProducto && "Seleccione una opción"
                            }
                          />
                        )}
                      />
                      <Button
                        type="submit"
                        variant="default"
                        icon
                        iconPosition="right"
                      >
                        Buscar
                      </Button>
                    </form>
                  </div>
                    <Button icon={<DownloadIcon />} iconPosition="right">
                      <span>Descargar Informe (.xlsx)</span>
                    </Button>
                </div>
                <div className="bg-gs-white dark:bg-gs-gray-dark grid grid-cols-1 gap-4 rounded-xl p-3 shadow-md sm:grid-cols-2 sm:gap-6 sm:p-4 lg:grid-cols-3">
                  <Card title="Certificados Conciliados">
                    <p className="text-3xl font-bold">420</p>
                  </Card>
                  <Card title="Certificados Conciliados">
                    <p className="text-3xl font-bold">420</p>
                  </Card>
                  <Card title="Certificados Conciliados">
                    <p className="text-3xl font-bold">420</p>
                  </Card>
                </div>
                <div className="bg-gs-white dark:bg-gs-gray-dark flex flex-wrap gap-4 py-3 px-2 sm:px-4 md:gap-6 lg:gap-8">
                  {data.map((data) => (
                    <Card
                      className="border-gs-yellow dark:border-gs-yellow-dark cursor-pointer border-l-4"
                      key={data.id}
                      title={data.title}
                      onClick={onClick}
                    >
                      <div className="flex items-start justify-between">
                        <StatusIndicator status={data.status} />
                      </div>
                      <div className="text-gs-black dark:text-gs-white mt-4 text-sm">
                        <table className="w-full border-separate border-spacing-y-4 text-gs-text-dark dark:text-gs-text-light">
                          <thead>
                            <tr>
                              <th className="text-start text-xs font-semibold uppercase">
                                Fuente
                              </th>
                              <th className="text-right text-xs font-semibold uppercase">
                                Monto
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {/* Fila para la Fuente A */}
                            <tr>
                              {/* Columna 1: Nombre de la Fuente */}
                              <td className="text-start font-semibold">
                                {data.sourceA}:
                              </td>

                              {/* Columna 2: Monto */}
                              <td className="text-right font-bold wrap-anywhere">
                                $
                                {data.amountA.toLocaleString("es-MX", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 4,
                                })}
                              </td>
                            </tr>

                            {/* Fila para la Fuente B */}
                            <tr>
                              {/* Columna 1: Nombre de la Fuente */}
                              <td className="text-start">{data.sourceB}:</td>

                              {/* Columna 2: Monto */}
                              <td className="pt-1 text-right font-bold wrap-anywhere">
                                ${" "}
                                {data.amountB.toLocaleString("es-MX", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 4,
                                })}
                              </td>
                            </tr>
                            <tr className="mt-3">
                              <td>
                                <span className="text-lg font-semibold">
                                  DIFERENCIA
                                </span>
                              </td>
                              <td className="text-right text-lg font-bold wrap-anywhere">
                                $
                                {data.variation.toLocaleString("es-MX", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 4,
                                })}
                                {data.currency}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ),
          },
          { label: "Daños", content: "Daños" },
        ]}
      />

      {isModalOpen && (
        <Modal
          size="large"
          onClose={() => setIsModalOpen(false)}
          title="Detalle de Conciliación"
        >
          <div className="space-y-4">
            <p>
              Aquí va el contenido detallado de la conciliación seleccionada.
            </p>
            <p>Puedes agregar tablas, gráficos u otra información relevante.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
