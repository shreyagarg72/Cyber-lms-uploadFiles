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
router.post('/auth0-login',authController.loginAuth);
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

// router.put("/userDetails",verifyToken, async (req, res) => {
//   const userId = req.userId; // Assuming you have user ID from the authenticated user
//   const { name, email, region } = req.body;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { name, email, region },
//       { new: true }
//     );
//     res.json(updatedUser);
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ error: "Failed to update user" });
//   }
// });
// router.put("/userDetails", verifyToken, async (req, res) => {
//   const userId = req.userId; // Assuming you have user ID from the authenticated user
//   const { name, email, region, hasCyberPeaceFoundation, university } = req.body;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { name, email, region, hasCyberPeaceFoundation, university },
//       { new: true }
//     );
//     res.json(updatedUser);
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ error: "Failed to update user" });
//   }
// });

router.put("/userDetails", verifyToken, async (req, res) => {
  const userId = req.userId; // Assuming you have user ID from the authenticated user
  const { name, email, region, hasCyberPeaceFoundation, universityName } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, region, hasCyberPeaceFoundation, universityName },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
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
// router.get("/comments", async (req, res) => {
//   try {
//     const comments = await Comment.find()
//       .populate("userid", "name") // Populating only the 'name' field from the User model
//       .populate("courseid", "courseName"); // Populating only the 'courseName' field from the Course model
//     res.json(comments);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

router.get('/comments', async (req, res) => {
  try {
    // Fetch comments and populate the replies' user details
    const comments = await Comment.find()
      .populate({
        path: 'replies.userid', // Populate the user details for each reply
        select: 'name', // Select only the name field
      })
      .populate('userid', 'name'); // Populate the user details for each comment

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments with replies:", error);
    res.status(500).json({ error: 'Error fetching comments with replies' });
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
router.post('/:commentId/reply', async (req, res) => {
  const { commentId } = req.params;
  const { userid, text } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.replies.push({ userid, text });
    await comment.save();

    res.status(201).json({ message: 'Reply added successfully', comment });
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ error: 'Server error' });
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
