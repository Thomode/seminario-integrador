﻿import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography,
    IconButton,
    Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";

import imagendefault from "../assets/fotodefault.webp";
import { contactoService } from "../services/contacto.service";
import imagenFondo from "../assets/fondo.jpg";
import imagenwsp from "../assets/whatsapp.png";

const cardStyle = {
    maxWidth: "345px",
    minHeight: "500px",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    overflow: "hidden",
    transition: "transform 0.3s ease-in-out",
    margin: "20px",  
    marginBottom: "20px",
    border: "2px solid #1b325f",
    "&:hover": {
        transform: "scale(1.05)",
        border: "",
    },
};

const buttonStyle = {
    margin: "0 8px",
    posittion: "bottom",
};

const titleStyle2 = {
    fontSize: '70px',
    fontWeight: 'bold',
    color: '#1b325f',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    WebkitTextStroke: '2px white',
    MozTextStroke: '2px white',
    marginBottom: '0px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',  
    padding: '10px',
    borderRadius: '10px',
};

const FavoritePage = ({ profesionales }) => {
    const navigate = useNavigate();
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        // Recupera la lista de favoritos del localStorage al cargar el componente
        const storedFavoritos = localStorage.getItem('favoritos');

        if (storedFavoritos) {
            setFavoritos(JSON.parse(storedFavoritos));
        }
    }, []);

    const handleLeerMasClick = (id) => {
        navigate(`/${id}/PerfilProfesional`);
    };

    const handleContactar = async (idContacto) => {
        try {
            const res = await contactoService.getById(idContacto);
            console.log(res.data);

            if (res.data.telefono) {
                const url = `https://wa.me/+549${res.data.telefono}`;
                window.open(url, "_blank");
            } else {
                console.error(
                    "El numero de telefono no esta definido en el objeto de contacto."
                );
            }
        } catch (error) {
            console.error("Error al obtener el contacto:", error);
        }
    };

    const handleAgregarFavorito = (profesional) => {
        // Usa una función para actualizar el estado correctamente
        setFavoritos((prevFavoritos) => {
            const isInFavoritos = prevFavoritos.some((fav) => fav.idProfesional === profesional.idProfesional);

            let nuevosFavoritos;

            if (!isInFavoritos) {
                // Agrega el profesional a la lista de favoritos
                console.log([...prevFavoritos, profesional]);
                nuevosFavoritos = [...prevFavoritos, profesional];
            } else {
                // Elimina el profesional de la lista de favoritos
                nuevosFavoritos = prevFavoritos.filter((fav) => fav.idProfesional !== profesional.idProfesional);
                console.log(nuevosFavoritos);
            }

            // Guarda la lista de favoritos en el localStorage
            localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));

            return nuevosFavoritos;
        });
    };

    return (
        <Grid container style={{
            backgroundImage: `url(${imagenFondo})`,
            backgroundSize: "cover",
            minHeight: "100vh",
        }} xs={12}>
            <Grid xs={12}>
                <Typography variant="h2" sx={titleStyle2}>
                    Favoritos
                </Typography>
            </Grid>
            {favoritos.map((profesional, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                    <Card sx={cardStyle}>
                        <CardMedia
                            component="img"
                            alt="profesional"
                            height="240px"
                            src={
                                profesional.fotoPerfil
                                    ? profesional.fotoPerfil
                                    : imagendefault
                            }
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {`${profesional.nombre} ${profesional.apellido}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {profesional.rubros &&
                                    profesional.rubros.map((rubro, index) => (
                                        <Chip
                                            key={index}
                                            variant="elevated"
                                            label={`${rubro.nombre} `}
                                            style={{
                                                backgroundColor: "#1b325f",
                                                color: "white",
                                                margin: "2px",
                                            }}
                                        />
                                    ))}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        position="bottom"
                                        size="small"
                                        style={{ backgroundColor: "#2E8B57", color: "white" }}
                                        sx={buttonStyle}
                                        startIcon={<img src={imagenwsp} alt="WhatsApp" style={{ height: '20px', marginRight: '5px' }} />}
                                        onClick={() => handleContactar(profesional.idContacto)}
                                    >
                                        CONTACTAR
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ backgroundColor: "#f26c4f", color: "white" }}
                                        sx={buttonStyle}
                                        onClick={() =>
                                            handleLeerMasClick(profesional.idProfesional)
                                        }
                                    >
                                        Leer más
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        aria-label="Agregar a favoritos"
                                        onClick={() => handleAgregarFavorito(profesional)}
                                    >
                                        <FavoriteIcon
                                            color={
                                                favoritos.some(
                                                    (fav) => fav.idProfesional === profesional.idProfesional
                                                )
                                                    ? "error"
                                                    : "default"
                                            }
                                        />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default FavoritePage;