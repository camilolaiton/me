import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import '../css/About.css';
import { Icon } from '@iconify/react';

const About = ({ 
    languages, 
    honors, 
    certificates, 
    showAbout = true,
    showHonors = false,
    showCertificates = false
}) => {
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
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    const languageItems = languages?.map((language, i) => (
        <motion.div 
            key={i}
            className="language-item"
            variants={itemVariants}
        >
            <Icon 
                className='language-icon' 
                icon={language.class} 
                height={48}
            />
            <div className="language-title">
                {language.name}
            </div>
            <div className="language-subtitle">
                {language.level}
            </div>
        </motion.div>
    ));

    const honorItems = honors?.map((honor, i) => (
        <motion.li 
            key={i}
            variants={itemVariants}
        >
            <strong>[{honor.year}]</strong> {honor.honor}
        </motion.li>
    ));

    const certificateItems = certificates?.map((certificate, i) => (
        <motion.li 
            key={i}
            variants={itemVariants}
        >
            <Icon 
                className='certificate-icon' 
                icon={certificate.class} 
                color={certificate.color} 
                height={24}
            />
            <a 
                href={certificate.url} 
                target="_blank" 
                rel="noreferrer" 
                className="i-certificate"
            >
                {certificate.title}
            </a>
        </motion.li>
    ));

    return (
        <motion.section 
            className="about"
            id={showAbout ? "about" : "honors-certificates"}
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <div className="container">
                {showAbout && (
                    <>
                        <motion.h1 variants={itemVariants}>
                            About me
                        </motion.h1>
                        
                        <motion.div 
                            className="about-content"
                            variants={itemVariants}
                        >
                            <div className="about-info">
                                <p>
                                    Camilo Laiton is a Computer Vision Engineer with a Masters in Computer Science at the{' '}
                                    <a 
                                        href="https://medellin.unal.edu.co/" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="a-item"
                                    >
                                        National University of Colombia - Medellín.
                                    </a>{' '}
                                    His research was conducted under the supervision of{' '}
                                    <a 
                                        href="https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000479918" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="a-item"
                                    >
                                        Prof. German Sanchez
                                    </a>{' '}
                                    and{' '}
                                    <a 
                                        href="https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000027090" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="a-item"
                                    >
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
                                        <a 
                                            href="https://alleninstitute.org/person/camilo-laiton/" 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="a-item"
                                        >
                                            Allen Institute for Neural Dynamics
                                        </a>
                                        , where he focuses on developing scalable computer vision 
                                        and machine learning solutions for neuroscience applications.
                                        Currently working on:
                                        <ul>
                                            <li>Foundational deep learning model for lightsheet brain microscopy data.</li>
                                            <li>Extensible protein prediction deep learning framework from NHS-ester dye (pan-protein).</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>

                            <div className="languages-sidebar">
                                <h3 className="languages-title">Languages</h3>
                                <div className="languages-box">
                                    {languageItems}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}

                {showHonors && (
                    <>
                        {showAbout && <motion.hr className="hr" variants={itemVariants} />}
                        
                        <motion.h1 variants={itemVariants}>
                            Selected honors
                        </motion.h1>

                        <motion.div 
                            className="honors"
                            variants={itemVariants}
                        >
                            <ul>
                                {honorItems}
                            </ul>
                        </motion.div>
                    </>
                )}

                {showCertificates && (
                    <>
                        {(showAbout || showHonors) && <motion.hr className="hr" variants={itemVariants} />}
                        
                        <motion.h1 variants={itemVariants}>
                            Certificates
                        </motion.h1>

                        <motion.div 
                            className="certificates"
                            variants={itemVariants}
                        >
                            <ul>
                                {certificateItems}
                            </ul>
                        </motion.div>
                    </>
                )}
            </div>
        </motion.section>
    );
};

export default About;