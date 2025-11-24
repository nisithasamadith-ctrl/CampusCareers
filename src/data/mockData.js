export const JOBS = [
    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "TechCorp",
        location: "Remote",
        type: "Internship",
        salary: "$20/hr",
        postedDate: "2024-05-15",
        description: "We are looking for a passionate Frontend Developer Intern to join our team. You will work closely with our senior developers to build modern web applications.",
        requirements: [
            "Basic knowledge of HTML, CSS, and JavaScript",
            "Familiarity with React is a plus",
            "Eager to learn and work in a team",
            "Good communication skills"
        ]
    },
    {
        id: 2,
        title: "Junior UX Designer",
        company: "Creative Studio",
        location: "New York, NY",
        type: "Full-time",
        salary: "$60,000/yr",
        postedDate: "2024-05-10",
        description: "Join our creative team to design intuitive and beautiful user experiences. You will assist in user research, wireframing, and prototyping.",
        requirements: [
            "Portfolio demonstrating UI/UX skills",
            "Proficiency in Figma or Adobe XD",
            "Understanding of user-centered design principles",
            "Ability to take feedback and iterate"
        ]
    },
    {
        id: 3,
        title: "Marketing Intern",
        company: "GrowthHackerz",
        location: "San Francisco, CA",
        type: "Internship",
        salary: "$18/hr",
        postedDate: "2024-05-12",
        description: "Help us grow our brand! You will assist with social media management, content creation, and market research.",
        requirements: [
            "Strong writing and editing skills",
            "Familiarity with social media platforms",
            "Creative mindset",
            "Currently enrolled in a Marketing or related degree"
        ]
    },
    {
        id: 4,
        title: "Software Engineer (New Grad)",
        company: "Innovate Inc",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$90,000/yr",
        postedDate: "2024-05-01",
        description: "Start your career with us! We are hiring new graduates to work on our core platform. You will write clean, scalable code and participate in code reviews.",
        requirements: [
            "BS in Computer Science or related field",
            "Strong problem-solving skills",
            "Proficiency in Java, Python, or C++",
            "Knowledge of data structures and algorithms"
        ]
    },
    {
        id: 5,
        title: "Data Analyst Intern",
        company: "DataFlow",
        location: "Remote",
        type: "Internship",
        salary: "$22/hr",
        postedDate: "2024-05-18",
        description: "Dive into data! You will help clean, analyze, and visualize data to support business decisions.",
        requirements: [
            "Experience with SQL and Python/R",
            "Familiarity with data visualization tools (Tableau, PowerBI)",
            "Analytical mindset",
            "Attention to detail"
        ]
    }
];

export const USER = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    university: "State University",
    major: "Computer Science",
    graduationYear: 2025,
    skills: ["JavaScript", "React", "Python", "Git"],
    bio: "Aspiring software engineer with a passion for building web applications. Currently looking for summer internships."
};

