import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
            {/* Course Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden">
                <img 
                    src={course.thumbnail || 'https://via.placeholder.com/400x250?text=No+Thumbnail'} 
                    alt={course.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {course.category || 'Featured'}
                    </span>
                </div>
            </div>

            {/* Course Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {course.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                    {course.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                            {course.instructor_name ? course.instructor_name[0] : 'I'}
                        </div>
                        <span className="text-xs text-gray-600 font-medium">
                            {course.instructor_name || 'Instructor'}
                        </span>
                    </div>
                    <Link 
                        to={`/course/${course.id}`}
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;