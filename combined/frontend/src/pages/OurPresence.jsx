import React, { useState } from "react";
import "./OurPresence.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// ── LUCIDE ICONS IMPORT ─────────────────────────────────────
import { 
  GraduationCap, 
  Globe, 
  Briefcase, 
  Plane, 
  Users, 
  Building2, 
  MapPin, 
  Search, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Compass, 
  Cpu,
  Phone,
  Mail
} from "lucide-react";

// ── DATA ────────────────────────────────────────────────────
const services = [
  {
    icon: <GraduationCap size={24} />,
    name: "Student Visa Solutions",
    desc: "Comprehensive university admissions support, premium SOP review, strategic financial documentation guidance, and error-free visa filing for elite institutions.",
    countries: ["Canada", "Australia", "Dubai", "Germany", "Italy", "Japan", "New Zealand", "UK"],
    highlight: false,
  },
  {
    icon: <Globe size={24} />,
    name: "PR & Settle Abroad",
    desc: "Permanent residency pathways, skilled migration profiles, and tailored consulting for long-term global settlement and career security.",
    countries: ["Canada", "Australia", "Dubai", "Germany", "Italy", "Japan", "New Zealand", "UK"],
    highlight: false,
  },
  {
    icon: <Briefcase size={24} />,
    name: "Global Work Permits",
    desc: "Employer-sponsored visas, skilled worker pathways, LMIA processing assistance, and complete executive relocation management.",
    countries: ["Canada", "Australia", "Dubai", "Germany", "Italy", "Japan", "New Zealand", "UK"],
    highlight: false,
  },
  {
    icon: <Plane size={24} />,
    name: "Tourist & Visitor Permits",
    desc: "Fast-track travel and visit visa applications featuring precise document mapping, appointment coordination, and strict legal verification.",
    countries: ["Canada", "Australia", "Dubai", "Germany", "Italy", "Japan", "New Zealand", "UK"],
    highlight: false,
  },
  {
    icon: <Users size={24} />,
    name: "Family Reunification",
    desc: "Spouse visas, dependent child additions, and family settlement applications managed with deep legal care to keep your loved ones together.",
    countries: ["Canada", "Australia", "Dubai", "Germany", "Italy", "Japan", "New Zealand", "UK"],
    highlight: false,
  },
  {
    icon: <Building2 size={24} />,
    name: "Business & Investor Visas",
    desc: "Short-stay corporate permits and long-term residency-by-investment programs for entrepreneurs seeking dynamic international footprints.",
    countries: ["Canada", "Australia", "Dubai", "Germany", "Italy", "Japan", "New Zealand", "UK"],
    highlight: false,
  },
];

const steps = [
  { num: "1", icon: <Search size={22} />, title: "Profile Mapping", desc: "We evaluate your academic goals and professional history to choose ideal destinations within 24 hours." },
  { num: "2", icon: "🤝", title: "Institutional Matching", desc: "Securing admissions, verifying course criteria, and polishing your SOP to stand out to selection boards." },
  { num: "3", icon: <CheckCircle2 size={22} />, title: "File Optimization", desc: "Compiling financial statements, sponsorships, and visa applications with zero errors for peak compliance." },
  { num: "4", icon: <Compass size={22} />, title: "Immigration Prep", desc: "Rigorous mock visa interviews, confidence coaching, and lifestyle orientation for your transition." },
  { num: "5", icon: <Award size={22} />, title: "Worldgate Cleared", desc: "Collect your visa stamp, receive pre-departure checklists, and embark on life-changing international journey." },
];

const approvalRates = [
  { flag: "https://flagcdn.com/us.svg", country: "United States", rate: 93 },
  { flag: "https://flagcdn.com/ca.svg", country: "Canada", rate: 98 },
  { flag: "https://flagcdn.com/gb.svg", country: "United Kingdom", rate: 96 },
  { flag: "https://flagcdn.com/au.svg", country: "Australia", rate: 97 },
  { flag: "https://flagcdn.com/de.svg", country: "Germany", rate: 95 },
  { flag: "https://flagcdn.com/ae.svg", country: "UAE / Dubai", rate: 96 },
  { flag: "https://flagcdn.com/jp.svg", country: "Japan", rate: 99 },
  { flag: "https://flagcdn.com/nz.svg", country: "New Zealand", rate: 95 },
];

