import * as Servicios from '../services/ofertas.js';
import Ofertas from '../models/ofertas.js';

export const get_documentos = async (req, res, next) => {
    try {
        const docs = await Servicios.get_documentos();
        if (!docs) {
            return res.status(400).json({ message: 'No se encontraron ofertas registradas.' });
        } else {
            return res.status(200).json(docs);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const getActivas = async (req, res, next) => {
    try {
        const docs = await Ofertas.find({ estatus: 'activa' });
        return res.status(200).json(docs);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

//POST
export const insertar_documento = async (req, res, next) => {
    try {
        const documento = { ...req.body };

        documento.inicio = new Date(req.body.inicio);
        documento.fin = new Date(req.body.fin);
        const ahora = new Date();

        if (ahora < documento.inicio) {
            documento.estatus = 'inactiva';
        } else if (ahora > documento.fin) {
            documento.estatus = 'vencida';
        } else {
            documento.estatus = 'activa';
        }
        const doc = await Servicios.insertar_documento(documento);
        if (!doc) {
            return res.status(400).json({ message: 'No se pudo crear la oferta' });
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

        valores.inicio = new Date(req.body.inicio);
        valores.fin = new Date(req.body.fin);
        const ahora = new Date();

        if (ahora < valores.inicio) {
            valores.estatus = 'inactiva';
        } else if (ahora > valores.fin) {
            valores.estatus = 'vencida';
        } else {
            valores.estatus = 'activa';
        }

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
