import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

interface RegisterFormInputs {
  nombre: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInputs>();
  const [message, setMessage] = useState("");

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(data.nombre, data.email, data.password);
      setMessage("Registro exitoso. Ahora puedes iniciar sesión.");
      // Aquí podrías redirigir automáticamente al login
      // router.push("/auth/login");
    } catch (error: any) {
      setMessage(error.message || "Error en el registro");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <Typography variant="h5" component="h1" gutterBottom>
        Registro
      </Typography>
      <TextField
        label="Nombre"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("nombre", {
          required: "El nombre es obligatorio",
          minLength: 3,
          maxLength: 50
        })}
        error={!!errors.nombre}
        helperText={errors.nombre?.message}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("email", {
          required: "El email es obligatorio"
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("password", {
          required: "La contraseña es obligatoria",
          minLength: 6
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      {message && <p className="text-red-500">{message}</p>}
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Registrarse
      </Button>
    </form>
  );
};

export default RegisterForm;