const corePillars = [
  { icon: <ShieldCheck size={24} />, title: "Trusted Global Reliability", desc: "Known for meticulous attention to legal detail, absolute transparency in processing, and verifiable institutional success." },
  { icon: <TrendingUp size={24} />, title: "Empowering Future Leaders", desc: "We don't just secure visas; we advise on strategic career paths, scholarships, and professional alignment." },
  { icon: <Globe size={24} />, title: "Expanding Partnerships", desc: "Deep operational ties with top-tier international universities and regulatory bodies across 40+ countries." },
  { icon: <Cpu size={24} />, title: "Digital-First Solutions", desc: "Utilizing modern tracking mechanisms, real-time secure document portals, and future-focused consulting methods." },
];

const testimonials = [
  {
    stars: "★★★★★",
    quote: "VIET Worldgate mapped out my journey to Canada brilliantly. From course matching to the visa seal, everything was transparent and flawless.",
    name: "Ishita Verma",
    visa: "UK Student Visa · University of Toronto",
    initials: "RD",
  },
  {
    stars: "★★★★★",
    quote: "After previous rejections elsewhere, their specific counseling and structured mock interviews unlocked my US visa on the first try.",
    name: "Lakshya Sharma",
    visa: "UK F-1 Student Visa · NYU Steinhardt",
    initials: "MN",
  },
  {
    stars: "★★★★★",
    quote: "Exceptional transparency throughout. They handled my UK Skilled Migrant application and spouse dependent visa together with absolute ease.",
    name: "Dharshini",
    visa: "UK Skilled Worker & Dependent Route",
    initials: "AT",
  },
];

const globalDesks = [
  { 
    flag: "https://flagcdn.com/gb.svg", 
    city: "London", 
    address: "A Oxford Street, London",
    country: "United Kingdom", 
    phone: "+91 79822 95530", 
    email: "info@vietworldgate.com", 
    url: "ContactLondon", 
    hq: true 
  },
  { 
    flag: "https://flagcdn.com/in.svg", 
    city: "Ghaziabad", 
    address: "Ghaziabad ",
    country: "India", 
    phone: "+91 79822 95530", 
    email: "info@vietworldgate.com", 
    url: "ContactGhaziabad" 
  },
  { 
    flag: "https://flagcdn.com/in.svg", 
    city: "Noida", 
    address: "Noida ",
    country: "India", 
    phone: "+91 79822 95530", 
    email: "info@vietworldgate.com", 
    url: "ContactNoida" 
  },
  { 
    flag: "https://flagcdn.com/in.svg", 
    city: "Delhi", 
    address: "Delhi ",
    country: "India", 
    phone: "+91 79822 95530", 
    email: "info@vietworldgate.com", 
    url: "ContactDelhi" 
  },
];

const heroStats = [
  { icon: <ShieldCheck size={24} />, num: "100%", label: "Transparent Processing" },
  { icon: <Building2 size={24} />, num: "500+", label: "Partner Institutions" },
  { icon: <TrendingUp size={24} />, num: "96.4%", label: "Visa Success Ratio" },
  { icon: <Globe size={24} />, num: "40+", label: "Destinations Covered" },
];

