import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../css/Publications.css';

const extractYear = (research) => {
  const raw = research.endDate || '';
  // formats: "MM/YYYY", "YYYY", or plain string
  const match = raw.match(/(\d{4})/);
  return match ? match[1] : raw;
};

const extractVenue = (state) => {
  if (!state) return '';
  const normalized = String(state).trim();
  // "Published - Journal of Imaging | DOI: ..." -> "Journal of Imaging"
  const dashMatch = normalized.match(/^(Published|In Review|Under Review|Pending publication|Preparing for publication)\s*[-–]\s*(.+)$/i);
  if (dashMatch) {
    return dashMatch[2].split('|')[0].trim();
  }
  if (/pending|prepar|in review|under review/i.test(normalized)) {
    return '';
  }
  return normalized.split('|')[0].trim();
};

const extractStatus = (state) => {
  if (!state) return 'published';
  if (/in review|under review|pending|prepar/i.test(state)) return 'preparation';
  return 'published';
};

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

const formatDomainList = (items) => {
  if (items.length <= 1) return items[0] || '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
};

const Publications = ({ researchInfo }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const allPublications = [];
  if (researchInfo) {
    researchInfo.forEach((research) => {
      if (research.pubs && research.pubs.length > 0) {
        const year = extractYear(research);
        research.pubs.forEach((pub) => {
          allPublications.push({
            ...pub,
            year,
            topics: research.topics,
          });
        });
      }
    });
  }

  allPublications.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));

  const hasValidLink = (url) => Boolean(url && url !== '#');
  const publishedCount = allPublications.filter(pub => (
    extractStatus(pub.state) === 'published' && hasValidLink(pub.url)
  )).length;
  const preparationCount = allPublications.filter(pub => (
    extractStatus(pub.state) === 'preparation' && hasValidLink(pub.url)
  )).length;

  const accentLead = toWord(publishedCount);
  const prepPhrase = preparationCount === 0
    ? 'some others in preparation'
    : preparationCount === 1
      ? 'some others in preparation'
      : `${toWord(preparationCount).toLowerCase()} in preparation`;
  const headlineTail = `peer-reviewed paper${publishedCount === 1 ? '' : 's'}, ${prepPhrase}.`;

  const allTopics = Array.from(new Set(
    allPublications.flatMap(pub => (Array.isArray(pub.topics) ? pub.topics : []))
  ));
  const normalizedTopics = allTopics.map(topic => topic.toLowerCase());

  const domains = [];
  if (normalizedTopics.some(topic => topic.includes('mri') || topic.includes('brain'))) {
    domains.push('MRI');
  }
  if (normalizedTopics.some(topic => topic.includes('light') || topic.includes('microscop') || topic.includes('cell'))) {
    domains.push('microscopy');
  }
  if (normalizedTopics.some(topic => topic.includes('industry 4.0') || topic.includes('rail'))) {
    domains.push('Industry 4.0');
  }

  const domainSummary = domains.length > 0
    ? `Across ${formatDomainList(domains)} - full text linked.`
    : 'Peer-reviewed outputs linked when available.';

  return (
    <section className="publications" id="publications" ref={ref}>
      <div className="container">
        <motion.div
          className="publications-header-block"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="publications-kicker-row">
            <span className="sec-num">§03</span>
            <span className="publications-kicker-line" aria-hidden="true" />
            <span className="publications-kicker-label">Publications</span>
          </div>
          <h1 className="publications-hero-title">
            <span className="publications-hero-accent">{accentLead}</span>{' '}
            {headlineTail}
          </h1>
          <p className="publications-hero-copy">{domainSummary}</p>
        </motion.div>

        <div className="pub-list">
          {allPublications.length > 0 ? (
            allPublications.map((pub, i) => {
              const status = extractStatus(pub.state);
              const venue = extractVenue(pub.state);
              return (
                <motion.div
                  key={i}
                  className="pub-row"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div className="pub-year">{pub.year}</div>
                  <div className="pub-body">
                    <h3 className="pub-title">
                      {pub.url ? (
                        <a href={pub.url} target="_blank" rel="noreferrer" className="pub-title-link">
                          {pub.title}
                        </a>
                      ) : pub.title}
                    </h3>
                    {venue && <p className="pub-venue">{venue}</p>}
                    <div className="pub-tags">
                      <span className={`tag ${status === 'published' ? 'indigo' : 'amber'}`}>
                        {status === 'published' ? 'Published' : 'In Preparation'}
                      </span>
                      {pub.topics && pub.topics.slice(0, 2).map((t, j) => (
                        <span key={j} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pub-link-col">
                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noreferrer"
                        className="pub-view-link"
                      >
                        View ↗
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="no-publications">No publications available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Publications;
