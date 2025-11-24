import { useState } from "react";
import { Target, TrendingUp, AlertCircle, Lightbulb, Loader2 } from 'lucide-react';

/**
 * JobMatchAnalyzer Component
 * 
 * Allows students to analyze how well their profile matches a job posting.
 * Displays suitability score, strengths, gaps, and actionable recommendations.
 * 
 * @param {Object} studentProfile - Student data (name, skills, education, etc.)
 * @param {Object} jobDescription - Job posting data (title, requirements, etc.)
 * @param {Function} onEvaluate - Function to call for evaluation, returns Promise
 */
export default function JobMatchAnalyzer({ studentProfile, jobDescription, onEvaluate }) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleEvaluate = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await onEvaluate(studentProfile, jobDescription);
            setResult(response);
        } catch (err) {
            console.error("Evaluation error:", err);
            setError("Failed to analyze job match. Please try again.");
        }

        setLoading(false);
    };

    // Color coding for score
    const getScoreColor = (score) => {
        if (score >= 8) return 'text-green-600';
        if (score >= 6) return 'text-blue-600';
        if (score >= 4) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBgColor = (score) => {
        if (score >= 8) return 'bg-green-50';
        if (score >= 6) return 'bg-blue-50';
        if (score >= 4) return 'bg-yellow-50';
        return 'bg-red-50';
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Target className="text-white" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Role Fit Analysis</h2>
                    <p className="text-sm text-gray-600">See how well you match this position</p>
                </div>
            </div>

            <button
                onClick={handleEvaluate}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Analyzing Your Profile...
                    </>
                ) : (
                    <>
                        <Target size={20} />
                        Analyze My Fit
                    </>
                )}
            </button>

            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                </div>
            )}

            {result && (
                <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Suitability Score */}
                    <div className={`${getScoreBgColor(result.suitability_score)} rounded-xl p-5 border border-gray-200`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-700 text-sm mb-1">Match Score</h3>
                                <p className={`${getScoreColor(result.suitability_score)} font-bold text-4xl`}>
                                    {result.suitability_score}<span className="text-2xl">/10</span>
                                </p>
                            </div>
                            <div className={`w-20 h-20 rounded-full ${getScoreBgColor(result.suitability_score)} border-4 ${getScoreColor(result.suitability_score).replace('text-', 'border-')} flex items-center justify-center`}>
                                <span className={`${getScoreColor(result.suitability_score)} font-bold text-xl`}>
                                    {Math.round((result.suitability_score / 10) * 100)}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Strengths */}
                    {result.strengths && result.strengths.length > 0 && (
                        <div className="bg-white rounded-xl p-5 border border-gray-200">
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="text-green-600" size={20} />
                                <h3 className="font-bold text-gray-900">Your Strengths</h3>
                            </div>
                            <ul className="space-y-2">
                                {result.strengths.map((strength, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                                        <span className="text-sm">{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Gaps */}
                    {result.gaps && result.gaps.length > 0 && (
                        <div className="bg-white rounded-xl p-5 border border-gray-200">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertCircle className="text-orange-600" size={20} />
                                <h3 className="font-bold text-gray-900">Areas to Improve</h3>
                            </div>
                            <ul className="space-y-2">
                                {result.gaps.map((gap, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-orange-600 font-bold mt-0.5">!</span>
                                        <span className="text-sm">{gap}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Recommendations */}
                    {result.recommendations && result.recommendations.length > 0 && (
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 border border-indigo-200">
                            <div className="flex items-center gap-2 mb-3">
                                <Lightbulb className="text-indigo-600" size={20} />
                                <h3 className="font-bold text-gray-900">Recommendations</h3>
                            </div>
                            <ul className="space-y-2">
                                {result.recommendations.map((recommendation, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-indigo-600 font-bold mt-0.5">→</span>
                                        <span className="text-sm">{recommendation}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
