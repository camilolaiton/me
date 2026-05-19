import React from 'react';
import '../css/FeaturedOutputs.css';

const images = [
  {
    src: `${process.env.PUBLIC_URL}/images/protein_prediction/protein_prediction.png`,
    alt: 'Deep learning protein prediction from pan-protein signal',
    caption: 'Protein prediction from pan-protein signal. Each dataset ~20-50 TBs in size.',
    span: 'wide',
  },
  {
    src: `${process.env.PUBLIC_URL}/images/large_scale_cellpose/large_scale_inference.png`,
    alt: 'Large-scale Cellpose inference on brain tissue',
    caption: 'Terabyte-scale cell segmentation in Lightsheet microscopy',
    span: 'normal',
  },
  {
    src: `${process.env.PUBLIC_URL}/images/master_thesis/3d_brain.png`,
    alt: '3D reconstruction of a cleared mouse brain',
    caption: '3D brain reconstruction from human MRIs',
    span: 'normal',
  },
  {
    src: `${process.env.PUBLIC_URL}/images/smartspim_pipeline/pipeline_overview.png`,
    alt: 'SmartSPIM image processing pipeline overview',
    caption: 'Automated image processing pipeline for mesoscale terabyte-scale lightsheet microscopy',
    span: 'wide',
  },
];

const FeaturedOutputs = () => (
  <section className="featured-outputs" id="featured-outputs">
    <div className="featured-outputs-inner">
      <div className="featured-outputs-header">
        <div className="featured-outputs-kicker-row">
          <span className="sec-num">§01</span>
          <span className="featured-outputs-kicker-line" aria-hidden="true" />
          <span className="featured-outputs-kicker-label">Representative Outputs</span>
        </div>
        <h2 className="featured-outputs-title">
          What the <span className="featured-outputs-title-accent">pipelines</span> actually produce.
        </h2>
        <p className="featured-outputs-copy">
          Signature outputs from production systems I have developed.
        </p>
      </div>
      <div className="featured-outputs-grid">
        {images.map((img, i) => (
          <figure key={i} className={`featured-figure featured-figure--${img.span}`}>
            <div className="featured-img-wrap">
              <img src={img.src} alt={img.alt} className="featured-img" loading="lazy" />
            </div>
            <figcaption className="featured-figcaption">{img.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedOutputs;
