import React from 'react';
import { Icon } from '@iconify/react';
import '../css/RecruiterSnapshot.css';

const RecruiterSnapshot = ({ metrics, skills, socialInfo }) => {
  const resumeFileName = 'DL Camilo Laiton - Resume.pdf';
  const resumeHref = `${process.env.PUBLIC_URL}/${encodeURIComponent(resumeFileName)}`;

  const topSkills = (skills || []).slice(0, 8).map(skill => skill.name).filter(Boolean);
  const displayMetrics = (metrics || []).slice(0, 4);

  const linkedInUrl = socialInfo?.find(s => s.name?.toLowerCase() === 'linkedin')?.url;
  const githubUrl = socialInfo?.find(s => s.name?.toLowerCase() === 'github')?.url;

  return (
    <section className="recruiter-snapshot" id="recruiter-snapshot">
      <div className="container">
        <div className="snapshot-header">
          <div className="snapshot-kicker-row">
            <span className="sec-num">§00A</span>
            <span className="snapshot-kicker-line" aria-hidden="true" />
            <span className="snapshot-kicker-label">Recruiter Snapshot</span>
          </div>
          <h2 className="snapshot-title">
            Fast scan for <span className="snapshot-title-accent">hiring teams</span>.
          </h2>
          <p className="snapshot-copy">
            End-to-end computer vision engineer for large-scale imaging systems: research, architecture,
            cloud pipelines, and production delivery.
          </p>
        </div>

        <div className="snapshot-grid">
          <article className="snapshot-card">
            <h3>Best-fit roles</h3>
            <ul>
              <li>Computer Vision Engineer</li>
              <li>Applied AI Engineer</li>
              <li>Machine Learning Engineer (Imaging)</li>
            </ul>
          </article>

          <article className="snapshot-card">
            <h3>Core stack</h3>
            <div className="snapshot-tags">
              {topSkills.map((skill) => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </article>

          <article className="snapshot-card">
            <h3>Impact snapshot</h3>
            <div className="snapshot-metrics">
              {displayMetrics.map((metric) => (
                <div key={`${metric.value}-${metric.label}`} className="snapshot-metric">
                  <span className="snapshot-metric-value">{metric.value}</span>
                  <span className="snapshot-metric-label">{metric.label}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="snapshot-card">
            <h3>Quick links</h3>
            <div className="snapshot-links">
              <a href={resumeHref} download={resumeFileName} className="snapshot-link">
                <Icon icon="bi:download" height={14} />
                Download CV
              </a>
              {linkedInUrl && (
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="snapshot-link">
                  <Icon icon="akar-icons:linkedin-fill" height={14} />
                  LinkedIn
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="snapshot-link">
                  <Icon icon="akar-icons:github-fill" height={14} />
                  GitHub
                </a>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default RecruiterSnapshot;
