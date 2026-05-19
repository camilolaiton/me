import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLang } from '../context/LangContext';
import '../css/Navigation.css';

const navItems = [
  { id: 'projects',        label: 'Work' },
  { id: 'publications',    label: 'Publications' },
  { id: 'work-experience', label: 'Experience' },
  { id: 'about',           label: 'About' },
  { id: 'github-activity', label: 'Activity' },
];

const LangToggle = () => {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        className={lang === 'en' ? 'active' : ''}
        onClick={() => setLang('en')}
      >EN</button>
      <button
        className={lang === 'es' ? 'active' : ''}
        onClick={() => setLang('es')}
      >ES</button>
    </div>
  );
};

const Navigation = ({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('');
  const [scrollPct, setScrollPct] = useState(0);
  const progressRef = useRef(null);
  const resumeFileName = 'DL Camilo Laiton - Resume.pdf';
  const resumeHref = `${process.env.PUBLIC_URL}/${encodeURIComponent(resumeFileName)}`;

  const sectionIds = useMemo(() => navItems.map(n => n.id), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${scrollPct}%`;
    }
  }, [scrollPct]);

  useEffect(() => {
    const observers = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [sectionIds]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <nav className="nav-bar">
        <div className="nav-inner">
          {/* Left: name */}
          <button className="nav-brand" onClick={scrollToTop} aria-label="Scroll to top">
            <span className="nav-brand-dot" aria-hidden="true" />
            <span className="nav-brand-name">Camilo Laiton</span>
          </button>

          {/* Center: nav links */}
          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  className={`nav-link${activeSection === item.id ? ' active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right: controls */}
          <div className="nav-controls">
            <LangToggle />
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <a
              href={resumeHref}
              className="resume-btn"
              download={resumeFileName}
            >
              Download CV
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
