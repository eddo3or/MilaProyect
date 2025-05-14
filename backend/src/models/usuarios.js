import mongoose from 'mongoose'

const esquema_usuarios = new mongoose.Schema({
    puesto: { type: String, enum: ['cajero', 'gerente'] },
    password: { type: String },
    nombre: { type: String },
    usuario: { type: String },
    curriculum: { type: mongoose.Schema.Types.ObjectId },
    domicilio: { type: String },
    telefono: { type: String }
}, { toJSON: { getters: true } });

export default mongoose.model('usuario', esquema_usuarios);
