import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Navbar = ({ userName }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* বাম পাশ: সার্চ বার */}
      <div className="relative w-96 hidden md:block">
        <Search className="absolute left-4 top-3 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search courses, lessons..." 
          className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm"
        />
      </div>

      {/* ডান পাশ: প্রোফাইল ও নোটিফিকেশন */}
      <div className="flex items-center gap-5">
        <button className="p-2.5 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-10 w-[1px] bg-gray-100 mx-2"></div>

        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800">{userName || "Mitu Ghosh"}</p>
            <p className="text-[10px] text-indigo-500 font-black uppercase tracking-tighter">Premium Member</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;