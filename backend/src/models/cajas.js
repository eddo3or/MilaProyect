import mongoose from 'mongoose'

const esquema_cajas = new mongoose.Schema({
    dinero_inicial: {
        type: Number,
        get: v => (v / 100).toFixed(2),
        set: v => v * 100
    },
    historial: [{
        fecha: { type: Date, default: Date.now },
        total_tarjeta: {
            type: Number,
            get: v => (v / 100).toFixed(2),
            set: v => v * 100
        },
        total_efectivo: {
            type: Number,
            get: v => (v / 100).toFixed(2),
            set: v => v * 100
        },
    }]
},
    {
        toJSON: { getters: true }
    }
);

export default mongoose.model('caja', esquema_cajas);
