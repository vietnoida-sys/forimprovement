import React, { lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import BritishCouncilLogo from "../assets/bclogo.jpg";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

// Lazy-load below-the-fold components to reduce initial JS bundle
// and improve Total Blocking Time (TBT)
const StudyDestinations = lazy(() => import("../components/StudyDestinations"));
const StudyAbroadLayouts = lazy(() => import("../components/StudyAbroadLayouts"));
const StudyAbroadFeatures = lazy(() => import("../components/StudyAbroadFeatures"));
const OurServices = lazy(() => import("../components/OurServices"));
const StudyAbroad = lazy(() => import("../components/StudyAbroad"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const FaqSection = lazy(() => import("../components/FaqSection"));

// NOTE: removed unused import of "../assets/story6.mp4" (logo9) —
// it was never used in JSX and was adding dead weight to the bundle.

// 1. Updated FadeUp with a lower y-offset and "some" viewport threshold
const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: delay }}
    viewport={{ once: true, amount: "some" }} // Triggers as soon as the element enters the viewport
  >
    {children}
  </motion.div>
);

const stats = [
  { num: "200+", label: "Institutions Worldwide" },
  { num: "7+", label: "Branches" },
  { num: "2600+", label: "Students Placed" },
  { num: "6+", label: "Years Experience" },
];

function Dashboard() {
  return (
    <>
      <SEO
        title="Best Study Abroad & Vietnam Visa Consultant in Delhi | VietWorldGate"
        description="VietWorldGate is a trusted study abroad and Vietnam visa consultant in Delhi, offering student visa guidance, tourist visa support, and post-study work visa assistance for Australia, UK, New Zealand, Japan, and Vietnam."
        keywords="study abroad consultant delhi, study visa consultant delhi,  student visa delhi, best overseas education consultant delhi, post study work visa consultant delhi, study abroad consultants near me"
        url="https://vietworldgate.com/"
        image="https://www.vietworldgate.com/public/vietworldgate.png"
      />
      <Navbar />

      {/* TRUST BAR */}
      <motion.section
        className="trust-bar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="trust-container">
          <div className="trust-right">
            <img
              src={BritishCouncilLogo}
              alt="British Council Certified Study Abroad Consultant"
              width="120"
              height="60"
            />
            <Link to="/Certificate">
              <span>Certified by British Council</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-slider">
          {/*
            PERFORMANCE NOTE:
            These images are still loading from Pexels/Unsplash (third-party domains).
            For a real LCP improvement, download these, compress to WebP,
            and host them from /public or your CDN, e.g. "/images/hero-study-abroad.webp".
            Until then, at minimum:
            - fetchpriority="high" + eager loading on the FIRST (LCP) image
            - explicit width/height on all three to prevent layout shift (CLS)
            - lazy loading on the 2nd/3rd slide images since they aren't visible first
          */}
          <img
            src="https://images.pexels.com/photos/7018490/pexels-photo-7018490.jpeg"
            alt="Study Abroad Consultant Delhi - VietWorldGate"
            className="slide"
            width="1920"
            height="1080"
            fetchpriority="high"
            loading="eager"
          />
          <img
            src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070"
            alt="University Study Abroad Options"
            className="slide"
            width="1920"
            height="1080"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
            alt="International Students Studying Abroad"
            className="slide"
            width="1920"
            height="1080"
            loading="lazy"
          />
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          {/* HERO LEFT */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -50 }} // Slightly reduced x-offset for better mobile scaling
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="tag">
              POST STUDY WORK RIGHT – AUSTRALIA, UK, NEW ZEALAND, JAPAN, RUSSIA
            </span>
            <h1>
              Best Study Abroad & Vietnam Visa Consultant in Delhi
              <br />
              Extend Your Stay and Work After Graduation
            </h1>
            <p>
              VietWorldGate is a trusted study abroad and Vietnam visa
              consultant based in Delhi, helping students explore
              world-class universities and build their future with global
              education opportunities.
            </p>

            <div className="button-container">
              <button className="compare-btn">
                <Link to="/CompareUniversity">Compare tool</Link>
              </button>
            </div>
          </motion.div>

          {/* WHATSAPP BOX */}
          <motion.div
            className="appointment-box"
            initial={{ opacity: 0, x: 50 }} // Slightly reduced x-offset
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="whatsapp-contact">
              <h3>Talk With Our Expert</h3>
              <p>
                Get free counselling for study abroad, visa guidance,
                admission process, and career opportunities abroad.
              </p>
              <Link to="/consultationform" className="whatsapp-btn">
                Book Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map(function (stat, i) {
            return (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }} // Reduced y-offset from 40 to 20
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, amount: "some" }} // Changed from 0.3 to "some"
              >
                <h2>{stat.num}</h2>
                <p>{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* BAAKI SECTIONS - lazy loaded to reduce initial bundle size */}
      <Suspense fallback={<div style={{ minHeight: 200 }} />}>
        <FadeUp>
          <StudyDestinations />
        </FadeUp>
        <FadeUp delay={0.1}>
          <StudyAbroadLayouts />
        </FadeUp>
        <FadeUp delay={0.1}>
          <StudyAbroadFeatures />
        </FadeUp>
        <FadeUp delay={0.1}>
          <OurServices />
        </FadeUp>
        <FadeUp delay={0.1}>
          <StudyAbroad />
        </FadeUp>
        <FadeUp delay={0.1}>
          <Testimonials />
        </FadeUp>
        <FadeUp delay={0.1}>
          <FaqSection />
        </FadeUp>
      </Suspense>

      <Footer />
    </>
  );
}

export default Dashboard;