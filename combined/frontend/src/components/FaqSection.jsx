import React, { useState, useEffect } from 'react';
import './FaqSection.css';
import { FaMinus, FaPlus } from 'react-icons/fa';
// Import AnimatePresence alongside motion for clean exit animations
import { motion, AnimatePresence } from 'framer-motion';
import { cmsApi as api } from '../portal/api/axiosClient';

const FAQ_LIMIT = 5; // Only this many FAQs are ever shown on the public site

// Default questions — these show as-is when nothing has been added from the
// CMS yet. Each real FAQ you add from the CMS replaces one of these
// (starting from the end of the list), so the section never shows more
// than FAQ_LIMIT items and never looks empty either.
const DEFAULT_FAQS = [
  {
    _id: 'default-1',
    question: 'What is VIET WORLDGATE?',
    answer:
      'VIET WORLDGATE is a leading overseas education consultancy in India that guides students through every step of the study abroad process—from selecting universities to securing visas.',
  },
  {
    _id: 'default-2',
    question: 'How long has VIET WORLDGATE been in operation?',
    answer:
      'VIET WORLDGATE has been successfully guiding students for over 6+ years with a massive network of global institution partners.',
  },
  {
    _id: 'default-3',
    question: 'Which countries does VIET WORLDGATE assist with for overseas education?',
    answer:
      'We offer comprehensive guidance for top study destinations including Australia, UK, Canada, New Zealand, Germany, Italy, Japan, USA, Ireland, and more.',
  },
  {
    _id: 'default-4',
    question: 'How can VIET WORLDGATE help me choose the right university?',
    answer:
      'Our expert counsellors evaluate your academic profile, budget, and career goals to suggest the most appropriate courses and highly reputed global universities.',
  },
  {
    _id: 'default-5',
    question: 'Does VIET WORLDGATE assist with visa applications?',
    answer:
      'Yes, we provide end-to-end support for documentation, visa file preparation, and mock interview sessions to maximize your success rate.',
  },
];

const FaqSection = () => {
  // First item stays open by default in the accordion
  const [activeIndex, setActiveIndex] = useState(0);

  const [faqData, setFaqData] = useState(DEFAULT_FAQS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadFaqs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.list('faqs');
        if (!isMounted) return;

        // Newest added FAQ first
        const added = [...(data || [])].sort((a, b) => {
          if (a.priority !== undefined && b.priority !== undefined) {
            return a.priority - b.priority;
          }
          const aTime = new Date(a.createdAt || a.updatedAt || 0).getTime();
          const bTime = new Date(b.createdAt || b.updatedAt || 0).getTime();
          return bTime - aTime; // newest first
        });

        // Merge: real (added) FAQs fill the slots first, defaults fill
        // whatever is left over so the section always shows FAQ_LIMIT items.
        // - Nothing added yet -> all 5 defaults show.
        // - 1 added -> 1 real FAQ + 4 defaults.
        // - 5+ added -> all 5 slots are real FAQs, defaults fully replaced.
        const remainingDefaults = DEFAULT_FAQS.slice(
          0,
          Math.max(FAQ_LIMIT - added.length, 0)
        );
        const merged = [...added, ...remainingDefaults].slice(0, FAQ_LIMIT);

        setFaqData(merged);
      } catch (err) {
        // On error, keep showing the defaults instead of an empty section
        if (isMounted) {
          setError(err.message || 'Failed to load FAQs');
          setFaqData(DEFAULT_FAQS);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadFaqs();
    return () => {
      isMounted = false;
    };
  }, []);

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

          {/* Defaults are shown immediately, so we don't block rendering on
              loading — this just quietly refreshes once the API responds. */}
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              /* 1. Each individual FAQ Card animates sequentially on scroll */
              <motion.div
                key={faq._id || index}
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