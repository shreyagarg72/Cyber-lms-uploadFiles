

import express from 'express';
import courseProgress from '../controllers/courseProgress.js';
import verifyToken from '../middlewares/authMiddleware.js';
const router = express.Router();

console.log("in the router of courseProgress");
// Route to register a new user
router.put('/updateCourseProgress', verifyToken,courseProgress.courseProgress);

router.get('/completedSubmodules', verifyToken, courseProgress.completedSubmodules);




export default router;