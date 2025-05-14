import * as Servicios from '../services/ventas.js';
import Cajas from '../models/cajas.js';
import Productos from '../models/productos.js';
import Ventas from '../models/ventas.js';
import mongoose from 'mongoose';

export const get_documentos = async (req, res, next) => {
    try {
        const docs = await Servicios.get_documentos();
        if (!docs) {
            return res.status(400).json({ message: 'No se encontraron ventas registradas.' });
        } else {
            docs.sort((a, b) => b.fecha - a.fecha);
            return res.status(200).json(docs);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

import PDFDocument from 'pdfkit';

export const getTicket = async (req, res) => {
    try {
        const sale = await Ventas.findById(req.params.id);

        if (!sale) {
            return res.status(404).send('Sale not found');
        }

        const baseHeight = 400; // Minimum height
        const productHeight = sale.productos.length * 20; // Approx 20pt per product
        const totalHeight = baseHeight + productHeight;

        // Create PDF
        const doc = new PDFDocument({
            size: [300, totalHeight], // Fixed width (300), initial height (400)
            margin: 20 // Add some margin
        });

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=ticket-${sale._id}.pdf`);

        // Pipe PDF to response
        doc.pipe(res);

        // Add content to PDF
        doc.fontSize(18).text('TICKET DE VENTA', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Fecha: ${sale.fecha.toLocaleString()}`);
        doc.text(`Cajero: ${sale.nombre_cajero}`);
        doc.text(`Tipo: ${sale.tipo}`);
        doc.text(`Pago: ${sale.pago}`);
        doc.moveDown();

        // Products table
        doc.font('Helvetica-Bold');
        doc.text('Producto', 50, doc.y);
        doc.text('Precio', 200, doc.y, { width: 90, align: 'right' });
        doc.moveDown();
        doc.font('Helvetica');

        sale.productos.forEach(product => {
            doc.text(`${product.nombre} (${product.talla}, ${product.color})`, 50, doc.y);
            doc.text(`$${product.precio.toFixed(2)}`, 200, doc.y, { width: 90, align: 'right' });
            doc.moveDown();
        });

        doc.moveDown();
        doc.font('Helvetica-Bold');
        doc.text(`Subtotal: $${sale.total.toFixed(2)}`, { align: 'right' });
        if (sale.descuento) {
            doc.text(`Descuento: ${sale.descuento}%`, { align: 'right' });
        }
        doc.text(`Total: $${sale.totalFinal.toFixed(2)}`, { align: 'right' });

        // Finalize PDF
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating ticket');
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
            historialHoy[`pagos_${req.body.pago}`] += 1;
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

        const venta = await Servicios.insertar_documento(req.body);

        await session.commitTransaction();

        res.status(201).json({ message: "Se ha realizado la venta con éxito", idVenta: venta._id });

    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        return res.status(500).json({ error });
    } finally {
        session.endSession();
    }

};


export const hacerDevolucion = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (!req.params.idVenta) {
            return res.status(400).json({ message: "Se requiere el id de la venta" });
        }

        if (!req.params.idProducto) {
            return res.status(400).json({ message: "Se requiere el id del producto" });
        }

        const venta = await Ventas.findById(req.params.idVenta);
        if (!venta) {
            return res.status(400).json({ message: "No se encontró la venta con dicho id: " + req.params.idVenta });
        }

        const caja = await Cajas.findById(venta.id_caja);
        if (!caja) {
            return res.status(400).json({ message: "No se encontró la caja con dicho id: " + venta.id_caja });
        }

        // venta.productos
        const producto = venta.productos.find(item => (item.codigo === req.params.idProducto && item.estatus !== "devuelto"));
        if (!producto) {
            return res.status(400).json({
                message: "No se encontró un producto con el código: " +
                    req.params.idProducto +
                    " en la venta: " +
                    req.params.idVenta +
                    " que no haya sido devuelto"
            });
        }

        const EndDate = new Date(Date.now());

        var nDays = (Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()) -
            Date.UTC(venta.fecha.getFullYear(), venta.fecha.getMonth(), venta.fecha.getDate())) / 86400000;

        if (nDays > 30) {
            return res.status(400).json({ message: "Ya han pasado más de 30 días y no es posible realizar la devolución" });
        }


        producto.estatus = "devuelto";

        const fecha = venta.fecha;
        fecha.setHours(0, 0, 0, 0);

        //Se intenta obtener el historial de dicho día
        const historialFecha = caja.historial.find(item =>
            item.fecha >= fecha && item.fecha < new Date(fecha.getTime() + 24 * 60 * 60 * 1000)
        );

        if (!historialFecha) {
            return res.status(500).json({ message: "Error fatal, no se encontró el historial de ventas de dicha fecha." });
        }

        if (venta.pago === "efectivo") {
            historialFecha.total_efectivo -= producto.precio * (1 - (venta.descuento / 100));
            if (historialFecha.total_efectivo < 0) {
                return res.status(400).json({ message: "No hay dinero suficiente en la caja para hacer la devolución" });
            }
        } else {
            historialFecha.total_tarjeta -= producto.precio * (1 - (venta.descuento / 100));
        }

        if (req.body.devolver) {
            await Productos.findOneAndUpdate(
                {
                    codigo: req.params.idProducto,
                },
                {
                    $inc: {
                        unidades: 1
                    }
                }
            );
        }

        await venta.save();

        await caja.save();

        await session.commitTransaction();

        res.status(201).json({ message: "Se ha realizado la devolución con éxito" });

    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        return res.status(500).json({ message: error.message || "Error fatal al hacer la devolución" });
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