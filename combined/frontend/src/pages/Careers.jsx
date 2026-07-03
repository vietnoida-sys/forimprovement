import React, { useState } from 'react';
import './Careers.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: delay }}
    viewport={{ once: true, amount: 0.15 }}
  >
    {children}
  </motion.div>
);

const Careers = () => {
  const initialJobs = [
    { id: 1, title: 'Senior Visa Case Officer (Canada & Australia)', department: 'Immigration', location: 'Delhi / Hybrid', type: 'Full-time' },
    { id: 2, title: 'Overseas Education Consultant', department: 'Student Visa', location: 'Mumbai Office', type: 'Full-time' },
    { id: 3, title: 'IELTS / PTE Corporate Trainer', department: 'Training & Development', location: 'Remote', type: 'Part-time' },
    { id: 4, title: 'B2B Global Mobility Specialist', department: 'Corporate Work Visa', location: 'Bangalore Office', type: 'Full-time' },
    { id: 5, title: 'Customer Success Executive (Pre-Departure Support)', department: 'Operations', location: 'Pune Office', type: 'Full-time' },
  ];

  const [jobs] = useState(initialJobs);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = selectedDept === 'All'
    ? jobs
    : jobs.filter(function(job) { return job.department === selectedDept; });

  const perks = [
    {
      icon: '✈️',
      title: 'International Mobility',
      desc: 'Top performers get opportunities to work at our international partner offices or attend global immigration summits.',
    },
    {
      icon: '🎓',
      title: 'Visa Expertise & Certifications',
      desc: 'Get certified by RCIC (Canada) or MARA (Australia) agents. We fund your global immigration compliance training.',
    },
    {
      icon: '💼',
      title: 'Corporate Visa Sponsorship',
      desc: 'Yes, we practice what we preach! For internal transfers, we facilitate and sponsor employee work visas for overseas branches.',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="careers-container">

        {/* HERO */}
        <motion.header
          className="careers-hero-global"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-overlay-global">
            <motion.div
              className="hero-content-global"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="hero-badge">🌍 Build a Global Career</span>
              <nav className="breadcrumb"></nav>
            </motion.div>
          </div>
        </motion.header>

        {/* WELCOME SECTION */}
        <FadeUp>
          <main className="careers-main">
            <h2>Why Build Your Career With Us?</h2>
            <div className="content-wrapper-global">
              <div className="badge-icon-global">🚀</div>
              <p className="careers-description">
                We are a leading Global Mobility firm specializing in <strong>Work Visas, Study Visas, and Permanent Residency PR</strong> programs. Working here means you don't just do a job—you change lives by helping professionals and students transition smoothly into international destinations like <strong>Canada, Australia, the UK, and the USA and more country</strong>. If you are passionate about global immigration laws, career counselling, or international relations, we want you!
              </p>
            </div>
          </main>
        </FadeUp>

        {/* PERKS SECTION */}
        <section className="visa-perks-section">
          <FadeUp>
            <h3>The Perks of Going Global With Us</h3>
          </FadeUp>
          <div className="perks-grid">
            {perks.map(function(perk, i) {
              return (
                <motion.div
                  key={i}
                  className="perk-card"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.15 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="perk-icon">{perk.icon}</div>
                  <h4>{perk.title}</h4>
                  <p>{perk.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Careers;