export default function OurPresence() {
  const [activeStep, setActiveStep] = useState(null);

  // ── PR LEVEL STAGGER ANIMATION PATHS ───────────────────────
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const viewportConfig = { once: true, amount: 0.15 };

  return (
    <>
      <Navbar />

      <div className="viet-worldgate-platform">

        {/* ── HERO ── */}
        <section className="vw-hero">
          <div className="container">
            <motion.div 
              className="hero-inner"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div>
                <motion.div className="hero-badge" variants={itemVariants}>
                  <span className="live-dot" />
                  Intakes & Applications Active
                </motion.div>
                
                <motion.h1 className="hero-title" variants={itemVariants}>
                  Opening Doors to Global Success.<br />
                  <span className="gold-text">Empowering Futures.</span>
                </motion.h1>
                
                <motion.p className="hero-sub" variants={itemVariants}>
                  VIET Worldgate is a premier global education and immigration consultancy. 
                  We turn international ambitions into life-changing realities through high-quality counseling, 
                  absolute transparency, and a relentless commitment to professional outcomes.
                </motion.p>
                
                <motion.div className="hero-btns" variants={itemVariants}>
                  <a href="/contact-us" className="btn-gold">Begin Profile Evaluation →</a>
                  <a href="https://wa.me/917982295530" target="_blank" rel="noopener noreferrer" className="btn-ghost">Connect with Our Consultants</a>
                </motion.div>
              </div>

              <div className="hero-stats-col">
                {heroStats.map((s, i) => (
                  <motion.div key={i} className="hstat-card" variants={itemVariants}>
                    <div className="hstat-inner-icon">{s.icon}</div>
                    <div>
                      <div className="hstat-num">{s.num}</div>
                      <div className="hstat-label">{s.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="services-section" id="services">
          <div className="container">
            <motion.div 
              className="sec-header"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <div>
                <motion.span className="eyebrow" variants={itemVariants}>Our Specialisations</motion.span>
                <motion.h2 className="sec-title" variants={itemVariants}>Delivering Service Excellence</motion.h2>
              </div>
              <motion.p className="sec-desc" variants={itemVariants}>
                From premium university applications and visa filing to complete legal pathways 
                for families and professionals, we protect your dream at every milestone.
              </motion.p>
            </motion.div>

            <motion.div 
              className="services-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {services.map((s, i) => (
                <motion.div 
                  key={i} 
                  className={`svc-card${s.highlight ? " highlight" : ""}`}
                  variants={itemVariants}
                >
                  <div className="svc-icon">{s.icon}</div>
                  <h3 className="svc-name">{s.name}</h3>
                  <p className="svc-desc">{s.desc}</p>
                  <div className="svc-countries">
                    {s.countries.map((c, j) => (
                      <span key={j} className="ctag">{c}</span>
                    ))}
                  </div>
                  <a href="https://wa.me/917982295530" target="_blank" rel="noopener noreferrer" className="btn-services">
                    Contact via WhatsApp
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="process-section">
          <div className="container">
            <motion.div 
              className="process-head"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <motion.span className="eyebrow" variants={itemVariants}>Strategic Workflow</motion.span>
              <motion.h2 className="sec-title" variants={itemVariants}>The Path to International Success</motion.h2>
              <motion.p className="sec-desc" variants={itemVariants}>
                Our systematic approach provides absolute structural clarity from profile analysis 
                to finding your new international horizon.
              </motion.p>
            </motion.div>

            <motion.div 
              className="steps-row"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  className={`step ${activeStep === i ? "active" : ""}`}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                  variants={itemVariants}
                >
                  <div className="step-num">{s.num}</div>
                  <div className="step-icon">{s.icon}</div>
                  <div className="step-title">{s.title}</div>
                  <p className="step-desc">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CORE PILLARS & METRICS ── */}
        <section className="why-section">
          <div className="container">
            <div className="why-grid">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                <motion.span className="eyebrow" variants={itemVariants}>Our Guiding Vision</motion.span>
                <motion.h2 className="sec-title" variants={itemVariants}>Building Lifelong Global Relationships</motion.h2>
                
                <ul className="why-features">
                  {corePillars.map((w, i) => (
                    <motion.li key={i} className="wf-item" variants={itemVariants}>
                      <div className="wf-icon">{w.icon}</div>
                      <div className="wf-text">
                        <h4>{w.title}</h4>
                        <p>{w.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                className="why-visual"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                <motion.div className="why-visual-title" variants={itemVariants}>
                  Verified Visa Approvals By Destination
                </motion.div>
                
                <div className="approval-bars">
                  {approvalRates.map((a, i) => (
                    <motion.div key={i} className="abar-row" variants={itemVariants}>
                      <div className="abar-country">
                        <span className="abar-flag-text">
                          <img src={a.flag} alt={a.country} style={{ width: "24px", height: "auto", borderRadius: "2px", display: "inline-block", verticalAlign: "middle" }} />
                        </span>
                        <span>{a.country}</span>
                      </div>
                      <div className="abar-wrap">
                        <div className="abar-fill" style={{ width: `${a.rate}%` }} />
                      </div>
                      <div className="abar-val">{a.rate}%</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="testimonials-section">
          <div className="container">
            <motion.div 
              className="testimonials-head"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <motion.span className="eyebrow" variants={itemVariants}>Transformations</motion.span>
              <motion.h2 className="sec-title" variants={itemVariants}>Real Success Stories, Real Impacts</motion.h2>
            </motion.div>

            <motion.div 
              className="testi-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {testimonials.map((t, i) => (
                <motion.div key={i} className="testi-card" variants={itemVariants}>
                  <div className="testi-stars">{t.stars}</div>
                  <p className="testi-quote">"{t.quote}"</p>
                  <div className="testi-author">
                    <div className="testi-avatar">{t.initials}</div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-visa">{t.visa}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="show-more-wrapper">
              <a href="/feedback" className="show-more-btn">
                Show More
              </a>
            </div>
          </div>
        </section>
    
        {/* ── GLOBAL DESKS ── */}
        <section className="offices-section" id="desks">
          <div className="container">
            <motion.div 
              className="sec-header"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <div>
                <motion.span className="eyebrow" variants={itemVariants}>Global Support Gateway</motion.span>
                <motion.h2 className="sec-title" variants={itemVariants}>Connect with VIET Worldgate</motion.h2>
              </div>
              <motion.p className="sec-desc" variants={itemVariants}>
                Reach out to our specialized consulting teams across our international liaison desks for smooth management of your file.
              </motion.p>
            </motion.div>

            <motion.div 
              className="offices-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {globalDesks.map((o, i) => (
                <motion.div 
                  key={i} 
                  className={`office-card${o.hq ? " hq" : ""}`}
                  variants={itemVariants}
                >
                  {o.hq && <span className="hq-badge">Primary Hub</span>}

                  <div className="office-flag" style={{ marginBottom: "12px", display: "block" }}>
                    <img 
                      src={o.flag} 
                      alt={`${o.country} Flag`} 
                      style={{ width: "35px", height: "24px", objectFit: "cover", borderRadius: "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} 
                    />
                  </div>

                  <div className="office-city" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <MapPin size={16} style={{ color: "var(--gold, #d4af37)" }} /> {o.city}
                  </div>
                  <div className="office-country">{o.country}</div>
                  <p style={{ fontSize: "12px", color: "#8c8c8c", marginTop: "2px", marginBottom: "12px" }}>{o.address}</p>

                  <ul className="office-info">
                    <li>
                      <span className="ic"><Phone size={14} /></span>
                      <a href={`tel:${o.phone.replace(/\s+/g, "")}`} className="contact-link">{o.phone}</a>
                    </li>
                    <li>
                      <span className="ic"><Mail size={14} /></span>
                      <a href={`https://mail.google.com/mail/?view=cm&to=${o.email}`} target="_blank" rel="noopener noreferrer" className="contact-link">{o.email}</a>
                    </li>
                  </ul>

                  <a href={o.url} className="read-more-btn">Read More →</a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="container">
            <motion.div 
              className="cta-inner"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <motion.span className="eyebrow" variants={itemVariants}>Ignite Your Potential</motion.span>
              <motion.h2 className="cta-title" variants={itemVariants}>
                Your Gateway to International Success<br />
                <span className="gold-text">Starts with an Expert Session.</span>
              </motion.h2>
              <motion.p className="cta-sub" variants={itemVariants}>
                Schedule a focused consultation with a qualified global migration coordinator. 
                Gain absolute strategic clarity with no hidden liabilities or commitments.
              </motion.p>
            </motion.div>
            <div className="cta-btns">
              <a href="tel:+917982295530" className="btn-gold">
                📞 Schedule Free Advisory Call →
              </a>
              <a href="https://wa.me/917982295530" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                 Contact via WhatsApp
              </a>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}