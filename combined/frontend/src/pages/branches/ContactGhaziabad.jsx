import React from "react";
import "./ContactGhaziabad.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaUserAlt,
  FaBriefcase,
  FaPhoneAlt,
} from "react-icons/fa";


const ContactGhaziabad = () => {

  const whatsappFormLink =
    "https://wa.me/917982295530?text=Hi,%20I%20am%20interested%20in%20studying%20abroad%20from%20Ghaziabad.";

  return (
    <>
     
      <Navbar />

      <div className="contact-page">

        {/* HERO SECTION */}
        <section className="Ghaziabad-contact-hero">
          <div className="hero-overlay">
            <h1>Ghaziabad Branch</h1>
           
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
              Need guidance for study abroad admissions,
              universities, scholarships, or visa process?
              Connect instantly with our expert counselors
              for quick support.
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
      href="https://www.google.com/maps?q=A-112,+First+Floor,+Shyam+Park+Extension,+Sahibabad,+Ghaziabad,+Uttar+Pradesh,+201005"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      A-112, First Floor,<br />
      Shyam Park Extension,<br />
      Sahibabad, Ghaziabad,<br />
      Uttar Pradesh 201005, India
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

              <p>Regional Admissions Director</p>

            </div>

            {/* PHONE */}
           <div className="info-card">
  <div className="info-icon">
    <FaPhoneAlt />
  </div>

  <h4>Phone</h4>

  <p>
    <a
      href="tel:+917982549603"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      +91 7982549603
    </a>
  </p>
</div>

          </div>

          {/* MAP */}
          <div className="map-box">

            <iframe
              title="Ghaziabad Map"
              src="https://www.google.com/maps?q=28.6739,77.3646&z=17&output=embed"
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

export default ContactGhaziabad;