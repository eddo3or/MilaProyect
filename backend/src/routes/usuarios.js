import { Router } from 'express';
import * as Controller from "../controllers/usuarios.js";

const router = Router();

router.get('/get_documentos', Controller.get_documentos);

router.post('/insertar_documento', Controller.insertar_documento);
router.post('/iniciar_sesion', Controller.iniciar_sesion);
router.post('/verify', Controller.verificarUsuario);
router.post('/registrar_usuario', Controller.registrar_usuario);

router.put('/actualizar_documento/:id', Controller.actualizar_documento);
router.put('/cerrar_sesion', Controller.cerrar_sesion);

router.delete('/eliminar_documento/:id', Controller.eliminar_documento);

export default router;
