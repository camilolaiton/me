import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Publications from './components/Publications';
import BlogPosts from './components/BlogPosts';
import GitHubActivity from './components/GitHubActivity';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

const App = () => {
  const [sharedData, setSharedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  const loadProfileData = async () => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/personal_information.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSharedData(data);
      document.title = data.name || 'Camilo Laiton Portfolio';
      setLoading(false);
    } catch (error) {
      console.error('Error loading profile data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
    document.body.setAttribute('data-theme', 'light');
  }, []);

  if (loading) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--color-background)',
        color: 'var(--color-text-primary)',
        fontSize: 'var(--font-size-lg)',
        fontWeight: 'var(--font-weight-medium)'
      }}>
        Loading portfolio...
      </div>
    );
  }

  return (
    <div className="App">
      <Navigation />

      {/* 1 — Hero */}
      <Header
        name={sharedData.name}
        socialInfo={sharedData.social}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 2 — GitHub Activity */}
      <GitHubActivity isDark={theme === 'dark'} />

      {/* 3 — About */}
      <About
        languages={sharedData.speakLanguages}
        honors={sharedData.honors}
        certificates={sharedData.certificates}
      />

      {/* 4 — Featured Projects */}
      <Projects />

      {/* 5 — Publications */}
      <Publications researchInfo={sharedData.research} />

      {/* 6 — Blog */}
      <BlogPosts />

      <Footer
        socialInfo={sharedData.social}
        name={sharedData.name}
      />
    </div>
  );
};

export default App;
