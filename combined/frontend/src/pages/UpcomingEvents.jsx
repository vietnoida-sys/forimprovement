import React, { useState } from 'react';
import { 
  FaGraduationCap, FaLaptop, FaCalendarAlt, FaPassport, FaAward, 
  FaPenFancy, FaFilter, FaClock, FaMapMarkerAlt, FaInfoCircle, FaTicketAlt 
} from "react-icons/fa";
import './UpcomingEvents.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock Data for Events
const INITIAL_EVENTS = [
  { 
    id: 1, 
    title: "Study in Canada Webinar 🇨🇦", 
    date: "10 Aug 2026", 
    day: "Mon", 
    time: "5:00 PM - 6:30 PM",
    location: "Online Event", 
    category: "Webinar", 
    country: "Canada", 
    mode: "ONLINE", 
    seatsLeft: 45, 
    totalSeats: 100, 
    img: "https://images.pexels.com/photos/6147016/pexels-photo-6147016.jpeg" 
  },
  { 
    id: 2, 
    title: "Australia Education Fair 🇦🇺", 
    date: "15 Aug 2026", 
    day: "Sat", 
    time: "11:00 AM - 4:00 PM", 
    location: "Hyatt Regency, Mumbai", 
    category: "Education Fair", 
    country: "Australia", 
    mode: "OFFLINE", 
    seatsLeft: 60, 
    totalSeats: 120, 
    img: "https://images.pexels.com/photos/10513247/pexels-photo-10513247.jpeg"
   },
  { 
    id: 3, 
    title: "USA University Webinar 🇺🇸", 
    date: "18 Aug 2026", 
    day: "Tue", 
    time: "6:00 PM - 7:30 PM", 
    location: "Online Event", 
    category: "Webinar", 
    country: "USA", 
    mode: "ONLINE", 
    seatsLeft: 70, 
    totalSeats: 150, 
    img: "https://images.pexels.com/photos/14495769/pexels-photo-14495769.jpeg" 
  },
  { 
    id: 4, 
    title: "Study in Singapore Fair 🇸🇬", 
    date: "22 Aug 2026", 
    day: "Sat", 
    time: "11:00 AM - 4:00 PM", 
    location: "The Lalit, Bangalore", 
    category: "Education Fair", 
    country: "Singapore", 
    mode: "OFFLINE", 
    seatsLeft: 55, 
    totalSeats: 100, 
    img: "https://images.pexels.com/photos/36672131/pexels-photo-36672131.jpeg"
   },
  { 
    id: 5, 
    title: "UK Visa & Scholarship Seminar 🇬🇧", 
    date: "28 Aug 2026", 
    day: "Fri", 
    time: "2:00 PM - 5:00 PM", 
    location: "Le Méridien, New Delhi", 
    category: "Visa Seminar", 
    country: "UK", 
    mode: "OFFLINE", 
    seatsLeft: 12, 
    totalSeats: 50, 
    img: "https://images.pexels.com/photos/34397465/pexels-photo-34397465.jpeg" 
  }
];

// Static configuration lists for DRY implementation
const CATEGORIES = [
  { id: "fair", label: "Education Fair", icon: FaGraduationCap, filterVal: "Education Fair" },
  { id: "webinar", label: "University Webinar", icon: FaLaptop, filterVal: "Webinar" },
  { id: "visa", label: "Visa Seminar", icon: FaPassport, filterVal: "Visa Seminar" },
  { id: "scholarship", label: "Scholarship Session", icon: FaAward },
  { id: "ielts", label: "IELTS Workshop", icon: FaPenFancy },
  { id: "clear", label: "Clear Filter", icon: FaFilter, filterVal: "All Categories" }
];

const PARTICIPATING_UNIVERSITIES = [
  "🏛️ University of Melbourne",
  "🏫 University of Toronto",
  "🎓 King's College London",
  "🌐 NUS Singapore",
  "⭐ University of Sydney"
];

const PROCESS_STEPS = [
  "Select Event",
  "Fill Form",
  "Get Invite",
  "Attend Live"
];

const FAQS = [
  { q: "Are the global events completely free to attend?", a: "Yes! All educational fairs, counseling sessions, and webinars hosted by EduWorld are entirely free for students." },
  { q: "Will I get a verified structural certificate for joining?", a: "Webinars and intensive structural workshops provide participation certificates over email post-event validation." },
  { q: "Can I directly bring transcripts to evaluate profile data?", a: "Absolutely. For offline events, carrying physical or digital copies of grade cards allows immediate profiling with experts." },
  { q: "How do I instantly cancellation my registered token?", a: "You can click on the cancellation hyperlink directly provided within your registered automated email confirmation dashboard." }
];

