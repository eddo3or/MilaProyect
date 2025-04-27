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

const esquema_pedidos = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    cliente: { type: String },
    productos: [esquema_productos],
    telefono: { type: String },
    estatus: { type: String, enum: ['entregado', 'pendiente', 'caducado'] }
}, { toJSON: { getters: true } });

export default mongoose.model('pedido', esquema_pedidos);
