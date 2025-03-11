import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, TextField, Typography } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance"; // <--- usar la instancia

interface EventFormInputs {
  titulo: string;
  descripcion?: string;
  ubicacion?: string;
  fecha_inicio: string;
  fecha_fin: string;
}

interface EventFormProps {
  event?: any;
}

const EventForm = ({ event }: EventFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<EventFormInputs>({ defaultValues: event || {} });
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (event) {
      reset(event);
    }
  }, [event, reset]);

  const onSubmit = async (data: EventFormInputs) => {
    try {
      if (event) {
        // Actualizar evento
        await axiosInstance.put(`/events/${event.id}`, data);
        setMessage("Evento actualizado correctamente.");
      } else {
        // Crear evento
        await axiosInstance.post("/events", data);
        setMessage("Evento creado correctamente.");
      }
      router.push("/events");
    } catch (error: any) {
      setMessage(error.message || "Error al enviar el formulario");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
      {/* ...campos... */}
    </form>
  );
};

export default EventForm;
