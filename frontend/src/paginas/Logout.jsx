import { useEffect } from 'react';
import { Box, Spinner } from "@chakra-ui/react"
import { useUsuarioContext } from '../ContextProvider';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { cerrar_sesion_context } = useUsuarioContext();
    const navigate = useNavigate();

    useEffect(() => {
        cerrar_sesion_context();
        navigate("/");
    }, []);

    return (
        <Box>
            <Spinner size="lg" animationDuration="1.2s" />
            <h4>Cerrando sesión</h4>
        </Box>
    );
}

export default Logout;
