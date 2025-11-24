import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Users, Eye, Trash2 } from 'lucide-react';

const CompanyDashboard = () => {
    const { jobs, addJob } = useApp();
    const [showPostModal, setShowPostModal] = useState(false);

    // Filter jobs to show only "my" jobs (simulated by showing all for now, or could filter by a mock company ID)
    // For this MVP, we'll assume the user is "TechCorp"
    const myJobs = jobs.filter(job => job.company === "TechCorp" || job.isNew);

    const [newJob, setNewJob] = useState({
        title: '',
        company: 'TechCorp',
        location: '',
        type: 'Full-time',
        salary: '',
        description: '',
        requirements: ''
    });

    const handlePostJob = (e) => {
        e.preventDefault();
        addJob({
            ...newJob,
            requirements: newJob.requirements.split('\n').filter(r => r.trim() !== ''),
            isNew: true
        });
        setShowPostModal(false);
        setNewJob({
            title: '',
            company: 'TechCorp',
            location: '',
            type: 'Full-time',
            salary: '',
            description: '',
            requirements: ''
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage your job postings and applications</p>
                </div>
                <button
                    onClick={() => setShowPostModal(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
                >
                    <Plus size={20} /> Post a Job
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-700">Job Title</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Type</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Posted Date</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Applicants</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {myJobs.map(job => (
                                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{job.title}</div>
                                        <div className="text-sm text-gray-500">{job.location}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                            {job.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{job.postedDate}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Users size={16} />
                                            <span>{Math.floor(Math.random() * 20) + 1}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-3">
                                            <button className="text-gray-400 hover:text-blue-600 transition-colors" title="View">
                                                <Eye size={18} />
                                            </button>
                                            <button className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {myJobs.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        You haven't posted any jobs yet.
                    </div>
                )}
            </div>

            {/* Post Job Modal */}
            {showPostModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl p-8 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h2>

                        <form onSubmit={handlePostJob} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newJob.title}
                                        onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newJob.type}
                                        onChange={e => setNewJob({ ...newJob, type: e.target.value })}
                                    >
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Internship</option>
                                        <option>Contract</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Remote, New York"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newJob.location}
                                        onChange={e => setNewJob({ ...newJob, location: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. $80k - $100k"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newJob.salary}
                                        onChange={e => setNewJob({ ...newJob, salary: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newJob.description}
                                    onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (one per line)</label>
                                <textarea
                                    required
                                    rows="4"
                                    placeholder="- Bachelor's degree&#10;- 3+ years experience"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newJob.requirements}
                                    onChange={e => setNewJob({ ...newJob, requirements: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPostModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                                >
                                    Post Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyDashboard;
