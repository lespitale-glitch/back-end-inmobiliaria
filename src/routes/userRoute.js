import { Router } from 'express';
import { registerUser, loginUser, getUsers } from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', verifyToken, getUsers);

export default router;