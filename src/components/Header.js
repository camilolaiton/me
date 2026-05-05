import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../css/Header.css';
import CamiloLaiton_360x257 from '../imgs/CamiloLaiton_360x257.jpg';
import CamiloLaiton_540x386 from '../imgs/CamiloLaiton_540x386.jpg';
import CamiloLaiton_1024x732 from '../imgs/CamiloLaiton_1024x732.jpg';
import { Icon } from '@iconify/react';
import { TypeAnimation } from 'react-type-animation';

const Header = ({ name, socialInfo, theme, toggleTheme }) => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const socialNetworks = socialInfo?.map((network, nKey) => (
        <motion.div 
            key={nKey}
            className="social-item"
            variants={itemVariants}
        >
            <a 
                href={network.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Visit ${network.name} profile`}
            >
                <Icon 
                    icon={network.class} 
                    height={24} 
                    color={network.color}
                    className="social-icon"
                />
            </a>
            <span className="social-title">
                {network.name}
            </span>
        </motion.div>
    ));

    return (
        <section className="header" id="header">
            <div
                className="hero-bg"
                style={{ transform: `translateY(${scrollY * 0.4}px)` }}
            />
            <div className="hero-overlay" />
            <motion.div
                className="header-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={imageVariants}>
                    <img 
                        src={CamiloLaiton_1024x732}
                        srcSet={`
                            ${CamiloLaiton_360x257} 360w,
                            ${CamiloLaiton_540x386} 540w,
                            ${CamiloLaiton_1024x732} 1024w
                        `}
                        sizes="180px"
                        alt="Camilo Laiton" 
                        className="i-img"
                        loading="eager"
                    />
                </motion.div>

                <motion.h1 
                    className="title-container"
                    variants={itemVariants}
                >
                    <TypeAnimation
                        sequence={[
                            name || "Camilo Laiton",
                            2000,
                            // "Computer Vision Engineer",
                            // 2000,
                            // "Large-scale Image Processing",
                            // 2000,
                            // "Deep Learning Researcher",
                            // 2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ display: 'inline-block' }}
                        repeat={Infinity}
                    />
                </motion.h1>

                <motion.div 
                    className="i-title"
                    variants={itemVariants}
                >
                    <div className="i-title-wrapper">
                        <div className="i-title-item">
                           🤖 Computer Vision Engineer
                        </div>
                        <div className="i-title-item">
                           📊 Large-scale Image Processing
                        </div>
                        <div className="i-title-item">
                           🧠 Deep Learning Researcher
                        </div>
                        <div className="i-title-item">
                           ☁️ Cloud Computing
                        </div>
                    </div>
                </motion.div>

                {/* Theme Toggle */}
                <motion.div 
                    className="i-theme"
                    variants={itemVariants}
                >
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label="Toggle theme"
                        style={{
                            background: 'var(--glass-background)',
                            backdropFilter: 'var(--glass-blur)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--border-radius-full)',
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                            color: 'var(--color-text-on-dark)',
                            cursor: 'pointer',
                            transition: 'all var(--transition-normal)',
                            marginBottom: 'var(--spacing-xl)'
                        }}
                    >
                        <Icon 
                            icon={theme === 'light' ? "bi:moon-stars" : "bi:sun"} 
                            height={20}
                        />
                    </button>
                </motion.div>

                <motion.div 
                    className="social-container"
                    variants={itemVariants}
                >
                    {socialNetworks}
                </motion.div>

                <motion.a 
                    href="https://raw.githubusercontent.com/camilolaiton/portfolio/master/public/DL%20Camilo%20Laiton%20-%20Resume.pdf"
                    className="i-cv"
                    target="_blank" 
                    rel="noreferrer"
                    download
                    variants={itemVariants}
                >
                    <Icon icon="bi:download" height={16} />
                    Download CV
                </motion.a>
            </motion.div>
        </section>
    );
};

export default Header;