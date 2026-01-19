"use client";

import { Form, SelectOption } from "@repo/ui";
import React, { useMemo } from "react";
import { SubmitHandler } from "react-hook-form";
import { Inputs, SearchProps } from "./types";

function Buscar({ businessType, productType }: Readonly<SearchProps>) {
  const fechaMaximaAyer = new Date(new Date().setDate(new Date().getDate()))
    .toISOString()
    .split("T")[0];
  const currentYear = new Date().getFullYear();
  const minYear = Math.max(2026, currentYear);
  const fechaMinima = new Date(minYear, 0, 1);
  fechaMinima.setHours(0, 0, 0, 0);

  const onSubmitSearch: SubmitHandler<Inputs> = (data) => {
    console.log("Búsqueda principal:", data);
  };

  const businessOptions: SelectOption[] = useMemo(
    () =>
      businessType.map((item) => ({
        label: item.tipo_negocio,
        value: item.tipo_negocio_id.toString(),
      })),
    [businessType]
  );

  const productTypeOptions: SelectOption[] = useMemo(
    () =>
      productType.map((item) => ({
        label: item.producto,
        value: item.product_id,
      })),
    [productType]
  );
  return (
    <div className="bg-gs-white dark:bg-gs-gray-dark p-4 rounded-xl shadow-md w-full lg:w-auto">
      <Form
        onSubmit={onSubmitSearch}
        className="text-gs-gray-medium flex flex-col items-start lg:items-end gap-2 lg:flex-row"
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
          required={true}
          label="Fecha de inicio"
        />
        <Form.Calendar
          label="Fecha de termino"
          name="dateEnd"
          maxDate={fechaMaximaAyer}
          minDate={fechaMinima}
          required={true}
        />
        <Form.Select
          size="lg"
          name="tipoNegocio"
          options={businessOptions}
          placeholder="Tipo de negocio"
          label="Tipo de negocio"
          required={true}
        />
        <Form.Select
          name="tipoProducto"
          options={productTypeOptions}
          placeholder="Tipo de producto"
          label="Tipo producto"
          size="lg"
          required={true}
        />
        <Form.SubmitButton variant="default">Buscar</Form.SubmitButton>
      </Form>
    </div>
  );
}

export default Buscar;
