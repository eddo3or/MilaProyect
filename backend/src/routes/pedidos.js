import { Router } from 'express';
import * as Controller from "../controllers/pedidos.js";

const router = Router();

router.get('/get_documentos', Controller.get_documentos);

router.post('/insertar_documento', Controller.insertar_documento);
router.post('/insertar_subdocumento', Controller.insertar_subdocumento);

router.put('/actualizar_documento', Controller.actualizar_documento);
router.put('/actualizar_subdocumento', Controller.actualizar_subdocumento);

router.delete('/eliminar_documento', Controller.eliminar_documento);
router.delete('/eliminar_subdocumento', Controller.eliminar_subdocumento);

export default router;
