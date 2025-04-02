import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Select, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { insertar_producto } from "../../api/api_productos.js";

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
            talla: "UNITALLA",
            precio: "",
            unidades: "",
            proveedor: "",
            color: "",
        },
        validationSchema: Yup.object({
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
                await insertar_producto(values);
                setMensajeExitoAlert("Producto creado y guardado correctamente");
                refresh();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el producto");
                console.log(e.response.data);
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
                        <strong>Agregar producto nuevo</strong>
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
                    <LoadingButton
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
                    </LoadingButton>

                    {/* FIC: Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    >

                        <span>Insertar</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};