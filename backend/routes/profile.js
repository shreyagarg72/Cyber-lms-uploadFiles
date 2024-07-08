
import authController from '../controllers/userController.js'
import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
import User from '../models/user.js';

const router = express.Router();

// Login route
console.log(
  "reached profile.js"
)

router.get('/profile', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  export default router;