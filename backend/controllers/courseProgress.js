import Course from '../models/video.js';

const courseProgress =async (req,res)=>{
   
    const { courseId, submodules } = req.body; // courseId and submodules are sent in the request body

    try {
      // Find the course by courseId
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      // Update each submodule's completed status in the content array
      course.content.forEach(content => {
        content.submodules.forEach(submodule => {
          const updatedSubmodule = submodules.find(s => s.id === submodule.id);
          if (updatedSubmodule) {
            submodule.completed = updatedSubmodule.completed;
          }
        });
      });
  
      // Save the updated course object
      await course.save();
  
      return res.status(200).json({ message: 'Submodules updated successfully', course });
    } catch (err) {
      console.error('Error updating submodules:', err);
      return res.status(500).json({ error: 'Server error, could not update submodules' });
    }


}

export default courseProgress;