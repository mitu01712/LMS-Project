import React, { useState, useEffect } from 'react';
// সব আইকন একটি মাত্র লাইনে ইমপোর্ট করা হয়েছে যাতে ডুপ্লিকেট এরর না হয়
import { PlayCircle, BookOpen, GraduationCap, Clock } from 'lucide-react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        // ব্যাকএন্ড এন্ডপয়েন্ট: /api/my-courses/
        const response = await api.get('my-courses/');
        setEnrolledCourses(response.data);
      } catch (err) {
        console.error("Failed to load enrolled courses:", err);
        // টোকেন না থাকলে বা সেশন শেষ হয়ে গেলে ৪০১ এরর হ্যান্ডলিং
        if (err.response?.status === 401) {
          setError("Please login to see your courses.");
        } else {
          setError("Could not load courses. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  if (loading) return <div className="p-20 text-center font-bold text-gray-500 animate-pulse">Loading your classroom...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">My Learning Journey</h1>
        <p className="text-gray-500 mt-2">আপনি যে কোর্সগুলোতে ভর্তি হয়েছেন সেগুলো এখানে পাবেন।</p>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-3xl border border-red-100 font-medium">
          {error}
        </div>
      ) : enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              {/* কোর্স থাম্বনেইল */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center cursor-pointer">
                   <PlayCircle className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
                </div>
              </div>

              {/* কোর্স ইনফো */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">Enrolled</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-gray-500 text-xs font-medium mb-6">Instructor: {course.instructor_name}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                    <BookOpen size={14} /> {course.lessons?.length || 0} Lessons
                  </span>
                  <Link 
                    to={`/course/${course.id}`}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-900 transition-all shadow-lg shadow-indigo-100"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* খালি অবস্থায় দেখানোর জন্য ইম্প্রুভড ডিজাইন */
        <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-gray-200">
          <GraduationCap className="mx-auto text-gray-300 mb-4" size={64} />
          <p className="text-gray-500 font-bold text-xl">You haven't enrolled in any courses yet!</p>
          <Link to="/courses" className="text-indigo-600 font-black mt-4 inline-block hover:underline">
            Browse Course Catalog →
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCourses;