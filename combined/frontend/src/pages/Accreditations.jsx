import React, { useState, useEffect, useRef } from "react";
import "./Accreditations.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Import motion from framer-motion
import { motion } from "framer-motion";

/* ─────────────────────────────────────────
   REUSABLE MOTION ANIMATION CONFIGURATIONS
───────────────────────────────────────── */

// 1. Mobile-friendly FadeUp component (Fixed the ReferenceError)
const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: delay }}
    viewport={{ once: true, amount: "some" }} // Ensures high performance on both mobile and desktop
  >
    {children}
  </motion.div>
);

// 2. Parent container variants to stagger animation on nested children elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

// 3. Smooth slide-up transition for headers, subtitles, and standard copy
const textRevealVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// 4. Smooth scale-in transition for icons and badges
const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" }
  }
};


/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const STATS = [
  { value: "50+", label: "Countries" },
  { value: "12K+", label: "Visas Approved" },
  { value: "98%", label: "Success Rate" },
];

const UNIVERSITIES = {
  Germany: [
    { id: 1, name: "Freie Universität Berlin", website: "https://www.fu-berlin.de", logo: "https://tse2.mm.bing.net/th/id/OIP.SSjC9MyyS55_MlglzYtp4gAAAA?pid=Api&P=0" },
    { id: 2, name: "University of Bonn", website: "https://www.uni-bonn.de", logo: "https://tse4.mm.bing.net/th/id/OIP.bPt4P55NoFN1-FjJmEeS9gAAAA?pid=Api&h=220&P=0" },
    { id: 3, name: "RWTH Aachen University", website: "https://www.rwth-aachen.de", logo: "https://tse4.mm.bing.net/th/id/OIP.yNw5C65_EqXC4hPtLNU5ZAHaEA?pid=Api&h=220&P=0" },
    { id: 4, name: "Technical University of Chemnitz", website: "https://www.tu-chemnitz.de", logo: "https://tse1.mm.bing.net/th/id/OIP.ZE1zXQX4bG2UIqPfTDhTLwHaEH?pid=Api&h=220&P=0" },
    { id: 5, name: "FAU Erlangen-Nürnberg", website: "https://www.fau.eu", logo: "https://tse1.mm.bing.net/th/id/OIP.MhtKDmyunsCtVAZ0hYCVEgHaHa?pid=Api&h=220&P=0" },
  ],
  Australia: [
    { id: 1, name: "Federation University Australia", website: "https://www.federation.edu.au", logo: "https://tse3.mm.bing.net/th/id/OIP.aKHw17lfZYCuINVmlIT4ZAAAAA?pid=Api&h=220&P=0" },
    { id: 2, name: "Central Queensland University", website: "https://www.cqu.edu.au", logo: "https://tse4.mm.bing.net/th/id/OIP.zmzeoEZLSh942jPuErsrMQHaHa?pid=Api&h=220&P=0" },
    { id: 3, name: "Southern Cross University", website: "https://www.scu.edu.au", logo: "https://tse3.mm.bing.net/th/id/OIP.kAXqShZBVIFM-yKQTDrAWQHaHb?pid=Api&h=220&P=0" },
    { id: 4, name: "University of Southern Queensland", website: "https://www.unisq.edu.au", logo: "https://tse3.mm.bing.net/th/id/OIP.QPzFVbb9mRfIXW69nfhZPQHaHv?pid=Api&h=220&P=0" },
    { id: 5, name: "Edith Cowan University", website: "https://www.ecu.edu.au", logo: "https://tse3.mm.bing.net/th/id/OIP.f7tF3dY_pSIwLdQFR6gJYwHaF2?pid=Api&h=220&P=0" },
  ],
  Canada: [
    { id: 1, name: "Cape Breton University", website: "https://www.cbu.ca", logo: "https://tse3.mm.bing.net/th/id/OIP.bLYtJY6BsnwTfZl8dG5cVwHaHa?pid=Api&h=220&P=0" },
    { id: 2, name: "University Canada West", website: "https://www.ucanwest.ca", logo: "https://tse3.mm.bing.net/th/id/OIP.DyvZAlYhC62yhZEF7HjmMQHaHa?pid=Api&h=220&P=0" },
    { id: 3, name: "Memorial University of Newfoundland", website: "https://www.mun.ca", logo: "https://tse1.mm.bing.net/th/id/OIP.W5oEFsFE3eDkCWMSoRsx8QAAAA?pid=Api&h=220&P=0" },
    { id: 4, name: "University of Prince Edward Island", website: "https://www.upei.ca", logo: "https://tse2.mm.bing.net/th/id/OIP.FSBJNjtvB-Mqyja2e2e24wHaEH?pid=Api&h=220&P=0" },
    { id: 5, name: "University of Regina", website: "https://www.uregina.ca", logo: "https://tse3.mm.bing.net/th/id/OIP.nUkih_RHuv1CUeM1BcXomQHaEK?pid=Api&h=220&P=0" },
  ],
  NewZealand: [
    { id: 1, name: "Southern Institute of Technology", website: "https://www.sit.ac.nz/", logo: "https://tse4.mm.bing.net/th/id/OIP.ZA7VyrKz8a8MmeHUgrm6EAHaE8?pid=Api&h=220&P=0" },
    { id: 2, name: "Unitec Institude of Technology", website: "https://www.unitec.ac.nz", logo: "https://tse1.mm.bing.net/th/id/OIP.ceq3aynLix7FQUsHgaQa8AHaHa?pid=Api&h=220&P=0" },
    { id: 3, name: "Ara Institute of Canterbury", website: "https://www.ara.ac.nz", logo: "https://tse3.mm.bing.net/th/id/OIP.OZ4jRGM9gquzGScJbfVnAwAAAA?pid=Api&h=220&P=0" },
    { id: 4, name: "Otago Polytechnic", website: "https://www.op.ac.nz", logo: "https://tse3.mm.bing.net/th/id/OIP.yQcA_EIJMmdFVmNKf7GEaQAAAA?pid=Api&h=220&P=0" },
    { id: 5, name: "Manukau Institute of Technology", website: "https://www.manukau.ac.nz", logo: "https://tse4.mm.bing.net/th/id/OIP.jr2CWC5EJ7-emFkBuy9YFgAAAA?pid=Api&h=220&P=0" },
  ],
  Russia: [
    {
      id: 1,
      name: "Peoples' Friendship University of Russia (RUDN University)",
      website: "https://www.rudn.ru",
      logo: "https://tse2.mm.bing.net/th/id/OIP.GXkic9ZyF7tY-iQcpouLVAHaDA?pid=Api&h=220&P=0"
    },
    {
      id: 2,
      name: "Kazan Federal University",
      website: "https://kpfu.ru/en",
      logo: "https://tse2.mm.bing.net/th/id/OIP.V71lmBPYaahKcqfzA66xDgHaHc?pid=Api&h=220&P=0"
    },
    {
      id: 3,
      name: "Belgorod State University",
      website: "https://bsuedu.ru",
      logo: "https://tse1.mm.bing.net/th/id/OIP.QkT1SjW9GCzp0omra3r15gHaLB?pid=Api&h=220&P=0"
    },
    {
      id: 4,
      name: "South Ural State University",
      website: "https://www.susu.ru/en",
      logo: "https://tse3.mm.bing.net/th/id/OIP.qAmU1W2jNhml8dD3zXaTYwHaDl?pid=Api&h=220&P=0"
    },
    {
      id: 5,
      name: "Far Eastern Federal University",
      website: "https://www.dvfu.ru/en",
      logo: "https://tse2.mm.bing.net/th/id/OIP.RgOZjbiwWLZNzcZ2CICfiQHaHa?pid=Api&h=220&P=0"
    },
  ]
};

