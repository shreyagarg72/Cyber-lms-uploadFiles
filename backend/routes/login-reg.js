
import authController from '../controllers/userController.js'
import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
const router = express.Router();

// Login route
router.post('/login', (req, res, next) => {
    req.setTimeout(30000, () => { // Set timeout to 10 seconds
      res.status(504).json({ message: 'Request timed out' });
    });
    next();
  }, authController.login);

// Route to register a new user
router.post('/register', authController.register);

router.get('/userDetails',verifyToken,authController.getUser);

export default router;