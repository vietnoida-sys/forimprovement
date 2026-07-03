import React from "react";
import "./ContactNoida.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaUserAlt,
  FaBriefcase,
  FaPhoneAlt,
} from "react-icons/fa";


const ContactNoida = () => {
  const whatsappFormLink =
    "https://wa.me/917982295530?text=Hi,%20I%20am%20interested%20in%20studying%20abroad%20from%20Noida.";

  return (
    <>
    
      <Navbar />

      <div className="contact-page">

        {/* HERO SECTION */}
        <section className="Noida-contact-hero">
          <div className="hero-overlay">
            <h1>Noida</h1>
            
          </div>
        </section>

        {/* MAIN SECTION */}
        <section className="contact-wrapper">

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
              Connect instantly with our experts for admission,
              university, course, and visa guidance.
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

          {/* INFO CARDS */}
          <div className="info-grid">
<div className="info-card">
  <div className="info-icon">
    <FaMapMarkerAlt />
  </div>

  <h4>Address</h4>

  <p>
    <a
      href="https://www.google.com/maps?q=28.6293590,77.3788000"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      36, Block H, Sector 63,<br />
      Noida, Uttar Pradesh 201301,<br />
      India
    </a>
  </p>
</div>

            <div className="info-card">
              <div className="info-icon">
                <FaUserAlt />
              </div>

              <h4>Name</h4>

              <p>Navneet Kaur</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaBriefcase />
              </div>

              <h4>Designation</h4>

              <p>Noida Regional Admissions Director</p>
            </div>

          <div className="info-card">
  <div className="info-icon">
    <FaPhoneAlt />
  </div>

  <h4>Phone</h4>

  <p>
    <a
      href="tel:+917982295530"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      +91 79822 95530
    </a>
  </p>
</div>

          </div>

          {/* MAP */}
          <div className="map-box">
            <iframe
              title="Noida Map"
              src="https://www.google.com/maps?q=28.6293590,77.3788000&z=15&output=embed"
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

export default ContactNoida;