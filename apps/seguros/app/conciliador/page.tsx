"use client";

import {
  Modal,
  SelectOption,
  StatusIndicator,
  Form,
  Button,
  Card,
  DynamicTabs,
  Radio,
} from "@repo/ui";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Iva from "./contentDetailAcelE/iva/Iva";
import DetalleOperativo from "./contentDetailAcelE/detalleOperativo/DetalleOperativo";

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

interface Inputs {
  fechaInicio: string;
  fechaFin: string;
  tipoNegocio: string;
  tipoProducto: string;
}

export default function Conciliador() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"download" | "details" | null>(
    null
  );
  const fechaMaximaAyer = new Date(new Date().setDate(new Date().getDate()))
    .toISOString()
    .split("T")[0];
  const currentYear = new Date().getFullYear();
  const minYear = Math.max(2026, currentYear);
  const fechaMinima = new Date(minYear, 0, 1);
  fechaMinima?.setHours(0, 0, 0, 0);
  const [selected, setSelected] = useState("month");
  const periodicityOptions = [
    { id: "opt-1", label: "Mes", value: "month" },
    { id: "opt-2", label: "Año", value: "year" },
  ];

  const businessOptions: SelectOption[] = [
    { value: "1", label: "Semana 1" },
    { value: "2", label: "Semana 2" },
    { value: "3", label: "Semana 3" },
    { value: "4", label: "Semana 4" },
    { value: "5", label: "Semana 5" },
    { value: "6", label: "Semana 6" },
    { value: "7", label: "Semana 7" },
  ];

  const productOptions: SelectOption[] = [
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  const handleDetails = () => {
    setModalMode("details");
    setIsModalOpen(true);
  };

  const handleDownload = () => {
    setModalMode("download");
    setIsModalOpen(true);
  };

  const onSubmitSearch: SubmitHandler<Inputs> = (data) => {
    console.log("Búsqueda principal:", data);
  };

  const onSubmitDownload: SubmitHandler<Inputs> = (data) => {
    console.log("Descarga informe:", data);
    // Lógica para descargar informe
  };

  const onSubmitDetails: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const downloadContent = (
    <Form
      onSubmit={onSubmitDownload}
      className="text-gs-gray-medium flex items-start lg:items-center gap-2"
      defaultValues={{
        fechaInicio: "",
        fechaFin: "",
        tipoNegocio: "",
        tipoProducto: "",
      }}
    >
      <Form.Select
        name="year"
        options={[{ label: "2026", value: "2026" }]}
        placeholder="Año"
        required
      />
      {periodicityOptions.map((option) => (
        <Radio
          key={option.id}
          name="periodicity"
          id={option.id}
          label={option.label}
          value={option.value}
          selectedValue={selected}
          onChange={setSelected}
        />
      ))}

      <Form.Select
        name="semana"
        options={businessOptions}
        placeholder="Semana"
        required
      />
      <Form.Select
        name="mes"
        options={productOptions}
        placeholder="Mes"
        required
      />
      <Form.SubmitButton variant="default">Buscar</Form.SubmitButton>
    </Form>
  );

  const detailsContent = (
    <DynamicTabs
      options={[
        { label: "Detalle por tazas", content: <Iva /> },
        { label: "Detalle por productos", content: <DetalleOperativo /> },
      ]}
    />
  );

  const modalContent =
    modalMode === "download"
      ? downloadContent
      : modalMode === "details"
        ? detailsContent
        : null;

  return (
    <div className="w-full space-y-3 p-2 sm:p-4">
      <DynamicTabs
        options={[
          {
            label: "Vida",
            content: (
              <div className="space-y-4">
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                  <div className="bg-gs-white dark:bg-gs-gray-dark p-4 rounded-xl shadow-md w-full lg:w-auto">
                    <Form
                      onSubmit={onSubmitSearch}
                      className="text-gs-gray-medium flex flex-col items-start lg:items-center gap-2 lg:flex-row"
                      defaultValues={{
                        fechaInicio: "",
                        fechaFin: "",
                        tipoNegocio: "",
                        tipoProducto: "",
                      }}
                    >
                      <Form.Calendar
                        name="dateStart"
                        maxDate={fechaMaximaAyer}
                        minDate={fechaMinima}
                        required
                      />
                      <Form.Calendar
                        name="dateEnd"
                        maxDate={fechaMaximaAyer}
                        minDate={fechaMinima}
                        required
                      />
                      <Form.Select
                        name="tipoNegocio"
                        options={businessOptions}
                        placeholder="Tipo de negocio"
                        required
                      />
                      <Form.Select
                        name="tipoProducto"
                        options={productOptions}
                        placeholder="Tipo de producto"
                        required
                      />
                      <Form.SubmitButton variant="default">
                        Buscar
                      </Form.SubmitButton>
                    </Form>
                  </div>
                  <Button
                    onClick={handleDownload}
                    icon={<DownloadIcon />}
                    iconPosition="right"
                  >
                    <span>Descargar Informe (.xlsx)</span>
                  </Button>
                </div>
                <div className="bg-gs-white dark:bg-gs-gray-dark grid grid-cols-1 gap-4 rounded-xl p-3 shadow-md sm:grid-cols-2 sm:gap-6 sm:p-4 lg:grid-cols-3">
                  <Card title="Conciliados">
                    <p className="text-3xl font-bold">420</p>
                  </Card>
                  <Card title="Diferencias">
                    <p className="text-3xl font-bold">420</p>
                  </Card>
                  <Card title="Productos">
                    <p className="text-3xl font-bold">420</p>
                  </Card>
                </div>
                <div className="bg-gs-white dark:bg-gs-gray-dark flex flex-wrap gap-4 py-3 px-2 sm:px-4 md:gap-6 lg:gap-8">
                  {data.map((data) => (
                    <Card
                      className="border-gs-yellow dark:border-gs-yellow-dark border-l-4"
                      key={data.id}
                      title={data.title}
                      btnOnClick={handleDetails}
                      btn={data.title === "ACSEL-E vs SAP FI"}
                      textButton={
                        data.title === "ACSEL-E vs SAP FI" ? "Ver detalles" : ""
                      }
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
                            <tr className="mt-3">
                              <td className="text-right text-lg font-bold wrap-anywhere">
                                <div className=""></div>
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
          open={isModalOpen}
          size="large"
          onClose={() => {
            setIsModalOpen(false);
            setModalMode(null);
          }}
          title={
            modalMode === "download"
              ? "Descargar Informe"
              : "Detalle de Conciliación"
          }
        >
          {modalContent}
        </Modal>
      )}
    </div>
  );
}
