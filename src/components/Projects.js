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
    
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/projects.json`)
            .then(response => response.json())
            .then(data => setProjectsData(data))
            .catch(error => console.error('Error loading projects:', error));
    }, []);

    if (!projectsData) {
        return <div className="projects-loading">Loading projects...</div>;
    }

    const categories = ['all', ...Object.keys(projectsData.project_categories)];
    const filteredProjects = selectedCategory === 'all' 
        ? projectsData.featured_projects
        : projectsData.featured_projects.filter(project => {
            // Handle both single category (string) and multiple categories (array)
            const projectCategories = Array.isArray(project.category) 
                ? project.category 
                : [project.category];
            return projectCategories.includes(selectedCategory);
        });

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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const ProjectCard = ({ project }) => {
        // Handle both single category (string) and multiple categories (array)
        const projectCategories = Array.isArray(project.category) 
            ? project.category 
            : [project.category];
        
        const featuredImage = project.images.find(img => img.is_featured) || project.images[0];

        // Helper function to determine if URL is external
        const getImageSrc = (imageUrl) => {
            if (!imageUrl) return '';
            // Check if it's an external URL (starts with http:// or https://)
            if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
                return imageUrl;
            }
            // Otherwise, treat as local path
            return `${process.env.PUBLIC_URL}/${imageUrl}`;
        };

        return (
            <motion.div
                className="project-card"
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onClick={() => setSelectedProject(project)}
            >
                {featuredImage && (
                    <div className="project-image">
                        <img 
                            src={getImageSrc(featuredImage.url)}
                            alt={featuredImage.title}
                            loading="lazy"
                        />
                        <div className="project-overlay">
                            <Icon icon="hugeicons:view" height={24} />
                            <span>View Details</span>
                        </div>
                    </div>
                )}
                
                <div className="project-content">
                    <div className="project-header">
                        <div className="project-categories">
                            {projectCategories.map(cat => {
                                const categoryData = projectsData.project_categories[cat];
                                return categoryData ? (
                                    <div key={cat} className="project-category" style={{ color: categoryData.color }}>
                                        <Icon icon={categoryData.icon} height={16} />
                                        {categoryData.name}
                                    </div>
                                ) : null;
                            })}
                        </div>
                        <div className="project-status">
                            <span className={`status-badge ${project.status}`}>
                                {project.status}
                            </span>
                        </div>
                    </div>
                    
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.short_description}</p>
                    
                    <div className="project-technologies">
                        {project.technologies.slice(0, 4).map(tech => {
                            const techData = projectsData.technology_stack[tech];
                            return techData ? (
                                <div key={tech} className="tech-badge" title={techData.name}>
                                    <Icon icon={techData.icon} color={techData.color} height={20} />
                                </div>
                            ) : null;
                        })}
                        {project.technologies.length > 4 && (
                            <span className="tech-more">+{project.technologies.length - 4}</span>
                        )}
                    </div>
                    
                    <div className="project-links">
                        {project.paper_url && (
                            <a href={project.paper_url} target="_blank" rel="noopener noreferrer" className="project-link">
                                <Icon icon="hugeicons:file-02" height={16} />
                                Paper
                            </a>
                        )}
                        {project.github_url && (
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link">
                                <Icon icon="akar-icons:github-fill" height={16} />
                                Code
                            </a>
                        )}
                        {project.demo_url && (
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="project-link">
                                <Icon icon="hugeicons:external-link" height={16} />
                                Demo
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };

    const ProjectModal = ({ project, onClose }) => {
        if (!project) return null;

        // Handle both single category (string) and multiple categories (array)
        const projectCategories = Array.isArray(project.category) 
            ? project.category 
            : [project.category];

        // Helper function to determine if URL is external
        const getImageSrc = (imageUrl) => {
            if (!imageUrl) return '';
            // Check if it's an external URL (starts with http:// or https://)

            if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
                return imageUrl;
            }
            // Otherwise, treat as local path
            return `${process.env.PUBLIC_URL}/${imageUrl}`;
        };

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
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                >
                    <button className="modal-close" onClick={onClose}>
                        <Icon icon="hugeicons:cancel-01" height={24} />
                    </button>
                    
                    <div className="modal-header">
                        <div className="project-categories">
                            {projectCategories.map(cat => {
                                const categoryData = projectsData.project_categories[cat];
                                return categoryData ? (
                                    <div key={cat} className="project-category" style={{ color: categoryData.color }}>
                                        <Icon icon={categoryData.icon} height={20} />
                                        {categoryData.name}
                                    </div>
                                ) : null;
                            })}
                        </div>
                        <h2>{project.title}</h2>
                        <p>{project.short_description}</p>
                    </div>
                    
                    {/* {console.log(project)} */}

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
                                    <Icon icon="hugeicons:file-02" height={20} />
                                    Read Paper
                                </a>
                            )}
                            {project.github_url && (
                                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="action-button secondary">
                                    <Icon icon="akar-icons:github-fill" height={20} />
                                    View Code
                                </a>
                            )}
                            {project.demo_url && (
                                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="action-button secondary">
                                    <Icon icon="hugeicons:external-link" height={20} />
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
            animate={inView ? "visible" : "hidden"}
        >
            <div className="container">
                <motion.div className="projects-header-block" variants={itemVariants}>
                    <span className="section-eyebrow">Work</span>
                    <h1>Featured Projects</h1>
                </motion.div>

                <motion.div className="category-filters" variants={itemVariants}>
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category === 'all' ? (
                                <>
                                    <Icon icon="hugeicons:grid-view" height={16} />
                                    All Projects
                                </>
                            ) : (
                                <>
                                    <Icon icon={projectsData.project_categories[category].icon} height={16} />
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