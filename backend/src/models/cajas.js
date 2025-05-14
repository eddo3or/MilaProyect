import mongoose from 'mongoose'

const esquema_historial = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    dinero_inicial: {
        type: Number,
        get: v => (v / 100),
        set: v => v * 100,
        default: 80000,
    },
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
    pagos_tarjeta: {
        type: Number,
    },
    pagos_efectivo: {
        type: Number,
    }
}, { _id: true, strict: false, toJSON: { getters: true } });


const esquema_log = new mongoose.Schema({
    fecha: { type: Date, default: Date.now, required: true },
    nombre: { type: String, required: true, },
    usuario: { type: String, required: true },
    detalles: { type: String, required: true },
}, { _id: true, strict: false, });

const esquema_cajas = new mongoose.Schema({
    numero: { type: Number, unique: true },
    dinero_inicial: {
        type: Number,
        get: v => (v / 100),
        set: v => v * 100,
        default: 80000,
    },
    historial: [esquema_historial],
    log_dinero: [esquema_log],
}, { toJSON: { getters: true } });

export default mongoose.model('caja', esquema_cajas);
