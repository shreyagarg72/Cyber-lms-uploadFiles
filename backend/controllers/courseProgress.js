import Course from '../models/video.js';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

dotenv.config();

const jwtKey = process.env.JWT_SECRET;

console.log("heerreee course progresss");

const courseProgress =async (req,res)=>{
   
    const { courseId, submodules ,userToken} = req.body; // courseId and submodules are sent in the request body
  
    const user_id = req.user_id;
    // const user_id='610255';

    try {

        // Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found');
        }
    
        // Check if all submodules are completed
        let allCompleted = submodules.every(submodule => submodule.completed);
    
        if (allCompleted) {
          // Assuming you have a way to get user by token (e.g., JWT token)
          const user = await User.findOne({ user_id: user_id });
          if (!user) {
            throw new Error('User not found');
          }
    
          // Find the course in user's courses array
          const userCourse = user.courses.find(c => c.course_id.equals(courseId));
          if (!userCourse) {
            throw new Error('Course not found in user data');
          }
          
          // Increment the number of modules completed
          userCourse.no_of_modules_completed += 1;
          console.log(userCourse.no_of_modules_completed+"modules completed");
    
          // Save the user document
          await user.save();
          
          console.log('User module completion status updated successfully');
        } else {
          console.log('Not all submodules are completed');
        }
      } catch (error) {
        console.error('Error updating module completion:', error);
      }


}

export default courseProgress;