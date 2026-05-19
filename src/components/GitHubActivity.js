import React, { useState, useEffect, useMemo } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../css/GitHubActivity.css';

const GITHUB_USERNAME = 'camilolaiton';
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

const calendarTheme = {
  dark:  ['#1a1410', '#78350f', '#92400e', '#b45309', '#d97706'],
  light: ['#e8e1d2', '#fde68a', '#fbbf24', '#f59e0b', '#d97706'],
};

const computeStats = (contributions) => {
  if (!contributions || contributions.length === 0) return null;
  const total = contributions.reduce((s, d) => s + d.count, 0);
  const active = contributions.filter(d => d.count > 0).length;

  let streak = 0, maxStreak = 0, cur = 0;
  for (const d of contributions) {
    if (d.count > 0) { cur++; if (cur > maxStreak) maxStreak = cur; }
    else cur = 0;
  }
  streak = maxStreak;

  const busiest = contributions.reduce((m, d) => d.count > m.count ? d : m, { count: 0, date: '' });

  return { total, active, streak, busiest };
};

const GitHubActivity = ({ isDark }) => {
  const [state, setState] = useState({ status: 'loading', data: null });
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((json) => setState({ status: 'ok', data: json.contributions }))
      .catch(() => setState({ status: 'error', data: null }));
  }, []);

  const stats = useMemo(() => computeStats(state.data), [state.data]);

  if (state.status === 'error') return null;

  return (
    <motion.section
      className="github-activity"
      id="github-activity"
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
    >
      <div className="container">
        <div className="gh-header-block">
          <div className="gh-kicker-row">
            <span className="sec-num">§07</span>
            <span className="gh-kicker-line" aria-hidden="true" />
            <span className="gh-kicker-label">GitHub Commits</span>
          </div>
          <h2 className="gh-hero-title">
            What the last year of <span className="gh-title-accent">building</span> looks like.
          </h2>
          <p className="gh-hero-copy">
            Pulled live from <span className="gh-inline-url">github.com/camilolaiton</span> - pipelines, models,
            and one-off experiments. <em>Just <span className="gh-title-accent">open-sourced contributions,</span> <u>no private repos included.</u></em>
          </p>
        </div>

        <div className="gh-card">
          {/* Card header */}
          <div className="gh-card-header">
            <span className="gh-card-label">Live contributions</span>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gh-profile-link"
            >
              View profile ↗
            </a>
          </div>

          {/* Calendar */}
          <div className="gh-calendar-wrapper">
            {state.status === 'ok' && (
              <GitHubCalendar
                username={GITHUB_USERNAME}
                data={state.data}
                theme={calendarTheme}
                colorScheme={isDark ? 'dark' : 'light'}
                blockSize={13}
                blockMargin={4}
                fontSize={13}
              />
            )}
            {state.status === 'loading' && (
              <div className="gh-skeleton" />
            )}
          </div>

          {/* Stats row */}
          {stats && (
            <div className="gh-stats">
              <div className="gh-stat">
                <span className="gh-stat-value">{stats.total.toLocaleString()}</span>
                <span className="gh-stat-label">Contributions</span>
              </div>
              <div className="gh-stat">
                <span className="gh-stat-value">{stats.active}</span>
                <span className="gh-stat-label">Active days</span>
              </div>
              <div className="gh-stat">
                <span className="gh-stat-value">{stats.streak}</span>
                <span className="gh-stat-label">Longest streak</span>
              </div>
              <div className="gh-stat">
                <span className="gh-stat-value">{stats.busiest.count}</span>
                <span className="gh-stat-label">Busiest day</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default GitHubActivity;
