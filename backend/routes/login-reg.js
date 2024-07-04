
import authController from '../controllers/userController.js'
import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
const router = express.Router();

// Login route
console.log(
  "reached login.js"
)
router.post('/login', authController.login);
console.log(
  "going from index.js"
)

// Route to register a new user
router.post('/register', authController.register);

router.get('/userDetails',verifyToken,authController.getUser);


router.get('/verifyToken', verifyToken, (req, res) => {
  res.status(200).send({ isValid: true });
});


export default router;