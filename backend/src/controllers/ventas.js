import * as Servicios from '../services/ventas.js';

export const get_documentos = async (req, res, next) => {
    try {
        const docs = await Servicios.get_documentos();
        if (!docs) {
            return res.status(400).json({ message: 'No se encontraron ventas registradas.' });
        } else {
            return res.status(200).json(docs);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const get_documentos_por_fecha = async (req, res, next) => {
    try {
        const { fecha_inicio, fecha_fin } = req.body;
        if(!(fecha_inicio > fecha_fin)) {
            return res.status(400).json({ message: 'El rango de fechas es incorrecto.' });
        }
        const docs = await Servicios.get_documentos_por_fecha(fecha_inicio, fecha_fin);
        if (!docs) {
            return res.status(400).json({ message: 'No se encontraron ventas en ese rango de fecha.' });
        } else {
            return res.status(200).json(docs);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

//POST
export const insertar_documento = async (req, res, next) => {
    try {
        const documento = req.body;
        const doc = await Servicios.insertar_documento(documento);
        if (!doc) {
            return res.status(400).json({ message: 'No se pudo crear la venta' });
        } else {
            res.status(201).json(doc);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const insertar_subdocumento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const subdocumento = req.body;
        const doc = await Servicios.insertar_subdocumento(id, subdocumento);
        if (!doc) {
            return res.status(400).json({ message: 'No se pudo insertar el producto' });
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

export const actualizar_subdocumento = async (req, res, next) => {
    try {
        const { id, id_subdoc } = req.params;
        const valores = req.body;
        const doc = await Servicios.insertar_subdocumento(id, id_subdoc, valores);
        if (!doc) {
            return res.status(400).json({ message: 'No se pudo actualizar el producto' });
        } else {
            res.status(201).json(doc);
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

export const eliminar_subdocumento = async (req, res, next) => {
    try {
        const { id, id_subdoc } = req.params;
        const doc = await Servicios.eliminar_subdocumento(id, id_subdoc);
        if (!doc) {
            return res.status(400).json({ message: 'No se pudo eliminar.' });
        } else {
            res.status(201).json(doc);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};