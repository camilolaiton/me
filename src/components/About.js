import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import '../css/About.css';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="about-section-header"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="about-kicker-row">
            <span className="sec-num">§05</span>
            <span className="about-kicker-line" aria-hidden="true" />
            <span className="about-kicker-label">About</span>
          </div>
          <h2 className="about-title">
            <span className="about-title-accent">Machine learning and computer vision</span> engineer, research to production.
          </h2>
        </motion.div>

        <motion.div
          className="about-body"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="about-text">
            <p>
              Camilo Laiton is a machine learning and computer vision engineer with an M.Sc. in Computer Science from the{' '}
              <a href="https://medellin.unal.edu.co/" target="_blank" rel="noreferrer">
                National University of Colombia — Medellín
              </a>.
              His research was conducted under the supervision of{' '}
              <a href="https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000479918" target="_blank" rel="noreferrer">
                Prof. German Sanchez
              </a>{' '}and{' '}
              <a href="https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000027090" target="_blank" rel="noreferrer">
                Prof. Jhon Branch
              </a>.
            </p>

            <p>
              He received the B.S. degree from the University of Magdalena in 2020,
              graduating with highest honors.
            </p>

            <p>
              He specializes in deep learning and cloud-scale image processing for microscopy,
              building production systems that transform raw imaging data into biological insight.
            </p>

            <p>
              At the{' '}
              <a href="https://alleninstitute.org/person/camilo-laiton/" target="_blank" rel="noreferrer">
                Allen Institute
              </a>
              , he has led and scaled whole-brain processing pipelines beyond 3 PB,
              improving cost, speed, and registration accuracy while delivering open-source tools for
              atlas registration, cell and mRNA analysis, and protein prediction in light-sheet microscopy.
            </p>
          </div>

          <aside className="about-marginalia">
            <div className="marginalia-item">
              <span className="marginalia-label">Current focus</span>
              <ul className="marginalia-list">
                <li>Foundational model for lightsheet brain microscopy</li>
                <li>Scalable protein localization from pan-protein signal</li>
              </ul>
            </div>
            <div className="marginalia-item">
              <span className="marginalia-label">Based in</span>
              <span className="marginalia-value">Seattle, WA</span>
            </div>
            <div className="marginalia-item">
              <span className="marginalia-label">Open to</span>
              <span className="marginalia-value">Collaborations · Research</span>
            </div>
          </aside>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
