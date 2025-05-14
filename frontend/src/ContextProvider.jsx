import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { iniciar_sesion, cerrar_sesion } from "./api/api_usuarios";
import axios from "@/api/axios_config";

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
    const [loading, setLoading] = useState(false);

    const iniciar_sesion_context = async (body) => {
        return new Promise(async (resolve, reject) => {
            setLoading(t => true);
            try {
                const res = await iniciar_sesion(body);
                setUsuario(res.data);
                setIsAuthenticated(true);
                return resolve("Sesión iniciada correctamente");
            } catch (error) {
                return reject(error.response?.data?.message || "Error al iniciar sesión");
            } finally {
                setLoading(t => false);
            }
        })
    }

    const cerrar_sesion_context = async () => {
        try {
            await cerrar_sesion();
            setIsAuthenticated(false);
            setUsuario([]);
        } catch (error) {
            console.log(error.response.data);
            throw error;
        }
    }

    useEffect(() => {
        async function checkLogin() {
            setLoading(t => true);
            const cookies = Cookies.get();
            if (cookies.token) {
                try {
                    const res = await axios.post("/usuarios/verify", cookies.token);
                    if (res.data) {
                        setIsAuthenticated(true);
                        setUsuario(res.data.usuario);
                    } else {
                        setIsAuthenticated(false);
                        setUsuario([]);
                    }
                } catch (error) {
                    console.log(error);
                    setIsAuthenticated(false)
                    setUsuario([]);
                    console.log(error.response?.data?.message || error)
                } finally {
                    setLoading(t => false);
                }
            }
        }

        checkLogin();
    }, []);

    return (
        <UsuarioContext.Provider value={{
            usuario,
            isAuthenticated,
            loading,
            iniciar_sesion_context,
            cerrar_sesion_context
        }}>
            {children}
        </UsuarioContext.Provider>
    );
}
