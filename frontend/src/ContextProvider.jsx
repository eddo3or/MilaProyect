import React, { createContext, useContext, useState } from "react";

//Se crea el contexto
const UsuarioContext = createContext();

//Se crea la función para utilizar el contexto
export const useUsuarioContext = () => {
    const context = useContext(UsuarioContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (!context) {
        throw new Error("para poder usar useUsuarioContext la ruta actual debe de estar dentro de ContextProvider");
    }

    return context;
}

//Se define "el contenido" del contexto
export function PricesProvider({ children }) {
    const [usuario, setUsuario] = useState([]);

    return (
        <UsuarioContext.Provider value={{
            usuario,
            isAuthenticated,
        }}>
            {children}
        </UsuarioContext.Provider>
    );
}
