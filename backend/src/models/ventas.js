import mongoose from 'mongoose'

const esquema_ventas = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    nombre_cajero: { type: String },
    productos: [{
        talla: { type: String },
        color: { type: String },
        precio: {
            type: Number,
            get: v => (v / 100).toFixed(2),
            set: v => v * 100
        },
        cantidad: { type: number },
    }],
    tipo: { type: String, enum: ['en línea', 'en tienda'] },
    id_caja: { type: mongoose.Schema.Types.ObjectId },
    pago: { type: String, enum: ['tarjeta', 'efectivo'] }
},
    {
        toJSON: { getters: true }
    }
);

export default mongoose.model('venta', esquema_ventas);
