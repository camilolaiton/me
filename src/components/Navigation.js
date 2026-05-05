import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Icon } from '@iconify/react';
import '../css/Navigation.css';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('header');
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = useMemo(() => [
    { id: 'header',          label: 'Home',         icon: 'hugeicons:home-01' },
    { id: 'about',           label: 'About',        icon: 'hugeicons:user' },
    { id: 'projects',        label: 'Projects',     icon: 'hugeicons:folder-02' },
    { id: 'publications',    label: 'Publications', icon: 'hugeicons:book-02' },
    { id: 'blog-posts',      label: 'Blog',         icon: 'simple-icons:medium' },
    { id: 'github-activity', label: 'GitHub',       icon: 'akar-icons:github-fill' },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);

      // Find active section
      const sections = navItems.map(item => document.querySelector(`#${item.id}`));
      const currentSection = sections.find((section, index) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        const sectionId = currentSection.id;
        setActiveSection(sectionId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className="floating-nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="nav-container">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={item.label}
            >
              <Icon icon={item.icon} height={20} />
              <span className="nav-label">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Scroll to Top Button */}
      <motion.button
        className="scroll-to-top"
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Scroll to top"
      >
        <Icon icon="hugeicons:arrow-up-01" height={24} />
      </motion.button>

      {/* Reading Progress Bar */}
      <motion.div
        className="reading-progress"
        style={{ scaleX }}
      />
    </>
  );
};

export default Navigation;