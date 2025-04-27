import mongoose from 'mongoose'

const esquema_historial = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    total_tarjeta: {
        type: Number,
        get: v => (v / 100),
        set: v => v * 100
    },
    total_efectivo: {
        type: Number,
        get: v => (v / 100),
        set: v => v * 100
    },
}, { _id: true, strict: false, toJSON: { getters: true } });

const esquema_cajas = new mongoose.Schema({
    numero: { type: Number, unique: true },
    dinero_inicial: {
        type: Number,
        get: v => (v / 100),
        set: v => v * 100
    },
    historial: [esquema_historial]
}, { toJSON: { getters: true } });

export default mongoose.model('caja', esquema_cajas);
