import React from "react";
import { Link } from "react-router-dom";
import "./Testimonials.css";
import { FaStar, FaUser } from "react-icons/fa";
// 1. Import motion from framer-motion
import { motion } from "framer-motion";

// 2. Variants for staggering card entries
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each testimonial card's entry
      delayChildren: 0.05
    }
  }
};

// 3. Smooth slide-up transition for headers, names, and paragraphs
const textRevealVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// 4. Subtle scale-in transition for avatars and icons
const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Testimonials = () => {

  const reviews = [
    {
      id: 1,
      name: "Aman Sharma",
      country: "United Kingdom",
      rating: 5,
      text:
        "Studying in the UK was always my dream, but I was confused about admissions, scholarships, and visa procedures. The team at VIET Worldgate guided me professionally throughout the entire process."
    },
    {
      id: 2,
      name: "Priya Verma",
      country: "Canada",
      rating: 5,
      text:
        "I was confused about my career options after graduation, but the counselors at VIET Worldgate guided me properly according to my interests and goals."
    },
    {
      id: 3,
      name: "Rahul Singh",
      country: "Australia",
      rating: 5,
      text:
        "My admission process was handled very professionally by VIET Worldgate. The staff was supportive, transparent, and always available to answer my questions."
    }
  ];

  return (
    <section className="testimonials-section">

      {/* HEADER SECTION */}
      <motion.div 
        className="testimonials-header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.6 }}
      >
        <h2>
          Student{" "}
          <span className="italic-lime">
            Reviews & Feedback
          </span>
        </h2>
      </motion.div>

      {/* CONTAINER SECTION */}
      <div className="testimonials-container">

        {/* STAGGERED GRID OF CARDS */}
        <motion.div 
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className="testimonial-card"
              variants={textRevealVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              {/* LEFT ACCENT LINE */}
              <div className="card-accent-line"></div>

              {/* USER ICON (Animates scale inside the card) */}
              <motion.div 
                className="user-icon-circle"
                variants={scaleInVariants}
              >
                <FaUser className="user-avatar" />
              </motion.div>

              {/* TEXT CONTENT */}
              <div className="card-content">
                <h3 className="user-name">
                  {review.name}
                </h3>

                <span className="review-country">
                  {review.country}
                </span>

                {/* STARS (Smooth scaling pop-in) */}
                <motion.div 
                  className="stars-container"
                  variants={scaleInVariants}
                >
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="star-icon"
                    />
                  ))}
                </motion.div>

                {/* REVIEW PARAGRAPH */}
                <p className="review-text">
                  “{review.text}”
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* VIEW ALL BUTTON (Fades and slides up last) */}
        <motion.div 
          className="view-all-wrapper"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/feedback">
            <button className="view-all-btn">
              VIEW ALL
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;