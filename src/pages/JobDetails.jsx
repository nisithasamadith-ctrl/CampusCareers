import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, ArrowLeft, CheckCircle } from 'lucide-react';
import { JOBS } from '../data/mockData';

const JobDetails = () => {
    const { id } = useParams();
    const job = JOBS.find(j => j.id === parseInt(id));
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [isApplied, setIsApplied] = useState(false);

    if (!job) {
        return <div className="text-center py-12">Job not found</div>;
    }

    const handleApply = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsApplied(true);
            setTimeout(() => setShowApplyModal(false), 2000);
        }, 1000);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <Link to="/jobs" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6">
                <ArrowLeft size={20} /> Back to Jobs
            </Link>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                            <p className="text-xl text-blue-600 font-medium">{job.company}</p>
                        </div>
                        <span className="bg-blue-50 text-blue-700 font-semibold px-4 py-1.5 rounded-full">
                            {job.type}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-6 text-gray-600 mb-8 border-b border-gray-100 pb-8">
                        <div className="flex items-center gap-2">
                            <MapPin size={20} className="text-gray-400" />
                            {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign size={20} className="text-gray-400" />
                            {job.salary}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={20} className="text-gray-400" />
                            Posted {job.postedDate}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About the Role</h2>
                            <p className="text-gray-600 leading-relaxed">{job.description}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                {job.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>

                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={() => setShowApplyModal(true)}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                        Apply Now
                    </button>
                </div>
            </div>

            {/* Application Modal */}
            {showApplyModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-200">
                        {isApplied ? (
                            <div className="text-center py-8">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle className="text-green-600" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Sent!</h3>
                                <p className="text-gray-500">Good luck! We'll be in touch soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleApply}>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Apply for {job.title}</h3>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input required type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input required type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Resume / CV</label>
                                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                                        <textarea rows="3" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowApplyModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetails;
