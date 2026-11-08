import { Router } from 'express';
import {
  getPropiedades,
  getPropiedadById,
  createPropiedad,
  updatePropiedad,
  deletePropiedad
} from '../controllers/propiedadController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.get('/', getPropiedades);
router.get('/:id', getPropiedadById);
router.post('/', verifyToken, createPropiedad);
router.put('/:id', verifyToken, updatePropiedad);
router.delete('/:id', verifyToken, deletePropiedad);

export default router;