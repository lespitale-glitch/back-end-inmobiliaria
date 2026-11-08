import { Router } from 'express';
import { getTipos, createTipo, deleteTipo } from '../controllers/tipoPropiedadController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.get('/', getTipos);
router.post('/', verifyToken, createTipo);
router.delete('/:id', verifyToken, deleteTipo);

export default router;