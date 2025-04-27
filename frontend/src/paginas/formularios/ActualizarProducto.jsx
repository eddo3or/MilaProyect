import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { useFormik } from "formik";
import * as Yup from "yup";

import { useState, useEffect } from "react";
import { actualizar_producto } from "../../api/api_productos.js";

export default function ActualizarProducto({ show, setShow, refresh, seleccionado }) {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            codigo: seleccionado.codigo,
            nombre: seleccionado.nombre,
            talla: seleccionado.talla,
            precio: seleccionado.precio,
            unidades: seleccionado.unidades,
            proveedor: seleccionado.proveedor,
            color: seleccionado.color,
        },
        validationSchema: Yup.object({
            codigo: Yup.string().required("Campo requerido"),
            nombre: Yup.string().required("Campo requerido"),
            talla: Yup.string().required("Campo requerido"),
            precio: Yup.number().required("Campo requerido"),
            unidades: Yup.number().required("Campo requerido"),
            proveedor: Yup.string().required("Campo requerido"),
            color: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                await actualizar_producto(seleccionado._id, values);
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
        formik.setFieldValue("codigo", seleccionado.codigo);
        formik.setFieldValue("nombre", seleccionado.nombre);
        formik.setFieldValue("talla", seleccionado.talla);
        formik.setFieldValue("precio", seleccionado.precio);
        formik.setFieldValue("unidades", seleccionado.unidades);
        formik.setFieldValue("proveedor", seleccionado.proveedor);
        formik.setFieldValue("color", seleccionado.color);
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
                        id="codigo"
                        label="codigo"
                        value={formik.values.codigo}
                        {...commonTextFieldProps}
                        error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                        helperText={formik.touched.codigo && formik.errors.codigo}
                    />

                    <TextField
                        id="nombre"
                        label="nombre"
                        value={formik.values.nombre}
                        {...commonTextFieldProps}
                        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                        helperText={formik.touched.nombre && formik.errors.nombre}
                    />

                    <Select
                        id="talla"
                        label="talla"
                        name="talla"
                        value={formik.values.talla}
                        {...commonTextFieldProps}
                        error={formik.touched.talla && Boolean(formik.errors.talla)}
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
                        value={formik.values.precio}
                        {...commonTextFieldProps}
                        error={formik.touched.precio && Boolean(formik.errors.precio)}
                        helperText={formik.touched.precio && formik.errors.precio}
                    />
                    <TextField
                        id="unidades"
                        label="unidades"
                        value={formik.values.unidades}
                        {...commonTextFieldProps}
                        error={formik.touched.unidades && Boolean(formik.errors.unidades)}
                        helperText={formik.touched.unidades && formik.errors.unidades}
                    />
                    <TextField
                        id="proveedor"
                        label="proveedor"
                        value={formik.values.proveedor}
                        {...commonTextFieldProps}
                        error={formik.touched.proveedor && Boolean(formik.errors.proveedor)}
                        helperText={formik.touched.proveedor && formik.errors.proveedor}
                    />

                    <TextField
                        id="color"
                        label="color"
                        value={formik.values.color}
                        {...commonTextFieldProps}
                        error={formik.touched.color && Boolean(formik.errors.color)}
                        helperText={formik.touched.color && formik.errors.color}
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