import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { BookOpen, Clock, Star, PlayCircle } from 'lucide-react'; 

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API থেকে কোর্স লিস্ট আনা হচ্ছে
    api.get('courses/')
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        <p className="text-indigo-600 font-bold animate-pulse">Loading GradBirds Courses...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <span className="text-indigo-600 font-black text-sm uppercase tracking-[0.2em] mb-4 block">
            Growth & Management by Vibely Digital
          </span>
          <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Explore Our <span className="text-indigo-600">Premium</span> Courses
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl font-medium leading-relaxed">
            Enhance your career with our hands-on practical courses designed for the next generation of developers.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group"
            >
              
              {/* Thumbnail Section */}
              <div className="relative h-60 overflow-hidden bg-gray-100">
                <img 
                  // ইমেজের পূর্ণ পাথ নিশ্চিত করা হয়েছে আপনার রিকোয়েস্ট অনুযায়ী
                  src={course.thumbnail ? `http://127.0.0.1:8000${course.thumbnail}` : "https://via.placeholder.com/400x225?text=GradBirds+LMS"} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x225?text=Image+Not+Found"; }}
                />
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-indigo-600 shadow-xl uppercase tracking-widest">
                  Free Enrollment
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest">
                    LMS Development
                  </span>
                  <div className="flex items-center text-yellow-500 gap-1 text-sm font-bold ml-auto bg-yellow-50 px-3 py-1 rounded-xl">
                    <Star size={14} fill="currentColor" /> 4.9
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                  {course.title}
                </h3>

                <div className="flex items-center gap-6 text-sm text-gray-400 mb-8 font-bold">
                  <span className="flex items-center gap-2">
                    <BookOpen size={18} className="text-indigo-600" /> {course.lessons?.length || 0} Lessons
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={18} className="text-indigo-600" /> 12h 30m
                  </span>
                </div>

                {/* Footer Section */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-200">
                      {course.instructor_name ? course.instructor_name.substring(0,2).toUpperCase() : 'GD'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Instructor</span>
                      <span className="text-xs font-black text-gray-800 tracking-tight">
                        {course.instructor_name || "Vibely Admin"}
                      </span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/course/${course.id}`}
                    className="bg-gray-900 text-white p-3.5 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-gray-200 group-hover:rotate-[-5deg]"
                  >
                    <PlayCircle size={22} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;