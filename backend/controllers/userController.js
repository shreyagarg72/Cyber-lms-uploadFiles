import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import asyncHandler from 'express-async-handler';
import User from "../models/user.js";

dotenv.config();

const jwtKey = process.env.JWT_SECRET;

// console.log("jwt key"+jwtKey);

// Function to handle user login
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user in database
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Validate password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       jwtKey,
//       { expiresIn: "1h" } // Token expires in 1 hour
//     );

//     res
//       .status(200)
//       .json({ message: "logged in", token: token, userType: user.userType });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   console.log("Received login request:", email, password);

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("User not found");
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("Invalid credentials");
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { userId: user._id },
//       jwtKey,
//       { expiresIn: "1h" }
//     );

//     console.log("User logged in:", token);
//     res.status(200).json({ message: "logged in", token: token, userType: user.userType });
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
const loginAuth = async(req, res) => {
  try {
    const { auth0Id, email, name } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if not exists
      user = new User({
        name,
        email,
        auth0Id,
        userType: 'user', // Default to 'user', adjust as needed
        password: 'Auth0_' + Math.random().toString(36).slice(-8), // Generate a random password
      });
      await user.save();
    } else {
      // Update existing user with Auth0 ID if not present
      if (!user.auth0Id) {
        user.auth0Id = auth0Id;
        await user.save();
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, userType: user.userType });
  } catch (error) {
    console.error('Auth0 login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const login = (req, res) => {
  const { email, password } = req.body;

  console.log("Received login request:", email);

  // Find user in the database
  User.findOne({ email: email }).lean().then(user => {
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        console.log("Invalid credentials");
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        jwtKey,
        { expiresIn: "1h" }
      );

      console.log("User logged in:", token);
      res.status(200).json({ message: "logged in", token, userType: user.userType });
    }).catch(error => {
      console.error("Password validation error:", error);
      res.status(500).json({ message: "Server error" });
    });
  }).catch(error => {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  });
};

// Function to add a new user
const register = async (req, res) => {
  const { name, password, email, userType } = req.body;

  try {
    // Check if user with the same email exists
    let user = await User.findOne({ email }).limit(1);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user instance
    user = new User({
      name,
      password,
      email,
      userType,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclude the password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getEnrolledCourses = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate('courses.course_id');
    if (user) {
      const enrolledCourses = user.courses.map(course => {
        const progressPercentage = (course.no_of_modules_completed / course.total_no_of_modules) * 100;
        return {
          course_id: course.course_id,
          progressPercentage: isNaN(progressPercentage) ? 0 : progressPercentage.toFixed(2), // Handle division by zero and format to 2 decimal places
          ...course.toObject() // Include other course details if necessary
        };
      });
      res.json({ enrolledCourses });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
const checkEnrollmentStatus = async (req, res) => {
  const userId = req.userId;
  const { courseId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isEnrolled = user.courses.some(course => course.course_id.toString() === courseId);
    res.json({ isEnrolled });
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProfileStatus = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have the user ID from authentication middleware
    const user = await User.findById(userId).select('isProfileComplete');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ isProfileComplete: user.isProfileComplete });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export { login, register, getUser, getEnrolledCourses, checkEnrollmentStatus,loginAuth,getProfileStatus };


export default {
  login,
  register,
  getUser,
  getEnrolledCourses,
  checkEnrollmentStatus,
  loginAuth,getProfileStatus
};
