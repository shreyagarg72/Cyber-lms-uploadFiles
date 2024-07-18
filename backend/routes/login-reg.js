import authController from "../controllers/userController.js";
import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import User from "../models/user.js";
import Course from "../models/video.js";
const router = express.Router();
import Comment from "../models/comments.js";

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
    const user = await User.findById(userId).lean();
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
router.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("userid", "name") // Populating only the 'name' field from the User model
      .populate("courseid", "courseName"); // Populating only the 'courseName' field from the Course model
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.post("/comments", async (req, res) => {
  try {
    const { courseid, userid, text } = req.body;

    // Validate incoming data against schema
    const newComment = new Comment({ courseid, userid, text });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(400).json({ message: "Failed to save comment", error });
  }
});

router.get("/userData", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
