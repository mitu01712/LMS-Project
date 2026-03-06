import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  CheckSquare, 
  UserCircle, 
  LogOut,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    alert("Logged out successfully!");
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20}/>, path: '/dashboard' },
    { name: 'Course Catalog', icon: <BookOpen size={20}/>, path: '/courses' }, 
    { name: 'My Learning', icon: <GraduationCap size={20}/>, path: '/my-courses' }, 
    { name: 'Assignments', icon: <CheckSquare size={20}/>, path: '/assignments' },
    { name: 'Profile', icon: <UserCircle size={20}/>, path: '/profile' },
    { name: 'Settings', icon: <Settings size={20}/>, path: '/settings' },
  ];

  return (
    <div className="h-full bg-white border-r border-gray-100 flex flex-col p-6 shadow-sm">
      {/* ব্র্যান্ড লোগো */}
      <div className="mb-10 px-2 flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black italic shadow-lg shadow-indigo-100">G</div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">GradBirds</h2>
      </div>

      {/* স্টুডেন্ট মেনু */}
      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-4">Main Menu</p>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-200 ${
              location.pathname === item.path 
              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
              : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* লগআউট সেকশন */}
      <div className="mt-auto pt-6 border-t border-gray-50">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;