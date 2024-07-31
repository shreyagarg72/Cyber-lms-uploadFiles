// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardContent from "./components/Users/Dashboard";
import Layout from "./components/Users/layout";
import LayoutAdmin from "./components/Admin/layout";
import Profile from "./components/Users/Profile";
import Auth from "./auth/testpage";
import Course from "./components/Users/Course/Course";
import Community from "./components/Users/Community";
import AdminDashboard from "./components/Admin/AdminDash";
import AdminCourse from "./components/Admin/AdminCourse";
import AdminCommunity from "./components/Admin/AdminCommunity";
import Upload from "./components/Admin/Upload";
import SecureUpload from "./components/Admin/SecureUpload";
import EditCourse from "./components/Admin/EditCourse";
import CoursePage from "./components/Users/Course/CoursePage";
import CoursePreviewPage from "./components/Users/Course/CoursesPreview";
import AdminProfile from "./components/Admin/Profile";
import GuacamoleTerminal from "./components/Users/GuacamoleTerminal";
import AdminCalandar from "./components/Admin/Calendar";
import { AuthProvider } from "./auth/AuthProvider"; // Adjust the import path as necessary
import ProtectedRoute from "./hoc/ProtectedRoutes"; // Adjust the import path as necessary
import Calendar from "./components/Users/Calendar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardContent />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute adminOnly>
                <LayoutAdmin>
                  <AdminDashboard />
                </LayoutAdmin>
              </ProtectedRoute>
            }
          />
          <Route
            path="/course"
            element={
              <ProtectedRoute>
                <Layout>
                  <Course />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminCourse"
            element={
              <ProtectedRoute adminOnly>
                <LayoutAdmin>
                  <AdminCourse />
                </LayoutAdmin>
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Layout>
                  <Community />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminCommunity"
            element={
              <ProtectedRoute adminOnly>
                <LayoutAdmin>
                  <AdminCommunity />
                </LayoutAdmin>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminProfile"
            element={
              <ProtectedRoute>
                <LayoutAdmin>
                  <AdminProfile />
                </LayoutAdmin>
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute adminOnly>
                <LayoutAdmin>
                  <Upload />
                </LayoutAdmin>
              </ProtectedRoute>
            }
          />
          <Route
            path="/secure-upload"
            element={
              <ProtectedRoute adminOnly>
                <LayoutAdmin>
                  <SecureUpload />
                </LayoutAdmin>
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-course"
            element={
              <ProtectedRoute adminOnly>
                <LayoutAdmin>
                  <EditCourse />
                </LayoutAdmin>
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/coursePage"
            element={
              <ProtectedRoute>
                <Layout>
                  <CoursePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/coursePage/coursePreview"
            element={
              <ProtectedRoute>
                <Layout>
                  <CoursePreviewPage />
                </Layout>
              </ProtectedRoute>
            }
          />
           <Route path="/guacamoleTerminal" element={<GuacamoleTerminal />} />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Layout>
                  <Calendar />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminCalander"
            element={
              <ProtectedRoute>
                <LayoutAdmin>
                  <AdminCalandar />
                </LayoutAdmin>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
