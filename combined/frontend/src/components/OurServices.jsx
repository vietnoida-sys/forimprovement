import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, FileCheck } from 'lucide-react';
import './OurServices.css';
// 1. Import motion from framer-motion
import { motion } from 'framer-motion';

export default function OurServices() {

  const services = [
    {
      id: 1,
      title: "Course Advice",
      description:
        "Our expert counsellors assist you in selecting the correct program that is tailored to your career aspirations.",
      imageUrl:
        "https://images.pexels.com/photos/8199159/pexels-photo-8199159.jpeg",
      path: "/courseAdvice",
      icon: <BookOpen size={22} color="#ffffff" />
    },

    {
      id: 2,
      title: "Shortlist Universities",
      description:
        "After choosing the right course, our advisors help you match your personal, academic, and financial profile to ideal universities.",
      imageUrl:
        "https://images.pexels.com/photos/37836828/pexels-photo-37836828.jpeg",
      path: "/ShortlistUniversities",
      icon: <GraduationCap size={22} color="#ffffff" />
    },

    {
      id: 3,
      title: "Visa Assistance",
      description:
        "We will walk you through the application process and assist you in preparing documentation for a successful visa outcome.",
      imageUrl:
        "https://images.pexels.com/photos/32642486/pexels-photo-32642486.jpeg",
      path: "/visaAssistance",
      icon: <FileCheck size={22} color="#ffffff" />
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">

        {/* 2. Animate the Header (Fades down smoothly) */}
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Our <span className="italic-title">Services</span>
          </h2>

          <p>
            As your dedicated study abroad consultant,
            we offer the following tailored services
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="services-grid">

          {services.map((service, index) => (
            /* 3. Wrap each card link inside motion.div for staggered slide-up animation */
            <motion.div
              key={service.id}
              className="service-card-wrapper"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.5, delay: index * 0.15 }} // Delays each card for a cascade effect
              style={{ display: 'flex', width: '100%' }} // Maintains CSS flex/grid layout
            >
              <Link
                to={service.path}
                className="service-card-link"
                style={{ width: '100%' }}
              >
                <div className="service-card">

                  <div className="service-image-wrapper">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="service-img"
                    />

                    <div className="service-icon-badge">
                      {service.icon}
                    </div>
                  </div>

                  <div className="service-content">
                    <h3 className="service-title">
                      {service.title}
                    </h3>

                    <p className="service-description">
                      {service.description}
                    </p>

                    <button className="btn-read-more">
                      Read More →
                    </button>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}