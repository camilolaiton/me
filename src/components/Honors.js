import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@iconify/react';
import '../css/Honors.css';

const LANG_LEVELS = {
  'Spanish': 100,
  'English': 88,
  'French': 70,
};

const Honors = ({ honors, certificates, languages }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const toWord = (value) => {
    const words = {
      0: 'Zero',
      1: 'One',
      2: 'Two',
      3: 'Three',
      4: 'Four',
      5: 'Five',
      6: 'Six',
      7: 'Seven',
      8: 'Eight',
      9: 'Nine',
      10: 'Ten',
    };
    return words[value] || `${value}`;
  };

  const honorsCount = honors?.length || 0;
  const languageCount = languages?.length || 0;

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 14 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.45, delay },
  });

  return (
    <section className="honors" id="honors" ref={ref}>
      <div className="container">
        <motion.div className="honors-header" {...fadeUp(0)}>
          <div className="honors-kicker-row">
            <span className="sec-num">§06</span>
            <span className="honors-kicker-line" aria-hidden="true" />
            <span className="honors-kicker-label">Achievements &amp; Languages</span>
          </div>
          <h1 className="honors-hero-title">
            <span className="honors-title-accent">{toWord(honorsCount)} highlights</span>, {toWord(languageCount).toLowerCase()} languages.
          </h1>
        </motion.div>

        <div className="honors-grid">
          {/* Left: Honors */}
          {honors && honors.length > 0 && (
            <motion.div className="honors-col" {...fadeUp(0.1)}>
              <h2 className="honors-col-title">Selected Honors</h2>
              <div className="honors-list">
                {honors.map((h, i) => (
                  <div key={i} className="honor-row">
                    <span className="honor-year">{h.year}</span>
                    <p className="honor-text">{h.honor}</p>
                  </div>
                ))}
              </div>

              {/* Certificates */}
              {certificates && certificates.length > 0 && (
                <>
                  <h2 className="honors-col-title honors-col-title--spaced">Certificates</h2>
                  <div className="certs-list">
                    {certificates.map((cert, i) =>
                      cert.url ? (
                        <a
                          key={i}
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer"
                          className="cert-row"
                        >
                          <Icon icon={cert.class} height={14} />
                          <span>{cert.title}</span>
                        </a>
                      ) : (
                        <div key={i} className="cert-row cert-row--no-link">
                          <Icon icon={cert.class} height={14} />
                          <span>{cert.title}</span>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Right: Languages */}
          {languages && languages.length > 0 && (
            <motion.div className="honors-col" {...fadeUp(0.15)}>
              <h2 className="honors-col-title">Languages</h2>
              <div className="lang-list">
                {languages.map((lang, i) => {
                  const pct = LANG_LEVELS[lang.name] ?? 70;
                  return (
                    <div key={i} className="lang-row">
                      <div className="lang-row-header">
                        <span className="lang-name">
                          <Icon icon={lang.class} height={16} />
                          {lang.name}
                        </span>
                        <span className="lang-level">{lang.level}</span>
                      </div>
                      <div className="lang-track">
                        <motion.div
                          className="lang-fill"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${pct}%` } : {}}
                          transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Honors;
