

import express from 'express';
import courseProgress from '../controllers/courseProgress.js';
const router = express.Router();


// Route to register a new user
router.put('/updateCourseProgress', courseProgress
);




export default router;