
import authController from '../controllers/userController.js'
import express from 'express';
const router = express.Router();

// Login route
router.post('/login', authController.login);

// Route to register a new user
router.post('/register', authController.register);

export default router;