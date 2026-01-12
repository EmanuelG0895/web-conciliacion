import { Card, Form, SelectOption, StatusIndicator } from "@repo/ui";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { obtenerPolizas, Poliza } from "./apis/data";

interface Inputs {
  dateStart: string;
  dateEnd: string;
  tipoNegocio: string;
  tipoProducto: string;
}

function Vida() {
  const fechaMaximaAyer = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .split("T")[0];
  const currentYear = new Date().getFullYear();
  const minYear = Math.max(2026, currentYear);
  const fechaMinima = new Date(minYear, 0, 1);
  fechaMinima.setHours(0, 0, 0, 0);

  const businessOptions: SelectOption[] = [
    { value: "1", label: "Semana 1" },
    { value: "2", label: "Semana 2" },
    { value: "3", label: "Semana 3" },
    { value: "4", label: "Semana 4" },
    { value: "5", label: "Semana 5" },
    { value: "6", label: "Semana 6" },
    { value: "7", label: "Semana 7" },
  ];

  const [polizas, setPolizas] = useState<Poliza[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolizas = async () => {
      try {
        const data = await obtenerPolizas();
        setPolizas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPolizas();
  }, []);

  const onSubmitSearch: SubmitHandler<Inputs> = (data) => {
    console.log("Búsqueda principal:", data);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        <div className="bg-gs-white dark:bg-gs-gray-dark p-4 rounded-xl shadow-md w-full lg:w-auto">
          <Form
            onSubmit={onSubmitSearch}
            className="text-gs-gray-medium flex flex-col items-start lg:items-center gap-2 lg:flex-row"
            defaultValues={{
              dateStart: "",
              dateEnd: "",
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
              options={businessOptions} // Asegúrate de definir productOptions
              placeholder="Tipo de producto"
              required
            />
            <Form.SubmitButton variant="default">Buscar</Form.SubmitButton>
          </Form>
        </div>
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
        {polizas.map((data) => (
          <Card
            className="border-gs-yellow dark:border-gs-yellow-dark border-l-4"
            key={data.id}
            title={data.title}
            btnOnClick={() => console.log("Ver detalles de:", data.title)} // Cambia esto a tu lógica
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
                  <tr>
                    <td className="text-start font-semibold">
                      {data.sourceA}:
                    </td>
                    <td className="text-right font-bold wrap-anywhere">
                      $
                      {data.amountA.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">{data.sourceB}:</td>
                    <td className="pt-1 text-right font-bold wrap-anywhere">
                      $
                      {data.amountB.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      })}
                    </td>
                  </tr>
                  <tr className="mt-3">
                    <td>
                      <span className="text-lg font-semibold">DIFERENCIA</span>
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
  );
}

export default Vida;
