import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { eliminar_producto } from "../../api/api_productos";

import { useState } from "react";

export default function EliminarProducto({ show, setShow, refresh, seleccionado }) {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const eliminar = async () => {
        setLoading(true);

        setMensajeErrorAlert(null);
        setMensajeExitoAlert(null);

        try {
            await eliminar_producto(seleccionado._id);
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

                <TextField
                    id="nombre"
                    label="nombre"
                    value={seleccionado.nombre}
                    {...commonTextFieldProps}
                />

                <Select
                    id="talla"
                    label="talla"
                    name="talla"
                    value={seleccionado.talla}
                    {...commonTextFieldProps}
                >
                    <MenuItem value={"UNITALLA"}>Unitalla</MenuItem>
                    <MenuItem value={"S"}>Chica (S)</MenuItem>
                    <MenuItem value={"M"}>Mediana (M)</MenuItem>
                    <MenuItem value={"L"}>Grande (L)</MenuItem>
                    <MenuItem value={"XL"}>Extra grande (XL)</MenuItem>
                </Select>

                <TextField
                    id="precio"
                    label="precio"
                    value={seleccionado.precio}
                    {...commonTextFieldProps}
                />

                <TextField
                    id="unidades"
                    label="unidades"
                    value={seleccionado.unidades}
                    {...commonTextFieldProps}
                />
                <TextField
                    id="proveedor"
                    label="proveedor"
                    value={seleccionado.proveedor}
                    {...commonTextFieldProps}
                />

                <TextField
                    id="color"
                    label="color"
                    value={seleccionado.color}
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