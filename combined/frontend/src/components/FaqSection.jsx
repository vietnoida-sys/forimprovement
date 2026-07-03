import React, { useState } from 'react';
import './FaqSection.css';
import { FaMinus, FaPlus } from 'react-icons/fa';
// Import AnimatePresence alongside motion for clean exit animations
import { motion, AnimatePresence } from 'framer-motion';

const FaqSection = () => {
  // Pehla item accordion me automatically khula rahega
  const [activeIndex, setActiveIndex] = useState(0);

  const faqData = [
    {
      question: "What is VIET WORLDGATE?",
      answer: "VIET WORLDGATE is a leading overseas education consultancy in India that guides students through every step of the study abroad process—from selecting universities to securing visas."
    },
    {
      question: "How long has VIET WORLDGATE been in operation?",
      answer: "VIET WORLDGATE has been successfully guiding students for over 6+ years with a massive network of global institution partners."
    },
    {
      question: "Which countries does VIET WORLDGATE assist with for overseas education?",
      answer: "We offer comprehensive guidance for top study destinations including Australia, UK, Canada, New Zealand, Germany, Italy, Japan, USA, Ireland, and more."
    },
    {
      question: "How can VIET WORLDGATE help me choose the right university?",
      answer: "Our expert counsellors evaluate your academic profile, budget, and career goals to suggest the most appropriate courses and highly reputed global universities."
    },
    {
      question: "Does VIET WORLDGATE assist with visa applications?",
      answer: "Yes, we provide end-to-end support for documentation, visa file preparation, and mock interview sessions to maximize your success rate."
    },
    {
      question: "Will VIET WORLDGATE support me after I reach my study destination?",
      answer: "Absolutely! We provide pre-departure briefings and assist with accommodation connections and post-arrival networks."
    }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      {/* FAQ Title Animation */}
      <motion.div 
        className="faq-heading-wrapper"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: "some" }}
      >
        <h2>
          Frequently Asked Questions <span className="purple-italic">(FAQ)</span>
        </h2>
      </motion.div>

      <div className="faq-container">
        
        {/* Left Side Artwork (Slides in from the Left) */}
        <motion.div 
          className="faq-left-artwork"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, amount: "some" }}
        >
          <div className="circle-bg-layer layer-1"></div>
          <div className="circle-bg-layer layer-2"></div>
          <img 
            src="https://images.pexels.com/photos/2789781/pexels-photo-2789781.jpeg" 
            alt="Student pointing" 
            className="faq-student-img" 
          />
        </motion.div>

        {/* Right Side Accordion Container */}
        <div className="faq-accordion-wrapper">
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              /* 1. Each individual FAQ Card animates sequentially on scroll */
              <motion.div 
                key={index} 
                className={`faq-item ${isOpen ? 'active' : ''}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.5, delay: index * 0.1 }} // Staggers the cards
              >
                <div 
                  className="faq-header" 
                  onClick={() => toggleFaq(index)}
                >
                  <span className="faq-question">{faq.question}</span>
                  <div className="faq-toggle-icon">
                    {isOpen ? <FaMinus className="icon-m" /> : <FaPlus className="icon-p" />}
                  </div>
                </div>
                
                {/* 2. AnimatePresence handles the exit/unmounting animation smoothly */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div 
                      className="faq-body"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: 'hidden' }} // Prevents visual glitches during animation
                    >
                      {/* 3. Subtly fade and slide the text content itself */}
                      <motion.p 
                        className="faq-answer"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;