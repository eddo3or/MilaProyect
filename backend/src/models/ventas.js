import mongoose from 'mongoose'

const esquema_productos = new mongoose.Schema({
    codigo: { type: String },
    nombre: { type: String },
    talla: { type: String },
    color: { type: String },
    precio: {
        type: Number,
        get: v => (v / 100),
        set: v => v * 100
    },
    cantidad: { type: Number },
}, { _id: true, strict: false, toJSON: { getters: true } });

const esquema_ventas = new mongoose.Schema({
    fecha: { type: Date, default: Date.now, unique: true },
    nombre_cajero: { type: String },
    productos: [esquema_productos],
    tipo: { type: String, enum: ['en línea', 'en tienda'] },
    id_caja: { type: mongoose.Schema.Types.ObjectId },
    pago: { type: String, enum: ['tarjeta', 'efectivo'] },
    total: {
        type: Number,
        get: v => (v / 100),
        set: v => v * 100
    },
}, { toJSON: { getters: true } });

export default mongoose.model('venta', esquema_ventas);
