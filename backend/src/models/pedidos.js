import mongoose from 'mongoose'

const esquema_productos = new mongoose.Schema({
    talla: { type: String },
    color: { type: String },
    precio: {
        type: Number,
        get: v => (v / 100).toFixed(2),
        set: v => v * 100
    },
    cantidad: { type: Number },
}, { _id: true, strict: false, toJSON: { getters: true } });

const esquema_pedidos = new mongoose.Schema({
    cliente: { type: String },
    productos: [esquema_productos],
    fecha: { type: Date, default: Date.now },
    telefono: { type: String },
    estatus: { type: String, enum: ['entregado', 'pendiente', 'caducado'] }
}, { toJSON: { getters: true } });

export default mongoose.model('pedido', esquema_pedidos);
