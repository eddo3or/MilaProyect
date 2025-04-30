import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Select, MenuItem, Button } from "@mui/material";
import { FileUpload } from "@chakra-ui/react"
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import UploadIcon from '@mui/icons-material/Upload';

import { insertar_producto } from "../../api/api_productos.js";
import axios from "../../api/axios_config.js";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useState } from "react";

export default function RegistrarProducto({ show, setShow, refresh }) {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [archivo, setArchivo] = useState();

    const formik = useFormik({
        initialValues: {
            codigo: "",
            nombre: "",
            talla: "UNITALLA",
            precio: "",
            unidades: "",
            proveedor: "",
            color: "",
        },
        validationSchema: Yup.object({
            codigo: Yup.number().required("Campo requerido"),
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
                if (!archivo) {
                    await axios.post("/productos/insertar-no-imagen", values);
                } else {
                    let fd = new FormData();
                    fd.append('imagen', archivo);
                    fd.append('name', archivo.name);
                    if (!archivo.type) fd.append("metadata", "otro");
                    else fd.append("metadata", archivo.type);
                    fd.append("codigo", values.codigo);
                    fd.append("nombre", values.nombre);
                    fd.append("talla", values.talla);
                    fd.append("precio", values.precio);
                    fd.append("unidades", values.unidades);
                    fd.append("proveedor", values.proveedor);
                    fd.append("color", values.color);
                    await axios.post("/productos/insertar-imagen", fd, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                setMensajeExitoAlert("Producto creado y guardado correctamente");
                setArchivo(null);
                refresh();
            } catch (e) {
                console.log(e);
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

                    <FileUpload.Root accept={["image/*"]} onChange={(event) => setArchivo(event.target.files[0])}>
                        <FileUpload.HiddenInput />
                        <FileUpload.Trigger asChild>
                            <Button variant="solid" size="sm">
                                <UploadIcon /> Imagen
                            </Button>
                        </FileUpload.Trigger>
                        <FileUpload.List />
                    </FileUpload.Root>

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