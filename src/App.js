import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navigation from './components/Navigation';
import Header from './components/Header';
// import RecruiterSnapshot from './components/RecruiterSnapshot';
import FeaturedOutputs from './components/FeaturedOutputs';
import Projects from './components/Projects';
import Publications from './components/Publications';
import WorkExperience from './components/WorkExperience';
import About from './components/About';
import Honors from './components/Honors';
import GitHubActivity from './components/GitHubActivity';
import BlogPosts from './components/BlogPosts';
import Footer from './components/Footer';

const App = () => {
  const [sharedData, setSharedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  const loadProfileData = async () => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/personal_information.json`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
    document.body.setAttribute('data-theme', 'dark');
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--paper)',
        color: 'var(--ink)',
        fontFamily: 'var(--f-mono)',
        fontSize: '13px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        Loading…
      </div>
    );
  }

  return (
    <div className="App">
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      {/* §00 — Hero */}
      <Header
        name={sharedData.name}
        socialInfo={sharedData.social}
        metrics={sharedData.metrics}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* §00A — Recruiter Snapshot */}
      {/* <RecruiterSnapshot
        metrics={sharedData.metrics}
        skills={sharedData.skills}
        socialInfo={sharedData.social}
      /> */}

      {/* §01 — Featured Outputs */}
      <FeaturedOutputs />

      {/* §02 — Projects */}
      <Projects />

      {/* §03 — Publications */}
      <Publications researchInfo={sharedData.research} />

      {/* §04 — Work Experience */}
      <WorkExperience workInfo={sharedData.projects} />

      {/* §05 — About */}
      <About />

      {/* §06 — Honors, Certificates, Languages */}
      <Honors
        honors={sharedData.honors}
        certificates={sharedData.certificates}
        languages={sharedData.speakLanguages}
      />

      {/* §07 — GitHub Activity */}
      <GitHubActivity isDark={theme === 'dark'} />

      {/* §08 — Blog */}
      <BlogPosts />

      <Footer
        socialInfo={sharedData.social}
        name={sharedData.name}
      />
    </div>
  );
};

export default App;
