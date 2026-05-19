import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@iconify/react';
import '../css/Experience.css';

const WorkExperience = ({ workInfo }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  if (!workInfo || workInfo.length === 0) return null;

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

  const parseYear = (value) => {
    const match = String(value || '').match(/\d{4}/);
    return match ? Number(match[0]) : null;
  };

  const startYears = workInfo.map(item => parseYear(item.startDate)).filter(Boolean);
  const endYears = workInfo.map(item => parseYear(item.endDate)).filter(Boolean);
  const firstYear = startYears.length > 0 ? Math.min(...startYears) : null;
  const lastYear = endYears.length > 0 ? Math.max(...endYears) : firstYear;
  const hasCurrentRole = workInfo.some(item => /present|current/i.test(String(item.endDate || '')));

  const roleCount = workInfo.length;
  const roleLabel = toWord(roleCount);
  const rangeLabel = firstYear ? `${firstYear} - ${hasCurrentRole ? 'present' : (lastYear || firstYear)}` : 'selected timeline';

  return (
    <section className="work-experience" id="work-experience" ref={ref}>
      <div className="container">
        <motion.div
          className="work-experience__header"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="work-kicker-row">
            <span className="sec-num">§04</span>
            <span className="work-kicker-line" aria-hidden="true" />
            <span className="work-kicker-label">Work Experience</span>
          </div>
          <h1 className="work-experience__title">
            <span className="work-title-accent">{roleLabel} roles</span>, {rangeLabel}.
          </h1>
        </motion.div>

        <div className="exp-list">
          {workInfo.map((item, i) => {
            const title = item.english?.title || '';
            const descriptions = item.english?.description || [];
            const techs = (item.technologies || []).filter(t => t.name || t.class);
            const dateStr = `${item.startDate} – ${item.endDate}`;
            const startYear = (item.startDate || '').split('/').pop();

            return (
              <motion.div
                key={i}
                className="exp-row"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                {/* Date column */}
                <div className="exp-date">
                  <span className="exp-date-year">{startYear}</span>
                  <span className="exp-date-range">{dateStr}</span>
                </div>

                {/* Body column */}
                <div className="exp-body">
                  <h3 className="exp-title">{title}</h3>
                  <p className="exp-org">{item.organization}</p>
                  <ul className="exp-bullets">
                    {descriptions.slice(0, 4).map((desc, j) => (
                      <li key={j}>{desc}</li>
                    ))}
                  </ul>
                </div>

                {/* Side column */}
                <div className="exp-side">
                  <span className="exp-location">
                    <Icon icon="hugeicons:location-01" height={12} />
                    {item.location}
                  </span>
                  <div className="exp-techs">
                    {techs.slice(0, 6).map((tech, j) => (
                      <span key={j} className="tag">
                        {tech.name || ''}
                        {tech.class && <Icon icon={tech.class} height={12} />}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
