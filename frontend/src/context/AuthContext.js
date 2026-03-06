import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // টোকেন থাকলে ইউজারের ডাটা ফেচ করা (ঐচ্ছিক কিন্তু ভালো)
            // আপাতত আমরা শুধু টোকেন চেক করছি
            setUser({ loggedIn: true });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('accounts/login/', { email, password });
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            setUser({ loggedIn: true });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.detail || "Login failed" };
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};