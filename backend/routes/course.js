// routes/course.js
import express from 'express';
import Course from '../models/video.js'; // Ensure you have a Course model
// import { uploadFile } from '../middlewares/upload.js'; // Assuming you have an upload middleware

const router = express.Router();

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
