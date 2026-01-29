import { Card, Modal, StatusIndicator, Table } from "@repo/ui";
import React, { useState } from "react";

const columns = [
  { key: "tasa", label: "Tasa %" },
  { key: "importePrima", label: "Importe Prima" },
  { key: "derechos", label: "Derechos" },
  { key: "recargos", label: "Recargos" },
  { key: "subTotal", label: "Sub Total" },
  { key: "iva", label: "IVA" },
  { key: "total", label: "Total" },
  { key: "tasa", label: "Tasa %" },
  { key: "importePrima", label: "Importe Prima" },
  { key: "derechos", label: "Derechos" },
  { key: "recargos", label: "Recargos" },
  { key: "subTotal", label: "Sub Total" },
  { key: "iva", label: "IVA" },
  { key: "total", label: "Total" },
  { key: "tasa", label: "Tasa %" },
  { key: "importePrima", label: "Importe Prima" },
  { key: "derechos", label: "Derechos" },
  { key: "recargos", label: "Recargos" },
  { key: "subTotal", label: "Sub Total" },
  { key: "iva", label: "IVA" },
  { key: "total", label: "Total" },
  { key: "tasa", label: "Tasa %" },
  { key: "importePrima", label: "Importe Prima" },
  { key: "derechos", label: "Derechos" },
  { key: "recargos", label: "Recargos" },
  { key: "subTotal", label: "Sub Total" },
  { key: "iva", label: "IVA" },
  { key: "total", label: "Total" },
];

