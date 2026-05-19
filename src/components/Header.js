import React from 'react';
import { motion } from 'framer-motion';
import '../css/Header.css';
import CamiloLaiton_360x257 from '../imgs/CamiloLaiton_360x257.jpg';
import CamiloLaiton_540x386 from '../imgs/CamiloLaiton_540x386.jpg';
import CamiloLaiton_1024x732 from '../imgs/CamiloLaiton_1024x732.jpg';
import { Icon } from '@iconify/react';

const MetricTile = ({ value, label, highlight }) => (
  <div className="metric-tile">
    <span className={`metric-value${highlight ? ' metric-value--highlight' : ''}`}>
      {value}
    </span>
    <span className="metric-label">{label}</span>
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
};

const Header = ({ name, socialInfo, metrics }) => {
  const displayName = name || 'Camilo Laiton';
  const resumeFileName = 'DL Camilo Laiton - Resume.pdf';
  const resumeHref = `${process.env.PUBLIC_URL}/${encodeURIComponent(resumeFileName)}`;
  const emailContact = socialInfo
    ?.find(s => s.name?.toLowerCase() === 'email')
    ?.url?.replace('mailto:', '');
  const linkedInUrl = socialInfo
    ?.find(s => s.name?.toLowerCase() === 'linkedin')
    ?.url;
  const introHref = emailContact
    ? `mailto:${emailContact}?subject=15-minute%20intro`
    : linkedInUrl;

  return (
    <section className="hero" id="header">
      <div className="hero-inner">
        {/* Portrait column */}
        <motion.div
          className="hero-portrait"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <img
            src={CamiloLaiton_1024x732}
            srcSet={`
              ${CamiloLaiton_360x257} 360w,
              ${CamiloLaiton_540x386} 540w,
              ${CamiloLaiton_1024x732} 1024w
            `}
            sizes="(max-width: 640px) 280px, 340px"
            alt={displayName}
            className="hero-photo"
            loading="eager"
          />
          <div className="hero-portrait-caption">
            <span className="hero-caption-loc">
              <Icon icon="hugeicons:location-01" height={12} />
              Seattle, WA
            </span>
            <span className="hero-caption-dot" />
            <span className="hero-caption-avail">Open to collaborations</span>
          </div>
        </motion.div>

        {/* Content column */}
        <div className="hero-content">
          {/* Status line */}
          <motion.div
            className="hero-status"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="hero-status-dot" aria-hidden="true" />
            <span className="hero-status-text">
              Available · Seattle · 2026
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="hero-heading"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Hi, I'm <em>Camilo</em>.
          </motion.h1>

          {/* Byline */}
          <motion.p
            className="hero-byline"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Computer Vision Engineer · Deep Learning Researcher · Large-scale Image Processing
          </motion.p>

          {/* Pitch */}
          <motion.p
            className="hero-pitch"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            I build scalable systems that transform large-scale imaging data into insights users can act on.
            <span className="hero-pitch-emphasis">
              <span className="hero-pitch-emphasis-normal">If it does not exist yet,</span>
              <span className="hero-pitch-emphasis-accent">I will build it.</span>
            </span>
          </motion.p>

          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <motion.div
              className="hero-metrics"
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {metrics.map((m, i) => (
                <MetricTile key={i} {...m} />
              ))}
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            className="hero-ctas"
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <a
              href={resumeHref}
              className="hero-cta hero-cta--primary"
              download={resumeFileName}
            >
              <Icon icon="bi:download" height={14} />
              Download résumé
            </a>
            {introHref && (
              <a
                href={introHref}
                className="hero-cta hero-cta--intro"
                target={emailContact ? undefined : '_blank'}
                rel={emailContact ? undefined : 'noopener noreferrer'}
              >
                <Icon icon="hugeicons:message-add-02" height={14} />
                Contact me
              </a>
            )}
            <button
              className="hero-cta hero-cta--ghost"
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View work ↓
            </button>
            {socialInfo?.find(s => s.name?.toLowerCase() === 'email') && (
              <a
                href={`mailto:${socialInfo.find(s => s.name?.toLowerCase() === 'email')?.url?.replace('mailto:', '')}`}
                className="hero-cta hero-cta--ghost"
              >
                Get in touch
              </a>
            )}
          </motion.div>

          {/* Social row */}
          {socialInfo && (
            <motion.div
              className="hero-social"
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {socialInfo.map((network, i) => (
                <a
                  key={i}
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={network.name}
                  className="hero-social-link"
                >
                  <Icon icon={network.class} height={18} />
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
