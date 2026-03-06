import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, instructorOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="p-10 text-center">Checking authentication...</div>;
  }

  if (!user) {
    // লগইন করা না থাকলে লগইন পেজে পাঠিয়ে দাও
    return <Navigate to="/login" replace />;
  }

  // যদি শুধু ইন্সট্রাক্টরদের জন্য রুট হয় (ভবিষ্যতে রোল চেক করার জন্য এটি রাখা হয়েছে)
  // আপাতত আমরা শুধু লগইন চেক করছি
  return children;
};

export default ProtectedRoute;