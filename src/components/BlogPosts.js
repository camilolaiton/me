import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@iconify/react';
import '../css/BlogPosts.css';

const MEDIUM_FEED_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@camilolaitonb';
const MAX_POSTS = 3;

const stripHtml = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const SkeletonCard = () => (
  <div className="blog-card blog-card--skeleton">
    <div className="blog-card__thumb skeleton-box" />
    <div className="blog-card__body">
      <div className="skeleton-line skeleton-line--wide" />
      <div className="skeleton-line" />
      <div className="skeleton-line skeleton-line--short" />
    </div>
  </div>
);

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch(MEDIUM_FEED_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          setPosts(data.items.slice(0, MAX_POSTS));
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (!loading && (error || posts.length === 0)) return null;

  const toWord = (value) => {
    const words = {
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
    return words[value] || `${value}`;
  };

  const visiblePostCount = loading ? MAX_POSTS : posts.length;
  const blogLead = toWord(visiblePostCount);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.section
      className="blog-posts"
      id="blog-posts"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="container">
        <motion.div className="blog-section-header" variants={itemVariants}>
          <div className="blog-kicker-row">
            <span className="sec-num">§08</span>
            <span className="blog-kicker-line" aria-hidden="true" />
            <span className="blog-kicker-label">From My Blog</span>
          </div>
          <h2 className="blog-section-title">
            {/* <span className="blog-title-accent">{blogLead} posts</span>, on machine learning and computer vision. */}
            <span className="blog-title-accent">Thoughts on</span> machine learning and computer vision at scale.
          </h2>
        </motion.div>

        <motion.div className="blog-grid" variants={containerVariants}>
          {loading
            ? Array.from({ length: MAX_POSTS }).map((_, i) => <SkeletonCard key={i} />)
            : posts.map((post, i) => (
                <motion.a
                  key={i}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-card"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className="blog-card__thumb">
                    {post.thumbnail ? (
                      <img src={post.thumbnail} alt={post.title} loading="lazy" />
                    ) : (
                      <div className="blog-card__thumb-placeholder">
                        <Icon icon="simple-icons:medium" height={40} />
                      </div>
                    )}
                  </div>
                  <div className="blog-card__body">
                    {post.categories.length > 0 && (
                      <div className="blog-card__tags">
                        {post.categories.slice(0, 3).map((tag, j) => (
                          <span key={j} className="blog-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__excerpt">
                      {stripHtml(post.description).slice(0, 150).trim()}…
                    </p>
                    <div className="blog-card__footer">
                      <span className="blog-card__date">
                        <Icon icon="bi:calendar3" height={12} />
                        {formatDate(post.pubDate)}
                      </span>
                      <span className="blog-card__read">Read →</span>
                    </div>
                  </div>
                </motion.a>
              ))}
        </motion.div>

        <motion.div className="blog-cta" variants={itemVariants}>
          <a
            href="https://medium.com/@camilolaitonb"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-cta__btn"
          >
            <Icon icon="simple-icons:medium" height={18} />
            View all posts on Medium
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BlogPosts;
