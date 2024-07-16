import authController from "../controllers/userController.js";
import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import User from "../models/user.js";
import Course from "../models/video.js";
const router = express.Router();

// Login route
console.log("reached login.js");
router.post("/login", authController.login);
console.log("going from index.js");

// Route to register a new user
router.post("/register", authController.register);

router.get("/userDetails", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const user = await User.findById(userId)
      .lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const courses = await Promise.all(
      user.courses.map(async (course) => {
        const courseDetails = await Course.findById(course.course_id).lean();
        return { ...course, courseDetails }; // Include course details in the response
      })
    );
    res.status(200).json({ ...user, courses });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/verifyToken", verifyToken, (req, res) => {
  res.status(200).send({ isValid: true });
});

router.get("/enrolled-courses", verifyToken, authController.getEnrolledCourses);

router.get(
  "/check-enrollment/:courseId",
  verifyToken,
  authController.checkEnrollmentStatus
);
export default router;
