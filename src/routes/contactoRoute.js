import { Router } from 'express';
import { createContacto, getContactos } from '../controllers/contactoController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/', createContacto);
router.get('/', verifyToken, getContactos);

export default router;