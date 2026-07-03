import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Gift,
  FileText,
  Calendar,
  BookOpen,
  Users,
} from "lucide-react";
import "./StudyAbroad.css";
import { motion } from "framer-motion";

// 1. parent container के लिए variants जो बच्चों (children) को एक-एक करके लोड करेगा
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // हर अंदरूनी element के बीच का gap (delay)
      delayChildren: 0.1     // पहला element शुरू होने का delay
    }
  }
};

// 2. अंदर के h2, p, button आदि elements के लिए slide-up animation
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// 3. Grid cards के अंदरूनी आइकॉन और टेक्स्ट के लिए pop-in animation
const cardInnerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export default function StudyAbroad() {
  const routes = [
    { 
      title: "University", 
      icon: <GraduationCap className="route-icon" />,
      path: "/universitypartner",
      isExternal: false
    },
    { 
      title: "Scholarships", 
      icon: <Gift className="route-icon" />, 
      path: "/Scholarships", 
      isExternal: false
    },
    { 
      title: "Post Study Work Permit", 
      icon: <FileText className="route-icon" />,
      path: "#",
      isExternal: false
    },
    { 
      title: "Book Your Appointment", 
      icon: <Calendar className="route-icon" />,
      path: "https://docs.google.com/forms/d/e/1FAIpQLSefWVUVnbBT3GSCLjJM9bKP7hymqVhPTHbixEvbltPcJtVbMA/viewform?usp=publish-editor",
      isExternal: true
    },
    { 
      title: "Course Finder",
      icon: <BookOpen className="route-icon" />,
      path: "/CoursePortal",
      isExternal: false
    },
    { 
      title: "Students Feedback", 
      icon: <Users className="route-icon" />,
      path: "/feedback",
      isExternal: false
    },
  ];

  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSefWVUVnbBT3GSCLjJM9bKP7hymqVhPTHbixEvbltPcJtVbMA/viewform?usp=publish-editor";

  return (
    <div className="study-abroad-container">
      {/* Banner Section */}
      <section className="max-width-wrapper">
        <div className="banner-card">
          {/* Banner Image Side Animation */}
          <motion.div 
            className="banner-image-side"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.6 }}
          >
            <GraduationCap className="banner-lucide-icon" />
          </motion.div>

          {/* Banner Text Side: Animating h2, p, and a separately using variants */}
          <motion.div 
            className="banner-text-side"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: "some" }}
          >
            <motion.h2 variants={itemVariants}>
              Aspiring to Study Abroad?{" "}
              <span className="purple-highlight">We Can Help!</span>
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              Contact us today and our experts will be in touch with you soon.
            </motion.p>
            
            <motion.a 
              href={googleFormUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              variants={itemVariants}
            >
              <button className="btn-primary">Study Abroad?</button>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Routes Section */}
      <section className="dark-bg-section">
        <div className="max-width-wrapper">
          {/* Section Title Animation */}
          <motion.h2 
            className="dark-section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.6 }}
          >
            Discover your route to{" "}
            <span className="lime-highlight italic-bold">International Education</span>
          </motion.h2> 

          <div className="routes-grid">
            {routes.map((route, idx) => {
              const cardContent = (
                <motion.div 
                  className="route-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Card Icon Animation */}
                  <motion.div className="icon-box" variants={cardInnerVariants}>
                    {route.icon}
                  </motion.div>
                  
                  {/* Card Title Animation */}
                  <motion.span className="route-card-title" variants={cardInnerVariants}>
                    {route.title}
                  </motion.span>
                  
                  <div className="corner-cut"></div>
                </motion.div>
              );

              return (
                /* Main grid card animation wrapper */
                <motion.div
                  key={idx}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: "some" }}
                  style={{ display: "flex", width: "100%" }}
                >
                  {route.isExternal ? (
                    <a
                      href={route.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="route-link"
                      style={{ width: "100%" }}
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <Link
                      to={route.path}
                      className="route-link"
                      style={{ width: "100%" }}
                    >
                      {cardContent}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}