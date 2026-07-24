import React, { useState, useEffect, useMemo } from 'react';
import {
  FaGraduationCap, FaLaptop, FaCalendarAlt, FaPassport, FaAward,
  FaPenFancy, FaFilter, FaClock, FaMapMarkerAlt, FaInfoCircle, FaTicketAlt
} from "react-icons/fa";
import './UpcomingEvents.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// ⚠️ CONFIGURE THIS: point to your real backend.
// If your frontend and backend run on different ports in dev (e.g. Vite on 5173,
// Express/Django on 5000), set VITE_API_BASE_URL in a .env file at your project root:
//   VITE_API_BASE_URL=http://localhost:5000
// Restart `npm run dev` after adding/editing .env — Vite only reads it on startup.
// If you're using a Vite proxy instead, leave API_BASE_URL empty and make sure
// vite.config.js has a server.proxy entry for "/api".
const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const EVENTS_ENDPOINT = `${API_BASE_URL}/news-events`;

// Your backend's NewsEvent model only stores { title, type, date, description }.
// The event cards on this page also expect time/location/category/country/mode/
// seats/img. Until those fields exist on the backend, we fill in safe defaults
// here so the UI doesn't break. See the note at the bottom of this file for the
// suggested schema fields to add so real data flows through instead of placeholders.
function normalizeEvent(item) {
  const parsedDate = new Date(item.date);
  const dateLabel = isNaN(parsedDate)
    ? item.date
    : parsedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const dayLabel = isNaN(parsedDate)
    ? ''
    : parsedDate.toLocaleDateString('en-US', { weekday: 'short' });

  return {
    id: item._id || item.id,
    title: item.title,
    description: item.description || '',
    rawDate: item.date,          // kept in original YYYY-MM-DD form for calendar matching
    date: dateLabel,             // display form, e.g. "10 Aug 2026"
    day: dayLabel,                // e.g. "Mon"
    time: item.time || 'Time TBA',
    location: item.location || 'Location TBA',
    category: item.category || 'Event',
    country: item.country || 'Global',
    mode: item.mode || 'OFFLINE',
    seatsLeft: item.seatsLeft ?? 0,
    totalSeats: item.totalSeats ?? 0,
    img: item.img || 'https://images.pexels.com/photos/6147016/pexels-photo-6147016.jpeg',
  };
}

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

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
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
  // --- Backend data state ---
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Filters ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedMode, setSelectedMode] = useState('All Modes');
  const [selectedDate, setSelectedDate] = useState(null); // set by clicking a calendar day

  const [activeFaq, setActiveFaq] = useState(null);

  // --- Calendar navigation state ---
  const [calendarDate, setCalendarDate] = useState(new Date());

  // --- Fetch events from backend ---
  useEffect(() => {
    const controller = new AbortController();

    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(EVENTS_ENDPOINT, { signal: controller.signal });

        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          // Backend route is likely missing/misconfigured — we got HTML (index.html) back instead of JSON
          throw new Error(
            `Backend didn't return JSON (got "${contentType || 'unknown content-type'}"). ` +
            `Check that EVENTS_ENDPOINT ("${EVENTS_ENDPOINT}") points to a running API route, not the frontend dev server.`
          );
        }

        if (!res.ok) {
          throw new Error(`Failed to load events (status ${res.status})`);
        }

        const data = await res.json();
        const rawList = Array.isArray(data) ? data : data.events || [];
        // NewsEvent documents can be type "news" or "event" — this page only shows events
        const onlyEvents = rawList.filter(item => !item.type || item.type === 'event');
        setEvents(onlyEvents.map(normalizeEvent));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong while loading events.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    return () => controller.abort();
  }, []);

  // --- Derived country list (from live data, falls back to a default list) ---
  const countryOptions = useMemo(() => {
    const set = new Set(events.map(e => e.country).filter(Boolean));
    return set.size ? Array.from(set) : ['Canada', 'Australia', 'USA', 'Singapore', 'UK'];
  }, [events]);

  // --- Filter Logic ---
  const filteredEvents = events.filter(event => {
    const matchesSearch = (event.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (event.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
    const matchesCountry = selectedCountry === 'All Countries' || event.country === selectedCountry;
    const matchesMode = selectedMode === 'All Modes' || event.mode === selectedMode;

    let matchesDate = true;
    if (selectedDate) {
      const parsed = new Date(event.rawDate);
      matchesDate =
        parsed.getFullYear() === selectedDate.getFullYear() &&
        parsed.getMonth() === selectedDate.getMonth() &&
        parsed.getDate() === selectedDate.getDate();
    }

    return matchesSearch && matchesCategory && matchesCountry && matchesMode && matchesDate;
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // --- Calendar helpers ---
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Convert Sunday(0)-Saturday(6) to Monday-first index (0 = Mon ... 6 = Sun)
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;

  // Which days in the currently viewed month have at least one event
  const eventDaysInMonth = useMemo(() => {
    const map = new Set();
    events.forEach(event => {
      const d = new Date(event.rawDate);
      if (!isNaN(d) && d.getFullYear() === year && d.getMonth() === month) {
        map.add(d.getDate());
      }
    });
    return map;
  }, [events, year, month]);

  const goToPrevMonth = () => {
    setCalendarDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCalendarDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day) => {
    const clicked = new Date(year, month, day);
    // Toggle off if clicking the same day again
    if (
      selectedDate &&
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    ) {
      setSelectedDate(null);
    } else {
      setSelectedDate(clicked);
    }
  };

  const clearDateFilter = () => setSelectedDate(null);

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
            {countryOptions.map(c => <option key={c}>{c}</option>)}
          </select>

          <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)}>
            <option>All Modes</option>
            <option>ONLINE</option>
            <option>OFFLINE</option>
          </select>

          <button
            className="btn-search"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
              setSelectedCountry('All Countries');
              setSelectedMode('All Modes');
              setSelectedDate(null);
            }}
          >
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

          {/* Mini Calendar - interactive */}
          <motion.div className="mini-calendar" variants={slideUpScroll}>
            <div className="calendar-header">
              <button className="cal-btn" onClick={goToPrevMonth} aria-label="Previous month">&lt;</button>
              <h4>{MONTH_NAMES[month]} {year}</h4>
              <button className="cal-btn" onClick={goToNextMonth} aria-label="Next month">&gt;</button>
            </div>
            <div className="calendar-days-grid">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <span key={d} className="day-name">{d}</span>)}

              {/* Empty leading cells so day 1 lines up under the correct weekday */}
              {Array.from({ length: firstWeekday }).map((_, i) => (
                <span key={`empty-${i}`} className="calendar-day empty" />
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const hasEvent = eventDaysInMonth.has(day);
                const isSelected =
                  selectedDate &&
                  selectedDate.getFullYear() === year &&
                  selectedDate.getMonth() === month &&
                  selectedDate.getDate() === day;

                return (
                  <button
                    key={day}
                    type="button"
                    className={`calendar-day ${hasEvent ? 'highlighted' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleDayClick(day)}
                    title={hasEvent ? 'Events on this day — click to filter' : 'No events on this day'}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            {selectedDate && (
              <button
                className="view-full-cal"
                onClick={clearDateFilter}
                style={{ cursor: 'pointer', background: 'none', border: 'none' }}
              >
                Clear date filter ×
              </button>
            )}
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
            <h2>
              Upcoming Events ({filteredEvents.length})
              {selectedDate && (
                <span style={{ fontSize: '0.6em', marginLeft: 8, fontWeight: 400 }}>
                  — filtered by {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              )}
            </h2>
          </motion.div>

          {loading && (
            <motion.p className="no-events" variants={slideUpScroll}>
              Loading events…
            </motion.p>
          )}

          {!loading && error && (
            <motion.p className="no-events" variants={slideUpScroll}>
              Couldn't load events: {error}
            </motion.p>
          )}

          {!loading && !error && (
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
                      <span className={`badge-mode ${event.mode?.toLowerCase()}`}>{event.mode}</span>
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
          )}
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