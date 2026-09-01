import React from 'react';
import { motion } from 'framer-motion';

import LogoImage1 from '../assets/componycertificate/certificate1.jpg';
import LogoImage2 from '../assets/componycertificate/certificate2.jpg';
import LogoImage3 from '../assets/componycertificate/jdcertificate.jpeg';
import LogoImage4 from '../assets/componycertificate/jdcertificate2.jpeg';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './Certificate.css';

const Certificate = () => {
  const certificates = [
    { id: 1, image: LogoImage1 },
    { id: 2, image: LogoImage2 },
    { id: 3, image: LogoImage3 },
    { id: 4, image: LogoImage4 },
  ];

  return (
    <>
      <Navbar />

      <div className="certificate-page">
        {/* HERO */}
        <motion.section
          className="certificate-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="certificate-hero-content"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="certificate-eyebrow">Our Recognition</p>
            <h1 className="certificate-title">Certificates & Achievements</h1>
            <p className="certificate-subtitle">
              Recognition of our commitment, excellence and achievements.
            </p>
          </motion.div>
        </motion.section>

        {/* CERTIFICATES */}
        <main className="certificate-section">
          <div className="certificate-container">
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                className="certificate-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <img
                  src={certificate.image}
                  alt={`Certificate ${certificate.id}`}
                  className="certificate-image"
                />
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Certificate;