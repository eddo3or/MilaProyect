import mongoose from 'mongoose'

const esquema_productos = new mongoose.Schema({
    codigo: { type: String, unique: true },
    nombre: { type: String },
    talla: { type: String },
    precio: {
        type: Number,
        get: v => (v / 100),
        set: v => v * 100
    },
    unidades: { type: Number },
    proveedor: { type: String },
    color: { type: String },
    imagen: { type: mongoose.Schema.Types.ObjectId },
}, { toJSON: { getters: true } });

export default mongoose.model('producto', esquema_productos);