const ADVANTAGES = [
  { icon: "🎯", bg: "#FFE4E4", title: "Expert Visa Guidance", desc: "Our certified consultants have deep knowledge of visa rules, documentation, and procedures for every destination we cover." },
  { icon: "🌐", bg: "#E4F0FF", title: "Multi-Country Coverage", desc: "From the UK to Australia, Canada to Singapore — one team, one platform, every destination handled with precision." },
  { icon: "📊", bg: "#E8F5E9", title: "Highest Success Rate", desc: "A 98% visa approval record built over 9 years of practice, strong embassy relationships, and meticulous case preparation." },
  { icon: "🔒", bg: "#F3E5F5", title: "Full Transparency", desc: "Real-time application tracking, honest timelines, and zero hidden fees. You always know exactly where your case stands." },
];

const STEPS = [
  { num: "01", label: "Initial Consultation",  desc: "Share your goals with our experts and receive a tailored visa pathway recommendation." },
  { num: "02", label: "Document Preparation",  desc: "We audit and guide you through every document required for a complete application." },
  { num: "03", label: "Application Submission", desc: "We submit to the embassy / consulate and manage follow-ups on your behalf." },
  { num: "04", label: "Visa Approved!",         desc: "Receive your visa and get ready-to-travel support including pre-departure orientation." },
];


