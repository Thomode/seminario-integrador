import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TableRow, TableCell, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { usuarioService } from '../../services/usuario.service';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export function ItemUsuario({ usuario, loadUsuarios }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleDelete = async (id) => {
        try {
            await usuarioService.deleteUser(Number(id));
            loadUsuarios();
        } catch (error) {
            console.log('No eliminado');
        }
        setOpenDeleteDialog(false);
    }

    return (
        <TableRow
            key={usuario.idUsuario}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {usuario.user}
            </TableCell>
            <TableCell align="right">{usuario.idRol}</TableCell>
            <TableCell align="right">{usuario.fhAlta}</TableCell>
            <TableCell align="right">
                <IconButton color="primary" size='large' onClick={() => navigate(`/admin/usuarios/${usuario.idUsuario}/edit`)}>
                    <EditIcon></EditIcon>
                </IconButton>
            </TableCell>
            <TableCell align="right">
                <IconButton color="warning" size='large' onClick={() => setOpenDeleteDialog(true)}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </TableCell>
            {/* Diálogo de confirmación para eliminar */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '10px', // Personaliza el borde del modal
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Agrega una sombra
                    },
                    '& .MuiDialogTitle-root': {
                        background: '#f0f0f0', // Cambia el color del encabezado del modal
                    },
                }}
            >
                <DialogTitle>Baja de Usuario</DialogTitle>
                <DialogContent>
                    Apreta en confirmar para eliminar a {usuario.user}
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            color: 'gray',
                            '&:hover': {
                                color: 'black',
                            },
                        }}
                        onClick={() => setOpenDeleteDialog(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'darkred',
                            },
                        }}
                        onClick={() => handleDelete(usuario.idUsuario)}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </TableRow>
    );
}
