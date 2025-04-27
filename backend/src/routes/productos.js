import { Router } from 'express';
import * as Controller from "../controllers/productos.js";

const router = Router();

router.get('/get_documentos', Controller.get_documentos);
router.get('/get_item/:codigo', Controller.get_item);
router.get('/get_imagen/:id', Controller.get_imagen);

router.post('/insertar_documento', Controller.insertar_documento);

router.put('/actualizar_documento/:id', Controller.actualizar_documento);

router.delete('/eliminar_documento/:id', Controller.eliminar_documento);

export default router;
