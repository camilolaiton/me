import React from 'react';
import '../css/Footer.css';
import { Icon } from '@iconify/react';

const Footer = ({ socialInfo, name }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* CTA */}
        <div className="footer-cta">
          Working on petabyte-scale vision?<br />
          Let's <em>talk.</em>
        </div>

        {/* Meta row */}
        <div className="footer-meta">
          <div className="footer-availability">
            <span className="footer-dot" aria-hidden="true" />
            <span>Open to collaborations · Seattle, WA · 2026</span>
          </div>

          {socialInfo && (
            <div className="footer-social">
              {socialInfo.map((network) => (
                <a
                  key={network.name}
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={network.name}
                  className="footer-social-link"
                >
                  <Icon icon={network.class} height={18} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          &copy; {year} {name || 'Camilo Laiton'} · Built with React
        </div>
      </div>
    </footer>
  );
};

export default Footer;
