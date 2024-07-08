import Course from "../models/video.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

dotenv.config();

const jwtKey = process.env.JWT_SECRET;

const courseProgress = async (req, res) => {
  const { courseId, submodules } = req.body; // courseId and submodules are sent in the request body
  console.log(req.body);
  const user_id = req.userId;

  try {
    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    console.log(submodules);
    //completed submodule IDs
    const isEmpty = (obj) => {
      return Object.entries(obj).length === 0;
    };
    

    if (!isEmpty(submodules)) {
      const completedSubmoduleIds = new Set(submodules);
      console.log(completedSubmoduleIds);

      // Iterate through each module and check if all its submodules are completed
      let moduleCompleted = 0;
      course.content.forEach((module) => {
        //submodules from the db
        const moduleSubmodules = module.submodules.map((submodule) =>
          submodule._id.toString()
        );
        const allSubmodulesCompleted = moduleSubmodules.every((submoduleId) =>
          completedSubmoduleIds.has(submoduleId)
        );
        console.log(allSubmodulesCompleted + "all");
        if (allSubmodulesCompleted) {
          moduleCompleted = moduleCompleted + 1;
          console.log(moduleCompleted + "count");
        }
      });

      if (moduleCompleted > 0) {
        // Assuming you have a way to get user by token (e.g., JWT token)
        const user = await User.findOne({ _id: user_id });
        if (!user) {
          throw new Error("User not found");
        }

        // Find the course in user's courses array
        const userCourse = user.courses.find((c) =>
          c.course_id.equals(courseId)
        );
        if (!userCourse) {
          throw new Error("Course not found in user data");
        }

        // Increment the number of modules completed
        userCourse.no_of_modules_completed = moduleCompleted;
        console.log(userCourse.no_of_modules_completed + "modules completed");

        userCourse.completed_submodules = submodules;

        // Save the user document
        await user.save();

        console.log("User module completion status updated successfully");
      } else {
        console.log("Not all submodules are completed");
      }
    }
    else{
      console.log("No submodules are completed");
    }
  } catch (error) {
    console.error("Error updating module completion:", error);
  }
};

const completedSubmodules = async (req, res) => {
  const { courseId } = req.query;
  console.log(courseId);
  const user_id = req.userId;
  try {
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      throw new Error("User not found");
    }

    // Find the course in user's courses array
    const userCourse = user.courses.find((c) => c.course_id.equals(courseId));
    if (!userCourse) {
      throw new Error("Course not found in user data");
    }

    res.status(200).json(userCourse.completed_submodules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default { courseProgress, completedSubmodules };
