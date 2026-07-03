import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./StudyAbroadLayouts.css";
// Import motion and AnimatePresence for clean transitions and exit animations
import { motion, AnimatePresence } from "framer-motion";

import logo1 from "../assets/story1video.mp4";
import logo2 from "../assets/story2video.MOV";
import logo3 from "../assets/story3video.mp4";
import logo4 from "../assets/story4video.mp4";
import logo5 from "../assets/story5video.mp4";
import logo6 from "../assets/story6.mp4";
import logo7 from "../assets/story7.mp4";
import logo8 from "../assets/story8.mp4";
import logo9 from "../assets/story9.mp4";
// 1. Parent container variants to stagger animation on children elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05
    }
  }
};

// 2. Smooth reveal transitions for headers, subtitles, and standard copy
const textRevealVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// 3. Gentle scaling transitions for images, icons, and frames
const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" }
  }
};

export default function StudyAbroadLayouts() {
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [storyIndex, setStoryIndex]         = useState(0);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [windowWidth, setWindowWidth]       = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const autoPlayRef   = useRef(null);
  const storyTimerRef = useRef(null);

  // Track window width so counts stay accurate on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive card counts
  const getVisibleStoryCount = useCallback(() => {
    if (windowWidth < 576)  return 1;   
    if (windowWidth < 1025) return 2;   
    return 3;                            
  }, [windowWidth]);

  const getVisibleVisitCount = useCallback(() => {
    if (windowWidth < 576)  return 1;   
    if (windowWidth < 1025) return 2;   
    return 3;                            
  }, [windowWidth]);

  // Reset index when visible count changes
  useEffect(() => { setStoryIndex(0);   }, [getVisibleStoryCount]);
  useEffect(() => { setCurrentIndex(0); }, [getVisibleVisitCount]);

  // DATA
  const testimonials = [
    { id: 1, name: "Vibhu Patel",    img: logo1, isVideo: true },
    { id: 2, name: "Lakshya Sharma", img: logo2, isVideo: true },
    { id: 3, name: "Ishita Verma",   img: logo3, isVideo: true },
    { id: 4, name: "Dharshini",      img: logo4, isVideo: true },
    { id: 5, name: "Shafquat",       img: logo5, isVideo: true },
      { id: 6, name: "Ishita",       img: logo6, isVideo: true },
        { id: 7, name: "Ishita",       img: logo7, isVideo: true },
          { id: 8, name: "Gopi",       img: logo8, isVideo: true },
           { id: 9, name: "University of Chester",       img: logo9, isVideo: true },
  ];

  const universityVisits = [
    {
      id: 1,
      title: "Coventry University",
      date: "18th May 2026, 03:30 PM to 04:30 PM",
      speaker: "Mr. Gaurav Singh",
      branch: "VIET WORLDGATE-Amritsar (Office)",
      type: "University Visits",
      img: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: 2,
      title: "JCU Singapore",
      date: "19th May 2026, 1:00 PM",
      speaker: "Mr. Tanuj Soni",
      branch: "VIET WORLDGATE-Bhutan (Office)",
      type: "University Visits",
      img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: 3,
      title: "Edith Cowan University",
      date: "19th May 2026, 10:00 AM to 12:00 PM",
      speaker: "Ms. Neelam Jain",
      branch: "VIET WORLDGATE-Kochi (Office)",
      type: "University Visits",
      img: "https://tse2.mm.bing.net/th/id/OIP.Vd3ZsTLfGsC0TpYGHqsTcAHaE8?pid=Api&h=220&P=0",
    },
    {
      id: 4,
      title: "Swinburne University",
      date: "20th May 2026, 11:30 AM to 12:30 PM",
      speaker: "Mrs. Prachi Hajela",
      branch: "VIET WORLDGATE-Mumbai, Andheri (Office)",
      type: "University Visits",
      img: "https://www.buildingengineering.com.au/wp-content/uploads/2023/02/Bldg-Eng-University-of-Melbourne-International-House-01-1536x1028.jpg",
    },
    {
      id: 5,
      title: "CQUniversity Australia",
      date: "26th May 2026, 10:00 AM to 11:30 AM",
      speaker: "Ms. Shobhagya Sharma",
      branch: "VIET WORLDGATE-Sri Lanka, Colombo (Office)",
      type: "University Visits",
      img: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: 6,
      title: "University of Toronto",
      date: "28th May 2026, 02:00 PM to 04:00 PM",
      speaker: "Dr. Alan Mercer",
      branch: "VIET WORLDGATE-Delhi (Office)",
      type: "Global Meet",
      img: "https://images.pexels.com/photos/12167748/pexels-photo-12167748.jpeg",
    },
    {
      id: 7,
      title: "Deakin University",
      date: "01st June 2026, 11:00 AM",
      speaker: "Mr. Ryan Reynolds",
      branch: "VIET WORLDGATE-Noida (Office)",
      type: "Admissions Day",
      img: "https://images.pexels.com/photos/19014974/pexels-photo-19014974.jpeg",
    },
    {
      id: 8,
      title: "University of Leeds",
      date: "03rd June 2026, 01:00 PM to 03:00 PM",
      speaker: "Ms. Sarah Jenkins",
      branch: "VIET WORLDGATE-Noida",
      type: "University Visits",
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 9,
      title: "Auckland Tech University",
      date: "05th June 2026, 10:30 AM",
      speaker: "Mr. David Boon",
      branch: "VIET WORLDGATE-Ghaziabad (Office)",
      type: "Scholarship Seminar",
      img: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 10,
      title: "Dublin City University",
      date: "10th June 2026, 04:00 PM",
      speaker: "Ms. Emma Walsh",
      branch: "VIET WORLDGATE-Noida (Office)",
      type: "University Visits",
      img: "https://images.pexels.com/photos/33770005/pexels-photo-33770005.jpeg",
    },
  ];

  // University Visits Slider
  const visibleVisitCount = getVisibleVisitCount();
  const maxVisitIndex     = universityVisits.length - visibleVisitCount;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxVisitIndex ? 0 : prev + 1));
  }, [maxVisitIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxVisitIndex : prev - 1));
  };

  const stopAutoPlay  = () => clearInterval(autoPlayRef.current);
  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(nextSlide, 3000);
  }, [nextSlide]);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay]);

  // Stories Slider
  const visibleStoryCount = getVisibleStoryCount();
  const maxStoryIndex     = testimonials.length - visibleStoryCount;

  const nextStory = useCallback(() => {
    setStoryIndex((prev) => (prev >= maxStoryIndex ? 0 : prev + 1));
  }, [maxStoryIndex]);

  const prevStory = () => {
    setStoryIndex((prev) => (prev <= 0 ? maxStoryIndex : prev - 1));
  };

  const stopStoryPlay  = () => clearInterval(storyTimerRef.current);
  const startStoryPlay = useCallback(() => {
    stopStoryPlay();
    storyTimerRef.current = setInterval(nextStory, 3000);
  }, [nextStory]);

  useEffect(() => {
    startStoryPlay();
    return stopStoryPlay;
  }, [startStoryPlay]);

  // Translate calculations
  const slideTranslateX = currentIndex * (100 / visibleVisitCount);
  const storyTranslateX = storyIndex   * (100 / visibleStoryCount);

  return (
    <div className="layouts-container">

      {/* ══════════════════════════════════════════
          SECTION 1: SUCCESS STORIES — SLIDER
          ══════════════════════════════════════════ */}
      <section className="success-stories-section">
        {/* Animated dark title */}
        <motion.h2 
          className="section-title-dark"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.6 }}
        >
          Success Stories from <span>Our Students</span>
        </motion.h2>

        <motion.div
          className="slider-outer-wrapper"
          onMouseEnter={stopStoryPlay}
          onMouseLeave={startStoryPlay}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.7 }}
        >
          <button
            className="slider-arrow-btn story-arrow left-arrow"
            onClick={prevStory}
            aria-label="Previous story"
          >
            &#10094;
          </button>

          <div className="visits-slider-container">
            <div
              className="visits-slider-track"
              style={{ transform: `translateX(-${storyTranslateX}%)` }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="story-card-wrapper"
                  style={{ flex: `0 0 ${100 / visibleStoryCount}%`, width: `${100 / visibleStoryCount}%` }}
                >
                  <motion.div
                    className="testimonial-cards"
                    onClick={() => item.isVideo && setActiveVideoUrl(item.img)}
                    style={{ cursor: item.isVideo ? "pointer" : "default" }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="video-thumbnail-box">
                      <motion.div 
                        className="circular-video-frame"
                        variants={scaleInVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {item.isVideo ? (
                          <video
                            src={item.img}
                            muted
                            loop
                            playsInline
                            autoPlay
                            preload="auto"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <img src={item.img} alt={item.name} />
                        )}
                        {item.isVideo && <div className="play-btn-overlay">▶</div>}
                      </motion.div>
                    </div>
                    <div className="testimonial-details">
                      <h4 className="testimonial-name">{item.name}</h4>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="slider-arrow-btn story-arrow right-arrow"
            onClick={nextStory}
            aria-label="Next story"
          >
            &#10095;
          </button>
        </motion.div>

        {/* Dot indicators */}
        <div className="slider-dots">
          {Array.from({ length: maxStoryIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`dot ${i === storyIndex ? "dot-active" : ""}`}
              onClick={() => setStoryIndex(i)}
              aria-label={`Go to story ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VIDEO POPUP MODAL (AnimatePresence added for fading overlay and scale-up modal)
          ══════════════════════════════════════════ */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            className="video-modal-overlay"
            onClick={() => setActiveVideoUrl(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", top: 0, left: 0,
              width: "100vw", height: "100vh",
              backgroundColor: "rgba(0,0,0,0.85)",
              zIndex: 9999, display: "flex",
              justifyContent: "center", alignItems: "center",
              backdropFilter: "blur(5px)",
            }}
          >
            <motion.div
              className="video-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              style={{
                position: "relative", width: "90%", maxWidth: "750px",
                backgroundColor: "#000", borderRadius: "12px",
                overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <button
                onClick={() => setActiveVideoUrl(null)}
                style={{
                  position: "absolute", top: "15px", right: "15px",
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff", fontSize: "20px", cursor: "pointer",
                  borderRadius: "50%", width: "36px", height: "36px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  zIndex: 10000,
                }}
              >
                &times;
              </button>
              <video
                key={activeVideoUrl}
                src={activeVideoUrl}
                controls autoPlay playsInline preload="auto"
                style={{ width: "100%", maxHeight: "80vh", display: "block" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          SECTION 2: UPCOMING UNIVERSITY VISITS
          ══════════════════════════════════════════ */}
      <section className="university-visits-section">
        {/* Animated header */}
        <motion.h2 
          className="section-title-dark"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.6 }}
        >
          Upcoming <span>University Visits</span>
        </motion.h2>

        <motion.div
          className="slider-outer-wrapper"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.7 }}
        >
          <button
            className="slider-arrow-btn left-arrow"
            onClick={prevSlide}
            aria-label="Previous visit"
          >
            &#10094;
          </button>

          <div className="visits-slider-container">
            <div
              className="visits-slider-track"
              style={{ transform: `translateX(-${slideTranslateX}%)` }}
            >
              {universityVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="visit-card-wrapper"
                  style={{ flex: `0 0 ${100 / visibleVisitCount}%`, width: `${100 / visibleVisitCount}%` }}
                >
                  {/* Subtle card pop-up on hover */}
                  <motion.div 
                    className="visit-card"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="visit-img-banner">
                      <img src={visit.img} alt={visit.title} />
                    </div>
                    
                    {/* Content inside the card */}
                    <div className="visit-info-body">
                      <h3>{visit.title}</h3>
                      <div className="meta-info-row">
                        <span className="icon">📅</span>
                        <span>{visit.date}</span>
                      </div>
                      <div className="meta-info-row">
                        <span className="icon">👤</span>
                        <span>{visit.speaker}</span>
                      </div>
                      <div className="meta-info-row">
                        <span className="icon">🏢</span>
                        <span>{visit.branch}</span>
                      </div>
                      <div className="meta-info-row">
                        <span className="icon">🎓</span>
                        <span>{visit.type}</span>
                      </div>

                      <Link to="/universitypartner">
                        <button className="btn-read-more-visit">
                          Read More
                          <span className="arrow-circle-visit">➔</span>
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="slider-arrow-btn right-arrow"
            onClick={nextSlide}
            aria-label="Next visit"
          >
            &#10095;
          </button>
        </motion.div>

        {/* Dot indicators */}
        <div className="slider-dots">
          {Array.from({ length: maxVisitIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentIndex ? "dot-active" : ""}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to visit ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3: HOW IT WORKS — TIMELINE
          ══════════════════════════════════════════ */}
      <section className="how-it-works-section">
        {/* Animated header */}
        <motion.h2 
          className="section-title-light"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.6 }}
        >
          How It Works - <span>Your Journey Simplified</span>
        </motion.h2>

        {/* Timeline wrapper to trigger stagger animations for steps */}
        <motion.div 
          className="timeline-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
        >
          {/* Timeline Step 1 */}
          <motion.div className="timeline-step" variants={textRevealVariants}>
            <div className="icon-circle-wrapper">
              <motion.span className="step-icon" variants={scaleInVariants}>💼</motion.span>
              <div className="step-number-badge">1</div>
            </div>
            <div className="step-content-box">
              <h4>Initial Counselling</h4>
              <p>Book a free consultation with one of our expert advisors.</p>
            </div>
          </motion.div>

          {/* Timeline Step 2 */}
          <motion.div className="timeline-step" variants={textRevealVariants}>
            <div className="icon-circle-wrapper">
              <motion.span className="step-icon" variants={scaleInVariants}>📋</motion.span>
              <div className="step-number-badge">2</div>
            </div>
            <div className="step-content-box">
              <h4>Planning &amp; Shortlisting</h4>
              <p>We help you shortlist universities and courses.</p>
            </div>
          </motion.div>

          {/* Timeline Step 3 (Active Class) */}
          <motion.div className="timeline-step active" variants={textRevealVariants}>
            <div className="icon-circle-wrapper">
              <motion.span className="step-icon" variants={scaleInVariants}>📝</motion.span>
              <div className="step-number-badge">3</div>
            </div>
            <div className="step-content-box">
              <h4>Application &amp; Documentation</h4>
              <p>We assist with SOPs, transcripts and applications.</p>
            </div>
          </motion.div>

          {/* Timeline Step 4 */}
          <motion.div className="timeline-step" variants={textRevealVariants}>
            <div className="icon-circle-wrapper">
              <motion.span className="step-icon" variants={scaleInVariants}>🛂</motion.span>
              <div className="step-number-badge">4</div>
            </div>
            <div className="step-content-box">
              <h4>Visa Process</h4>
              <p>Complete visa guidance and interview preparation.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}