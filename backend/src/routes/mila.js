import { Router } from 'express';
import * as Controller from "../controllers/mila.js";

const router = Router();

router.get('/', Controller.get);

router.post('/', Controller.insertItem);

router.put('/:id', Controller.updateItem);

router.delete('/:id', Controller.deleteItem);

export default router;
