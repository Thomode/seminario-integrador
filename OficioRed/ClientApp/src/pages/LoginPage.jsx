﻿import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import logo from "../assets/Logo1_Recorte.png";
import accesoService from "../services/acceso.service";

const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1B325F',
    textAlign: 'center',
    marginBottom: '20px',
};

export const LoginPage = ({ setAcceso }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    register, // Identifica cada input del formulario
    handleSubmit, // Función que se ejecuta al enviar el formulario
    formState: { errors }, // Errores del formulario
  } = useForm();

  // useState del usuario encontrado
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);

  const onSubmit = async (data) => {
    const res = await accesoService.login(data.usuario, data.password);
    if (res.error === "Usuario no encontrado") {
      // Muestra el mensaje de "Usuario no encontrado" en el campo usuario
      setUsuarioEncontrado(true);
    } else if (res.error) {
      // Muestra un mensaje genérico para otros errores
      console.log("Error inesperado: ", res.error);
    } else {
      // Guardar token en el localStorage usando useLocalStorage
      window.localStorage.setItem("acceso", JSON.stringify(res.data));
      setAcceso(res.data);
      // Redirigir a la página de home
      if (res.data.idRol === 2) {
        navigate("/admin/usuarios", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  };

  return (
    <>
      <Grid container style={{ height: "85vh", justifyContent: "center" }}>
        <Grid
          container
          item
          xs={12}
          md={6}
          sm={3}
          alignItems="center"
          direction="column"
          style={{ padding: 10 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexDirection={"column"}
              maxWidth={400}
              minWidth={300}
              alignItems="center"
              justifyContent={"center"}
              margin="auto"
              marginTop={5}
              padding={3}
              borderRadius={5}
              boxShadow={"5px 5px 10px #ccc"}
              sx={{
                ":hover": {
                  boxShadow: "10px 10px 20px #ccc",
                },
                backgroundColor: "white",
              }}
            >
              {/*--------------- IMAGEN LOGO ---------------*/}
              <Grid container justify="center">
                <img src={logo} width={350} alt="logo" />
              </Grid>

              {/*--------------- TÍTULO ---------------*/}
                <Typography style={titleStyle}>
                    Iniciar Sesión
                </Typography>

              {/*--------------- Campo USUARIO ---------------*/}
              <TextField
                fullWidth
                required
                name="usuario"
                type={"text"}
                placeholder="Usuario"
                autoComplete="off"
                label="Usuario"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                {...register("usuario", {
                  required: true,
                  minLength: 2,
                  maxLength: 15,
                  usuarioEncontrado: false,
                })}
                error={!!errors.usuario} // Agregar la propiedad 'error' para resaltar el campo en caso de error
                helperText={
                  errors.usuario?.type === "required" ? (
                    "Campo obligatorio"
                  ) : errors.usuario?.type === "minLength" ? (
                    "Mínimo 2 caracteres"
                  ) : errors.usuario?.type === "maxLength" ? (
                    "Máximo 15 caracteres"
                  ) : usuarioEncontrado ? (
                    <span style={{ color: "red" }}>Usuario no encontrado</span>
                  ) : (
                    ""
                  )
                }
              />

              {/*--------------- Campo CONTRASEÑA ---------------*/}
              <TextField
                fullWidth
                required
                name="password"
                placeholder="Contraseña"
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                label="Contraseña"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <LockRounded />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <RemoveRedEyeRoundedIcon fontSize="small" />
                        ) : (
                          <VisibilityOffRoundedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register("password", {
                  required: true,
                  minLength: 4,
                  maxLength: 15,
                  // patron regular que contenga al menos una letra mayúscula, una minúscula, un número y un caracter especial
                  // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$.-_,@$!%*?&])[A-Za-z\d$.-_,@$!%*?&]{4,15}$/,
                })}
                error={!!errors.password} // Agregar la propiedad 'error' para resaltar el campo en caso de error
                helperText={
                  errors.password?.type === "required"
                    ? "Campo obligatorio"
                    : errors.password?.type === "minLength"
                    ? "Mínimo 4 caracteres"
                    : errors.password?.type === "maxLength"
                    ? "Máximo 15 caracteres"
                    : //: errors.password?.type === "pattern"
                      //? "Debe contener entre 4 y 15 caracteres y al menos una letra mayúscula, una minúscula, un número y un caracter especial"
                      ""
                }
              />

              {/*--------------- Checkbox para recordar credenciales ---------------*/}
              <FormControlLabel
                name="recordarCredenciales"
                control={<Checkbox />}
                label="Recordar credenciales"
                {...register("recordarCredenciales")}
              />

              <div style={{ height: 20 }} />

              {/*--------------- Botón Iniciar Sesión ---------------*/}
              <Button
                endIcon={<LoginOutlinedIcon />}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Iniciar Sesión
              </Button>

              <div style={{ height: 20 }} />

              {/*---------- Link si olvidó la contraseña ----------*/}
              <Typography marginBottom={2}>
                <Link href="#">Olvidaste tu contraseña?</Link>
              </Typography>

              {/*--------------- Botón Registrarse ---------------*/}
              <Button
                endIcon={<HowToRegOutlinedIcon />}
                color="primary"
                variant="outlined"
                // Redirigir a la pagina de registro
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Registrarse
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
