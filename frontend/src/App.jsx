import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardContent from './components/Users/Dashboard';
import Layout from './components/Users/layout';
import LayoutAdmin from "./components/Admin/layout"
import Profile from './components/Users/Profile';
import Auth from './auth/testpage';
import CourseCard from './components/Users/CourseCard';
import Course from './components/Users/Course';
import Community from "./components/Users/Community"
import AdminDashboard from './components/Admin/AdminDash';
import AdminCourse from './components/Admin/AdminCourse';
import AdminCommunity from './components/Admin/AdminCommunity';
import Upload from './components/Admin/Upload';
import SecureUpload from './components/Admin/SecureUpload';
// import CourseDetails from './components/CoursePage';
// import ModuleDetails from './components/ModuleDetail';

function App() {
  return (
    
    <Router>
      <Routes>
            <Route path="/" element={<Auth/>} />
            <Route path="/Dashboard" element={<Layout><DashboardContent/></Layout>} />
            <Route path="/AdminDashboard" element={<LayoutAdmin><AdminDashboard/></LayoutAdmin>} />
            <Route path="/course" element={<Layout><Course/></Layout>} />
            <Route path="/AdminCourse" element={<LayoutAdmin><AdminCourse/></LayoutAdmin>} />
            <Route path="/community" element={<Layout><Community/></Layout>} />
            <Route path="/AdminCommunity" element={<LayoutAdmin><AdminCommunity/></LayoutAdmin>} />
            <Route path="/profile" element={<Layout><Profile/></Layout>} />
            <Route path="/upload" element={<LayoutAdmin><Upload /></LayoutAdmin>} />
        <Route path="/secure-upload" element={<LayoutAdmin><SecureUpload /></LayoutAdmin>} />
            {/* <Route path="/:title" element={<Layout><CourseCard/></Layout>} /> */}
            {/* <Route path="/course/:id" element={<Layout><CourseDetails/></Layout>} /> */}
            {/* <Route path="/module/:moduleId" element={<Layout><ModuleDetails/></Layout>} /> */}
            {/* <Route path="/Featuredcompf" element={<Layout><Featuredcompf/></Layout>} />
            <Route path="/cm1" element={<Layout><Cm1/></Layout>} /> */}
            
            {/* Define your routes here */}

          </Routes>
    </Router>
  );
}

export default App;
