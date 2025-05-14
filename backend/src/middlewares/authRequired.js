import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import Usuarios from "../models/usuarios.js";

export default async function authRequired(req, res, next) {
    const { token } = req.cookies; //Gracias a cookieParser se hace así de sencillo
    if (!token) return res.status(401).json({ message: "No se encontró el token, se requiere iniciar sesión primero" });

    //verificar que el token existente haya sido generado por nosotros
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(403).json({ message: "Pequeño tramposo, el token es inválido" });

        //Se va a continuar a la siguiente funcion, entonces se guarda el usuario para la
        //siguente función
        const found = await Usuarios.findById(user._id, { puesto: true, nombre: true, usuario: true });
        if (!found) return res.status(500).json({ message: "Error fatal, tu sesión es válida pero no se encontró tu usuario" });

        req.user = found;

        //si está bien todo, continuar
        next();
    });
}
