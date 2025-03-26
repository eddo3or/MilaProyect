import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Login";

import { useFormik } from "formik"; //Para crear el formulario
import * as Yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(Yup) // extend yup

import { useState } from "react";

import './css/Login.css';

function Login() {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Configuración de formik (el formulario)
    const formik = useFormik({
        initialValues: {
            Usuario: "",
            Contraseña: "",
        },
        validationSchema: Yup.object({
            Usuario: Yup.string().required("Campo requerido"),
            Contraseña: Yup.string().password().required("Campo requerido"),
        }),
        /* ============ CÓDIGO OnSubmit SI TODO ESTÁ BIEN ============ */
        onSubmit: async (valoresFormulario) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                setMensajeExitoAlert("Sesión iniciada correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo iniciar sesión");
            }
            setLoading(false);
        },
    });

    /* ============ configuraciones que se usan en cada campo de texto ============ */
    const commonTextFieldProps = {
        onChange: formik.handleChange, //Comprobar sus valores cuando cambie de valor
        fullWidth: true, //Que abarque todo el espacio a lo ancho
        margin: "dense", //Margen
        disabled: !!mensajeExitoAlert,//!!mensajeExitoAlert retorna falso si mensajeExitoAlert es null, undefined o 0
        //es decir, si mensajeExitoAlert es diferente de NULL entonces se deshabilita
    };


    return (
        <div className="pagina">
            <Dialog open={true} fullWidth onClose={() => actualizarMostrar(false)} >
                {/* ============ HANDLE SUBMIT (click en boton actualizar)============ */}
                <form onSubmit={formik.handleSubmit}>

                    <DialogTitle>
                        <Typography component="h6">
                            <strong>Iniciar sesión</strong>
                        </Typography>
                    </DialogTitle>

                    <DialogContent
                        //CSS para el formulario (en forma de columna)
                        sx={{ display: 'flex', flexDirection: 'column' }}
                        dividers
                    >
                        {/* ============ TEXTFIELDS PARA EL FORMULARIO ============ */}

                        {/* Usuario */}
                        <TextField
                            id="Usuario"
                            label="Usuario"
                            value={formik.values.Nombre}
                            {...commonTextFieldProps}
                            error={formik.touched.Usuario && Boolean(formik.errors.Usuario)}
                            helperText={formik.touched.Usuario && formik.errors.Usuario}
                        />

                        {/* Contraseña */}
                        <TextField
                            id="Contraseña"
                            label="Contraseña"
                            type="password"
                            value={formik.values.Contraseña}
                            {...commonTextFieldProps}
                            error={formik.touched.Contraseña && Boolean(formik.errors.Contraseña)}
                            helperText={formik.touched.Contraseña && formik.errors.Contraseña}
                        />

                    </DialogContent>
                    {/* Alertas */}
                    <DialogActions>
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

                        {/* ============ BOTÓN INSERTAR ============ */}
                        <LoadingButton
                            color="primary"
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            type="submit" //Como es de tipo submit no requiere un onClick, se va a handleSubmit
                            disabled={!!mensajeExitoAlert}//Si hay un mensaje de éxito entonces no lo puedo presionar de nuevo
                            loading={Loading}
                        >

                            <span>Entrar</span>
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>

        </div>
    );
}

export default Login;
