import React, { createContext, useContext, useState } from "react";

import { iniciar_sesion } from "./api/api_usuarios";

//Se crea el contexto
const UsuarioContext = createContext();

//Se crea la función para utilizar el contexto
export const useUsuarioContext = () => {
    const context = useContext(UsuarioContext);

    if (!context) {
        throw new Error("para poder usar useUsuarioContext la ruta actual debe de estar dentro de ContextProvider");
    }

    return context;
}

//Se define "el contenido" del contexto
export function ContextProvider({ children }) {
    const [usuario, setUsuario] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const iniciar_sesion_context = async (body) => {
        const res = await iniciar_sesion(body);
        setUsuario(res.data);
        setIsAuthenticated(true);
    }

    return (
        <UsuarioContext.Provider value={{
            usuario,
            isAuthenticated,
            iniciar_sesion_context
        }}>
            {children}
        </UsuarioContext.Provider>
    );
}
