import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { actualizar_usuario } from "../../api/api_usuarios.js";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useState, useEffect } from "react";

export default function ActualizarPersonal({ show, setShow, refresh, seleccionado }) {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            nombre: seleccionado.nombre,
            puesto: seleccionado.puesto,
            salario: seleccionado.salario,
            domicilio: seleccionado.domicilio,
            telefono: seleccionado.telefono,
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("Campo requerido"),
            puesto: Yup.string().required("Campo requerido"),
            salario: Yup.string().required("Campo requerido"),
            domicilio: Yup.string().required("Campo requerido"),
            telefono: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                await actualizar_usuario(seleccionado._id, values);
                setMensajeExitoAlert("Usuario creado y guardado correctamente");
                refresh();
            } catch (error) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el usuario");
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
        formik.setFieldValue("puesto", seleccionado.puesto);
        formik.setFieldValue("salario", seleccionado.salario);
        formik.setFieldValue("domicilio", seleccionado.domicilio);
        formik.setFieldValue("telefono", seleccionado.telefono);
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
                        <strong>Agregar empleado nuevo</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >

                    {/* FIC: Campos de captura o selección */}
                    <TextField
                        id="nombre"
                        label="nombre"
                        value={formik.values.nombre}
                        {...commonTextFieldProps}
                        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                        helperText={formik.touched.nombre && formik.errors.nombre}
                    />

                    <Select
                        id="puesto"
                        label="puesto"
                        name="puesto"
                        value={formik.values.puesto}
                        {...commonTextFieldProps}
                        error={formik.touched.puesto && Boolean(formik.errors.puesto)}
                    >
                        <MenuItem value={"gerente"}>Gerente</MenuItem>
                        <MenuItem value={"cajero"}>Cajero</MenuItem>
                    </Select>

                    <TextField
                        id="salario"
                        label="salario"
                        value={formik.values.salario}
                        {...commonTextFieldProps}
                        error={formik.touched.salario && Boolean(formik.errors.salario)}
                        helperText={formik.touched.salario && formik.errors.salario}
                    />
                    <TextField
                        id="domicilio"
                        label="domicilio"
                        value={formik.values.domicilio}
                        {...commonTextFieldProps}
                        error={formik.touched.domicilio && Boolean(formik.errors.domicilio)}
                        helperText={formik.touched.domicilio && formik.errors.domicilio}
                    />

                    <TextField
                        id="telefono"
                        label="telefono"
                        value={formik.values.telefono}
                        {...commonTextFieldProps}
                        error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                        helperText={formik.touched.telefono && formik.errors.telefono}
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