// import express from 'express';

// import User from '../models/user.js';
// import Course from '../models/video.js';
// import authMiddleware from '../middlewares/authMiddleware.js';
// const router = express.Router();

// router.post('/enroll', authMiddleware, async (req, res) => {
//   const { courseId } = req.body;
//   const userId = req.userId; // Assumes you have user ID from authentication middleware

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     // Check if the user is already enrolled
//     const alreadyEnrolled = user.courses.some(c => c.course_id.toString() === courseId);
//     if (alreadyEnrolled) {
//       return res.status(400).json({ message: 'Already enrolled in this course' });
//     }

//     // Add the course to the user's courses
//     user.courses.push({
//       course_id: courseId,
//       total_no_of_modules: course.content.length
//     });

//     await user.save();
//     res.status(200).json({ message: 'Enrolled successfully' });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// export default router;

import express from 'express';
import User from '../models/user.js';
import Course from '../models/video.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/enroll', authMiddleware, async (req, res) => {
  const { courseId } = req.body;
  console.log(req);
  const userId = req.userId; // Using the corrected property from auth middleware

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User not found: ${userId}`);
      return res.status(404).json({ message: 'User not found' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      console.error(`Course not found: ${courseId}`);
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the user is already enrolled
    const alreadyEnrolled = user.courses.some(c => c.course_id.toString() === courseId);
    if (alreadyEnrolled) {
      console.error(`User ${userId} already enrolled in course ${courseId}`);
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add the course to the user's courses
    user.courses.push({
      course_id: courseId,
      total_no_of_modules: course.content.length
    });

    await user.save();
    res.status(200).json({ message: 'Enrolled successfully' });

  } catch (error) {
    console.error(`Error enrolling user ${userId} in course ${courseId}:`, error);
    res.status(500).json({ message: 'Server error', error });
  }
});


router.get('/check-enrollment/:courseId', authMiddleware, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isEnrolled = user.enrolledCourses.includes(courseId);
    res.json({ isEnrolled });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