/* ─────────────────────────────────────────
   HERO COMPONENT
───────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__blob hero__blob--1" />
      <div className="hero__blob hero__blob--2" />

      <div className="hero__container">

        {/* LEFT CONTENT with nested stagger transitions */}
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__badge" variants={textRevealVariants}>
            <span className="hero__badge-dot" />
            Trusted Visa Consultancy Since 2020
          </motion.div>

          <motion.h1 className="hero__headline" variants={textRevealVariants}>
            Your Gateway to
            <span className="hero__headline-accent"> Global Opportunities</span>
          </motion.h1>

          <motion.p className="hero__sub" variants={textRevealVariants}>
            VietWorldGate simplifies your visa journey — from student visas and work permits
            to permanent residency and tourist approvals. Expert guidance, zero stress.
          </motion.p>

          <motion.div className="hero__actions" variants={textRevealVariants}>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSefWVUVnbBT3GSCLjJM9bKP7hymqVhPTHbixEvbltPcJtVbMA/viewform?usp=publish-editor" className="hero__btn hero__btn--primary">
              Apply for Visa <span>→</span>
            </a>
          </motion.div>

          <motion.div className="hero__social-proof" variants={textRevealVariants}>
            <div className="hero__avatars">
              {["A","R","S","M"].map((l, i) => (
                <div key={i} className="hero__avatar"
                  style={{ background: `hsl(${170 + i * 20},55%,${45 + i * 5}%)` }}>{l}</div>
              ))}
              <div className="hero__avatar hero__avatar--plus">+</div>
            </div>
            <div>
              <div className="hero__stars">★★★★★ <span>4.9</span></div>
              <div className="hero__reviews">1,200+ Happy Clients</div>
            </div>
          </motion.div>
        </motion.div>

        {/* HERO VISUAL DESIGN */}
        <div className="hero__visual">
          <div className="hero__circle-outer">
            <div className="hero__circle-inner">
              <div className="hero__passport-icon">🛂</div>
              <p className="hero__circle-text">Visa Approved!</p>
            </div>
          </div>
          <div className="hero__card hero__card--tl">
            <div className="hero__card-icon">✈️</div>
            <div><strong>50+ Countries</strong><p>We Cover Worldwide</p></div>
          </div>
          <div className="hero__card hero__card--br">
            <div className="hero__card-icon">📋</div>
            <div><strong>Free Assessment</strong><p>Talk to Our Experts</p></div>
          </div>
        </div>
      </div>

      {/* HERO STATS */}
      <div className="hero__stats">
        {STATS.map(function(s, i) {
          return (
            <React.Fragment key={s.label}>
              <motion.div
                className="hero__stat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
              >
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </motion.div>
              {i < STATS.length - 1 && <div className="hero__stat-divider" />}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}


/* ─────────────────────────────────────────
   PARTNERS COMPONENT
───────────────────────────────────────── */
const ALL_UNIVERSITIES = Object.values(UNIVERSITIES).flat();

function Partners() {
  const row1 = [...ALL_UNIVERSITIES, ...ALL_UNIVERSITIES];
  const row2 = [...ALL_UNIVERSITIES.slice().reverse(), ...ALL_UNIVERSITIES.slice().reverse()];

  return (
    <section className="partners">
      {/* Title Scroll Transition */}
      <motion.h2 
        className="title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.6 }}
      >
        Our Partner Universities
      </motion.h2>

      <motion.div 
        className="logos-slider"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.7 }}
      >
        {/* Row 1 */}
        <div className="logos-track">
          {row1.map((uni, i) => (
            <a
              key={i}
              href={uni.website}
              target="_blank"
              rel="noopener noreferrer"
              className="logo-card"
            >
              <img src={uni.logo} alt={uni.name} />
            </a>
          ))}
        </div>

        {/* Row 2 */}
        <div className="logos-track reverse">
          {row2.map((uni, i) => (
            <a
              key={i}
              href={uni.website}
              target="_blank"
              rel="noopener noreferrer"
              className="logo-card"
            >
              <img src={uni.logo} alt={uni.name} />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   WORLD MAP COMPONENT
───────────────────────────────────────── */
const DESTINATIONS = [
  { id: 3,  flag: "https://flagcdn.com/w40/ca.png", country: "Canada",         visas: ["Student", "PR", "Work Permit"],          style: { top: "25%", left: "15%" } },
  { id: 4,  flag: "https://flagcdn.com/w40/us.png", country: "United States",  visas: ["F-1 Student", "B-1/B-2 Tourist", "H-1B"], style: { top: "37%", left: "19%" } },
  { id: 1,  flag: "https://flagcdn.com/w40/gb.png", country: "United Kingdom", visas: ["Student", "Work", "Visitor"],           style: { top: "26%", left: "47%" } },
  { id: 6,  flag: "https://flagcdn.com/w40/de.png", country: "Germany",        visas: ["Student", "Job Seeker", "Work"],         style: { top: "26%", left: "52%" } },
  { id: 12, flag: "https://flagcdn.com/w40/ch.png", country: "Switzerland",    visas: ["Student", "Work", "Schengen"],           style: { top: "31%", left: "51%" } },
  { id: 10, flag: "https://flagcdn.com/w40/ae.png", country: "UAE",            visas: ["Work Permit", "Investor", "Tourist"],    style: { top: "43%", left: "63%" } },
  { id: 9,  flag: "https://flagcdn.com/w40/it.png", country: "Italy",          visas: ["Business", "Tourist", "Medical"],          style: { top: "48%", left: "72%" } },
  { id: 7,  flag: "https://flagcdn.com/w40/sg.png", country: "Singapore",      visas: ["Employment Pass", "Student"],            style: { top: "58%", left: "79%" } },
  { id: 11, flag: "https://flagcdn.com/w40/my.png", country: "Malaysia",       visas: ["MM2H", "Student", "Work"],               style: { top: "55%", left: "80%" } },
  { id: 8,  flag: "https://flagcdn.com/w40/jp.png", country: "Japan",          visas: ["Student", "Work", "Tourist"],            style: { top: "33%", left: "91%" } },
  { id: 2,  flag: "https://flagcdn.com/w40/au.png", country: "Australia",      visas: ["Student", "Skilled", "Tourist"],         style: { top: "74%", left: "88%" } },
  { id: 5,  flag: "https://flagcdn.com/w40/nz.png", country: "New Zealand",    visas: ["Student", "Work", "Tourist"],            style: { top: "85%", left: "96%" } },
];

function WorldMap() {
  const [active, setActive] = useState(null);
  const mapRef = useRef(null);

  useEffect(function() {
    function handleClickOutside(event) {
      if (mapRef.current && !mapRef.current.contains(event.target)) {
        setActive(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return function() { document.removeEventListener("mousedown", handleClickOutside); };
  }, []);

  const activeData = DESTINATIONS.find(function(d) { return d.id === active; });

  return (
    <FadeUp>
      <section className="worldmap" id="countries" ref={mapRef}>
        <FadeUp>
          {/* Header text content animation */}
          <motion.div 
            className="worldmap__header"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: "some" }}
          >
            <motion.span className="worldmap__eyebrow" variants={textRevealVariants}>Where We Operate</motion.span>
            <motion.h2 className="worldmap__title" variants={textRevealVariants}>We Serve Clients Across the Globe</motion.h2>
            <motion.p className="worldmap__desc" variants={textRevealVariants}>
              From Asia to Europe, the Americas to Oceania — VietWorldGate helps you navigate
              visa requirements for every major destination country.
            </motion.p>
          </motion.div>
        </FadeUp>

        <div className="worldmap__container">
          <div className="worldmap__map-wrap">
            <svg className="worldmap__svg" viewBox="0 0 1008 651" xmlns="http://www.w3.org/2000/svg">
              <g className="worldmap__continents-group">
                <path d="M165,71 L171,61 L187,66 L211,48 L227,61 L262,48 L269,72 L289,59 L295,83 L347,100 L346,128 L320,137 L335,160 L313,203 L326,243 L336,250 L330,266 L288,272 L275,296 L290,305 L269,321 L233,313 L217,322 L206,311 L167,314 L157,294 L170,262 L150,250 L119,252 L121,223 L112,192 L123,158 L114,138 L95,142 L59,165 L36,173 L29,157 L54,124 L86,129 L98,111 L74,96 L99,69 L132,77 Z" className="worldmap__continent-path" />
                <path d="M363,55 L382,34 L435,51 L446,108 L417,143 L383,149 L356,124 L351,84 Z" className="worldmap__continent-path" />
                <path d="M269,324 L284,316 L302,328 L340,335 L382,374 L374,409 L341,455 L306,530 L298,598 L275,600 L273,576 L283,524 L244,451 L238,409 L251,372 L237,349 Z" className="worldmap__continent-path" />
                <path d="M482,246 L513,234 L562,246 L609,248 L614,271 L642,284 L665,274 L658,309 L642,340 L622,416 L603,456 L575,513 L553,523 L544,500 L527,453 L517,404 L520,359 L482,346 L451,332 L437,305 L436,275 L457,256 Z" className="worldmap__continent-path" />
                <path d="M495,229 L471,219 L465,190 L486,163 L514,151 L510,123 L536,112 L561,128 L590,111 L640,119 L690,103 L746,121 L784,107 L793,124 L856,122 L897,142 L941,133 L971,154 L967,175 L982,216 L942,245 L951,265 L967,287 L924,312 L905,296 L883,322 L859,327 L839,308 L811,354 L781,353 L744,321 L701,313 L672,281 L651,268 L626,244 L596,243 L540,229 Z" className="worldmap__continent-path" />
                <path d="M834,449 L876,432 L918,443 L948,442 L955,479 L951,515 L916,537 L880,535 L845,518 L829,489 Z" className="worldmap__continent-path" />
                <path d="M465,148 L475,145 L481,154 L471,168 L460,161 Z" className="worldmap__continent-path" />
                <path d="M915,212 L924,210 L934,233 L922,253 L910,245 Z" className="worldmap__continent-path" />
                <path d="M950,550 L965,542 L985,578 L970,590 Z" className="worldmap__continent-path" />
              </g>
            </svg>

            {/* Precision Pins mapped precisely to geometry */}
            {DESTINATIONS.map((d) => {
              const isActive = active === d.id;
              return (
                <div key={d.id} className={`worldmap__marker-node ${isActive ? "worldmap__marker-node--active" : ""}`} style={d.style}>
                  <button 
                    className="worldmap__marker-btn" 
                    onClick={() => setActive(isActive ? null : d.id)}
                    aria-expanded={isActive}
                  >
                    <svg className="worldmap__pin-svg" viewBox="0 0 24 30" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12,0 C5.37,0 0,5.37 0,12 C0,21 12,30 12,30 C12,30 24,21 24,12 C24,5.37 18.63,0 12,0 Z" fill="currentColor" />
                      <circle cx="12" cy="11" r="8" fill="#ffffff" />
                    </svg>
                    <span className="worldmap__pin-flag-render">
                      <img src={d.flag} alt={d.country} className="worldmap__flag-img" />
                    </span>
                    <div className="worldmap__pin-pulse"></div>
                  </button>

                  {isActive && (
                    <div className="worldmap__desktop-tooltip">
                      <div className="worldmap__tooltip-header">
                        <span><img src={d.flag} alt={d.country} className="worldmap__flag-img-small" /></span>
                        <strong>{d.country}</strong>
                      </div>
                      <ul className="worldmap__tooltip-list">
                        {d.visas.map(function(v) { return <li key={v}>• {v} Visa</li>; })}
                      </ul>
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSefWVUVnbBT3GSCLjJM9bKP7hymqVhPTHbixEvbltPcJtVbMA/viewform?usp=publish-editor" className="worldmap__tooltip-action">Apply Now &rarr;</a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {activeData && (
            <div className="worldmap__mobile-drawer">
              <div className="worldmap__drawer-backdrop" onClick={function() { setActive(null); }}></div>
              <div className="worldmap__drawer-body">
                <div className="worldmap__drawer-handle" onClick={function() { setActive(null); }}></div>
                <div className="worldmap__drawer-header">
                  <span className="worldmap__drawer-flag">
                    <img src={activeData.flag} alt={activeData.country} className="worldmap__flag-img-drawer" />
                  </span>
                  <h3>{activeData.country}</h3>
                </div>
                <p className="worldmap__drawer-label">Available Visas:</p>
                <div className="worldmap__drawer-chips">
                  {activeData.visas.map(function(v) {
                    return <span key={v} className="worldmap__drawer-chip">{v} Visa</span>;
                  })}
                </div>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSefWVUVnbBT3GSCLjJM9bKP7hymqVhPTHbixEvbltPcJtVbMA/viewform?usp=publish-editor" className="worldmap__drawer-btn">Apply Online &rarr;</a>
              </div>
            </div>
          )}

          <div className="worldmap__filter-zone">
            <p className="worldmap__filter-title">Quick Select Corporate Destinations</p>
            <div className="worldmap__quick-chips">
              {DESTINATIONS.map(function(d) {
                return (
                  <button
                    key={d.id}
                    className={"worldmap__filter-chip" + (active === d.id ? " worldmap__filter-chip--active" : "")}
                    onClick={function() { setActive(active === d.id ? null : d.id); }}
                  >
                    <span><img src={d.flag} alt={d.country} className="worldmap__flag-img-chip" /></span> {d.country}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}


/* ─────────────────────────────────────────
   ADVANTAGES COMPONENT
───────────────────────────────────────── */
function Advantages() {
  return (
    <section className="advantages" id="services">
      <FadeUp>
        {/* Header content staggered sequence */}
        <motion.div 
          className="advantages__header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
        >
          <motion.span className="advantages__eyebrow" variants={textRevealVariants}>Why Choose Us</motion.span>
          <motion.h2 className="advantages__title" variants={textRevealVariants}>The VietWorldGate Difference</motion.h2>
          <motion.p className="advantages__desc" variants={textRevealVariants}>
            We guarantee three things every time: expert support, accurate documentation,
            and complete transparency throughout your visa journey.
          </motion.p>
        </motion.div>
      </FadeUp>

      {/* Grid mapping loaded using Framer Motion containers */}
      <motion.div 
        className="advantages__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
      >
        {ADVANTAGES.map((a) => (
          <motion.div 
            key={a.title} 
            className="advantages__card"
            variants={textRevealVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            <motion.div className="advantages__icon-wrap" style={{ background: a.bg }} variants={scaleInVariants}>
              <span className="advantages__icon">{a.icon}</span>
            </motion.div>
            <h3 className="advantages__card-title">{a.title}</h3>
            <p className="advantages__card-desc">{a.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <FadeUp delay={0.1}>
        <div className="process">
          <span className="advantages__eyebrow">How It Works</span>
          <h2 className="advantages__title">Your Visa Journey in 4 Steps</h2>
          <div className="process__grid">
            {STEPS.map(function(s, i) {
              return (
                <motion.div
                  key={s.num}
                  className="process__step"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true, amount: "some" }}
                >
                  <div className="process__num">{s.num}</div>
                  {i < STEPS.length - 1 && <div className="process__connector" />}
                  <h4 className="process__label">{s.label}</h4>
                  <p className="process__desc">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/* ─────────────────────────────────────────
   FOOTER SECTION COMPONENT
───────────────────────────────────────── */
function Footerup() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__cta-band">
        <div className="footer__cta-inner">
          <div>
            <h2 className="footer__cta-title">Ready to Start Your Visa Journey?</h2>
            <p className="footer__cta-sub">Book a free 30-minute consultation with our experts today.</p>
          </div>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSefWVUVnbBT3GSCLjJM9bKP7hymqVhPTHbixEvbltPcJtVbMA/viewform?usp=publish-editor" className="footer__cta-btn">Get Free Consultation →</a>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE EXPORT
───────────────────────────────────────── */
export default function Accreditations() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Partners />
      <WorldMap />
      <Advantages />
      <Footerup />
      <Footer />
    </div>
  );
}