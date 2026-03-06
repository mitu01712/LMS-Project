import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import api from '../api/axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ব্যাকএন্ডে লগইন রিকোয়েস্ট পাঠানো হচ্ছে
      // আপনার ব্যাকএন্ডে যদি ইমেইল দিয়ে লগইন সেট করা থাকে তবে 'email' ব্যবহার করুন
      const response = await api.post('token/', {
        username: formData.email, // Django SimpleJWT সাধারণত 'username' ফিল্ড আশা করে
        password: formData.password
      });

      if (response.status === 200) {
        // ১. টোকেনগুলো localStorage-এ সেভ করা
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        // ২. ইউজারের নাম বা অন্যান্য তথ্য সেভ করা (ঐচ্ছিক)
        localStorage.setItem('user_email', formData.email);

        console.log("Login Success!");
        navigate('/dashboard'); // লগইন সফল হলে ড্যাশবোর্ডে পাঠিয়ে দেবে
      }
    } catch (err) {
      console.error("Login Error:", err);
      
      if (err.response) {
        // ভুল পাসওয়ার্ড বা ইমেইল হলে ৪০১ এরর আসবে
        setError("Invalid email address or password. Please try again.");
      } else {
        setError("Network error or server is down.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* বাম পাশের ব্যানার (রেজিস্ট্রেশন পেজের মতোই) */}
      <div className="hidden lg:flex w-1/2 bg-indigo-600 p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40"></div>
        <div className="relative z-10 text-2xl font-bold italic tracking-wider">GradBirds</div>
        <div className="relative z-10">
          <h1 className="text-5xl font-black leading-tight mb-8">Welcome Back to GradBirds</h1>
          <p className="text-indigo-100 text-lg font-medium">Growth & Management structure by GradBirds.</p>
        </div>
        <div className="relative z-10 text-sm text-indigo-200">© 2026 GradBirds. All rights reserved.</div>
      </div>

      {/* লগইন ফর্ম */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Login</h2>
            <p className="text-gray-500 font-medium">Enter your details to access your account.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="••••••••" 
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
              {loading ? "Signing In..." : "Sign In"} <ArrowRight size={20} />
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600 font-medium">
            Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create a new account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;