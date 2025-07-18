import express from 'express';
import { registerUser, loginUser } from '../controllers/user.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/loginUser', loginUser); // loginUser doit être une fonction ici

export default router;
