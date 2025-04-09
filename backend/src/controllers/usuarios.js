import * as Servicios from '../services/usuarios.js';
import usuarios from '../models/usuarios.js';
import bcrypt from "bcryptjs"; //modulo para encriptar la contraseña
import { createAccessToken } from "./jwt.js"

export const get_documentos = async (req, res, next) => {
    try {
        const docs = await Servicios.get_documentos();
        if (!docs) {
            return res.status(400).json({ message: 'No se encontraron usuarios registrados.' });
        } else {
            return res.status(200).json(docs);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const iniciar_sesion = async (req, res, next) => {
    const { usuario, password } = req.body;

    try {
        const usuarioEncontrado = await usuarios.findOne({ usuario });
        if (!usuarioEncontrado) return res.status(400).json({ message: "Usuario o contraseña incorrectos" });

        const coincide = await bcrypt.compare(password, usuarioEncontrado.password);
        if (!coincide) return res.status(400).json({ message: "Usuario o contraseña incorrectos" });

        /*
          Se crea el token y se pasa el frontend
          para no estar pidiendo autenticarse a
          un usuario ya autenticado
        */
        const token = await createAccessToken({ id: usuarioEncontrado._id, nombre: usuarioEncontrado.nombre });

        return res.cookie("token", token, { sameSite: "none", secure: true }).status(200).json(usuarioEncontrado);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const cerrar_sesion = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

export const registrar_usuario = async (req, res) => {

    const {
        nombre,
        usuario,
        password,
        puesto,
        salario,
        domicilio,
        telefono
    } = req.body;

    try {
        const duplicados = await usuarios.find({ nombre, domicilio, telefono });
        if (!(duplicados === undefined || duplicados.length == 0)) return res.status(500).json({ message: "No puedes registrar a un usuario dos veces" });

        try {
            const passwordHash = await bcrypt.hash(password, 10); //convierte el string en caracteres aleatoreos (lo encripta), el numero es el nivel

            const usuarioNuevo = new usuarios({
                nombre,
                usuario,
                password: passwordHash,
                puesto,
                salario,
                domicilio,
                telefono
            });

            const usuarioRegistrado = await usuarioNuevo.save();
            if (usuarioRegistrado) res.status(201).json({ message: "El usuario ha sido registrado con éxito" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//POST
export const insertar_documento = async (req, res, next) => {
    try {
        const documento = req.body;
        const doc = await Servicios.insertar_documento(documento);
        if (!doc) {
            return res.status(400).json({ message: 'No se pudo crear la caja' });
        } else {
            res.status(201).json(doc);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

//PUT
export const actualizar_documento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const valores = req.body;
        const doc = await Servicios.actualizar_documento(id, valores);
        if (!doc) {
            return res.status(400).json({ message: 'No se pudo actualizar el documento.' });
        } else {
            res.status(200).json(doc);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};


//DELETE
export const eliminar_documento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doc = await Servicios.eliminar_documento(id);
        if (!doc) {
            return res.status(400).json({ message: 'No se pudo eliminar el documento.' });
        } else {
            res.status(200).json(doc);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
}
