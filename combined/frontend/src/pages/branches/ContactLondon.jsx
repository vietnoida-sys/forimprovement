import React from "react";
import "./ContactLondon.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaUserAlt,
  FaBriefcase,
  FaPhoneAlt,
} from "react-icons/fa";

const ContactLondon = () => {

  const whatsappFormLink =
    "https://wa.me/917982295530?text=Hi,%20I%20am%20interested%20in%20studying%20abroad%20and%20connecting%20with%20the%20London%20Branch.";

  return (
    <>
     
      <Navbar />

      <div className="contact-page">

        {/* HERO SECTION */}
        <section className="contact-hero">
          <div className="hero-overlay">
            <h1>London Branch</h1>
            
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
                <h3>Global Academic Support</h3>
                <p>Online • Advisors Ready</p>
              </div>

            </div>

            <p className="whatsapp-text">
              Looking to apply for top universities in the UK?
              Connect instantly with our global experts for
              admission, course selection, scholarships,
              and visa guidance.
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
        
<div className="info-card">
  <div className="info-icon">
    <FaMapMarkerAlt />
  </div>

  <h4>Address</h4>

  <p>
    <a
      href="https://www.google.com/maps?q=401A+Oxford+Rd,+Reading+RG30+1HA,+United+Kingdom"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      401A Oxford Rd,<br />
      Reading RG30 1HA,<br />
      United Kingdom
    </a>
  </p>
</div>

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

              <p>International Admissions Director</p>

            </div>

            {/* PHONE */}
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
              title="London Map"
              src="https://www.google.com/maps?q=401A+Oxford+Rd,+Reading+RG30+1HA,+United+Kingdom&output=embed"
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

export default ContactLondon;