import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Select, MenuItem, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { insertar_oferta } from "../../api/api_ofertas.js";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useState } from "react";

export default function RegistrarProducto({ show, setShow, refresh }) {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            nombre: "",
            descuento: "",
            inicio: "",
            fin: "",
            estatus: "Activo",
            descripcion: "",
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("Campo requerido"),
            descuento: Yup.number().required("Campo requerido"),
            inicio: Yup.date().required("Campo requerido"),
            fin: Yup.date().required("Campo requerido"),
            estatus: Yup.string().required("Campo requerido"),
            descripcion: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                await insertar_oferta(values);
                setMensajeExitoAlert("Oferta creada y guardado correctamente");
                refresh();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la oferta");
                console.log(e);
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

    return (
        <Dialog
            open={show}
            onClose={() => setShow(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Agregar nueva oferta</strong>
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

                    <Select
                        id="estatus"
                        label="estatus"
                        name="estatus"
                        value={formik.values.estatus}
                        {...commonTextFieldProps}
                        error={formik.touched.estatus && Boolean(formik.errors.estatus)}
                    >
                        <MenuItem value={"Activo"}>Activo</MenuItem>
                        <MenuItem value={"Inactivo"}>Inactivo</MenuItem>
                    </Select>

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
                            formik.resetForm();
                        }}
                    >
                        <span>CERRAR</span>
                    </Button>

                    {/* FIC: Boton de Guardar. */}
                    <Button
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    >

                        <span>Insertar</span>
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};