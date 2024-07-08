

// import mongoose from 'mongoose';

// const SubmoduleSchema = new mongoose.Schema({
//   title: { type: String },
//   description: { type: String },
//   docUrl: { type: String }, // Adjust to match Cloudinary's URL for documents
//   videoUrl: { type: String }, // Adjust to match Cloudinary's URL for videos
  
// });

// const ContentSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   docUrl: { type: String }, // Adjust to match Cloudinary's URL for documents
//   videoUrl: { type: String }, // Adjust to match Cloudinary's URL for videos
//   submodules: [SubmoduleSchema],
// });

// const CourseSchema = new mongoose.Schema({
//   courseName: { type: String },
//   description: { type: String},
//   trainerName: { type: String },
//   level: { type: String, required: true },
//   tools: { type: String},
//   imgUrl: { type: String },
//   content: [ContentSchema],
// }, {
//   timestamps: true,
// });

// const Course = mongoose.model('Course', CourseSchema);

// export default Course;
import mongoose from 'mongoose';

const SubmoduleSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  docUrl: { type: String },
  videoUrl: { type: String },
});

const QuestionSchema = new mongoose.Schema({
  questionNo: { type: Number, required: true },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String }
});

const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  docUrl: { type: String },
  videoUrl: { type: String },
  submodules: [SubmoduleSchema],
});

const CourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  description: { type: String, required: true },
  trainerName: { type: String, required: true },
  level: { type: String, required: true },
  tools: { type: String },
  imgUrl: { type: String, required: true },
  content: [ContentSchema],
  assignments: [QuestionSchema], // Changed this to an array of QuestionSchema
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;