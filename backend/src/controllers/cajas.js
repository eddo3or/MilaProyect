import * as Servicios from '../services/cajas.js';
import Cajas from '../models/cajas.js';
import mongoose from "mongoose";

export const get_documentos = async (req, res, next) => {
    try {
        const docs = await Servicios.get_documentos();
        if (!docs) {
            return res.status(400).json({ message: 'No se encontraron cajas registradas.' });
        } else {
            return res.status(200).json(docs);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const get_ventas_fecha = async (req, res, next) => {
    try {
        const { id } = req.params;
        const fecha = req.body.fecha;
        const docs = await Servicios.get_ventas_fecha(id, fecha);
        if (!docs) {
            return res.status(400).json({ message: 'No se encontraron ventas en esa fecha.' });
        } else {
            return res.status(200).json(docs);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const informacionAhora = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const caja = await Cajas.findById(req.params.id).session(session);
        if (!caja) {
            return res.status(400).json({ message: "NO se encontró la caja, ¿Estás usando una pc autorizada?" });
        }

        let data = {};
        data.dinero_inicial = caja.dinero_inicial;

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const historialHoy = caja.historial.find(item =>
            item.fecha >= hoy && item.fecha < new Date(hoy.getTime() + 24 * 60 * 60 * 1000)
        );

        if (historialHoy) {
            data.ahora = historialHoy;
        } else {
            caja.historial.push({
                fecha: hoy,
                total_tarjeta: 0,
                total_efectivo: caja.dinero_inicial,
                pagos_tarjeta: 0,
                pagos_efectivo: 0,
                dinero_inicial: caja.dinero_inicial,
            });
            data.ahora = {
                fecha: hoy,
                total_tarjeta: 0,
                total_efectivo: caja.dinero_inicial,
                pagos_tarjeta: 0,
                pagos_efectivo: 0,
                dinero_inicial: caja.dinero_inicial,
            };
        }

        // Guardar los cambios
        await caja.save();

        await session.commitTransaction();

        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        return res.status(500).json({ error });
    } finally {
        session.endSession();
    }

};

export const getLog = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "No se proporcionó el ID de la caja" });
        }

        const doc = await Cajas.findById(req.params.id, { log_dinero_inicial: true }).lean();
        if (!doc) {
            return res.status(400).json({ message: "No se encontró la caja con dicho ID, ¿Estás usando una PC autorizada?" });
        }

        return res.status(200).json({ log: doc.log_dinero_inicial });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Error obteniendo el historial de cambios" });
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

export const insertar_subdocumento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const subdocumento = req.body;
        const doc = await Servicios.insertar_subdocumento(id, subdocumento);
        if (!doc) {
            return res.status(400).json({ message: 'No se pudo insertar la fecha' });
        } else {
            res.status(201).json(doc);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const modificarDineroInicial = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const caja = await Cajas.findById(req.params.id).session(session);
        if (!caja) {
            return res.status(400).json({ message: "NO se encontró la caja, ¿Estás usando una pc autorizada?" });
        }

        if (!req.body.gerente) {
            return res.status(400).json({ message: "La petición no incluye el nombre del gerente" });
        }

        if (req.body.dinero === caja.dinero_inicial) {
            return res.status(400).json({ message: "El nuevo dinero inicial es exactamente igual al anterior" });
        }

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const historialHoy = caja.historial.find(item =>
            item.fecha >= hoy && item.fecha < new Date(hoy.getTime() + 24 * 60 * 60 * 1000)
        );

        if (!historialHoy) {
            return res.status(500).json({ message: "Error fatal, no se encontró la información del dia de hoy, intente de nuevo más tarde" });
        }

        let original = historialHoy.dinero_inicial;

        historialHoy.dinero_inicial = req.body.dinero;
        historialHoy.total_efectivo -= caja.dinero_inicial;
        historialHoy.total_efectivo += req.body.dinero;
        caja.dinero_inicial = req.body.dinero;

        caja.log_dinero_inicial.push(req.body.gerente +
            " modificó el dinero inicial de la caja. De $" +
            original.toFixed(2) +
            " a $" +
            req.body.dinero.toFixed(2) +
            ". El día " +
            new Intl.DateTimeFormat("es-MX", {
                dateStyle: "long",
                timeStyle: "short",
                timeZone: "America/Mazatlan"
            }).format(Date.now())
        );

        // Guardar los cambios
        await caja.save();

        await session.commitTransaction();

        res.status(200).json({ message: "Se ha modificado el dinero inicial correctamente" });
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        return res.status(500).json({ error });
    } finally {
        session.endSession();
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
            return res.status(400).json({ message: 'No se pudo actualizar la caja' });
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