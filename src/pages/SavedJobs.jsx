import React from 'react';
import { useApp } from '../context/AppContext';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
    const { jobs, savedJobs } = useApp();

    const savedJobsList = jobs.filter(job => savedJobs.includes(job.id));

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Saved Jobs</h1>

            {savedJobsList.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedJobsList.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No saved jobs yet</h2>
                    <p className="text-gray-500 mb-6">Jobs you save will appear here for quick access.</p>
                    <Link
                        to="/jobs"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Browse Jobs
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SavedJobs;
