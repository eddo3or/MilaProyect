import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { useFormik } from "formik";

import { useState, useEffect } from "react";
import { actualizar_pedido } from "../../api/api_pedidos.js";

export default function ActualizarSolicitud({ show, setShow, refresh, seleccionado }) {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            fecha: seleccionado.nombre,
            cliente: seleccionado.descuento,
            telefono: seleccionado.fin,
            estatus: seleccionado.estatus,
            productos: seleccionado.productos,
        },
        onSubmit: async (values) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                await actualizar_pedido(seleccionado._id, values);
                setMensajeExitoAlert("Actualizado correctamente");
                refresh();
            } catch (error) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo actualizar");
                console.log(error.response.data);
            }
            setLoading(false);
        },
    });

    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
        disabled: true,
    };

    useEffect(() => {
        formik.setFieldValue("fecha", seleccionado.fecha);
        formik.setFieldValue("cliente", seleccionado.cliente);
        formik.setFieldValue("telefono", seleccionado.telefono);
        formik.setFieldValue("estatus", seleccionado.estatus);
        formik.setFieldValue("productos", seleccionado.productos);
    }, [seleccionado]);

    if (!seleccionado._id) {
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
        <Dialog
            open={show}
            onClose={() => setShow(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Actualizar registro</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>

                    <TextField
                        id="fecha"
                        label="Fecha"
                        value={formik.values.fecha}
                        {...commonTextFieldProps}
                        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                        helperText={formik.touched.nombre && formik.errors.nombre}
                    />
                    <TextField
                        id="cliente"
                        label="Cliente"
                        value={formik.values.cliente}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="telefono"
                        label="Teléfono"
                        value={formik.values.telefono}
                        {...commonTextFieldProps}
                    />

                    <Select
                        id="estatus"
                        label="Estatus"
                        name="estatus"
                        value={formik.values.estatus}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={"entregado"}>entregado</MenuItem>
                        <MenuItem value={"pendiente"}>pendiente</MenuItem>
                        <MenuItem value={"caducado"}>caducado</MenuItem>
                    </Select>

                </DialogContent>
                <DialogActions
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
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

                    {/* FIC: Boton de Cerrar. */}
                    <Button
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => {
                            setShow(false)
                            setMensajeErrorAlert(null);
                            setMensajeExitoAlert(null);
                        }}
                    >
                        <span>Cerrar</span>
                    </Button>

                    {/* Boton de Actualizar */}
                    <Button
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    >

                        <span>Actualizar</span>
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};