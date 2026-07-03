import React from "react";
import "./ContactDelhi.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaUserAlt,
  FaBriefcase,
  FaPhoneAlt,
} from "react-icons/fa";


const ContactDelhi = () => {

  const whatsappFormLink =
    "https://wa.me/917982295530?text=Hi,%20I%20am%20interested%20in%20studying%20abroad%20from%20Delhi.";

  return (
    <>
     
      <Navbar />

      <div className="contact-page">

        {/* HERO SECTION */}
        <section className="Delhi-contact-hero">
          <div className="hero-overlay">
            <h1>Delhi Branch</h1>
            
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="contact-wrapper">

          {/* HEADING */}
          <div className="contact-heading">

            <span>CONTACT US</span>

            <h2>
              Get in <strong>Touch</strong>
            </h2>

          </div>

          {/* WHATSAPP CARD */}
          <div className="whatsapp-card">

            <div className="whatsapp-top">

              <div className="whatsapp-icon">
                <FaWhatsapp />
              </div>

              <div>
                <h3>Academic Support</h3>
                <p>Online • Advisors Ready</p>
              </div>

            </div>

            <p className="whatsapp-text">
              Looking for expert guidance for study abroad
              admissions, scholarships, universities,
              or visa applications? Connect instantly
              with our Delhi counseling team.
            </p>

            <a
              href={whatsappFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              Start Chat
            </a>

          </div>

          {/* INFO GRID */}
          <div className="info-grid">

            {/* ADDRESS */}
           <a
  href="https://www.google.com/maps?q=Block+B+Lajpat+Nagar+3+New+Delhi+110024"
  target="_blank"
  rel="noopener noreferrer"
  className="info-card"
>
  <div className="info-icon">
    <FaMapMarkerAlt />
  </div>

  <h4>Address</h4>

  <p>
    06 B Block, Lajpat Nagar <br />
    New Delhi - 110024
  </p>
</a>

            {/* NAME */}
            <div className="info-card">

              <div className="info-icon">
                <FaUserAlt />
              </div>

              <h4>Name</h4>

              <p>Navneet Kaur</p>

            </div>

            {/* DESIGNATION */}
            <div className="info-card">

              <div className="info-icon">
                <FaBriefcase />
              </div>

              <h4>Designation</h4>

              <p>Delhi Regional Admissions Director</p>

            </div>

            {/* PHONE */}
        <a href="tel:+917982549603" className="info-card">
  <div className="info-icon">
    <FaPhoneAlt />
  </div>

  <h4>Phone</h4>

  <p>+91 79825 49603</p>
</a>

          </div>

          {/* MAP SECTION */}
          <div className="map-box">

            <iframe
              title="Delhi Map"
              src="https://www.google.com/maps?q=Block+B+Lajpat+Nagar+3+New+Delhi+110024&z=17&output=embed"
              allowFullScreen
              loading="lazy"
            ></iframe>

          </div>

        </section>
      </div>

      <Footer />
    </>
  );
};

export default ContactDelhi;