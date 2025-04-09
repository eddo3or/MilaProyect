import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { registrar_usuario } from "../../api/api_usuarios.js";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useState } from "react";

export default function RegistrarPersonal({ show, setShow, refresh }) {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            nombre: "",
            usuario: "",
            password: "",
            puesto: "gerente",
            salario: "",
            domicilio: "",
            telefono: "",
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("Campo requerido"),
            usuario: Yup.string().required("Campo requerido"),
            password: Yup.string().required("Campo requerido"),
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
                await registrar_usuario(values);
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

                    <TextField
                        id="usuario"
                        label="usuario"
                        value={formik.values.usuario}
                        {...commonTextFieldProps}
                        error={formik.touched.usuario && Boolean(formik.errors.usuario)}
                        helperText={formik.touched.usuario && formik.errors.usuario}
                    />

                    <TextField
                        id="password"
                        label="password"
                        type="password"
                        value={formik.values.password}
                        {...commonTextFieldProps}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
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