import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Users, Eye, Trash2, Award, TrendingUp } from 'lucide-react';
import { STUDENT_APPLICATIONS } from '../data/mockData';

const CompanyDashboard = () => {
    const { jobs, addJob } = useApp();
    const [showPostModal, setShowPostModal] = useState(false);
    const [viewingCandidates, setViewingCandidates] = useState(null); // null or jobId

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

    // Candidate Ranking Algorithm
    const rankCandidate = (student, job) => {
        let score = 0;
        let reasons = [];

        // 1. Skills Match (40% weight - 4 points max)
        const jobRequirementsText = job.requirements.join(' ').toLowerCase();
        const skillMatches = student.skills.filter(skill =>
            jobRequirementsText.includes(skill.toLowerCase())
        );
        const skillScore = Math.min((skillMatches.length / student.skills.length) * 4, 4);
        score += skillScore;

        if (skillMatches.length > 3) {
            reasons.push(`Strong skills alignment with ${skillMatches.length} relevant skills`);
        } else if (skillMatches.length > 1) {
            reasons.push(`Good skills match with ${skillMatches.length} relevant skills`);
        } else if (skillMatches.length === 1) {
            reasons.push(`Limited skills overlap, only ${skillMatches.length} matching skill`);
        } else {
            reasons.push(`Skills don't match job requirements closely`);
        }

        // 2. Experience Relevance (30% weight - 3 points max)
        const experienceKeywords = ['intern', 'developer', 'engineering', 'built', 'created', 'developed'];
        const relevantExperience = student.experience.filter(exp =>
            experienceKeywords.some(keyword => exp.toLowerCase().includes(keyword))
        );
        const expScore = Math.min((relevantExperience.length / Math.max(student.experience.length, 1)) * 3, 3);
        score += expScore;

        if (student.experience.some(exp => exp.toLowerCase().includes('google') || exp.toLowerCase().includes('microsoft'))) {
            score += 0.5;
            reasons.push(`Previous experience at top-tier companies`);
        } else if (relevantExperience.length >= 2) {
            reasons.push(`Solid relevant experience with ${relevantExperience.length} projects`);
        } else if (relevantExperience.length === 1) {
            reasons.push(`Some relevant experience but limited portfolio`);
        } else {
            reasons.push(`Limited relevant work experience`);
        }

        // 3. Interest Alignment (15% weight - 1.5 points max)
        const jobTitle = job.title.toLowerCase();
        const matchingInterests = student.interests.filter(interest =>
            jobTitle.includes(interest.toLowerCase().split(' ')[0])
        );
        const interestScore = matchingInterests.length > 0 ? 1.5 : 0.5;
        score += interestScore;

        if (matchingInterests.length > 0) {
            reasons.push(`Career interests align well with the role`);
        }

        // 4. Education Quality (15% weight - 1.5 points max)
        const topUniversities = ['MIT', 'Stanford', 'Carnegie Mellon', 'UC Berkeley'];
        const educationScore = topUniversities.includes(student.university) ? 1.5 : 1;
        score += educationScore;

        if (student.gpa >= 3.7) {
            score += 0.5;
            reasons.push(`Excellent academic performance (GPA: ${student.gpa})`);
        } else if (student.gpa >= 3.5) {
            reasons.push(`Strong academic performance (GPA: ${student.gpa})`);
        }

        // Normalize to 1-10 scale and round to 1 decimal
        const finalScore = Math.min(Math.round(score * 10) / 10, 10);

        // Create explanation (max 2-3 sentences)
        const explanation = reasons.slice(0, 2).join('. ') + '.';

        return {
            score: finalScore,
            explanation,
            details: reasons
        };
    };

    // Get ranked candidates for a job
    const getRankedCandidates = (jobId) => {
        const applicants = STUDENT_APPLICATIONS[jobId] || [];
        const job = jobs.find(j => j.id === jobId);

        if (!job) return [];

        return applicants
            .map(student => ({
                ...student,
                ranking: rankCandidate(student, job)
            }))
            .sort((a, b) => b.ranking.score - a.ranking.score);
    };

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

    // Get score color based on ranking
    const getScoreColor = (score) => {
        if (score >= 8) return 'text-green-600 bg-green-50';
        if (score >= 6) return 'text-blue-600 bg-blue-50';
        if (score >= 4) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
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
                            {myJobs.map(job => {
                                const applicantCount = STUDENT_APPLICATIONS[job.id]?.length || 0;
                                return (
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
                                                <span>{applicantCount}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-3">
                                                {applicantCount > 0 && (
                                                    <button
                                                        onClick={() => setViewingCandidates(job.id)}
                                                        className="text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1 font-medium text-sm"
                                                        title="View Ranked Candidates"
                                                    >
                                                        <Award size={18} />
                                                        <span>Rank</span>
                                                    </button>
                                                )}
                                                <button className="text-gray-400 hover:text-blue-600 transition-colors" title="View">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {myJobs.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        You haven't posted any jobs yet.
                    </div>
                )}
            </div>

            {/* Ranked Candidates Modal */}
            {viewingCandidates && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-4xl p-8 relative max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <Award className="text-purple-600" size={28} />
                                    Ranked Candidates
                                </h2>
                                <p className="text-gray-500 mt-1">
                                    {jobs.find(j => j.id === viewingCandidates)?.title}
                                </p>
                            </div>
                            <button
                                onClick={() => setViewingCandidates(null)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            {getRankedCandidates(viewingCandidates).map((candidate, index) => (
                                <div
                                    key={candidate.id}
                                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-start gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                                    #{index + 1}
                                                </div>
                                                <TrendingUp
                                                    size={16}
                                                    className={index === 0 ? 'text-green-500 mt-1' : 'text-gray-400 mt-1'}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">{candidate.studentName}</h3>
                                                <p className="text-sm text-gray-600">{candidate.university} • {candidate.major}</p>
                                                <p className="text-xs text-gray-500 mt-1">GPA: {candidate.gpa} • Graduating {candidate.graduationYear}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-3xl font-bold ${getScoreColor(candidate.ranking.score)} px-4 py-2 rounded-lg`}>
                                                {candidate.ranking.score}/10
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Match Score</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg italic">
                                            {candidate.ranking.explanation}
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <h4 className="font-semibold text-gray-700 mb-2">Skills</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {candidate.skills.map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-700 mb-2">Interests</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {candidate.interests.map((interest, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-medium"
                                                    >
                                                        {interest}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="font-semibold text-gray-700 mb-2 text-sm">Experience</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            {candidate.experience.map((exp, idx) => (
                                                <li key={idx} className="flex gap-2">
                                                    <span className="text-gray-400">•</span>
                                                    <span>{exp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                        <div className="text-xs text-gray-500">
                                            Applied: {candidate.appliedDate}
                                        </div>
                                        {candidate.portfolio && (
                                            <a
                                                href={candidate.portfolio}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                            >
                                                View Portfolio →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {getRankedCandidates(viewingCandidates).length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    No applicants yet for this position.
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <button
                                onClick={() => setViewingCandidates(null)}
                                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
