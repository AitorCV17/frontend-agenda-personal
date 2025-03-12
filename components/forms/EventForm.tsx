// components/forms/EventForm.tsx
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import axiosInstance from "utils/axiosInstance";

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
      const payload = {
        ...data,
        fecha_inicio: new Date(data.fecha_inicio).toISOString(), // 👈 formato ISO completo
        fecha_fin: new Date(data.fecha_fin).toISOString(),
      };
  
      if (event) {
        await axiosInstance.put(`/events/${event.id}`, payload);
      } else {
        await axiosInstance.post("/events", payload);
      }
  
      router.push("/events");
    } catch (error: any) {
      setMessage(error.message || "Error al enviar el formulario");
    }
  };
  

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 glass shadow-lg rounded-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">
        {event ? "Editar Evento" : "Crear Evento"}
      </h1>
      <div className="mb-4">
        <label className="block mb-1">Título</label>
        <input
          type="text"
          {...register("titulo", { required: "El título es obligatorio" })}
          className="w-full p-2 border rounded focus:ring-emerald-500"
        />
        {errors.titulo && <span className="text-red-500">{errors.titulo.message}</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Descripción</label>
        <textarea
          {...register("descripcion")}
          className="w-full p-2 border rounded focus:ring-emerald-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Ubicación</label>
        <input
          type="text"
          {...register("ubicacion")}
          className="w-full p-2 border rounded focus:ring-emerald-500"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Fecha de Inicio</label>
          <input
            type="datetime-local"
            {...register("fecha_inicio", { required: "La fecha de inicio es obligatoria" })}
            className="w-full p-2 border rounded focus:ring-emerald-500"
          />
          {errors.fecha_inicio && <span className="text-red-500">{errors.fecha_inicio.message}</span>}
        </div>
        <div>
          <label className="block mb-1">Fecha de Fin</label>
          <input
            type="datetime-local"
            {...register("fecha_fin", { required: "La fecha de fin es obligatoria" })}
            className="w-full p-2 border rounded focus:ring-emerald-500"
          />
          {errors.fecha_fin && <span className="text-red-500">{errors.fecha_fin.message}</span>}
        </div>
      </div>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      <button type="submit" className="w-full py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors">
        {event ? "Actualizar Evento" : "Crear Evento"}
      </button>
    </motion.form>
  );
};

export default EventForm;
