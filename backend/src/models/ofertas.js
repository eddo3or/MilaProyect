import mongoose from 'mongoose'

const esquema_ofertas = new mongoose.Schema({
    nombre: { type: String },
    descuento: { type: Number, min: [1, 'No puede haber descuentos del 0%'], max: 100 },
    inicio: { type: Date },
    fin: { type: Date },
    estatus: { type: String, enum: ['activo', 'inactivo', 'vencido'] },
    descripcion: { type: String },
});

export default mongoose.model('oferta', esquema_ofertas);
