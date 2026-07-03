import React from 'react';
import './Certificate.css';
import LogoImage1 from '../assets/componycertificate/certificate1.jpg';
import LogoImage2 from '../assets/componycertificate/certificate2.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Certificate = () => {
  return (
    <>
      <Navbar />
      <div className="cert-page">

        {/* HERO */}
        <motion.header
          className="cert-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="cert-hero__content"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="cert-hero__title">Certificate & Achievement</p>
          </motion.div>
        </motion.header>

        {/* CARDS */}
        <main className="cert-cards">
          <div className="cert-cards__grid">

            <motion.div
              className="cert-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <img src={LogoImage1} alt="Certificate One" className="cert-card__img" />
            </motion.div>

            <motion.div
              className="cert-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="cert-card__img">
                <img src={LogoImage2} alt="Certificate Two" className="cert-card__img" />
              </div>
            </motion.div>

          </div>
        </main>

      </div>
      <Footer />
    </>
  );
};

export default Certificate;