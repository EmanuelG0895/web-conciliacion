"use client";
import { Button, Input, Modal } from "@repo/ui";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example"));

  return (
    <>
      <Button type="button" variant="default" onClick={() => setIsOpen(true)}>
        Abrir Modal
      </Button>

      {isOpen && (
        <Modal title="Mi Modal" onClose={() => setIsOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("example")}
              error={errors.example ? "This field is required" : ""}
            />
            {errors.exampleRequired && <span>This field is required</span>}
            <Button variant="default" type="submit">
              Agregar sociedad
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
}
