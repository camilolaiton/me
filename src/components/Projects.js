import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Icon } from '@iconify/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../css/Projects.css';

const numberWords = {
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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const parseYear = value => {
    const match = String(value || '').match(/\d{4}/);
    return match ? Number(match[0]) : null;
};

const getImageSrc = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
    return `${process.env.PUBLIC_URL}/${imageUrl.replace(/^\/+/, '')}`;
};

const isVideo = (url) => /\.(mp4|webm)$/i.test(String(url || ''));

const emphasizeQuantitativeText = (text) => {
    const value = String(text || '');
    const pattern = /(\$\d+(?:\.\d+)?\+?|~?\$?\d+(?:\.\d+)?%|\b\d+(?:\.\d+)?x\b|\b\d+(?:\.\d+)?\s?(?:PB|TB|GB|um|h)\b|\bcost\b|\bdice\b|\bncc\b|\berror\b|\bspeedup\b|\bjacobians\b)/gi;
    const matches = [...value.matchAll(pattern)];

    if (matches.length === 0) return value;

    const parts = [];
    let cursor = 0;

    matches.forEach((match, idx) => {
        const start = match.index ?? 0;
        const end = start + match[0].length;

        if (start > cursor) {
            parts.push(value.slice(cursor, start));
        }

        parts.push(<strong key={`q-${idx}-${start}`}>{value.slice(start, end)}</strong>);
        cursor = end;
    });

    if (cursor < value.length) {
        parts.push(value.slice(cursor));
    }

    return parts;
};

