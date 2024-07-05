

import mongoose from 'mongoose';

const SubmoduleSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  docUrl: { type: String }, // Adjust to match Cloudinary's URL for documents
  videoUrl: { type: String }, // Adjust to match Cloudinary's URL for videos
  completed: { type: Boolean, default: false }
});

const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  docUrl: { type: String }, // Adjust to match Cloudinary's URL for documents
  videoUrl: { type: String }, // Adjust to match Cloudinary's URL for videos
  submodules: [SubmoduleSchema],
});

const CourseSchema = new mongoose.Schema({
  courseName: { type: String },
  description: { type: String},
  trainerName: { type: String, required: true },
  level: { type: String, required: true },
  tools: { type: String},
  imgUrl: { type: String },
  content: [ContentSchema],
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
