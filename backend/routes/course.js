// routes/course.js
import express from 'express';
import Course from '../models/video.js'; // Ensure you have a Course model
// import { uploadFile } from '../middlewares/upload.js'; // Assuming you have an upload middleware

const router = express.Router();


router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCourse = req.body;
  
      // Find the course by ID and update it with the new data
      const course = await Course.findByIdAndUpdate(id, updatedCourse, { new: true });
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  
// POST /api/courses
router.post('/', async (req, res) => {
    try {
        const { courseName, description, trainerName, level, tools, imgUrl, content } = req.body;

        const newCourse = new Course({
            courseName,
            description,
            trainerName,
            level,
            tools,
            imgUrl,
            content,
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
