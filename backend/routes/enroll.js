import express from 'express';

import User from '../models/user.js';
import Course from '../models/video.js';

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Received request to enroll in course"); // Add this line
  const { courseId } = req.body;
  const userId = req.user_id; // Assuming user is authenticated and user ID is accessible

  try {
    console.log("User ID:", userId); // Add this line
    console.log("Course ID:", courseId); // Add this line

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Enrolled in course successfully" });
  } catch (error) {
    console.error("Error enrolling user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;