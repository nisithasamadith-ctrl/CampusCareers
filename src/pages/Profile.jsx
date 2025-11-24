import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, BookOpen, Award } from 'lucide-react';
import { USER } from '../data/mockData';

const Profile = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header / Banner */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end gap-6">
                            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                                    <User size={40} />
                                </div>
                            </div>
                            <div className="mb-1">
                                <h1 className="text-2xl font-bold text-gray-900">{USER.name}</h1>
                                <p className="text-gray-600">{USER.major} Student</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Edit Profile
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Sidebar Info */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail size={18} />
                                    <span className="text-sm">{USER.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <BookOpen size={18} />
                                    <span className="text-sm">{USER.university}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Award size={18} />
                                    <span className="text-sm">Class of {USER.graduationYear}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-gray-900 mb-3">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {USER.skills.map(skill => (
                                        <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                <h2 className="text-lg font-bold text-gray-900 mb-3">About Me</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {USER.bio}
                                </p>
                            </section>

                            <section>
                                <h2 className="text-lg font-bold text-gray-900 mb-3">Education</h2>
                                <div className="border-l-2 border-gray-200 pl-4 py-1">
                                    <h3 className="font-bold text-gray-900">{USER.university}</h3>
                                    <p className="text-gray-600">Bachelor of Science in {USER.major}</p>
                                    <p className="text-sm text-gray-500 mt-1">Expected Graduation: {USER.graduationYear}</p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-lg font-bold text-gray-900 mb-3">Applied Jobs</h2>
                                <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-100">
                                    <p className="text-gray-500">You haven't applied to any jobs yet.</p>
                                    <Link to="/jobs" className="text-blue-600 font-medium text-sm mt-2 inline-block hover:underline">
                                        Browse Jobs
                                    </Link>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
