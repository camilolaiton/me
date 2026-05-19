import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Icon } from '@iconify/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../css/Projects.css';

const Projects = () => {
    const [projectsData, setProjectsData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/projects.json`)
            .then(r => r.json())
            .then(data => setProjectsData(data))
            .catch(err => console.error('Error loading projects:', err));
    }, []);

    if (!projectsData) {
        return <div className="projects-loading">Loading projects…</div>;
    }

    const featuredProjects = projectsData.featured_projects || [];
    const categories = ['all', ...Object.keys(projectsData.project_categories)];
    const filteredProjects = selectedCategory === 'all'
        ? featuredProjects
        : featuredProjects.filter(project => {
            const cats = Array.isArray(project.category) ? project.category : [project.category];
            return cats.includes(selectedCategory);
        });

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

    const parseYear = value => {
        const match = String(value || '').match(/\d{4}/);
        return match ? Number(match[0]) : null;
    };

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const getImageSrc = (imageUrl) => {
        if (!imageUrl) return '';
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
        return `${process.env.PUBLIC_URL}/${imageUrl}`;
    };

    const ProjectCard = ({ project }) => {
        const projectCategories = Array.isArray(project.category) ? project.category : [project.category];
        const featuredImage = project.images.find(img => img.is_featured) || project.images[0];
        const hasLinks = project.paper_url || project.github_url || project.demo_url;

        return (
            <motion.div
                className="project-card"
                variants={itemVariants}
                onClick={() => setSelectedProject(project)}
            >
                {/* Image area */}
                {featuredImage && (
                    <div className="project-image">
                        <img
                            src={getImageSrc(featuredImage.url)}
                            alt={featuredImage.title}
                            loading="lazy"
                        />
                        {/* Category chips float on the image */}
                        <div className="project-image-cats">
                            {projectCategories.map(cat => {
                                const cat_d = projectsData.project_categories[cat];
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
                        {project.technologies.slice(0, 5).map(tech => {
                            const techData = projectsData.technology_stack[tech];
                            return techData ? (
                                <div key={tech} className="tech-badge" title={techData.name}>
                                    <Icon icon={techData.icon} color={techData.color} height={18} />
                                </div>
                            ) : null;
                        })}
                        {project.technologies.length > 5 && (
                            <span className="tech-more">+{project.technologies.length - 5}</span>
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

    const ProjectModal = ({ project, onClose }) => {
        if (!project) return null;

        const projectCategories = Array.isArray(project.category) ? project.category : [project.category];

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
                                const cat_d = projectsData.project_categories[cat];
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

                    {project.images.length > 0 && (
                        <div className="modal-gallery">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                className="project-swiper"
                            >
                                {project.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="gallery-slide">
                                            <img
                                                src={getImageSrc(image.url)}
                                                alt={image.title}
                                            />
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
                                {project.highlights.map((highlight, index) => (
                                    <li key={index}>{highlight}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="project-tech-stack">
                            <h3>Technology Stack</h3>
                            <div className="tech-grid">
                                {project.technologies.map(tech => {
                                    const techData = projectsData.technology_stack[tech];
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
                    <h1 className="projects-hero-title">
                        <span className="projects-hero-count">{headlineCount}</span>{' '}
                        <span className="projects-hero-range">{headlineRange}.</span>
                    </h1>
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
                                    <Icon icon={projectsData.project_categories[category].icon} height={14} />
                                    {projectsData.project_categories[category].name}
                                </>
                            )}
                        </button>
                    ))}
                </motion.div>

                <motion.div className="projects-grid" variants={itemVariants}>
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </motion.div>
            </div>

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </motion.section>
    );
};

export default Projects;