// --- Premium Enterprise Animations ---
const slideUpScroll = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.65, 
      ease: [0.16, 1, 0.3, 1] // Elegant bezier timing curve
    } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedMode, setSelectedMode] = useState('All Modes');
  const [activeFaq, setActiveFaq] = useState(null);

  // Filter Logic
  const filteredEvents = INITIAL_EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
    const matchesCountry = selectedCountry === 'All Countries' || event.country === selectedCountry;
    const matchesMode = selectedMode === 'All Modes' || event.mode === selectedMode;

    return matchesSearch && matchesCategory && matchesCountry && matchesMode;
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      {/* --- NAVBAR --- */}
      <Navbar />

      <motion.div 
        className="eduworld-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        {/* --- FILTER BAR --- */}
        <motion.div 
          className="filter-bar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="search-wrapper">
            <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              placeholder="Search events or locations..." 
              className="search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option>All Categories</option>
            <option>Education Fair</option>
            <option>Webinar</option>
            <option>Visa Seminar</option>
          </select>

          <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            <option>All Countries</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>USA</option>
            <option>Singapore</option>
            <option>UK</option>
          </select>

          <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)}>
            <option>All Modes</option>
            <option>ONLINE</option>
            <option>OFFLINE</option>
          </select>

          <button className="btn-search" onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); setSelectedCountry('All Countries'); setSelectedMode('All Modes'); }}>
            Reset
          </button>
        </motion.div>

        {/* --- FEATURED EVENT & CALENDAR --- */}
        <motion.section 
          className="featured-section"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div className="featured-card" variants={slideUpScroll}>
            <div className="featured-details">
              <span className="badge-featured">🌟 FEATURED EVENT</span>
              <h2>UK Education Fair 2026 🇬🇧</h2>
              <p className="featured-desc">Meet top UK universities, explore premium engineering & management courses, unlock explicit scholarships, and map your direct route abroad.</p>
              
              <div className="event-meta-grid">
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span>25 June 2026</span>
                </div>
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span>11:00 AM - 4:00 PM</span>
                </div>
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>Noida, Sector 63</span>
                </div>
              </div>

              <div className="countdown-timer">
                <div className="time-box"><h3>18</h3><p>Days</p></div>
                <div className="time-box"><h3>07</h3><p>Hours</p></div>
                <div className="time-box"><h3>45</h3><p>Mins</p></div>
                <div className="time-box"><h3>30</h3><p>Secs</p></div>
              </div>

              <Link to="https://docs.google.com/forms/d/e/1FAIpQLSefWVUVnbBT3GSCLjJM9bKP7hymqVhPTHbixEvbltPcJtVbMA/viewform?usp=publish-editor">
                <button className="btn-register-yellow">
                  Register For Free →
                </button>
              </Link>
            </div>
            <div className="featured-image-wrapper">
              <img src="https://images.pexels.com/photos/33524620/pexels-photo-33524620.jpeg" alt="UK Big Ben" />
            </div>
          </motion.div>

          {/* Mini Calendar */}
          <motion.div className="mini-calendar" variants={slideUpScroll}>
            <div className="calendar-header">
              <button className="cal-btn">&lt;</button>
              <h4>June 2026</h4>
              <button className="cal-btn">&gt;</button>
            </div>
            <div className="calendar-days-grid">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <span key={d} className="day-name">{d}</span>)}
              {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                const highlights = [3, 8, 14, 21, 25, 28];
                const isHighlighted = highlights.includes(day);
                return (
                  <span key={day} className={`calendar-day ${isHighlighted ? 'highlighted' : ''}`}>
                    {day}
                  </span>
                );
              })}
            </div>
            <a href="#full-calendar" className="view-full-cal">View Full Calendar →</a>
          </motion.div>
        </motion.section>

        {/* --- DYNAMIC EVENTS LIST SECTION --- */}
        <motion.section 
          className="upcoming-section"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="section-header" variants={slideUpScroll}>
            <h2>Upcoming Events ({filteredEvents.length})</h2>
          </motion.div>
          
          <motion.div className="events-grid" variants={staggerContainer}>
            {filteredEvents.map(event => {
              const fillPercentage = ((event.totalSeats - event.seatsLeft) / event.totalSeats) * 100;

              return (
                <motion.div 
                  className="event-grid-card animate-card" 
                  key={event.id}
                  variants={slideUpScroll}
                >
                  <div className="card-img-container">
                    <img src={event.img} alt={event.title} />
                    <span className={`badge-mode ${event.mode.toLowerCase()}`}>{event.mode}</span>
                  </div>
                  <div className="card-body">
                    <h3>{event.title}</h3>

                    <div className="card-meta-line">
                      <FaCalendarAlt className="meta-icon" />
                      <span>{event.date} ({event.day})</span>
                    </div>

                    <div className="card-meta-line">
                      <FaClock className="meta-icon" />
                      <span>{event.time}</span>
                    </div>

                    <div className="card-meta-line">
                      <FaMapMarkerAlt className="meta-icon" />
                      <span>{event.location}</span>
                    </div>

                    <div className="seats-bar">
                      <div className="seats-text">
                        <span>Slots Filled: {event.totalSeats - event.seatsLeft}/{event.totalSeats}</span>
                        <span className="seats-urgent">{event.seatsLeft} left!</span>
                      </div>
                      <div className="progress-line">
                        <div className="progress-fill" style={{ width: `${fillPercentage}%` }}></div>
                      </div>
                    </div>

                    <div className="card-actions">
                      <button className="btn-outline" onClick={() => alert(`Overview of ${event.title}`)}>
                        <FaInfoCircle /> Overview
                      </button>
                      <Link to="https://docs.google.com/forms/d/e/1FAIpQLSefWVUVnbBT3GSCLjJM9bKP7hymqVhPTHbixEvbltPcJtVbMA/viewform?usp=publish-editor">
                        <button className="btn-card-reg">
                          <FaTicketAlt /> Book Spot
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {filteredEvents.length === 0 && (
              <motion.p className="no-events" variants={slideUpScroll}>
                No events found matching the filters.
              </motion.p>
            )}
          </motion.div>
        </motion.section>

        {/* --- CATEGORIES --- */}
        <motion.section 
          className="categories-section"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.h2 variants={slideUpScroll}>Explore Event Categories</motion.h2>
          <motion.div className="categories-grid" variants={staggerContainer}>
            {CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <motion.div 
                  className="cat-item" 
                  key={cat.id}
                  variants={slideUpScroll}
                  onClick={() => cat.filterVal && setSelectedCategory(cat.filterVal)}
                >
                  <CatIcon className="cat-icon" />
                  <p>{cat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* --- UNIVERSITIES & PROCESS --- */}
        <motion.section 
          className="uni-process-section"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="uni-logos-container">
            <motion.h3 variants={slideUpScroll}>Participating Global Universities</motion.h3>
            <motion.div className="logos-flex" variants={staggerContainer}>
              {PARTICIPATING_UNIVERSITIES.map((uni, idx) => (
                <motion.div className="uni-chip" key={idx} variants={slideUpScroll}>
                  {uni}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="process-container">
            <motion.h3 variants={slideUpScroll}>Smooth Application Process</motion.h3>
            <motion.div className="process-steps" variants={staggerContainer}>
              {PROCESS_STEPS.map((step, idx) => (
                <React.Fragment key={idx}>
                  <motion.div className="step-node" variants={slideUpScroll}>
                    <div className="step-circle">{idx + 1}</div>
                    <p>{step}</p>
                  </motion.div>
                  {idx < PROCESS_STEPS.length - 1 && (
                    <motion.div className="step-connector" variants={slideUpScroll} />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* --- TESTIMONIALS & FAQ --- */}
        <motion.section 
          className="testimonial-faq-section"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div className="testimonial-card-box" variants={slideUpScroll}>
            <h3>What Students Say</h3>
            <div className="t-box">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="quote">"The premium webinar session helped me map out scholarships easily. The physical fair interaction was flawless!"</p>
              <div className="student-profile">
                <div className="avatar-placeholder">👩‍🎓</div>
                <div>
                  <strong>Neha Sharma</strong>
                  <p>MSc Student, UK Admissions</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="faq-box" variants={slideUpScroll}>
            <h3>Frequently Asked Questions</h3>
            <motion.div variants={staggerContainer}>
              {FAQS.map((faq, index) => (
                <motion.div 
                  className={`faq-item-wrapper ${activeFaq === index ? 'active' : ''}`} 
                  key={index} 
                  onClick={() => toggleFaq(index)}
                  variants={slideUpScroll}
                >
                  <div className="faq-item">
                    <span>{faq.q}</span> 
                    <span className="faq-toggle-icon">{activeFaq === index ? '−' : '+'}</span>
                  </div>
                  <div className="faq-answer-container">
                    <div className="faq-answer">{faq.a}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>

      {/* --- FOOTER --- */}
      <Footer />
    </>
  );
}