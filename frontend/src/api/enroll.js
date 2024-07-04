import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';

const enrollInCourse = async (courseId) => {
    try {
      const { auth } = useAuth(); // Access the auth object
      const { token } = auth; // Extract token from auth
  
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await axios.post('http://localhost:5000/api/enroll', { courseId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error enrolling in course', error);
      throw error;
    }
  };
  export default enrollInCourse; 