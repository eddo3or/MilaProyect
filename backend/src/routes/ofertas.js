import { Router } from 'express';
import * as Controller from "../controllers/ofertas.js";

const router = Router();

router.get('/get_documentos', Controller.get_documentos);
router.get('/activas', Controller.getActivas);

router.post('/insertar_documento', Controller.insertar_documento);

router.put('/actualizar_documento/:id', Controller.actualizar_documento);

router.delete('/eliminar_documento/:id', Controller.eliminar_documento);

export default router;
