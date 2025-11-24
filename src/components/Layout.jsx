import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, User, Home, Heart, LayoutDashboard, ToggleLeft, ToggleRight, LogOut, LogIn } from 'lucide-react';
import clsx from 'clsx';
import { useApp } from '../context/AppContext';

const NavItem = ({ to, icon: Icon, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200",
                isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
            )}
        >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </Link>
    );
};

const Layout = () => {
    const { userRole, toggleRole, user, logout } = useApp();
    const isStudent = userRole === 'student';
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Navbar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Briefcase className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            CampusCareers
                        </span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <NavItem to="/" icon={Home} label="Home" />

                        {user && (
                            <>
                                {isStudent ? (
                                    <>
                                        <NavItem to="/jobs" icon={Briefcase} label="Jobs" />
                                        <NavItem to="/saved-jobs" icon={Heart} label="Saved" />
                                        <NavItem to="/profile" icon={User} label="Profile" />
                                    </>
                                ) : (
                                    <>
                                        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                                    </>
                                )}
                            </>
                        )}

                        <div className="w-px h-6 bg-gray-200 mx-2"></div>

                        {user ? (
                            <>
                                <button
                                    onClick={toggleRole}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mr-2"
                                    title="Switch Role"
                                >
                                    {isStudent ? <ToggleLeft size={24} /> : <ToggleRight size={24} className="text-blue-600" />}
                                    {isStudent ? 'Student' : 'Company'}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <LogOut size={20} /> Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                <LogIn size={20} /> Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