const data = [
  {
    id: "1",
    tasa: "IVA 0%",
    importePrima: "-",
    derechos: "-",
    recargos: "-",
    subTotal: "-",
    iva: "-",
    total: "-",
  },
  {
    id: "2",
    tasa: "IVA 8%",
    importePrima: "9,074.10",
    derechos: "-",
    recargos: "-",
    subTotal: "725.93",
    iva: "9,800.03",
    total: "9,800.03",
  },
  {
    id: "3",
    tasa: "IVA 16%",
    importePrima: "63,103.28",
    derechos: "-",
    recargos: "-",
    subTotal: "12,486.17",
    iva: "70,354.98",
    total: "73,199.80",
  },
  {
    id: "4",
    tasa: "Totales",
    importePrima: "$72,177.38",
    derechos: "$ -",
    recargos: "$ -",
    subTotal: "$13,212.10",
    iva: "$80,155.01",
    total: "$82,999.83",
  },
  {
    id: "1",
    tasa: "IVA 0%",
    importePrima: "-",
    derechos: "-",
    recargos: "-",
    subTotal: "-",
    iva: "-",
    total: "-",
  },
  {
    id: "2",
    tasa: "IVA 8%",
    importePrima: "9,074.10",
    derechos: "-",
    recargos: "-",
    subTotal: "725.93",
    iva: "9,800.03",
    total: "9,800.03",
  },
  {
    id: "3",
    tasa: "IVA 16%",
    importePrima: "63,103.28",
    derechos: "-",
    recargos: "-",
    subTotal: "12,486.17",
    iva: "70,354.98",
    total: "73,199.80",
  },
  {
    id: "4",
    tasa: "Totales",
    importePrima: "$72,177.38",
    derechos: "$ -",
    recargos: "$ -",
    subTotal: "$13,212.10",
    iva: "$80,155.01",
    total: "$82,999.83",
  },
  {
    id: "1",
    tasa: "IVA 0%",
    importePrima: "-",
    derechos: "-",
    recargos: "-",
    subTotal: "-",
    iva: "-",
    total: "-",
  },
  {
    id: "2",
    tasa: "IVA 8%",
    importePrima: "9,074.10",
    derechos: "-",
    recargos: "-",
    subTotal: "725.93",
    iva: "9,800.03",
    total: "9,800.03",
  },
  {
    id: "3",
    tasa: "IVA 16%",
    importePrima: "63,103.28",
    derechos: "-",
    recargos: "-",
    subTotal: "12,486.17",
    iva: "70,354.98",
    total: "73,199.80",
  },
  {
    id: "4",
    tasa: "Totales",
    importePrima: "$72,177.38",
    derechos: "$ -",
    recargos: "$ -",
    subTotal: "$13,212.10",
    iva: "$80,155.01",
    total: "$82,999.83",
  },
  {
    id: "1",
    tasa: "IVA 0%",
    importePrima: "-",
    derechos: "-",
    recargos: "-",
    subTotal: "-",
    iva: "-",
    total: "-",
  },
  {
    id: "2",
    tasa: "IVA 8%",
    importePrima: "9,074.10",
    derechos: "-",
    recargos: "-",
    subTotal: "725.93",
    iva: "9,800.03",
    total: "9,800.03",
  },
  {
    id: "3",
    tasa: "IVA 16%",
    importePrima: "63,103.28",
    derechos: "-",
    recargos: "-",
    subTotal: "12,486.17",
    iva: "70,354.98",
    total: "73,199.80",
  },
  {
    id: "4",
    tasa: "Totales",
    importePrima: "$72,177.38",
    derechos: "$ -",
    recargos: "$ -",
    subTotal: "$13,212.10",
    iva: "$80,155.01",
    total: "$82,999.83",
  },
  {
    id: "1",
    tasa: "IVA 0%",
    importePrima: "-",
    derechos: "-",
    recargos: "-",
    subTotal: "-",
    iva: "-",
    total: "-",
  },
  {
    id: "2",
    tasa: "IVA 8%",
    importePrima: "9,074.10",
    derechos: "-",
    recargos: "-",
    subTotal: "725.93",
    iva: "9,800.03",
    total: "9,800.03",
  },
  {
    id: "3",
    tasa: "IVA 16%",
    importePrima: "63,103.28",
    derechos: "-",
    recargos: "-",
    subTotal: "12,486.17",
    iva: "70,354.98",
    total: "73,199.80",
  },
  {
    id: "4",
    tasa: "Totales",
    importePrima: "$72,177.38",
    derechos: "$ -",
    recargos: "$ -",
    subTotal: "$13,212.10",
    iva: "$80,155.01",
    total: "$82,999.83",
  },
  {
    id: "1",
    tasa: "IVA 0%",
    importePrima: "-",
    derechos: "-",
    recargos: "-",
    subTotal: "-",
    iva: "-",
    total: "-",
  },
  {
    id: "2",
    tasa: "IVA 8%",
    importePrima: "9,074.10",
    derechos: "-",
    recargos: "-",
    subTotal: "725.93",
    iva: "9,800.03",
    total: "9,800.03",
  },
  {
    id: "3",
    tasa: "IVA 16%",
    importePrima: "63,103.28",
    derechos: "-",
    recargos: "-",
    subTotal: "12,486.17",
    iva: "70,354.98",
    total: "73,199.80",
  },
  {
    id: "4",
    tasa: "Totales",
    importePrima: "$72,177.38",
    derechos: "$ -",
    recargos: "$ -",
    subTotal: "$13,212.10",
    iva: "$80,155.01",
    total: "$82,999.83",
  },
  {
    id: "1",
    tasa: "IVA 0%",
    importePrima: "-",
    derechos: "-",
    recargos: "-",
    subTotal: "-",
    iva: "-",
    total: "-",
  },
  {
    id: "2",
    tasa: "IVA 8%",
    importePrima: "9,074.10",
    derechos: "-",
    recargos: "-",
    subTotal: "725.93",
    iva: "9,800.03",
    total: "9,800.03",
  },
  {
    id: "3",
    tasa: "IVA 16%",
    importePrima: "63,103.28",
    derechos: "-",
    recargos: "-",
    subTotal: "12,486.17",
    iva: "70,354.98",
    total: "73,199.80",
  },
  {
    id: "4",
    tasa: "Totales",
    importePrima: "$72,177.38",
    derechos: "$ -",
    recargos: "$ -",
    subTotal: "$13,212.10",
    iva: "$80,155.01",
    total: "$82,999.83",
  },
  {
    id: "1",
    tasa: "IVA 0%",
    importePrima: "-",
    derechos: "-",
    recargos: "-",
    subTotal: "-",
    iva: "-",
    total: "-",
  },
  {
    id: "2",
    tasa: "IVA 8%",
    importePrima: "9,074.10",
    derechos: "-",
    recargos: "-",
    subTotal: "725.93",
    iva: "9,800.03",
    total: "9,800.03",
  },
  {
    id: "3",
    tasa: "IVA 16%",
    importePrima: "63,103.28",
    derechos: "-",
    recargos: "-",
    subTotal: "12,486.17",
    iva: "70,354.98",
    total: "73,199.80",
  },
  {
    id: "4",
    tasa: "Totales",
    importePrima: "$72,177.38",
    derechos: "$ -",
    recargos: "$ -",
    subTotal: "$13,212.10",
    iva: "$80,155.01",
    total: "$82,999.83",
  },
];

