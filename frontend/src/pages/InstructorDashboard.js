import React, { useState, useEffect } from 'react';
import { BookOpen, User, ArrowRight, PlusCircle } from 'lucide-react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // ব্যাকএন্ড এন্ডপয়েন্ট থেকে সব কোর্স আনা হচ্ছে
        const response = await api.get('courses/'); 
        setCourses(response.data);
      } catch (err) {
        console.error("Courses load failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Instructor Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage your premium courses and track student progress.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-900 transition-all shadow-lg shadow-indigo-100">
          <PlusCircle size={20} /> Create New Course
        </button>
      </div>

      {/* Course Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          // প্রতিটি কার্ড এখন একটি লিঙ্কে মোড়ানো, যা কোর্সের আইডি অনুযায়ী রাউট করবে
          <Link to={`/course/${course.id}`} key={course.id} className="block">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              
              {/* Course Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={course.thumbnail ? (course.thumbnail.startsWith('http') ? course.thumbnail : `http://127.0.0.1:8000/media/${course.thumbnail.replace(/^\//, '')}`) : "https://via.placeholder.com/400x225?text=GradBirds+LMS"} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x225?text=Image+Not+Found"; }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    Active
                  </span>
                </div>
              </div>

              {/* Course Information */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-indigo-500 mb-3">
                  <User size={14} />
                  <span className="text-xs font-bold uppercase tracking-tighter">
                    Instructor: {course.instructor_name || "Vibely Admin"}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                  <div className="flex items-center gap-4 text-gray-400 text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} /> {course.lessons?.length || 0} Lessons
                    </span>
                  </div>
                  
                  {/* স্টাইলিশ অ্যারো বাটন */}
                  <div className="bg-gray-900 text-white p-2.5 rounded-xl group-hover:bg-indigo-600 transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <p className="text-gray-400 font-medium">You haven't uploaded any courses yet.</p>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;