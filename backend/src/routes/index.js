//Se importa la biblioteca Router de express para manejar rutas
import { Router } from 'express';

//Se importan las rutas de cada tabla
import cajas from "./cajas.js";
import ofertas from "./ofertas.js";
import pedidos from "./pedidos.js";
import productos from "./productos.js";
import usuarios from "./usuarios.js";
import ventas from "./ventas.js";

//Se configuran las rutas para las apis
const routerAPI = (app) => {
    const router = Router();

    app.use('/api', router);

    router.use('/cajas', cajas);
    router.use('/ofertas', ofertas);
    router.use('/pedidos', pedidos);
    router.use('/productos', productos);
    router.use('/usuarios', usuarios);
    router.use('/ventas', ventas);

    return router;
};

//Se exportan las rutas configuradas para usarse en app.js
module.exports = routerAPI;
