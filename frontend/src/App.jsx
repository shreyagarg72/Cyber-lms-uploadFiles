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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/Dashboard"
          element={
            <Layout>
              <DashboardContent />
            </Layout>
          }
        />
        <Route
          path="/AdminDashboard"
          element={
            <LayoutAdmin>
              <AdminDashboard />
            </LayoutAdmin>
          }
        />
        <Route
          path="/course"
          element={
            <Layout>
              <Course />
            </Layout>
          }
        />
        <Route
          path="/AdminCourse"
          element={
            <LayoutAdmin>
              <AdminCourse />
            </LayoutAdmin>
          }
        />
        <Route
          path="/community"
          element={
            <Layout>
              <Community />
            </Layout>
          }
        />
        <Route
          path="/AdminCommunity"
          element={
            <LayoutAdmin>
              <AdminCommunity />
            </LayoutAdmin>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/upload"
          element={
            <LayoutAdmin>
              <Upload />
            </LayoutAdmin>
          }
        />
        <Route
          path="/secure-upload"
          element={
            <LayoutAdmin>
              <SecureUpload />
            </LayoutAdmin>
          }
        />
        <Route
          path="/edit-course"
          element={
            <LayoutAdmin>
              <EditCourse />
            </LayoutAdmin>
          }
        />
        <Route
          path="/course/coursePage"
          element={
            <Layout>
              <CoursePage />
            </Layout>
          }
        />
        <Route
          path="/course/coursePage/coursePreview"
          element={
            <Layout>
              <CoursePreviewPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
