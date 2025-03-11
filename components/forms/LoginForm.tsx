import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      // Por ejemplo, podrías redirigir al dashboard:
      // router.push("/dashboard");
    } catch (error: any) {
      setErrorMessage(error.message || "Error al iniciar sesión");
    }
  };

  const handleGoogleLogin = () => {
    // Tu backend expone /api/auth/google para iniciar el flujo OAuth.
    window.location.href = "http://localhost:3020/api/auth/google";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <Typography variant="h5" component="h1" gutterBottom>
        Iniciar Sesión
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("email", { required: "El email es obligatorio" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("password", { required: "La contraseña es obligatoria" })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Iniciar Sesión
      </Button>

      <Button
        onClick={handleGoogleLogin}
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Iniciar con Google
      </Button>
    </form>
  );
};

export default LoginForm;
