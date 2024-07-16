// routes/course.js
import express from "express";
import Course from "../models/video.js"; // Ensure you have a Course model
import User from "../models/user.js"; // Ensure you have a Course model
import upload from '../middlewares/upload.js';
import cloudinary  from 'cloudinary';

const router = express.Router();


// PUT route to update a course
router.put('/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourseData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updatedCourseData, {
      new: true,
    });

    res.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});



router.post("/upload", async (req, res) => {
 
  try {
    console.log("in the post method")
    const {
      courseName,
      description,
      trainerName,
      level,
      tools,
      imgUrl,
      enrollType,
      content,
      finalAssignment
    } = req.body;
    const assignmentsWithNumbers = finalAssignment.map((assignment, index) => ({
      ...assignment,
      questionNo: index + 1
    }));
    console.log(content.assignment);
    const newCourse = new Course({
      courseName,
      description,
      trainerName,
      level,
      tools,
      imgUrl,
      enrollType,
      content,
      finalAssignment:assignmentsWithNumbers
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get('/free-count', async (req, res) => {
  try {
    const freeCourses = await Course.countDocuments({ enrollType: 'Free' });
    res.json({ freeCourses });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching free courses' });
  }
});
// routes/courses.js
router.get('/enrollment-count', async (req, res) => {
  try {
    const enrollmentData = await User.aggregate([
      { $unwind: '$courses' },
      { $group: { _id: '$courses.course_id', count: { $sum: 1 } } },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'course',
        },
      },
      { $unwind: '$course' },
      { $project: { _id: 0, courseName: '$course.courseName', count: 1 } },
    ]);

    res.json(enrollmentData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// export default router;

export default router;
