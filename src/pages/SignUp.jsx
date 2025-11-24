import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserPlus } from 'lucide-react';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useApp();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // For MVP, signup just logs you in
        login(email, password);
        navigate('/');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="text-blue-600" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-500 mt-2">Join us to find your dream job</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            required
                            type="email"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            required
                            type="password"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
