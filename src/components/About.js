import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import '../css/About.css';
import { Icon } from '@iconify/react';

const About = ({ languages, honors, certificates }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.08 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    const languageItems = languages?.map((language, i) => (
        <motion.div key={i} className="language-item" variants={itemVariants}>
            <Icon className="language-icon" icon={language.class} height={36} />
            <div className="language-info">
                <span className="language-title">{language.name}</span>
                <span className="language-subtitle">{language.level}</span>
            </div>
        </motion.div>
    ));

    const honorCards = honors?.map((honor, i) => (
        <motion.div key={i} className="honor-card" variants={itemVariants}>
            <span className="honor-year">{honor.year}</span>
            <p className="honor-text">{honor.honor}</p>
        </motion.div>
    ));

    const certBadges = certificates?.map((cert, i) => (
        cert.url ? (
            <motion.a
                key={i}
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="cert-badge"
                variants={itemVariants}
            >
                <Icon icon={cert.class} height={15} color={cert.color || 'currentColor'} />
                {cert.title}
            </motion.a>
        ) : (
            <motion.span key={i} className="cert-badge cert-badge--no-link" variants={itemVariants}>
                <Icon icon={cert.class} height={15} color={cert.color || 'currentColor'} />
                {cert.title}
            </motion.span>
        )
    ));

    return (
        <motion.section
            className="about"
            id="about"
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <div className="container">
                {/* Section header */}
                <motion.div className="about-section-header" variants={itemVariants}>
                    <span className="section-eyebrow">About</span>
                    <h1 className="about-title">About Me</h1>
                </motion.div>

                {/* Bio + Languages */}
                <motion.div className="about-content" variants={itemVariants}>
                    <div className="about-info">
                        <p>
                            Camilo Laiton is a Computer Vision Engineer with a Masters in Computer Science at the{' '}
                            <a href="https://medellin.unal.edu.co/" target="_blank" rel="noreferrer" className="a-item">
                                National University of Colombia - Medellín.
                            </a>{' '}
                            His research was conducted under the supervision of{' '}
                            <a href="https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000479918" target="_blank" rel="noreferrer" className="a-item">
                                Prof. German Sanchez
                            </a>{' '}
                            and{' '}
                            <a href="https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000027090" target="_blank" rel="noreferrer" className="a-item">
                                Prof. Jhon Branch
                            </a>.
                        </p>
                        <p>
                            He received the B.S. degree from the University of Magdalena in 2020
                            from where he graduated with highest honors.
                        </p>
                        <p>
                            He has experience in deep learning, large-scale image processing,
                            and computer vision with the goal of developing
                            AI-based solutions to address real-world challenges.
                        </p>

                        <div className="current-position">
                            <p>
                                <strong>Current Position:</strong> Computer Vision Engineer at the{' '}
                                <a href="https://alleninstitute.org/person/camilo-laiton/" target="_blank" rel="noreferrer" className="a-item">
                                    Allen Institute
                                </a>
                                , where he focuses on developing scalable computer vision
                                and deep learning-based solutions for neuroscience applications.
                                Currently working on:
                                <ul>
                                    <li>Foundational multi-resolution and contextual deep learning model for lightsheet brain microscopy data.</li>
                                    <li>Scalable protein prediction deep learning framework from NHS-ester dye (pan-protein).</li>
                                </ul>
                            </p>
                        </div>
                    </div>

                    {languages && languages.length > 0 && (
                        <div className="languages-sidebar">
                            <h3 className="languages-title">Languages</h3>
                            <div className="languages-box">
                                {languageItems}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Achievements */}
                {honors && honors.length > 0 && (
                    <motion.div className="about-subsection" variants={itemVariants}>
                        <h2 className="about-subsection-title">
                            <Icon icon="hugeicons:trophy" height={18} />
                            Selected Achievements
                        </h2>
                        <motion.div className="honors-grid" variants={containerVariants}>
                            {honorCards}
                        </motion.div>
                    </motion.div>
                )}

                {/* Certificates */}
                {certificates && certificates.length > 0 && (
                    <motion.div className="about-subsection" variants={itemVariants}>
                        <h2 className="about-subsection-title">
                            <Icon icon="hugeicons:certificate-01" height={18} />
                            Certificates
                        </h2>
                        <motion.div className="certificates-grid" variants={containerVariants}>
                            {certBadges}
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
};

export default About;
