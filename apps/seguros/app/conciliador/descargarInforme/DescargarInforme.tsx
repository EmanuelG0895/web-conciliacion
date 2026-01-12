import { useEffect } from "react";
import { Button, Form, Modal, Radio } from "@repo/ui";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { obtenerMeses, obtenerSemanas } from "./apis/data";

interface Inputs {
  fechaInicio: string;
  fechaFin: string;
  tipoNegocio: string;
  tipoProducto: string;
}

export default function DescargarInforme() {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState("month");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [semanas, setSemanas] = useState<{ id: number; title: string }[]>([]);
  const [meses, setMeses] = useState<{ id: number; title: string }[]>([]);
  const periodicityOptions = [
    { id: "opt-1", label: "Mes", value: "month" },
    { id: "opt-2", label: "Año", value: "year" },
  ];
  useEffect(() => {
    const fetchSemanas = async () => {
      try {
        const data = await obtenerSemanas();
        setSemanas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    const fetchMeses = async () => {
      try {
        const data = await obtenerMeses();
        setMeses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetchSemanas();
    fetchMeses();
  }, []);
  
  const onSubmitDownload: SubmitHandler<Inputs> = (data) => {
    console.log("Descarga informe:", data);
  };
  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        icon={<DownloadIcon />}
        iconPosition="right"
      >
        <span>Descargar Informe (.xlsx)</span>
      </Button>

      <Modal
        onClose={() => setOpenModal(!openModal)}
        open={openModal}
        size="large"
        title="Descargar Informe"
      >
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
            options={semanas.map((semana) => ({
              label: semana.title,
              value: semana.id.toString(),
            }))}
            placeholder="Semana"
            required
          />
          <Form.Select
            name="mes"
            options={meses.map((mes) => ({
              label: mes.title,
              value: mes.id.toString(),
            }))}
            placeholder="Mes"
            required
          />
          <Form.SubmitButton variant="default">Buscar</Form.SubmitButton>
        </Form>
      </Modal>
    </>
  );
}
