import { Router } from 'express';
import * as Controller from "../controllers/ofertas.js";

const router = Router();

router.get('/get_documentos', Controller.get_documentos);

router.post('/insertar_documento', Controller.insertar_documento);

router.put('/actualizar_documento', Controller.actualizar_documento);

router.delete('/eliminar_documento', Controller.eliminar_documento);

export default router;
