"use client";
import { useState, useMemo } from "react";
import { Delete, Edit, Create } from "./accions";
import { SocietyType } from "@repo/api";
import { FormType, SociedadParams } from "./types";
import { Form, GlobalCrud } from "@repo/ui";
import { SubmitHandler } from "react-hook-form";

export default function Sociedades({
  data,
  tableHeader,
  branchList,
}: Readonly<SociedadParams>) {
  const [selected, setSelected] = useState<SocietyType | null>(null);

  const handleDelete = async (item: SocietyType) => {
    if (confirm(`¿Eliminar sociedad ${item.razon_social}?`)) {
      const response = await Delete({ id: item.ramo_id });
      console.log(response);
    }
  };

  const handleEdit = (item: SocietyType) => {
    setSelected(item);
  };

  const handleCreate = () => {
    setSelected(null);
  };

  const handleSave: SubmitHandler<FormType> = async (formData) => {
    console.log("datos del formulario", formData.ramo_id);
    try {
      if (selected) {
        await Edit({
          num_sociedad_sap: formData.num_sociedad_sap,
          ramo_id: formData.ramo_id,
          rfc: formData.rfc,
          razon_social: formData.razon_social,
          topico_kafka: formData.topico_kafka,
        });
      } else {
        await Create(formData);
      }
      setSelected(null);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const options = branchList.map((branch) => ({
    label: branch.ramo,
    value: branch.id,
  }));

  const defaultValues: FormType = useMemo(() => {
    if (selected) {
      return {
        num_sociedad_sap: selected.num_sociedad_sap,
        ramo_id: selected.ramo_id,
        razon_social: selected.razon_social,
        rfc: selected.rfc,
        topico_kafka: selected.topico_kafka,
      };
    }
    return {
      num_sociedad_sap: 0,
      ramo_id: "",
      razon_social: "",
      rfc: "",
      topico_kafka: "",
    };
  }, [selected]);

  return (
    <GlobalCrud<SocietyType>
      title="Gestión de Sociedades"
      data={data}
      columns={tableHeader}
      keyExtractor={(item) => item.rfc}
      onEdit={handleEdit}
      onCreate={handleCreate}
      onDelete={handleDelete}
      labelCreate="Nueva Sociedad"
      modalContent={
        <Form<FormType>        
          key={selected ? selected.rfc : "new-society-form"}
          onSubmit={handleSave}
          defaultValues={defaultValues}
        >
          <Form.Section title={selected ? "Editar Sociedad" : "Nueva Sociedad"}>
            <Form.Select
              size="lg"
              variant="default"
              fullWidth={true}
              options={options}
              name="ramo_id"
              label="Ramo ID"
              required
            />
            <Form.Field name="razon_social" label="Razón Social" required />
            <Form.Field name="rfc" label="RFC" required />
            <Form.Field
              name="num_sociedad_sap"
              label="Sociedad SAP"
              type="number" 
              required
            />
            <Form.Field name="topico_kafka" label="Tópico Kafka" required />
          </Form.Section>
          <Form.Actions align="right">
            <Form.SubmitButton>
              {selected ? "Actualizar" : "Guardar"}
            </Form.SubmitButton>
          </Form.Actions>
        </Form>
      }
    />
  );
}
