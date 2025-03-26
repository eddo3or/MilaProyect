import mongoose from 'mongoose'

const esquema_usuarios = new mongoose.Schema({
    puesto: { type: String, enum: ['cajero', 'gerente'] },
    nombre: { type: String },
    salario: {
        type: Number,
        get: v => (v / 100).toFixed(2),
        set: v => v * 100
    },
    curriculum: { type: mongoose.Schema.Types.ObjectId },
    domicilio: { type: String },
    telefono: { type: String }
},
    {
        toJSON: { getters: true }
    }
);

export default mongoose.model('usuario', esquema_usuarios);
