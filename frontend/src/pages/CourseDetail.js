import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, Clock, ChevronRight, ArrowLeft, BookOpen } from 'lucide-react';
import api from '../api/axios';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // ডিবাগিংয়ের জন্য আইডিটি কনসোলে প্রিন্ট করা হচ্ছে
        console.log("Fetching Course with ID:", id);
        
        // নির্দিষ্ট কোর্সের আইডি দিয়ে ব্যাকএন্ড থেকে ডেটা আনা হচ্ছে
        const response = await api.get(`courses/${id}/`);
        
        // সফলভাবে ডেটা আসলে তা চেক করার জন্য
        console.log("Course Data Received:", response.data);
        
        setCourse(response.data);
      } catch (err) {
        console.error("Course details load failed:", err);
        // এরর রেসপন্স চেক করার জন্য
        if (err.response) {
            console.log("Error status:", err.response.status);
            console.log("Error data:", err.response.data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="text-indigo-600 font-bold">Loading GradBirds Course Details...</p>
      </div>
    </div>
  );

  // যদি এপিআই থেকে ডেটা না আসে (যেমন কোর্স আইডি ভুল থাকলে)
  if (!course) return (
    <div className="text-center py-20 min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-black text-gray-800 mb-2">Course not found!</h2>
        <p className="text-gray-500 mb-6">The course with ID "{id}" does not exist or has been removed.</p>
        <Link to="/dashboard" className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-gray-900 transition-all">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-all font-bold mb-8">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side: Course Info & Lesson List */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">{course.title}</h1>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">{course.description}</p>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <BookOpen className="text-indigo-600" /> Course Content
                </h2>
                <span className="text-sm font-bold text-gray-400">
                  {course.lessons?.length || 0} Lessons
                </span>
              </div>

              <div className="divide-y divide-gray-50">
                {course.lessons && course.lessons.length > 0 ? (
                  course.lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id} 
                      className="p-6 hover:bg-indigo-50/30 transition-all group cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-indigo-600 font-black group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-all">
                            {lesson.title}
                          </h4>
                          <span className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1">
                            <Clock size={12} /> {lesson.duration || '15'} min
                          </span>
                        </div>
                      </div>
                      <PlayCircle className="text-gray-300 group-hover:text-indigo-600 transition-all" size={24} />
                    </div>
                  ))
                ) : (
                  <div className="p-16 text-center">
                    <BookOpen size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-medium">No lessons have been added yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Course Thumbnail & Action */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl">
                <div className="relative h-56 rounded-[1.8rem] overflow-hidden mb-6 bg-gray-100">
                  <img 
                    src={course.thumbnail ? (course.thumbnail.startsWith('http') ? course.thumbnail : `http://127.0.0.1:8000/media/${course.thumbnail.replace(/^\//, '')}`) : "https://via.placeholder.com/400x225"} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x225?text=GradBirds+LMS"; }}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <PlayCircle className="text-indigo-600" size={32} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-gray-900 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">
                    Start Learning <ChevronRight size={20} />
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <CheckCircle size={18} className="text-green-500" /> Lifetime access
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <CheckCircle size={18} className="text-green-500" /> Certificate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;