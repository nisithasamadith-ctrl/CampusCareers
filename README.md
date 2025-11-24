# 🎓 Student Job App

A modern, feature-rich web application connecting students with part-time job opportunities. Built with React and Vite, featuring a sleek UI, user authentication, and comprehensive job management tools.

## ✨ Features

### For Students
- 🔍 **Job Search & Filtering** - Browse jobs with advanced filtering by location, category, and pay rate
- 💾 **Save Jobs** - Bookmark interesting opportunities for later review
- 📝 **Easy Applications** - Apply to jobs with a streamlined application process
- 👤 **Profile Management** - Manage personal information, skills, and application history
- 🔔 **Application Tracking** - Monitor the status of all your job applications

### For Employers
- 📊 **Company Dashboard** - Centralized hub for managing job postings
- ➕ **Post Jobs** - Create and publish job listings with detailed requirements
- 👥 **Application Management** - Review, filter, and manage applicant submissions
- 📈 **Application Analytics** - Track applicant numbers and application statuses

### Core Functionality
- 🔐 **Authentication System** - Secure login and signup with persistent sessions
- 🛡️ **Protected Routes** - Role-based access control for sensitive features
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth interactions

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/student-job-app.git
   cd student-job-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 🛠️ Tech Stack

- **Frontend Framework** - [React](https://reactjs.org/) (v18+)
- **Build Tool** - [Vite](https://vitejs.dev/)
- **Routing** - [React Router](https://reactrouter.com/)
- **Styling** - CSS with modern design principles
- **State Management** - React Context API
- **Code Quality** - ESLint

## 📁 Project Structure

```
student_job_app/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Layout.jsx     # Main app layout with navigation
│   │   ├── JobCard.jsx    # Job listing card component
│   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── Jobs.jsx       # Job listings page
│   │   ├── JobDetails.jsx # Individual job details
│   │   ├── SavedJobs.jsx  # User's saved jobs
│   │   ├── Profile.jsx    # User profile management
│   │   ├── CompanyDashboard.jsx  # Employer dashboard
│   │   ├── Login.jsx      # Login page
│   │   └── SignUp.jsx     # Registration page
│   ├── context/           # React Context for state management
│   │   └── AppContext.jsx # Global app state
│   ├── data/              # Mock data for development
│   ├── assets/            # Images, icons, and static files
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static public assets
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── package.json           # Project dependencies
```

## 🎯 Key Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page with app overview | Public |
| `/jobs` | Browse all job listings | Public |
| `/jobs/:id` | Detailed job information | Public |
| `/login` | User authentication | Public |
| `/signup` | New user registration | Public |
| `/saved-jobs` | User's bookmarked jobs | Protected |
| `/profile` | User profile and settings | Protected |
| `/dashboard` | Company dashboard | Protected |

## 🔐 Authentication

The app uses a context-based authentication system with:
- Local storage for session persistence
- Protected routes for authenticated-only pages
- User role management (Student/Employer)
- Automatic redirect to login for unauthorized access

## 🎨 Design Philosophy

- **Clean & Modern** - Minimalist design with focus on usability
- **Intuitive Navigation** - Clear information hierarchy
- **Responsive Layout** - Mobile-first approach
- **Accessibility** - WCAG compliant features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ by Nisitha Samadith

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for blazing fast build tool
- All contributors and supporters

---

**Found a bug?** [Open an issue](https://github.com/yourusername/student-job-app/issues)

**Want a feature?** [Request it here](https://github.com/yourusername/student-job-app/issues)
