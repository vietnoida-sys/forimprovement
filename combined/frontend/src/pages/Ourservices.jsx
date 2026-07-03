// OurServices.jsx
import React from "react";
import "./OurServices.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Course Advice",
    description:
      "Our expert counsellors assist you in selecting the correct program that is the right fit for you and help you navigate your academic journey with confidence.",
    img: "https://images.pexels.com/photos/30677597/pexels-photo-30677597.jpeg",
    alt: "Counsellor advising a student",
    link: "/CourseAdvice",
  },
  {
    id: 2,
    title: "Shortlist Universities",
    description:
      "After choosing the right course, our advisors help you match your personal, academic, and financial profiles to the right university.",
    img: "https://images.pexels.com/photos/17099655/pexels-photo-17099655.jpeg",
    alt: "Student reviewing university notes",
    link: "/ShortlistUniversities",
  },
  {
    id: 3,
    title: "Visa Assistance",
    description:
      "We will walk you through the application process and assist you in preparing the necessary paperwork for your visa submission.",
    img: "https://images.pexels.com/photos/8061986/pexels-photo-8061986.jpeg",
    alt: "Visa application documents on desk",
    link: "/VisaAssistance",
  },
  {
    id: 4,
    title: "Pre-departure Guidelines",
    description:
      "Congratulations on your upcoming study abroad adventure! We know it can be daunting to move to a new country — we'll make sure you're fully prepared.",
    img: "https://images.pexels.com/photos/12767103/pexels-photo-12767103.jpeg",
    alt: "Travel planning with a map and airplane",
    link: "/PreDeparture",
  },
];

export default function OurServices() {
  
  // ── PR LEVEL STAGGER CONFIGURATION (FOR SECTION & CARD WRAPPERS) ──
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      }
    }
  };

  // Card items and standalone section headings animation
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  // ── CARD INNER CONTENT STAGGER (FOR HEADINGS, PARAGRAPHS, BUTTONS) ──
  const cardContentContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Controls delay between heading -> paragraph -> button
      }
    }
  };

  const cardContentItem = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  const viewportConfig = { once: true, amount: 0.15 };

  return (
    <> 
      <Navbar />
      <main>
        {/* ── Hero Banner ── */}
        <section className="services-heros" aria-label="Our Services banner">
          <img
            className="services-heros__img"
            src="https://images.pexels.com/photos/4977346/pexels-photo-4977346.jpeg"
            alt="Happy diverse group of students"
          />
          <div className="services-heros__overlay" />
          <div className="services-heros__content">
            <nav className="services-heros__breadcrumb" aria-label="Breadcrumb">
              {/* Optional Breadcrumb items */}
            </nav>
          </div>
        </section>

        {/* ── Services Section ── */}
        <section className="servicess-section">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.h2 className="servicess-section__heading" variants={itemVariants}>
              Our <span>Services</span>
            </motion.h2>
          </motion.div>

          <motion.div 
            className="servicess-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {services.map((svc) => (
              <motion.article 
                className="services-card" 
                key={svc.id}
                variants={itemVariants}
              >
                {/* Image Wrapper */}
                <div className="services-card__img-wrapper">
                  <img
                    className="services-card__img"
                    src={svc.img}
                    alt={svc.alt}
                    loading="lazy"
                  />
                </div>

                {/* Card Body - Injected Stagger for Inner Content fixed successfully */}
                <motion.div 
                  className="services-card__body"
                  variants={cardContentContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.h3 className="services-card__title" variants={cardContentItem}>
                    {svc.title}
                  </motion.h3>
                  
                  <motion.p className="services-card__desc" variants={cardContentItem}>
                    {svc.description}
                  </motion.p>
                  
                  <motion.a href={svc.link} className="services-card__btn" variants={cardContentItem}>
                    Read More
                  </motion.a>
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}