import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import { useFormik } from "formik"; //Para crear el formulario
import * as Yup from 'yup'

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { useUsuarioContext } from "../ContextProvider";

function Login() {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { iniciar_sesion_context } = useUsuarioContext();

    //Configuración de formik (el formulario)
    const formik = useFormik({
        initialValues: {
            nombre: "",
            password: "",
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("Campo requerido"),
            password: Yup.string().required("Campo requerido"),
        }),
        /* ============ CÓDIGO OnSubmit SI TODO ESTÁ BIEN ============ */
        onSubmit: async (valoresFormulario) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                await iniciar_sesion_context(valoresFormulario);
                navigate('/home');
                setMensajeExitoAlert("Sesión iniciada correctamente");
            } catch (error) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo iniciar sesión");
                console.log(error);
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
            <Dialog open={true} fullWidth >
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
                            id="nombre"
                            label="nombre"
                            value={formik.values.nombre}
                            {...commonTextFieldProps}
                            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                            helperText={formik.touched.nombre && formik.errors.nombre}
                        />

                        {/* password */}
                        <TextField
                            id="password"
                            label="password"
                            type="password"
                            value={formik.values.password}
                            {...commonTextFieldProps}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
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

                        {/* ============ BOTÓN ENTRAR ============ */}
                        <Button
                            color="primary"
                            loadingPosition="start"
                            startIcon={<LoginIcon />}
                            variant="contained"
                            type="submit" //Como es de tipo submit no requiere un onClick, se va a handleSubmit
                            disabled={!!mensajeExitoAlert}//Si hay un mensaje de éxito entonces no lo puedo presionar de nuevo
                            loading={Loading}
                        >

                            <span>Entrar</span>
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </div>
    );
}

export default Login;
