import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import '../css/Skills.css';
import { Icon } from '@iconify/react';

const CATEGORY_META = {
  ml: { label: 'ML & AI Frameworks', icon: 'hugeicons:ai-brain-01' },
  infra: { label: 'Cloud & Infrastructure', icon: 'hugeicons:cloud-server' },
  languages: { label: 'Programming Languages', icon: 'hugeicons:source-code' },
};

const Skills = ({ sharedSkills }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const groupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (!sharedSkills) return null;

  // Group skills by category, preserve insertion order via CATEGORY_META keys
  const grouped = {};
  Object.keys(CATEGORY_META).forEach(key => { grouped[key] = []; });

  sharedSkills.forEach(skill => {
    const cat = skill.category || 'languages';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(skill);
  });

  return (
    <motion.section
      className="skills"
      id="skills"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="container">
        <motion.div className="skills-header-block" variants={groupVariants}>
          <span className="section-eyebrow">Skills</span>
          <h1 className="skills-title">Technical Skills</h1>
        </motion.div>

        {Object.entries(grouped).map(([catKey, catSkills]) => {
          if (catSkills.length === 0) return null;
          const meta = CATEGORY_META[catKey] || { label: catKey, icon: 'bi:code' };
          return (
            <motion.div
              key={catKey}
              className="skills-category"
              variants={groupVariants}
            >
              <div className="skills-category__header">
                <Icon icon={meta.icon} height={20} className="skills-category__icon" />
                <span className="skills-category__label">{meta.label}</span>
              </div>

              <motion.ul
                className="skills-grid"
                variants={containerVariants}
              >
                {catSkills.map((skill, i) => (
                  <motion.li
                    className="skill-item"
                    key={i}
                    variants={itemVariants}
                  >
                    <div className="skill-icon">
                      <Icon
                        icon={skill.class}
                        style={{ fontSize: "3rem" }}
                        color={skill.color}
                      />
                    </div>
                    <div className="skill-name">{skill.name}</div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Skills;
