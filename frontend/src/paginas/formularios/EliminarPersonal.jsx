import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { eliminar_usuario } from "../../api/api_usuarios.js";


import { useState } from "react";

export default function EliminarPersonal({ show, setShow, refresh, seleccionado }) {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const eliminar = async () => {
        setLoading(true);

        setMensajeErrorAlert(null);
        setMensajeExitoAlert(null);

        try {
            await eliminar_usuario(seleccionado._id);
            setMensajeExitoAlert("Eliminado correctamente");
            refresh();
        } catch (error) {
            setMensajeExitoAlert(null);
            setMensajeErrorAlert("No se pudo eliminar");
            console.log(error.response.data);
        }
        setLoading(false);
    }

    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
        disabled: true
    }

    if (!seleccionado._id && !mensajeExitoAlert) {
        return (
            <Dialog open={show} onClose={() => setShow(false)} fullWidth>

                <DialogTitle style={{ textAlign: 'center' }}>
                    NO has seleccionado un registro de la tabla!
                </DialogTitle>

                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => setShow(false)}>
                        Cerrar
                    </Button>
                </DialogContent>

            </Dialog>
        );
    }

    return (
        <Dialog open={show} onClose={() => setShow(false)} fullWidth>
            <DialogTitle>
                <Typography component="h6">
                    <strong>Eliminar registro</strong>
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>

                {/* FIC: Campos de captura o selección */}
                <TextField
                    id="nombre"
                    label="nombre"
                    value={seleccionado.nombre}
                    {...commonTextFieldProps}
                />

                <TextField
                    id="usuario"
                    label="usuario"
                    value={seleccionado.usuario}
                    {...commonTextFieldProps}
                />

                <Select
                    id="puesto"
                    label="puesto"
                    name="puesto"
                    value={seleccionado.puesto}
                    {...commonTextFieldProps}
                >
                    <MenuItem value={"gerente"}>Gerente</MenuItem>
                    <MenuItem value={"cajero"}>Cajero</MenuItem>
                </Select>

                <TextField
                    id="domicilio"
                    label="domicilio"
                    value={seleccionado.domicilio}
                    {...commonTextFieldProps}
                />

                <TextField
                    id="telefono"
                    label="telefono"
                    value={seleccionado.telefono}
                    {...commonTextFieldProps}
                />

            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box m="auto">
                    {mensajeErrorAlert && (
                        <Alert severity="error">
                            <b>¡ERROR!</b> ─ {mensajeErrorAlert}
                        </Alert>
                    )}
                    {mensajeExitoAlert && (
                        <Alert severity="success">
                            <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
                        </Alert>
                    )}
                </Box>

                {/* ============ BOTÓN CERRAR ============ */}
                <Button
                    color="secondary"
                    loadingPosition="start"
                    startIcon={<CloseIcon />}
                    variant="outlined"
                    onClick={() => {
                        setShow(false);
                        setMensajeErrorAlert(null);
                        setMensajeExitoAlert(null);
                    }}
                >
                    <span>CERRAR</span>
                </Button>

                {/* ============ BOTÓN ELIMINAR ============ */}
                <Button
                    color="primary"
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={() => eliminar()}
                    disabled={!!mensajeExitoAlert}
                    loading={Loading}
                >

                    <span>Eliminar</span>
                </Button>
            </DialogActions>
        </Dialog >
    );
};