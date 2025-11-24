/**
 * AI Service for Job Match Evaluation
 * 
 * This service evaluates how well a student's profile matches a job description.
 * Currently uses a mock implementation that simulates AI responses.
 * 
 * To integrate with a real AI API (OpenAI, Gemini, etc.):
 * 1. Replace the mock implementation with actual API calls
 * 2. Use the SYSTEM_PROMPT below as your AI model's system prompt
 * 3. Send studentProfile and jobDescription as the user message
 */

// System prompt for AI model (use this when integrating real AI)
const SYSTEM_PROMPT = `
Task:
Evaluate how well a student's profile matches a job description. Do not modify or rewrite the student's profile or the job description. Only assess.

You must return a JSON response with the following fields:

{
  "suitability_score": 0,
  "strengths": [],
  "gaps": [],
  "recommendations": []
}

Instructions:

Suitability Score (1–10)
Rate the match between the student's profile and the job description.

Strengths
List the student's strongest matching areas (skills, experience, education, soft skills).

Gaps
Identify missing or weak areas where the student does not meet job requirements.

Recommendations
Give short, actionable advice (courses, skills to learn, experience to gain).

Rules:
- Do not change or add content to the student's profile.
- Do not change the job description.
- Respond only in the JSON format above.
`;

/**
 * Mock evaluation function
 * Simulates AI evaluation with realistic responses based on student profile and job requirements
 */
const mockEvaluate = (studentProfile, jobDescription) => {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            // Extract skills from job requirements
            const jobSkills = extractSkillsFromJob(jobDescription);
            const studentSkills = studentProfile.skills || [];

            // Calculate matches
            const matchingSkills = studentSkills.filter(skill =>
                jobSkills.some(jobSkill =>
                    skill.toLowerCase().includes(jobSkill.toLowerCase()) ||
                    jobSkill.toLowerCase().includes(skill.toLowerCase())
                )
            );

            const missingSkills = jobSkills.filter(jobSkill =>
                !studentSkills.some(skill =>
                    skill.toLowerCase().includes(jobSkill.toLowerCase()) ||
                    jobSkill.toLowerCase().includes(skill.toLowerCase())
                )
            );

            // Calculate suitability score
            const skillMatchRatio = jobSkills.length > 0
                ? matchingSkills.length / jobSkills.length
                : 0.5;

            const baseScore = Math.round(skillMatchRatio * 10);
            const suitabilityScore = Math.min(10, Math.max(3, baseScore + (studentProfile.gpa ? 1 : 0)));

            // Build response
            const response = {
                suitability_score: suitabilityScore,
                strengths: buildStrengths(matchingSkills, studentProfile, jobDescription),
                gaps: buildGaps(missingSkills, studentProfile, jobDescription),
                recommendations: buildRecommendations(missingSkills, suitabilityScore)
            };

            resolve(response);
        }, 1500); // 1.5 second delay to simulate API call
    });
};

// Helper function to extract skills from job description
const extractSkillsFromJob = (jobDescription) => {
    const commonSkills = [
        'JavaScript', 'React', 'Python', 'Java', 'C++', 'TypeScript',
        'Node.js', 'Git', 'HTML', 'CSS', 'SQL', 'Figma', 'Adobe XD',
        'UI/UX', 'Design', 'Marketing', 'Communication', 'Data Analysis',
        'Tableau', 'PowerBI', 'R', 'Docker', 'Vue.js', 'Angular'
    ];

    const requirements = jobDescription.requirements || [];
    const description = jobDescription.description || '';
    const fullText = [...requirements, description].join(' ');

    return commonSkills.filter(skill =>
        fullText.toLowerCase().includes(skill.toLowerCase())
    );
};

// Build strengths list
const buildStrengths = (matchingSkills, studentProfile, jobDescription) => {
    const strengths = [];

    if (matchingSkills.length > 0) {
        strengths.push(`Strong technical skills: ${matchingSkills.slice(0, 3).join(', ')}`);
    }

    if (studentProfile.major && jobDescription.requirements) {
        const majorMentioned = jobDescription.requirements.some(req =>
            req.toLowerCase().includes(studentProfile.major.toLowerCase())
        );
        if (majorMentioned) {
            strengths.push(`${studentProfile.major} degree aligns well with role requirements`);
        }
    }

    if (studentProfile.university) {
        strengths.push(`Currently enrolled at ${studentProfile.university}`);
    }

    if (studentProfile.bio && studentProfile.bio.toLowerCase().includes('passion')) {
        strengths.push('Demonstrates genuine passion for the field');
    }

    return strengths.slice(0, 4);
};

// Build gaps list
const buildGaps = (missingSkills, studentProfile, jobDescription) => {
    const gaps = [];

    if (missingSkills.length > 0) {
        gaps.push(`Missing key skills: ${missingSkills.slice(0, 3).join(', ')}`);
    }

    if (!studentProfile.experience || studentProfile.experience.length === 0) {
        gaps.push('Limited professional experience in the field');
    }

    if (!studentProfile.portfolio) {
        gaps.push('No portfolio or project showcase available');
    }

    return gaps.slice(0, 4);
};

// Build recommendations list
const buildRecommendations = (missingSkills, score) => {
    const recommendations = [];

    if (missingSkills.length > 0) {
        recommendations.push(`Build projects using: ${missingSkills.slice(0, 2).join(', ')}`);
        recommendations.push(`Take online courses to learn ${missingSkills[0]}`);
    }

    recommendations.push('Create a portfolio website to showcase your work');

    if (score < 7) {
        recommendations.push('Gain practical experience through internships or freelance projects');
        recommendations.push('Contribute to open-source projects to build your skills');
    }

    return recommendations.slice(0, 5);
};

/**
 * Main evaluation function
 * @param {Object} studentProfile - Student profile object with skills, education, etc.
 * @param {Object} jobDescription - Job object with title, requirements, description, etc.
 * @returns {Promise<Object>} Evaluation result with score, strengths, gaps, recommendations
 */
export const evaluateJobMatch = async (studentProfile, jobDescription) => {
    // TODO: Replace with real AI API call
    // Example using OpenAI:
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${API_KEY}`
    //     },
    //     body: JSON.stringify({
    //         model: 'gpt-4',
    //         messages: [
    //             { role: 'system', content: SYSTEM_PROMPT },
    //             { role: 'user', content: JSON.stringify({ studentProfile, jobDescription }) }
    //         ]
    //     })
    // });
    // return await response.json();

    // Mock implementation for now
    return await mockEvaluate(studentProfile, jobDescription);
};

export { SYSTEM_PROMPT }; // Export for reference
