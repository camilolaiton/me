import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../css/GitHubActivity.css';

const GITHUB_USERNAME = 'camilolaiton';
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

const calendarTheme = {
  dark:  ['#1a1410', '#78350f', '#92400e', '#b45309', '#d97706'],
  light: ['#f3ede4', '#fde68a', '#fbbf24', '#f59e0b', '#d97706'],
};

const GitHubActivity = ({ isDark }) => {
  const [state, setState] = useState({ status: 'loading', data: null });
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('fetch failed');
        return res.json();
      })
      .then((json) => setState({ status: 'ok', data: json.contributions }))
      .catch(() => setState({ status: 'error', data: null }));
  }, []);

  // Hide section silently on error — same pattern as BlogPosts
  if (state.status === 'error') return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.section
      className="github-activity"
      id="github-activity"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="container">
        <div className="github-section-header">
          <span className="section-eyebrow">Activity</span>
          <h1 className="github-section-title">GitHub Activity</h1>
          <p className="github-section-subtitle">
            Open-source contributions over the past year
          </p>
        </div>

        <div className="github-calendar-wrapper">
          {state.status === 'ok' && (
            <GitHubCalendar
              username={GITHUB_USERNAME}
              data={state.data}
              theme={calendarTheme}
              colorScheme={isDark ? 'dark' : 'light'}
              blockSize={14}
              blockMargin={4}
              fontSize={14}
            />
          )}
        </div>

        <div className="github-cta">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-cta__btn"
          >
            View GitHub Profile →
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default GitHubActivity;
