import React from 'react';
import { Link } from 'react-router-dom';
import './StudyAbroadFeatures.css';
// 1. Import motion from framer-motion
import { motion } from 'framer-motion';

// 2. Variants for the parent container to trigger staggered animations on children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Delay gap between each inner element
      delayChildren: 0.05    // Delay before the first element begins animating
    }
  }
};

// 3. Slide-up animation for text elements (h1, h2, h3, h4, p, span, button)
const textVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// 4. Zoom-in/scale-in animation for images and SVG circles
const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function StudyAbroadFeatures() {

  const studentBannerImg =
    "https://images.pexels.com/photos/35444254/pexels-photo-35444254.jpeg";

  const steps = [
    {
      id: 1,
      title: "Study Destination",
      path: "/CanadaDestination",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      title: "Course Selection",
      path: "/courseAdvice",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      title: "Scholarship Guidance",
      path: "/Scholarships",
      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 4,
      title: "VISA Process",
      path: "/visaAssistance",
      img: "https://images.pexels.com/photos/33497885/pexels-photo-33497885.jpeg"
    }
  ];

  const benefits = [
    {
      title: "Comprehensive Support",
      desc: "As a top-rated study abroad consultant in India, we provide end-to-end services including course advice, university short-listing, application assistance, visa processing and pre-departure guidance.",
      img: "https://images.pexels.com/photos/8866736/pexels-photo-8866736.jpeg"
    },
    {
      title: "Personalized Guidance",
      desc: "We understand that each student's goals, background and budget are unique. Our experts help match you to the right country, university and course.",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "End-to-End Guidance",
      desc: "We offer complete support from shortlisting universities to visa preparation and pre-departure assistance.",
      img: "https://images.pexels.com/photos/7876035/pexels-photo-7876035.jpeg"
    },
    {
      title: "Wide Network & Global Reach",
      desc: "With partnerships with 400+ institutions in 10+ countries, we ensure access to top universities worldwide.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Local Presence",
      desc: "Meet our mentors in your city and get personalized support for your study abroad journey.",
      img: "https://images.pexels.com/photos/8828418/pexels-photo-8828418.jpeg"
    },
    {
      title: "Track Record of Success",
      desc: "Thousands of successful students and years of experience helping achieve global education dreams.",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="features-page-wrapper">

      {/* Hero Section */}
      <section className="hero-finder-container">

        <div className="finder-flex-row">

          {/* Left Card content (Staggered image and text reveal) */}
          <motion.div 
            className="finder-left-card"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: "some" }}
          >
            <motion.div className="finder-img-wrap" variants={scaleVariants}>
              <img src={studentBannerImg} alt="Student holding books" />
            </motion.div>

            <motion.div className="finder-text-wrap" variants={containerVariants}>
              <motion.h2 variants={textVariants}>Find My Dream University</motion.h2>
              <motion.p variants={textVariants}>Shortlist Universities With Our Course Finder</motion.p>

              <motion.div variants={textVariants}>
                <Link to="/universitypartner">
                  <button className="btn-shortlist">
                    Shortlist Universities
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content (h1, span, course finder box and button animate separately) */}
          <motion.div 
            className="finder-right-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: "some" }}
          >
            <motion.span className="sub-title" variants={textVariants}>
              📖 FIND MY DREAM UNIVERSITY
            </motion.span>

            <motion.h1 variants={textVariants}>
              Shortlist Universities With Our <br />
              <span>Course Finder</span>
            </motion.h1>

            <motion.div className="course-finder-box" variants={textVariants}>
              <p>
                Explore our advanced Course Finder to look for the course
                that is the right fit for you.
              </p>

              <motion.span className="bg-number" variants={scaleVariants}>99</motion.span>
            </motion.div>

            <motion.div variants={textVariants}>
              <Link to="/universitypartner">
                <button className="btn-click-here">
                  CLICK HERE ➔
                </button>
              </Link>
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Banner (Fades up with inner text sequence) */}
        <motion.div 
          className="location-consultant-banner"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
        >
          <motion.h3 variants={textVariants}>
            Find a <span>Study Abroad Consultant</span> Near Me
          </motion.h3>

          <motion.p variants={textVariants}>
            If you're searching for a study abroad consultant near me,
            locate your city branch on our website and book an appointment.
            Our local presence ensures you get in-person counselling and
            trusted guidance.
          </motion.p>
        </motion.div>

      </section>

      {/* Steps Section */}
      <section className="steps-section">

        {/* Header Animation */}
        <motion.div 
          className="section-header-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
        >
          <motion.span className="sub-tag" variants={textVariants}>
            VIET WORLDGATE EXPERTISE
          </motion.span>

          <motion.h2 variants={textVariants}>
            Easy Steps to{" "}
            <span className="purple-highlight italic-bold">
              Study Abroad
            </span>
          </motion.h2>
        </motion.div>

        {/* Steps Grid: Each card fades up individually */}
        <motion.div 
          className="steps-row"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={textVariants} // Each card slides up
              whileHover={{ y: -5, scale: 1.02 }} // Gentle hover effect
              style={{ display: "flex" }} 
            >
              <Link
                to={step.path}
                className="step-circle-card"
                style={{ textDecoration: "none", color: "inherit", width: "100%" }}
              >
                <div className="circle-animation-wrapper">
                  <svg className="animated-ring-svg" viewBox="0 0 100 100">
                    <circle className="bg-ring" cx="50" cy="50" r="47" />
                    <circle className="fill-ring" cx="50" cy="50" r="47" />
                  </svg>

                  {/* Inside image zoom-in effect */}
                  <motion.div className="circle-image-inner" variants={scaleVariants}>
                    <img src={step.img} alt={step.title} />
                  </motion.div>
                </div>

                <motion.h4 className="step-card-title" variants={textVariants}>
                  {step.title}
                </motion.h4>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </section>

      {/* Benefits Section */}
      <section className="why-choose-section">

        {/* Header Animation */}
        <motion.div 
          className="section-header-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Why Choose Us as Your{" "}
            <span className="purple-highlight italic-bold">
              Study Abroad Education
            </span>{" "}
            Consultant
          </h2>
        </motion.div>

        {/* Benefits Grid: Animating cards on scroll */}
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx} 
              className="benefit-horizontal-card"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: "some" }}
              whileHover={{ scale: 1.01 }} // Subtle hover scale
            >
              {/* Image side slide-in */}
              <motion.div className="benefit-img-side" variants={scaleVariants}>
                <img src={benefit.img} alt={benefit.title} />
              </motion.div>

              {/* Text elements (h3, p) slide up sequentially */}
              <motion.div className="benefit-text-side" variants={containerVariants}>
                <motion.h3 variants={textVariants}>{benefit.title}</motion.h3>
                <motion.p variants={textVariants}>{benefit.desc}</motion.p>
              </motion.div>

            </motion.div>
          ))}
        </div>

      </section>

    </div>
  );
}