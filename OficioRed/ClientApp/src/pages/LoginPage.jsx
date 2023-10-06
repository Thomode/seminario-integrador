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
  import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
  import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
  import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
  import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
  import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
  
  import imgOficioRed from "../assets/arregloHogar.jpeg";
  import logo from "../assets/Logo1_Recorte.png";
  import { AccountCircle, LockRounded } from "@mui/icons-material";
  
  import { set, useForm } from "react-hook-form";
  
  import accesoService from "../services/acceso.service";
  
  export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
  
    // Hook useForm
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
  
    const onSubmit = async (data) => {
      const res = await accesoService.login(data.usuario, data.password);
      console.log("Token: " + res.data);
    };
  
    const [isSignup, setIsSignup] = useState(false);
    const [inpust, setInputs] = useState({
      usuario: "",
      nombre: "",
      apellido: "",
      password: "",
    });
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const user = await accesoService.login({ usuario, password });
        setUsuario(user);
        setPassword(password);
      } catch (error) {
        setErrorMessage("Usuario o contraseña incorrectos");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    };
  
    const resetState = () => {
      setIsSignup(!isSignup);
      setInputs({
        usuario: "",
        nombre: "",
        apellido: "",
        password: "",
      });
    };
    return (
      <>
        <Grid container style={{ height: "85vh" }}>
          <Grid item xs={12} sm={6}>
            <img
              src={imgOficioRed}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="ImagenOficioRed"
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            sm={3}
            alignItems="center"
            direction="column"
            justifyContent="space-between"
            style={{ padding: 10 }}
          >
            <div />
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
                }}
              >
                <Grid container justify="center">
                  <img src={logo} width={350} alt="logo" />
                </Grid>
  
                <Typography variant="h4" padding={3} textAlign="center">
                  {isSignup ? "Registrarse" : "Iniciar Sesión"}
                </Typography>
  
                <TextField
                  fullWidth
                  required
                  onChange={handleChange}
                  name="usuario"
                  value={inpust.usuario}
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
                />
                {isSignup && (
                  <TextField
                    fullWidth
                    required
                    onChange={handleChange}
                    name="nombre"
                    value={inpust.nombre}
                    type={"text"}
                    placeholder="Nombre"
                    autoComplete="off"
                    label="Nombre"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DriveFileRenameOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                {isSignup && (
                  <TextField
                    fullWidth
                    required
                    onChange={handleChange}
                    name="apellido"
                    value={inpust.apellido}
                    type={"text"}
                    placeholder="Apellido"
                    autoComplete="off"
                    label="Apellido"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DriveFileRenameOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                <TextField
                  fullWidth
                  required
                  onChange={handleChange}
                  name="password"
                  value={inpust.password}
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
                />
  
                {!isSignup && (
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Recordar credenciales"
                  />
                )}
  
                <div style={{ height: 20 }} />
  
                <Button
                  endIcon={
                    isSignup ? <HowToRegOutlinedIcon /> : <LoginOutlinedIcon />
                  }
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {isSignup ? "Registrarse" : "Iniciar Sesión"}
                </Button>
                <div style={{ height: 20 }} />
                {!isSignup && (
                  <Typography marginBottom={2}>
                    <Link href="#">Olvidaste tu contraseña?</Link>
                  </Typography>
                )}
                <Button
                  endIcon={
                    isSignup ? <LoginOutlinedIcon /> : <HowToRegOutlinedIcon />
                  }
                  onClick={resetState}
                  color="primary"
                  variant="outlined"
                >
                  {isSignup ? "Iniciar Sesión" : "Registrarse"}
                </Button>
              </Box>
            </form>
            <div />
          </Grid>
        </Grid>
      </>
    );
  };
