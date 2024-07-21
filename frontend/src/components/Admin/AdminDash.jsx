import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileBoy from "../../assets/Profile.webp";
import {
  faEye,
  faBook,
  faUsers,
  faStar,
  faClock,
  faSearch,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuth } from "../../auth/AuthProvider";
import Notification from "../Users/Notification";
import ToggleProfile from "../Users/ToggleProfile";
import { useMediaQuery } from "react-responsive";
import Axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const barOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false, // Prevents skipping labels
        },
        title: {
          display: true,
          text: "Courses",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Enrollments",
        },
      },
    },
    barPercentage: 0.5, // Adjust this to change the bar width (0.5 is 50% of the available space)
    categoryPercentage: 0.8, // Adjust this to control the spacing between bars
  };

  const { auth } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [pieData, setPieData] = useState({ labels: [], datasets: [] });
  const [lineData, setLineData] = useState({ labels: [], datasets: [] });
  const [courseCount, setCourseCount] = useState(0);
  const [learningHours, setLearningHours] = useState(0);
  const [barData, setBarData] = useState({ labels: [], datasets: [] });
  const [showProfile, setShowProfile] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 450 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const [totalUsers, setTotalUsers] = useState(0);
  const [freeCourses, setFreeCourses] = useState(0);
  const [universityData, setUniversityData] = useState([]);
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    const fetchEnrollmentData = async () => {
      try {
        const token = auth.token;
        const response = await Axios.get(
          `${
            import.meta.env.VITE_BACKEND_BASEURL
          }/api/courses/enrollment-count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const enrollmentData = response.data;
        const shortenCourseName = (name) => {
          // Adjust the logic here as needed (e.g., using the first few characters)
          return name.length > 15 ? `${name.substring(0, 15)}...` : name;
        };

        const labels = enrollmentData.map((data) =>
          shortenCourseName(data.courseName)
        );
        const counts = enrollmentData.map((data) => data.count);

        setBarData({
          labels,
          datasets: [
            {
              label: "Number of Enrollments",
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching enrollment data:", error);
      }
    };

    fetchEnrollmentData();
  }, []);

  useEffect(() => {
    const fetchFreeCourses = async () => {
      try {
        const response = await Axios.get(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses/free-count`
        );
        const freeCourseCount = response.data.freeCourses; // Adjust based on your API response structure
        setFreeCourses(freeCourseCount);
      } catch (error) {
        console.error("Error fetching free courses:", error);
      }
    };

    fetchFreeCourses();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = auth.token; // Adjust according to your token storage
        const response = await Axios.get(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/users/cpf`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUniversityData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await Axios.get(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`
        );
        const courses = response.data;
        // Check the structure of the response

        // Ensure courses is an array
        if (Array.isArray(courses)) {
          setCourseCount(courses.length); // Set the dynamic course count
          const paidCount = courses.filter(
            (course) => course.enrollType === "Paid"
          ).length;
          const freeCount = courses.filter(
            (course) => course.enrollType === "Free"
          ).length;

          setPieData({
            labels: ["Paid", "Free"],
            datasets: [
              {
                data: [paidCount, freeCount],
                backgroundColor: ["green", "blue"],
              },
            ],
          });
          const totalSubmodules = courses.reduce((acc, course) => {
            return (
              acc +
              course.content.reduce(
                (subAcc, module) => subAcc + module.submodules.length,
                0
              )
            );
          }, 0);

          const totalLearningHours = totalSubmodules * 24;
          setLearningHours(totalLearningHours);
        } else {
          console.error("Expected courses to be an array", courses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchUsersPerMonth = async () => {
      try {
        const token = auth.token; // Adjust based on your auth context
        const response = await Axios.get(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/users/monthly-count`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Assuming you're using Bearer tokens
            },
          }
        );
        const userData = response.data; // Should be an array of user counts per month

        // Create labels for 12 months
        const labels = Array.from({ length: 12 }, (_, index) => index + 1); // Creates [1, 2, 3, ..., 12]

        // Map userData to fit into the 12 months
        const data = labels.map((_, index) => userData[index] || 0); // Use 0 for months without data

        setLineData({
          labels: labels.map((month) => `Month ${month}`), // E.g., ["Month 1", "Month 2", ...]
          datasets: [
            {
              label: "Number of Users per Month",
              data: data,
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching users per month:", error);
      }
    };

    fetchUsersPerMonth();
  }, [auth]); // Ensure to include auth in dependencies if it changes

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const token = auth.token; // Adjust based on your auth context
        const response = await Axios.get(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/users/total-count`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Assuming you're using Bearer tokens
            },
          }
        );
        const userCount = response.data.totalUsers; // Adjust based on your API response structure
        setTotalUsers(userCount);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, [auth]);

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div>
      <div className={`flex justify-center ${isMobile ? "p-2" : "py-2"}`}></div>
      <div className="p-6 bg-gray-100 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-blue-500 text-2xl"
                />
                <div>
                  <p className="text-gray-500">{courseCount} Courses</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faBook}
                  className="text-green-500 text-2xl"
                />
                <div>
                  <p className="text-gray-500">
                    {learningHours} learning hours
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-red-500 text-2xl"
                />
                <div>
                  <p className="text-gray-500">{totalUsers} Total Users</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 text-2xl"
                />
                <div>
                  <p className="text-gray-500">{freeCourses} Free Courses</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-center text-lg font-bold mb-4">
                Number of Users per Month
              </h2>
              <Line data={lineData} />
            </div>
            <div className="bg-white h-full p-4 rounded-lg shadow">
              <h2 className="text-center text-lg font-bold mb-4">
                Student Enrollment by Course
              </h2>
              <Bar data={barData} options={barOptions} />
            </div>
            <div className="mt-2 bg-white p-4 rounded-lg shadow-xl">
              <h2 className="text-center text-lg font-bold mb-4">
                Enrollment Types
              </h2>
              <Pie data={pieData} />
            </div>
            <div className="mt-2 bg-white p-4 rounded-lg shadow-xl">
              <div className="chart-section">
                <div className="chart-container">
                  <h3>Users by University with CyberPeace Foundation</h3>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#f2f2f2",
                          borderBottom: "2px solid #ddd",
                        }}
                      >
                        <th
                          style={{ padding: "12px", border: "1px solid #ddd" }}
                        >
                          University
                        </th>
                        <th
                          style={{ padding: "12px", border: "1px solid #ddd" }}
                        >
                          Number of Users
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {universityData.map((university, index) => (
                        <tr
                          key={university.universityName}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#fafafa" : "#ffffff",
                            borderBottom: "1px solid #ddd",
                          }}
                        >
                          <td
                            style={{
                              padding: "12px",
                              border: "1px solid #ddd",
                            }}
                          >
                            {university.universityName}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              border: "1px solid #ddd",
                            }}
                          >
                            {university.userCount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-bold">Today</h2>
              <h1 className="mb-2 text-sm">June 18, 2024</h1>
            </div>
            <Link to="/Admincalander">
              <button className="w-20 bg-blue-950 rounded-xl text-white text-sm">
                View all
              </button>
            </Link>
          </div>
          <div className="flex flex-col">
            {["Ethical Hacking", "Ethical Hacking", "Ethical Hacking"].map(
              (course, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg mb-2 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">{course}</h3>
                    <p className="text-gray-500 text-sm">
                      <FontAwesomeIcon icon={faClock} className="mx-2" />
                      3:00-4:00pm <br /> <br /> Prof Raj Sharma
                    </p>
                    <p className="text-gray-500">Prof Raj Sharma</p>
                  </div>
                  <button className="bg-blue-900 text-white py-1 px-7 rounded-full">
                    Join
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