const ProjectCard = ({ project, categoryMap, techMap, onSelect }) => {
    const projectCategories = Array.isArray(project.category) ? project.category : [project.category];
    const images = project.images || [];
    const technologies = project.technologies || [];
    const featuredImage = images.find(img => img.is_featured) || images[0];
    const hasLinks = project.paper_url || project.github_url || project.demo_url;

    const open = () => onSelect(project);

    return (
        <motion.div
            className="project-card"
            variants={itemVariants}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${project.title}`}
            onClick={open}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    open();
                }
            }}
        >
            {/* Image area */}
            {featuredImage && (
                <div className="project-image">
                    <img
                        src={getImageSrc(featuredImage.poster || featuredImage.url)}
                        alt={featuredImage.title}
                        loading="lazy"
                        decoding="async"
                    />
                    {/* Category chips float on the image */}
                    <div className="project-image-cats">
                        {projectCategories.map(cat => {
                            const cat_d = categoryMap[cat];
                            return cat_d ? (
                                <span key={cat} className="project-cat-chip" style={{ '--cat-color': cat_d.color }}>
                                    <Icon icon={cat_d.icon} height={11} />
                                    {cat_d.name}
                                </span>
                            ) : null;
                        })}
                    </div>
                    {/* Hover overlay */}
                    <div className="project-overlay">
                        <span className="project-overlay-hint">
                            <Icon icon="hugeicons:expand-01" height={18} />
                            View details
                        </span>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="project-content">
                <div className="project-content-top">
                    <div className="project-title-row">
                        <h3 className="project-title">{project.title}</h3>
                        <span className={`status-badge ${project.status}`}>{project.status}</span>
                    </div>
                    <p className="project-description">{project.short_description}</p>
                </div>

                {/* Tech icons */}
                <div className="project-technologies">
                    {technologies.slice(0, 5).map(tech => {
                        const techData = techMap[tech];
                        return techData ? (
                            <div key={tech} className="tech-badge" title={techData.name}>
                                <Icon icon={techData.icon} color={techData.color} height={18} />
                            </div>
                        ) : null;
                    })}
                    {technologies.length > 5 && (
                        <span className="tech-more">+{technologies.length - 5}</span>
                    )}
                </div>

                {/* Footer: links */}
                {hasLinks && (
                    <div className="project-card-footer">
                        <div className="project-links" onClick={e => e.stopPropagation()}>
                            {project.paper_url && (
                                <a href={project.paper_url} target="_blank" rel="noopener noreferrer" className="project-link">
                                    <Icon icon="hugeicons:file-02" height={13} />
                                    Paper
                                </a>
                            )}
                            {project.github_url && (
                                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link">
                                    <Icon icon="akar-icons:github-fill" height={13} />
                                    Code
                                </a>
                            )}
                            {project.demo_url && (
                                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="project-link">
                                    <Icon icon="hugeicons:external-link" height={13} />
                                    Demo
                                </a>
                            )}
                        </div>
                        <span className="project-expand-hint">Details →</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const ProjectModal = ({ project, categoryMap, techMap, onClose }) => {
    useEffect(() => {
        const onKeyDown = e => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    if (!project) return null;

    const projectCategories = Array.isArray(project.category) ? project.category : [project.category];
    const images = project.images || [];
    const highlights = project.highlights || [];
    const technologies = project.technologies || [];

    return (
        <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="project-modal"
                role="dialog"
                aria-modal="true"
                aria-label={project.title}
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                onClick={e => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <Icon icon="hugeicons:cancel-01" height={20} />
                </button>

                <div className="modal-header">
                    <div className="project-categories">
                        {projectCategories.map(cat => {
                            const cat_d = categoryMap[cat];
                            return cat_d ? (
                                <div key={cat} className="project-category" style={{ color: cat_d.color }}>
                                    <Icon icon={cat_d.icon} height={16} />
                                    {cat_d.name}
                                </div>
                            ) : null;
                        })}
                    </div>
                    <h2>{project.title}</h2>
                    <p>{project.short_description}</p>
                </div>

                {images.length > 0 && (
                    <div className="modal-gallery">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            className="project-swiper"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={image.url || index}>
                                    <div className="gallery-slide">
                                        {isVideo(image.url) ? (
                                            <video
                                                src={getImageSrc(image.url)}
                                                poster={image.poster ? getImageSrc(image.poster) : undefined}
                                                aria-label={image.title}
                                                controls
                                                loop
                                                muted
                                                playsInline
                                                preload="none"
                                            />
                                        ) : (
                                            <img
                                                src={getImageSrc(image.url)}
                                                alt={image.title}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        )}
                                        <div className="slide-caption">
                                            <h4>{image.title}</h4>
                                            <p>{image.description}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}

                <div className="modal-content">
                    <div className="project-highlights">
                        <h3>Key Highlights</h3>
                        <ul>
                            {highlights.map((highlight, index) => (
                                <li key={index}>{emphasizeQuantitativeText(highlight)}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="project-tech-stack">
                        <h3>Technology Stack</h3>
                        <div className="tech-grid">
                            {technologies.map(tech => {
                                const techData = techMap[tech];
                                return techData ? (
                                    <div key={tech} className="tech-item">
                                        <Icon icon={techData.icon} color={techData.color} height={24} />
                                        <span>{techData.name}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>

                    <div className="project-actions">
                        {project.paper_url && (
                            <a href={project.paper_url} target="_blank" rel="noopener noreferrer" className="action-button primary">
                                <Icon icon="hugeicons:file-02" height={18} />
                                Read Paper
                            </a>
                        )}
                        {project.github_url && (
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="action-button secondary">
                                <Icon icon="akar-icons:github-fill" height={18} />
                                View Code
                            </a>
                        )}
                        {project.demo_url && (
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="action-button secondary">
                                <Icon icon="hugeicons:external-link" height={18} />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const [projectsData, setProjectsData] = useState(null);
    const [status, setStatus] = useState('loading');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        let cancelled = false;

        fetch(`${process.env.PUBLIC_URL}/projects.json`)
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then(data => {
                if (cancelled) return;
                setProjectsData(data);
                setStatus('ready');
            })
            .catch(err => {
                console.error('Error loading projects:', err);
                if (!cancelled) setStatus('error');
            });

        return () => { cancelled = true; };
    }, []);

    const closeModal = useCallback(() => setSelectedProject(null), []);

    if (status === 'loading') {
        return <div className="projects-loading">Loading projects…</div>;
    }

    if (status === 'error' || !projectsData) {
        return (
            <section className="projects" id="projects">
                <div className="container">
                    <p className="projects-loading">
                        Project details could not be loaded right now. My work is also on{' '}
                        <a href="https://github.com/camilolaiton" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>.
                    </p>
                </div>
            </section>
        );
    }

    const featuredProjects = projectsData.featured_projects || [];
    const categoryMap = projectsData.project_categories || {};
    const techMap = projectsData.technology_stack || {};
    const categories = ['all', ...Object.keys(categoryMap)];
    const filteredProjects = selectedCategory === 'all'
        ? featuredProjects
        : featuredProjects.filter(project => {
            const cats = Array.isArray(project.category) ? project.category : [project.category];
            return cats.includes(selectedCategory);
        });

    const startYears = featuredProjects
        .map(project => parseYear(project.start_date))
        .filter(Boolean);
    const endYears = featuredProjects
        .map(project => parseYear(project.end_date))
        .filter(Boolean);

    const firstYear = startYears.length > 0 ? Math.min(...startYears) : null;
    const lastYear = endYears.length > 0 ? Math.max(...endYears) : firstYear;
    const hasOngoingProject = featuredProjects.some(project => (
        project.status === 'in-progress'
        || /to be determined|present|ongoing/i.test(String(project.end_date || ''))
    ));

    const featuredCount = featuredProjects.length;
    const featuredCountLabel = numberWords[featuredCount] || `${featuredCount}`;
    const headlineCount = `${featuredCountLabel} project${featuredCount === 1 ? '' : 's'},`;
    const headlineRange = firstYear
        ? `${firstYear} — ${hasOngoingProject ? 'present' : (lastYear || firstYear)}`
        : 'selected work';

    return (
        <motion.section
            className="projects"
            id="projects"
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
        >
            <div className="container">
                <motion.div className="projects-header-block" variants={itemVariants}>
                    <div className="projects-kicker-row">
                        <span className="sec-num">§02</span>
                        <span className="projects-kicker-line" aria-hidden="true" />
                        <span className="projects-kicker-label">Featured Projects</span>
                    </div>
                    <h2 className="projects-hero-title">
                        <span className="projects-hero-count">{headlineCount}</span>{' '}
                        <span className="projects-hero-range">{headlineRange}.</span>
                    </h2>
                    <p className="projects-hero-copy">
                        Each entry is an end-to-end build: research question, architecture, training,
                        and the production system that runs it. Figures are direct outputs of the pipelines.
                        Some are still work in progress.
                    </p>
                </motion.div>

                <motion.div className="category-filters" variants={itemVariants}>
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category === 'all' ? (
                                <><Icon icon="hugeicons:grid-view" height={14} />All</>
                            ) : (
                                <>
                                    <Icon icon={categoryMap[category].icon} height={14} />
                                    {categoryMap[category].name}
                                </>
                            )}
                        </button>
                    ))}
                </motion.div>

                <motion.div className="projects-grid" variants={itemVariants}>
                    {filteredProjects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            categoryMap={categoryMap}
                            techMap={techMap}
                            onSelect={setSelectedProject}
                        />
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        categoryMap={categoryMap}
                        techMap={techMap}
                        onClose={closeModal}
                    />
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default Projects;
