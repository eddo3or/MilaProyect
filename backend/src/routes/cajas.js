import { Router } from 'express';
import * as Controller from "../controllers/cajas.js";
import authRequired from '../middlewares/authRequired.js';

const router = Router();

router.get('/get_documentos', Controller.get_documentos);
router.get('/get_ventas_fecha', Controller.get_ventas_fecha);
router.get('/informacion-ahora/:id', Controller.informacionAhora);
router.get('/log/:id', Controller.getLog);

router.post('/insertar_documento', Controller.insertar_documento);
router.post('/insertar_subdocumento/:id', Controller.insertar_subdocumento);
router.post("/modificar-dinero-inicial/:id", authRequired, Controller.modificarDineroInicial);

router.put('/actualizar_documento/:id', Controller.actualizar_documento);
router.put('/actualizar_subdocumento/:id/:id_subdoc', Controller.actualizar_subdocumento);

router.delete('/eliminar_documento/:id', Controller.eliminar_documento);
router.delete('/eliminar_subdocumento/:id/:id_subdoc', Controller.eliminar_subdocumento);


export default router;
