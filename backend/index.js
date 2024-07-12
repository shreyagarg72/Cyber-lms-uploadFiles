// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import { errorHandler } from './middlewares/error.js';
// import videoRoutes from './routes/video.js';
// import signUploadRoutes from './routes/sign-upload.js';
// import courseRoutes from './routes/course.js'; // Add this line
// import Course from './models/video.js';
// import loginRegRoutes from './routes/login-reg.js'; // Add these
// import eventRoutes from './routes/event.js';
// import notifyRoutes from './routes/notify.js';
// import { Server } from 'socket.io';
// import http from 'http';
// import courseProgressRoutes from './routes/course-progress.js'

// import authMiddleware from './middlewares/authMiddleware.js'
// import enrollRoutes from './routes/enroll.js'
// import uploadRoutes from './routes/upload.js'
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;


// const corsOption = {
//     origin: ['http://localhost:3000'],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
// }


// // Middleware
// // app.use(cors());
// app.use(cors(corsOption));
// app.use(express.json());

// // Routes
// app.use('/api/videos', videoRoutes);
// app.use('/api/sign-upload', signUploadRoutes);
// app.use('/api/courses', courseRoutes); // Add this line
// app.use('/api/event', eventRoutes);
// app.use('/api/notify', notifyRoutes);
// app.get('/api/courses', async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // app.use('/api', userRoutes);
// app.use('/api', loginRegRoutes);

// app.use('/api', courseProgressRoutes);

// app.use('/api', authMiddleware, enrollRoutes);
// app.use('/api/upload', uploadRoutes);

// // Error handler middleware
// app.use(errorHandler);

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"]
//     }
// });

// // Socket.IO connection
// io.on('connection', (socket) => {
//     console.log('New client connected');
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// // Notify clients about new events
// const notifyClients = (event) => {
//     io.emit('newEvent', event);
// };

// // Example route to create an event and notify clients
// app.post('/api/event', async (req, res) => {
//     try {
//       const { date, time, title, instructor } = req.body;
  
//       // Save event to the database
//       const newEvent = new Event({ date, time, title, instructor });
//       await newEvent.save();
  
//       // Save notification to the database
//       const newNotification = new Notification({ date, time, title, instructor });
//       await newNotification.save();
  
//       // Notify clients
//       notifyClients(newNotification);
  
//       res.status(201).json(newEvent);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  

// // Route to clear notifications
// app.post('/api/clear-notifications', (req, res) => {
//     notifications = [];
//     res.status(200).json({ message: "Notifications cleared" });
// });
// // Start server
// app.listen(port, () => {
//     connectDB();
//     console.log(`Server is running on port ${port}`);
// });

// export { notifyClients };

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/error.js';
import videoRoutes from './routes/video.js';
import signUploadRoutes from './routes/sign-upload.js';
import courseRoutes from './routes/course.js';
import Course from './models/video.js';
import loginRegRoutes from './routes/login-reg.js';
import eventRoutes from './routes/event.js';
import notifyRoutes from './routes/notify.js';
import { Server } from 'socket.io';
import http from 'http';
import courseProgressRoutes from './routes/course-progress.js';
import authMiddleware from './middlewares/authMiddleware.js';
import enrollRoutes from './routes/enroll.js';
import uploadRoutes from './routes/upload.js';
import Notification from './models/notification.js';
import Event from './models/event.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOption = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOption));
app.use(express.json());

app.use('/api/videos', videoRoutes);
app.use('/api/sign-upload', signUploadRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/notify', notifyRoutes);
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use('/api', loginRegRoutes);
app.use('/api', courseProgressRoutes);
app.use('/api', authMiddleware, enrollRoutes);
app.use('/api/upload', uploadRoutes);

app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const notifyClients = (event) => {
  io.emit('newEvent', event);
};
export { notifyClients };

app.post('/api/event', async (req, res) => {
  try {
    const { date, time, title, instructor } = req.body;

    const newEvent = new Event({ date, time, title, instructor });
    await newEvent.save();

    const newNotification = new Notification({ date, time, title, instructor });
    await newNotification.save();

    notifyClients(newNotification);

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/clear-notifications', (req, res) => {
  Notification = [];
  res.status(200).json({ message: "Notifications cleared" });
});

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error("Failed to connect to the database", error);
});
