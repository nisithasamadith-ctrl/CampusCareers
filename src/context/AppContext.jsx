import React, { createContext, useContext, useState, useEffect } from 'react';
import { JOBS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage if available, otherwise use defaults
  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem('userRole');
    return saved || 'student';
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('jobs');
    return saved ? JSON.parse(saved) : JOBS;
  });

  const [savedJobs, setSavedJobs] = useState(() => {
    const saved = localStorage.getItem('savedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const toggleRole = () => {
    setUserRole(prev => prev === 'student' ? 'company' : 'student');
  };

  const login = (email, password) => {
    // Simulate login
    const mockUser = {
      id: 1,
      name: "Alex Johnson",
      email: email,
      role: userRole
    };
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  const addJob = (newJob) => {
    const jobWithId = {
      ...newJob,
      id: Date.now(), // Use timestamp for unique ID
      postedDate: new Date().toISOString().split('T')[0],
      type: newJob.type || 'Full-time'
    };
    setJobs([jobWithId, ...jobs]);
  };

  return (
    <AppContext.Provider value={{
      userRole,
      toggleRole,
      jobs,
      addJob,
      savedJobs,
      toggleSaveJob,
      user,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
