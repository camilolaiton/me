import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../css/Publications.css';
import { Icon } from '@iconify/react';

const Publications = ({ researchInfo }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    // Extract all publications from research items
    const allPublications = [];
    if (researchInfo) {
        researchInfo.forEach((research) => {
            if (research.pubs && research.pubs.length > 0) {
                research.pubs.forEach((pub) => {
                    allPublications.push({
                        ...pub,
                        researchTitle: research.english.title,
                        topics: research.topics,
                        year: research.endDate.split('/')[1] || research.endDate
                    });
                });
            }
        });
    }

    // Sort publications by year (most recent first)
    allPublications.sort((a, b) => {
        const yearA = parseInt(a.year) || 0;
        const yearB = parseInt(b.year) || 0;
        return yearB - yearA;
    });

    const publicationCards = allPublications.map((pub, index) => (
        <motion.div
            key={index}
            className="publication-card"
            variants={itemVariants}
        >
            <div className="publication-header">
                <Icon 
                    icon="mdi:file-document-outline" 
                    height={24} 
                    className="publication-icon"
                />
                <span className="publication-year">{pub.year}</span>
            </div>
            
            <h3 className="publication-title">
                <a 
                    href={pub.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="publication-link"
                >
                    {pub.title}
                </a>
            </h3>

            <p className="publication-state">{pub.state}</p>

            <div className="publication-research">
                <span className="research-label">Research:</span>
                <span className="research-title">{pub.researchTitle}</span>
            </div>

            <div className="publication-topics">
                {pub.topics.map((topic, i) => (
                    <span key={i} className="topic-badge">
                        {topic}
                    </span>
                ))}
            </div>
        </motion.div>
    ));

    return (
        <motion.section
            className="publications"
            id="publications"
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <div className="container">
                <motion.div className="publications-header-block" variants={itemVariants}>
                    <span className="section-eyebrow">Research</span>
                    <h1>Publications</h1>
                </motion.div>

                <motion.div 
                    className="publications-grid"
                    variants={containerVariants}
                >
                    {publicationCards.length > 0 ? (
                        publicationCards
                    ) : (
                        <p className="no-publications">No publications available</p>
                    )}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Publications;
