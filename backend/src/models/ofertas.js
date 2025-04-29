import mongoose from 'mongoose'

const esquema_ofertas = new mongoose.Schema({
    nombre: { type: String },
    descuento: { type: Number, min: [1, 'No puede haber descuentos del 0%'], max: 100 },
    inicio: { type: Date, get: (date) => date ? date.toISOString().split('T')[0] : null },
    fin: { type: Date, get: (date) => date ? date.toISOString().split('T')[0] : null },
    estatus: { type: String, enum: ['activa', 'inactiva', 'vencida'] },
    descripcion: { type: String },
}, { toJSON: { getters: true } });

export default mongoose.model('oferta', esquema_ofertas);
