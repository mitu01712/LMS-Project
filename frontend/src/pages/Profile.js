import React from 'react';
import { Mail, Shield, BookOpen, Award } from 'lucide-react';

const Profile = () => {
  // এই ডাটাগুলো পরবর্তীতে আপনার ব্যাকএন্ড থেকে আসবে
  const userStats = [
    { label: 'Enrolled Courses', value: '12', icon: <BookOpen className="text-blue-500" /> },
    { label: 'Completed Lessons', value: '45', icon: <Award className="text-orange-500" /> },
    { label: 'Account Status', value: 'Active', icon: <Shield className="text-green-500" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* প্রোফাইল হেডার কার্ড */}
      <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-[40px] bg-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-200">
            M
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Mitu Ghosh</h1>
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <Mail size={16} />
              <span>mitughosh@example.com</span>
            </div>
            <button className="mt-6 px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl">
              Edit Profile Settings
            </button>
          </div>
        </div>
      </div>

      {/* স্ট্যাটাস গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
              {stat.icon}
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-800">{stat.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;