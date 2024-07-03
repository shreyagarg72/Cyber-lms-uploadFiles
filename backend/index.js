// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import { errorHandler } from './middlewares/error.js';
// import videoRoutes from './routes/video.js';
// import signUploadRoutes from './routes/sign-upload.js';

// dotenv.config();

// const app = express();
// const port = process.env.VITE_PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/videos', videoRoutes);
// app.use('/api/sign-upload', signUploadRoutes);

// // Error handler middleware
// app.use(errorHandler);

// // Start server
// app.listen(port, () => {
//     connectDB();
//     console.log(`Server is running on port ${port}`);
// });



// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import { errorHandler } from './middlewares/error.js';
// import videoRoutes from './routes/video.js';
// //import signUploadRoutes from './routes/sign-upload.js';
// import courseRoutes from './routes/course.js'; // Add this line
// import Course from './models/video.js';
// import loginRegRoutes from './routes/login-reg.js'; // Add these

// dotenv.config();

// const app = express();
// const port = process.env.VITE_PORT || 5000;


// // Middleware
// app.use(cors({
//   origin: ["https://cyber-lms-upload-files-frontend.vercel.app"],
//   methods: ["POST","GET"],
//   credentials: true
// }));
// app.use(express.json());

// // Routes
// app.use('/api/videos', videoRoutes);
// //app.use('/api/sign-upload', signUploadRoutes);
// app.use('/api/courses', courseRoutes); // Add this line
// app.get('/api/courses', async (req, res) => {
//     try {
//       const courses = await Course.find();
//       res.json(courses);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

//   app.get('/',(req,res)=>{
//     res.json("hello");
//   })
// // login routes
// app.use("/api", loginRegRoutes);

// // Error handler middleware
// app.use(errorHandler);

// // Start server
// app.listen(port, () => {
//     connectDB();
//     console.log(`Server is running on port ${port}`);
// });


// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import { errorHandler } from './middlewares/error.js';
// import videoRoutes from './routes/video.js';
// import courseRoutes from './routes/course.js';
// import loginRegRoutes from './routes/login-reg.js';
// import Course from './models/video.js';

// dotenv.config();

// const app = express();
// const port = process.env.VITE_PORT || 5000;

// // Middleware
// const corsOptions = {
//   origin: 'https://cyber-lms-upload-files-frontend.vercel.app', // your frontend URL
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
// app.use(express.json());

// // Routes
// app.use('/api/videos', videoRoutes);
// app.use('/api/courses', courseRoutes);
// app.get('/api/courses', async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// app.use('/api', loginRegRoutes);

// // Error handler middleware
// app.use(errorHandler);

// // Start server
// app.listen(port, () => {
//   connectDB();
//   console.log(`Server is running on port ${port}`);
// });
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import { errorHandler } from './middlewares/error.js';
// import videoRoutes from './routes/video.js';
// import courseRoutes from './routes/course.js';
// import loginRegRoutes from './routes/login-reg.js';
// import Course from './models/video.js';

// dotenv.config();

// const app = express();
// const port = process.env.VITE_PORT || 5000;



// // Configure the CORS middleware
// const corsOptions = {
//   origin: 'https://cyber-lms-upload-files-frontend.vercel.app', // Replace with your frontend URL
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
// };
// app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // Routes
// app.use('/api/videos', videoRoutes);
// app.use('/api/courses', courseRoutes);
// app.get('/api/courses', async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// app.use('/api', loginRegRoutes);

// // Error handler middleware
// app.use(errorHandler);

// // Start server
// app.listen(port, () => {
//   connectDB();
//   console.log(`Server is running on port ${port}`);
// });

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import { errorHandler } from './middlewares/error.js';
// import videoRoutes from './routes/video.js';
// import courseRoutes from './routes/course.js';
// import loginRegRoutes from './routes/login-reg.js';
// import Course from './models/video.js';

// dotenv.config();

// const app = express();
// const port = process.env.VITE_PORT || 5000;

// // Middleware
// const corsOptions = {
//   origin: 'https://cyber-lms-upload-files-frontend.vercel.app', // Replace with your frontend URL
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
// };
// app.use(cors(corsOptions));
// app.use(express.json());

// // Logging Middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // Routes
// app.use('/api/videos', videoRoutes);
// app.use('/api/courses', courseRoutes);
// app.get('/api/courses', async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// app.use('/api', loginRegRoutes);

// // Error handler middleware
// app.use(errorHandler);

// // Start server
// app.listen(port, () => {
//   connectDB();
//   console.log(`Server is running on port ${port}`);
// });
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import { errorHandler } from './middlewares/error.js';
// import videoRoutes from './routes/video.js';
// import courseRoutes from './routes/course.js';
// import loginRegRoutes from './routes/login-reg.js';
// import Course from './models/video.js';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // // Configure the CORS middleware
// // const corsOptions = {
// //   origin: 'https://cyber-lms-upload-files-frontend.vercel.app', // Replace with your frontend URL
// //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// //   preflightContinue: false,
// //   optionsSuccessStatus: 204,
// //   allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
// // };
// app.use(cors());

// // app.use((req, res, next) => {
// //   console.log(`${req.method} ${req.url}`);
// //   next();
// // });

// // Middleware

// app.use(express.json());


// // Routes
// app.use('/api/videos', videoRoutes);
// app.use('/api/courses', courseRoutes);
// app.get('/api/courses', async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// console.log(
//   "reached index.js"
// )
// app.use('/api', loginRegRoutes);
// console.log(
//   "got route in index.js"
// )

// app.get('/', (req, res) => {
//   res.send('Server is up and running!');
// });
// // Error handler middleware
// app.use(errorHandler);

// // Start server
// const server = app.listen(port, () => {
//   connectDB();
//   console.log(`Server is running on port ${port}`);
// });

// server.timeout=30000;



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/error.js';
import videoRoutes from './routes/video.js';
import courseRoutes from './routes/course.js';
import loginRegRoutes from './routes/login-reg.js';
import Course from './models/video.js';



dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/videos', videoRoutes);
app.use('/api/courses', courseRoutes);
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.use('/api', loginRegRoutes);

// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});


