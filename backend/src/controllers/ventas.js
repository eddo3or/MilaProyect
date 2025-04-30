import * as Servicios from '../services/ventas.js';
import Cajas from '../models/cajas.js';
import Productos from '../models/productos.js';
import mongoose from 'mongoose';

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
export const hacerVenta = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const caja = await Cajas.findById(req.body.id_caja);
        if (!caja) {
            return res.status(400).json({ message: "NO se encontró la caja, ¿Estás usando una pc autorizada?" });
        }

        const countByCode = req.body.productos.reduce((acc, item) => {
            acc[item.codigo] = (acc[item.codigo] || 0) + 1;
            return acc;
        }, {});

        const productosAgrupados = Object.entries(countByCode).map(([codigo, cantidad]) => ({
            codigo,
            cantidad
        }));

        const codigos = productosAgrupados.map(p => p.codigo);

        const productos = await Productos.find(
            { codigo: { $in: codigos } },
            { codigo: true, unidades: true },
        ).session(session);


        const faltantes = [];
        const updates = [];

        productos.map(p => {
            const requerido = countByCode[p.codigo];
            if (p.unidades < requerido) {
                faltantes.push({
                    codigo: p.codigo,
                    requerido,
                    disponible: p.unidades
                });
            }
            updates.push({
                updateOne: {
                    filter: { codigo: p.codigo },
                    update: { $inc: { unidades: -requerido } }
                }
            });
        })

        // Si hay faltantes, abortar
        if (faltantes.length > 0) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Stock insuficiente", faltantes });
        }

        // Actualizar todos los productos
        await Productos.bulkWrite(updates, { session });

        // Obtener la fecha actual sin horas/minutos/segundos
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const historialHoy = caja.historial.find(item =>
            item.fecha >= hoy && item.fecha < new Date(hoy.getTime() + 24 * 60 * 60 * 1000)
        );

        // Actualizar o crear el registro
        if (historialHoy) {
            // Sumar al valor existente
            historialHoy[`total_${req.body.pago}`] += req.body.totalFinal;
            historialHoy[`pago_${req.body.pago}`] += 1;
        } else {
            // Crear nuevo registro con el monto
            caja.historial.push({
                fecha: hoy,
                total_tarjeta: req.body.pago === 'tarjeta' ? req.body.totalFinal : 0,
                total_efectivo: req.body.pago === 'efectivo' ? (req.body.totalFinal + caja.dinero_inicial) : caja.dinero_inicial,
                pagos_tarjeta: req.body.pago === 'tarjeta' ? 1 : 0,
                pagos_efectivo: req.body.pago === 'efectivo' ? 1 : 0,
            });
        }

        // Guardar los cambios
        await caja.save();

        await Servicios.insertar_documento(req.body);

        await session.commitTransaction();

        res.status(201).json({ message: "Se ha realizado la venta con éxito" });

    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        return res.status(500).json({ error });
    } finally {
        session.endSession();
    }

};

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