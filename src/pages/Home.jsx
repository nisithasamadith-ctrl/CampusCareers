import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { JOBS } from '../data/mockData';
import JobCard from '../components/JobCard';

const Home = () => {
    const featuredJobs = JOBS.slice(0, 3);

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-16 px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                    Find Your Dream <span className="text-blue-600">Internship</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                    Connect with top companies and kickstart your career. The best opportunities for students, all in one place.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/jobs"
                        className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
                    >
                        <Search size={20} /> Browse Jobs
                    </Link>
                    <Link
                        to="/profile"
                        className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Update Profile
                    </Link>
                </div>
            </section>

            {/* Featured Jobs */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Featured Opportunities</h2>
                        <p className="text-gray-500 mt-1">Hand-picked jobs just for you</p>
                    </div>
                    <Link to="/jobs" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                        View all <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
