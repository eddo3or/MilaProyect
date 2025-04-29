import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, Spinner } from "@chakra-ui/react"

import { useUsuarioContext } from '../ContextProvider';

function Logout() {
    const { cerrar_sesion_context } = useUsuarioContext();
    const navigate = useNavigate();

    useEffect(() => {
        cerrar_sesion_context();
        navigate("/");
    }, []);

    return (
        <Group>
            <Spinner size="lg" animationDuration="1.2s" />
            <h4>Cerrando sesión</h4>
        </Group>
    );
}

export default Logout;
