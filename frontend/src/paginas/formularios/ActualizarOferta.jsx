import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { useFormik } from "formik";
import * as Yup from "yup";

import { useState, useEffect } from "react";
import { actualizar_oferta } from "../../api/api_ofertas.js";

export default function ActualizarOferta({ show, setShow, refresh, seleccionado }) {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            nombre: seleccionado.nombre,
            descuento: seleccionado.descuento,
            inicio: seleccionado.inicio,
            fin: seleccionado.fin,
            descripcion: seleccionado.descripcion,
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("Campo requerido"),
            descuento: Yup.number().required("Campo requerido"),
            inicio: Yup.date().required("Campo requerido"),
            fin: Yup.date().required("Campo requerido"),
            descripcion: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                await actualizar_oferta(seleccionado._id, values);
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
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    useEffect(() => {
        formik.setFieldValue("nombre", seleccionado.nombre);
        formik.setFieldValue("descuento", seleccionado.descuento);
        formik.setFieldValue("inicio", seleccionado.inicio);
        formik.setFieldValue("fin", seleccionado.fin);
        formik.setFieldValue("descripcion", seleccionado.descripcion);
    }, [seleccionado]);

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
                        id="nombre"
                        label="nombre"
                        value={formik.values.nombre}
                        {...commonTextFieldProps}
                        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                        helperText={formik.touched.nombre && formik.errors.nombre}
                    />

                    <TextField
                        id="descuento"
                        label="descuento"
                        value={formik.values.descuento}
                        {...commonTextFieldProps}
                        error={formik.touched.descuento && Boolean(formik.errors.descuento)}
                        helperText={formik.touched.descuento && formik.errors.descuento}
                    />

                    <TextField
                        id="inicio"
                        label="inicio"
                        value={formik.values.inicio}
                        {...commonTextFieldProps}
                        error={formik.touched.inicio && Boolean(formik.errors.inicio)}
                        helperText={formik.touched.inicio && formik.errors.inicio}
                    />
                    <TextField
                        id="fin"
                        label="fin"
                        value={formik.values.fin}
                        {...commonTextFieldProps}
                        error={formik.touched.fin && Boolean(formik.errors.fin)}
                        helperText={formik.touched.fin && formik.errors.fin}
                    />

                    <TextField
                        id="descripcion"
                        label="descripcion"
                        value={formik.values.descripcion}
                        {...commonTextFieldProps}
                        error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                        helperText={formik.touched.descripcion && formik.errors.descripcion}
                    />

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