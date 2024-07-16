
import authController from '../controllers/userController.js'
import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
import User from '../models/user.js';

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

router.get('/userDetails',verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/userCourses',verifyToken, async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have userId in req.user after authentication
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalEnrolledCourses = user.getTotalEnrolledCourses();

    res.json({ totalEnrolledCourses, courses: user.courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})


router.get('/verifyToken', verifyToken, (req, res) => {
  res.status(200).send({ isValid: true });
});

router.get('/enrolled-courses', verifyToken, authController.getEnrolledCourses);

router.get('/check-enrollment/:courseId', verifyToken, authController.checkEnrollmentStatus);
export default router;