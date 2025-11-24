import React from 'react';
import { MapPin, Clock, DollarSign, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import clsx from 'clsx';

const JobCard = ({ job }) => {
    const { savedJobs, toggleSaveJob, userRole } = useApp();
    const isSaved = savedJobs.includes(job.id);
    const isStudent = userRole === 'student';

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 group relative">
            {isStudent && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleSaveJob(job.id);
                    }}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-50 transition-colors z-10"
                >
                    <Heart
                        size={20}
                        className={clsx(
                            "transition-colors",
                            isSaved ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
                        )}
                    />
                </button>
            )}

            <div className="flex justify-between items-start mb-4 pr-12">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                    </h3>
                    <p className="text-gray-600 font-medium">{job.company}</p>
                </div>
                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {job.type}
                </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {job.location}
                </div>
                <div className="flex items-center gap-1">
                    <DollarSign size={16} />
                    {job.salary}
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {job.postedDate}
                </div>
            </div>

            <Link
                to={`/jobs/${job.id}`}
                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
                View Details <ArrowRight size={16} />
            </Link>
        </div>
    );
};

export default JobCard;