// Mock student applications with detailed profiles for ranking
export const STUDENT_APPLICATIONS = {
    1: [ // Frontend Developer Intern at TechCorp
        {
            id: 1,
            studentName: "Sarah Chen",
            email: "sarah.chen@university.edu",
            university: "MIT",
            major: "Computer Science",
            graduationYear: 2025,
            gpa: 3.8,
            skills: ["JavaScript", "React", "TypeScript", "HTML", "CSS", "Git", "Tailwind"],
            experience: [
                "Built 3 React-based web applications for university projects",
                "Completed online course in Advanced React Patterns",
                "Contributed to open-source React component library"
            ],
            interests: ["Web Development", "UI/UX Design", "Open Source"],
            portfolio: "https://sarahchen.dev",
            appliedDate: "2024-05-16"
        },
        {
            id: 2,
            studentName: "Michael Rodriguez",
            email: "m.rodriguez@college.edu",
            university: "State University",
            major: "Information Systems",
            graduationYear: 2026,
            gpa: 3.4,
            skills: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
            experience: [
                "Created personal portfolio website",
                "Freelance web design for local businesses"
            ],
            interests: ["Web Design", "Graphic Design", "Entrepreneurship"],
            portfolio: "https://mrodriguez.com",
            appliedDate: "2024-05-17"
        },
        {
            id: 3,
            studentName: "Emily Watson",
            email: "emily.w@tech.edu",
            university: "Stanford",
            major: "Computer Science",
            graduationYear: 2025,
            gpa: 3.9,
            skills: ["JavaScript", "React", "Vue.js", "Node.js", "Python", "Git", "Docker"],
            experience: [
                "Frontend Engineering Intern at Google (Summer 2023)",
                "Lead developer for university's student portal redesign",
                "Published technical blog with 10k+ monthly readers"
            ],
            interests: ["Frontend Architecture", "Performance Optimization", "Developer Tools"],
            portfolio: "https://emilywatson.io",
            appliedDate: "2024-05-15"
        },
        {
            id: 4,
            studentName: "James Kim",
            email: "jkim@university.edu",
            university: "UC Berkeley",
            major: "Cognitive Science",
            graduationYear: 2026,
            gpa: 3.2,
            skills: ["HTML", "CSS", "JavaScript", "Basic React"],
            experience: [
                "Completed Web Development bootcamp",
                "Built simple to-do app with React"
            ],
            interests: ["Learning Programming", "Psychology", "Product Design"],
            portfolio: null,
            appliedDate: "2024-05-20"
        },
        {
            id: 5,
            studentName: "Priya Patel",
            email: "priya.patel@university.edu",
            university: "Carnegie Mellon",
            major: "Human-Computer Interaction",
            graduationYear: 2025,
            gpa: 3.7,
            skills: ["JavaScript", "React", "HTML", "CSS", "Figma", "User Research"],
            experience: [
                "UX/Frontend Intern at Microsoft (Summer 2023)",
                "Developed accessible React components for university library system",
                "Won 1st place in university hackathon"
            ],
            interests: ["Accessible Web Design", "Frontend Development", "User Experience"],
            portfolio: "https://priyapatel.design",
            appliedDate: "2024-05-16"
        }
    ],
    2: [ // Junior UX Designer at Creative Studio
        {
            id: 6,
            studentName: "Sophia Martinez",
            email: "sophia.m@artschool.edu",
            university: "Rhode Island School of Design",
            major: "Graphic Design",
            graduationYear: 2025,
            gpa: 3.6,
            skills: ["Figma", "Adobe XD", "Sketch", "User Research", "Prototyping", "UI Design"],
            experience: [
                "UX Design intern at local startup",
                "Redesigned university club website",
                "Created design system for student organization"
            ],
            interests: ["UI/UX Design", "User Experience", "Design Systems"],
            portfolio: "https://sophiamartinez.design",
            appliedDate: "2024-05-11"
        },
        {
            id: 7,
            studentName: "Oliver Brown",
            email: "oliver.b@design.edu",
            university: "Parsons",
            major: "Design and Technology",
            graduationYear: 2026,
            gpa: 3.8,
            skills: ["Figma", "Adobe Creative Suite", "Prototyping", "Wireframing"],
            experience: [
                "Freelance UI designer for mobile apps",
                "Won university design competition"
            ],
            interests: ["User Interface", "Mobile Design", "Typography"],
            portfolio: "https://oliverbrown.io",
            appliedDate: "2024-05-12"
        }
    ],
    3: [ // Marketing Intern at GrowthHackerz
        {
            id: 8,
            studentName: "Ava Johnson",
            email: "ava.j@marketing.edu",
            university: "Northwestern",
            major: "Marketing",
            graduationYear: 2025,
            gpa: 3.7,
            skills: ["Social Media Marketing", "Content Creation", "SEO", "Analytics", "Copywriting"],
            experience: [
                "Social media manager for student newspaper",
                "Marketing intern at local nonprofit",
                "Grew Instagram following from 500 to 5000"
            ],
            interests: ["Social Media", "Content Marketing", "Brand Strategy"],
            portfolio: null,
            appliedDate: "2024-05-13"
        }
    ],
    4: [ // Software Engineer (New Grad) at Innovate Inc
        {
            id: 9,
            studentName: "Liam Chen",
            email: "liam.chen@tech.edu",
            university: "Georgia Tech",
            major: "Computer Science",
            graduationYear: 2025,
            gpa: 3.9,
            skills: ["Java", "Python", "C++", "Algorithms", "Data Structures", "System Design"],
            experience: [
                "Software Engineering Intern at Amazon (Summer 2023)",
                "Teaching Assistant for Data Structures course",
                "Competed in ACM ICPC regional finals"
            ],
            interests: ["Backend Development", "Distributed Systems", "Algorithms"],
            portfolio: "https://liamchen.dev",
            appliedDate: "2024-05-02"
        },
        {
            id: 10,
            studentName: "Noah Williams",
            email: "noah.w@cs.edu",
            university: "University of Washington",
            major: "Computer Science",
            graduationYear: 2025,
            gpa: 3.6,
            skills: ["Python", "Java", "SQL", "Git", "Linux"],
            experience: [
                "Built full-stack web application for senior project",
                "Intern at local tech startup"
            ],
            interests: ["Software Development", "Web Development", "Cloud Computing"],
            portfolio: "https://noahwilliams.tech",
            appliedDate: "2024-05-03"
        }
    ],
    5: [ // Data Analyst Intern at DataFlow
        {
            id: 11,
            studentName: "Emma Davis",
            email: "emma.d@stats.edu",
            university: "UC Berkeley",
            major: "Statistics",
            graduationYear: 2026,
            gpa: 3.8,
            skills: ["Python", "R", "SQL", "Tableau", "PowerBI", "Excel", "Statistics"],
            experience: [
                "Data analysis intern at research lab",
                "Created dashboards for university athletics department",
                "Published research paper on statistical modeling"
            ],
            interests: ["Data Analysis", "Data Visualization", "Business Intelligence"],
            portfolio: null,
            appliedDate: "2024-05-19"
        },
        {
            id: 12,
            studentName: "Mason Taylor",
            email: "mason.t@data.edu",
            university: "University of Michigan",
            major: "Data Science",
            graduationYear: 2025,
            gpa: 3.5,
            skills: ["Python", "SQL", "Pandas", "Matplotlib", "Machine Learning"],
            experience: [
                "Completed several Kaggle competitions",
                "Data analyst for student consulting group"
            ],
            interests: ["Data Science", "Analytics", "Machine Learning"],
            portfolio: "https://masontaylor.github.io",
            appliedDate: "2024-05-20"
        }
    ]
};
