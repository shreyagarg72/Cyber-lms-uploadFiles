import express from 'express';

import User from '../models/user.js';
import Course from '../models/video.js';

const router = express.Router();

router.post('/api/enroll', async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id; // Assuming you have authentication middleware that sets req.user

  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'User or Course not found' });
    }

    // Check if the user is already enrolled
    const alreadyEnrolled = user.courses.some(c => c.course_id.equals(courseId));
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add the course to the user's courses array
    user.courses.push({
      course_id: courseId,
      total_no_of_modules: course.content.length,
    });

    // Add the user to the course's enrolledStudents array
    course.enrolledStudents.push(userId);

    await user.save();
    await course.save();

    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;