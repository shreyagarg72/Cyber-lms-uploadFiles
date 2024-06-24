// controllers/course.js
import Course from '../models/course.js';

export const createCourse = async (req, res) => {
  const { courseName, description, trainerName, level, tools, imgUrl, content } = req.body;

  try {
    const newCourse = new Course({
      courseName,
      description,
      trainerName,
      level,
      tools,
      imgUrl,
      content,
    });

    await newCourse.save();
    res.status(201).json({ success: true, message: 'Course created successfully', data: newCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
