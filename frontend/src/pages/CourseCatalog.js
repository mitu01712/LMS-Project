import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Star } from 'lucide-react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // সব কোর্স নিয়ে আসার এন্ডপয়েন্ট
        const response = await api.get('courses/');
        setCourses(response.data);
      } catch (err) {
        console.error("Failed to load catalog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* হেডার ও সার্চবার */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Course Catalog</h1>
          <p className="text-gray-500 mt-1">Find the perfect course to enhance your skills.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-3 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>
          <button className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-500 hover:bg-gray-50 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 font-bold text-gray-400">Loading Catalog...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              {/* থাম্বনেইল */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 shadow-sm uppercase tracking-widest">
                  Popular
                </div>
              </div>

              {/* কন্টেন্ট */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      {course.instructor_name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-gray-600">{course.instructor_name}</span>
                  </div>
                  
                  <Link 
                    to={`/course/${course.id}`}
                    className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-1"
                  >
                    Details <BookOpen size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;