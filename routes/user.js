import express from 'express';
import { registerUser, loginUser } from '../controllers/user.js';
import { getAllUser } from '../controllers/user.js'; 

const router = express.Router();

router.post('/register', registerUser);
router.post('/loginUser', loginUser); 
router.get('/getAllUser', getAllUser); 

export default router;
