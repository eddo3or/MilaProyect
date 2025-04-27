import cajas from '../models/cajas.js';
import ofertas from '../models/ofertas.js';
import pedidos from '../models/pedidos.js';
import productos from '../models/productos.js';
import usuarios from '../models/usuarios.js';
import ventas from '../models/ventas.js';

export const modelConfig = {
    cajas: {
        model: cajas,
        idField: 'numero',
        historial: {
            idField: 'fecha',
        }
    },
    ofertas: {
        model: ofertas,
        idField: '_id'
    },
    pedidos: {
        model: pedidos,
        idField: '_id'
    },
    productos: {
        model: productos,
        idField: 'codigo'
    },
    usuarios: {
        model: usuarios,
        idField: '_id'
    },
    ventas: {
        model: ventas,
        idField: 'fecha'
    }
}