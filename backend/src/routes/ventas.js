import { Router } from 'express';
import * as Controller from "../controllers/ventas.js";

const router = Router();

router.get('/get_documentos', Controller.get_documentos);
router.post('/get_documentos_por_fecha', Controller.get_documentos_por_fecha);

router.post('/hacer-venta', Controller.hacerVenta);
router.post('/insertar_documento', Controller.insertar_documento);
router.post('/insertar_subdocumento/:id', Controller.insertar_subdocumento);

router.put('/actualizar_documento/:id', Controller.actualizar_documento);
router.put('/actualizar_subdocumento/:id/:id_subdoc', Controller.actualizar_subdocumento);

router.delete('/eliminar_documento/:id', Controller.eliminar_documento);
router.delete('/eliminar_subdocumento/:id/:id_subdoc', Controller.eliminar_subdocumento);

export default router;
