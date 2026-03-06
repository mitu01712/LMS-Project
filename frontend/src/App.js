import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login'; 
import Register from './pages/Register';
import CourseCatalog from './pages/CourseCatalog';
import MyCourses from './pages/MyCourses';
import InstructorDashboard from './pages/InstructorDashboard';
import Profile from './pages/Profile';
import CourseDetail from './pages/CourseDetail';

function App() {
  // টোকেন আছে কি না চেক করা হচ্ছে
  const token = localStorage.getItem('access_token'); 

  return (
    <Router>
      <Routes>
        {/* লগইন এবং রেজিস্ট্রেশন পেজে সাইডবার বা নেভবার থাকবে না */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />

        {/* অ্যাপের বাকি সব পেজ যেখানে সাইডবার এবং প্রোটেকশন থাকবে */}
        <Route
          path="/*"
          element={
            token ? (
              <div className="flex min-h-screen bg-gray-50">
                {/* বাম পাশে ফিক্সড সাইডবার */}
                <aside className="w-64 fixed inset-y-0 left-0 z-50">
                  <Sidebar />
                </aside>

                {/* ডান পাশে মেইন কন্টেন্ট এরিয়া */}
                <div className="flex-1 ml-64 flex flex-col">
                  <Navbar />
                  <main className="p-8">
                    <Routes>
                      <Route path="/dashboard" element={<InstructorDashboard />} />
                      <Route path="/courses" element={<CourseCatalog />} />
                      <Route path="/my-courses" element={<MyCourses />} />
                      <Route path="/course/:id" element={<CourseDetail />} />
                      <Route path="/profile" element={<Profile />} />
                      
                      {/* ডিফল্ট রাউট: ড্যাশবোর্ডে নিয়ে যাবে */}
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      
                      {/* যদি কোনো ভুল লিঙ্কে যায় */}
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={<InstructorDashboard />} />
  <Route path="/course/:id" element={<CourseDetail />} />
                    </Routes>
                  </main>
                </div>
              </div>
            ) : (
              // যদি টোকেন না থাকে, তবে সরাসরি লগইন পেজে পাঠাবে
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;