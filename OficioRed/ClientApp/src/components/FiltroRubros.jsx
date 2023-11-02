import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const FiltroRubros = ({rubros, setRubros}) => {
  const getRubros = async () => {
    const res = await axios.get("/api/Rubro")
    const rubrosLoad = []

    res.data.forEach(rubro => {
      rubrosLoad.push({
        idRubro: rubro.idRubro,
        nombre: rubro.nombre,
        seleccionado: false
      })
    });

    return rubrosLoad
  }
  const loadRubros = async () => {
    setRubros(await getRubros())
  }

  useEffect(() => {
    loadRubros()
  }, [])

  const handleSelectChange = (event) => {
    const selectedRubroIds = event.target.value;

    // Utilizamos la función de retorno de llamada en setRubros
    setRubros((prevRubros) => {
      return prevRubros.map((rubro) => ({
        ...rubro,
        seleccionado: selectedRubroIds.includes(rubro.idRubro),
      }));
    });

  };

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          width: { xs: "100%", sm: "100%" },
          paddingRight: { xs: 0, sm: 0 },
          marginLeft: { xs: 0, sm: 0 },
        }}
      >
        <InputLabel >Rubros</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={rubros.filter((rubro) => rubro.seleccionado).map((rubro) => rubro.idRubro)}
          onChange={handleSelectChange}
          renderValue={(selected) =>
            selected.map((rubroId) => rubros.find((rubro) => rubro.idRubro === rubroId).nombre).join(', ')
          }
          MenuProps={MenuProps}
        >
          {rubros.map((rubro) => (
            <MenuItem key={rubro.idRubro} value={rubro.idRubro}>
              <Checkbox checked={rubro.seleccionado} />
              <ListItemText primary={rubro.nombre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};