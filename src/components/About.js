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
          <h1 className="about-title">
            <span className="about-title-accent">Computer vision</span> engineer, research to production.
          </h1>
        </motion.div>

        <motion.div
          className="about-body"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="about-text">
            <p>
              Camilo Laiton is a Computer Vision Engineer with a Masters in Computer Science at the{' '}
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
              He has deep expertise in large-scale image processing, deep learning, and computer vision —
              building systems that turn raw microscopy data into biological insight at petabyte scale.
            </p>

            <p>
              At the{' '}
              <a href="https://alleninstitute.org/person/camilo-laiton/" target="_blank" rel="noreferrer">
                Allen Institute
              </a>
              , he leads scalable computer vision infrastructure for neuroscience: whole-brain cell
              detection pipelines, atlas registration, mRNA identification, and foundational models for
              lightsheet microscopy data.
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
