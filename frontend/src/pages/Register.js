import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import api from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ব্যাকএন্ডে রেজিস্ট্রেশন ডেটা পাঠানো হচ্ছে
      const response = await api.post('register/', {
        username: formData.email, // ইমেইলকে ইউজারনেম হিসেবে পাঠানো হচ্ছে
        email: formData.email,
        password: formData.password,
        first_name: formData.name
      });
      
      // শুধুমাত্র সফল স্ট্যাটাস কোড আসলেই নেভিগেট করবে
      if (response.status === 201 || response.status === 200) {
        console.log("Registration Success:", response.data);
        alert("Registration Successful! Please login.");
        navigate('/login'); 
      }
    } catch (err) {
      console.error("Error details:", err);
      
      const backendError = err.response?.data;
      
      if (backendError) {
        // ব্যাকএন্ড থেকে আসা প্রথম এররটি খুঁজে বের করা
        const firstErrorKey = Object.keys(backendError)[0];
        const errorMessage = backendError[firstErrorKey];
        
        // এরর মেসেজ ক্লিন করা (অ্যারে হলে প্রথমটি নেওয়া)
        const cleanMessage = Array.isArray(errorMessage) ? errorMessage[0] : errorMessage;
        
        if (firstErrorKey === 'username' || firstErrorKey === 'email') {
          setError("This email address is already registered.");
        } else {
          setError(cleanMessage || "Registration failed. Please try again.");
        }
      } else {
        // যদি রেসপন্স না থাকে, তার মানে সার্ভার বা নেটওয়ার্ক সমস্যা
        setError("Network error or server is down. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Side Banner */}
      <div className="hidden lg:flex w-1/2 bg-indigo-600 p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40"></div>
        <div className="relative z-10 text-2xl font-bold italic tracking-wider">GradBirds</div>
        <div className="relative z-10">
          <h1 className="text-5xl font-black leading-tight mb-8">Start your journey to build a career</h1>
          <p className="text-indigo-100 text-lg font-medium">Growth & Management structure by GradBirds.</p>
        </div>
        <div className="relative z-10 text-sm text-indigo-200">© 2026 GradBirds. All rights reserved.</div>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Create Account</h2>
            <p className="text-gray-500 font-medium">Join GradBirds to start your learning journey.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium"
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium"
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="Minimum 8 characters" 
                  minLength="8" // ফ্রন্টএন্ড ভ্যালিডেশন
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium"
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-2 mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Creating Account..." : "Sign Up Now"} <ArrowRight size={20} />
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600 font-medium">
            Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;