const polizas = [
    {
      id: "6",
      title: "ACSEL-E vs SAP FI",
      status: "SIN_INFO",
      sourceA: "sourceA",
      amountA: 20,
      sourceB: 500000000,
      variation: 300,
      amountB: 40000,
      currency: 400,
    },
    {
      id: "5",
      title: "ACSEL-E vs SAP FI",
      status: "DISPONIBLE",
      sourceA: "sourceA",
      amountA: 20,
      sourceB: 500000000,
      variation: 300,
      amountB: 40000,
      currency: 400,
    },
    {
      id: "4",
      title: "ACSEL-E vs SAP FI",
      status: "SIN_INFO",
      sourceA: "sourceA",
      amountA: 20,
      sourceB: 500000000,
      variation: 300,
      amountB: 40000,
      currency: 400,
    },
    {
      id: "3",
      title: "ACSEL-E vs SAP FI",
      status: "EN_PROCESO",
      sourceA: "sourceA",
      amountA: 20,
      sourceB: 500000000,
      variation: 300,
      amountB: 40000,
      currency: 400,
    },
    {
      id: "1",
      title: "ACSEL-E vs SAP FI",
      status: "DISPONIBLE",
      sourceA: "sourceA",
      amountA: 20,
      sourceB: 500000000,
      variation: 300,
      amountB: 40000,
      currency: 400,
    },
   
  ];

function Detalles() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModal = () => {
    setModalOpen(!modalOpen);
  }; 

  return (
    <>
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
            className="border-gs-primary-medium dark:border-gs-primary-dark border-l-4 min-w-64"
            key={data.id}
            title={data.title}
            btnOnClick={() => handleModal()}
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
      <Modal
        open={modalOpen}
        onClose={handleModal}
        size="large"
        title="Detalles de Conciliación"
      >
        <div className="h-96 overflow-x-scroll">
          <h2>Operativo Acsel (Cifras control)</h2>
          <Table
            columns={columns}
            data={data}
            keyExtractor={(row) => row.id}
            striped
          />
        </div>
        <h2>SAP (Cifra Contable)</h2>
        <div className="">
          <Table
            columns={[
              { key: "tasa", label: "Tasa %" },
              { key: "importePrima", label: "Importe Prima" },
              { key: "derechos", label: "Derechos" },
              { key: "recargos", label: "Recargos" },
              { key: "subTotal", label: "Sub Total" },
              { key: "iva", label: "IVA" },
              { key: "total", label: "Total" },
            ]}
            data={[
              {
                id: "1",
                tasa: "IVA 0%",
                importePrima: "-",
                derechos: "-",
                recargos: "-",
                subTotal: "-",
                iva: "-",
                total: "-",
              },
              {
                id: "2",
                tasa: "IVA 8%",
                importePrima: "9,074.10",
                derechos: "-",
                recargos: "-",
                subTotal: "725.93",
                iva: "9,800.03",
                total: "9,800.03",
              },
              {
                id: "3",
                tasa: "IVA 16%",
                importePrima: "63,103.28",
                derechos: "-",
                recargos: "-",
                subTotal: "12,486.17",
                iva: "70,354.98",
                total: "73,199.80",
              },
              {
                id: "4",
                tasa: "Totales",
                importePrima: "$72,177.38",
                derechos: "$ -",
                recargos: "$ -",
                subTotal: "$13,212.10",
                iva: "$80,155.01",
                total: "$82,999.83",
              },
            ]}
            keyExtractor={(row) => row.id}
            striped
          />
        </div>
      </Modal>
    </>
  );
}

export default Detalles;
