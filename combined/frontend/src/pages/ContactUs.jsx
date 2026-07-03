import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

import "./ContactUs.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import logo from "../assets/contactimage.jpeg";

// Aapki CompanyProfile waali exact same configuration jo kabhi fail nahi hoti
const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.1 }} // amount kam rakha hai taaki scroll karte hi turant dikhe
  >
    {children}
  </motion.div>
);

export default function ContactUs() {
  const addresses = [
    {
      type: "International Head Office",
      title: "London, United Kingdom",
      text: "401, A Oxford Street, London, United Kingdom",
    },
    {
      type: "Domestic Corporate Office",
      title: "Noida, India",
      text: "36, Block H, Sector 5, Noida, Uttar Pradesh 201301",
    },
    {
      type: "Domestic Branch Office",
      title: "Ghaziabad, India",
      text: "A-112, First Floor, Shyam Park Extension, Sahibabad",
    },
  ];

  const phoneNumbers = [
    {
      label: "Domestic (India):",
      number: "+91-7982295530",
    },
    {
      label: "International:",
      number: "+44 7500494401",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="contact-container">
        {/* HERO SECTION - Normal fade without complex staging */}
        <motion.div
          className="hero-banner"
          style={{ backgroundImage: `url(${logo})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-content">
            <h1 className="hero-title"></h1>
            <div className="breadcrumb">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </motion.div>

        <div className="main-wrapper">
          
          {/* INFO CARDS GRID */}
          <div className="info-cards-grid">
            {/* Address Cards - Har ek card par individual FadeUp apply kiya hai */}
            {addresses.map((addr, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <div className="info-card">
                  <div className="icon-circle">
                    <MapPin size={28} />
                  </div>
                  <span className="card-badge">{addr.type}</span>
                  <h3 className="card-title">{addr.title}</h3>
                  <p className="card-text">{addr.text}</p>
                </div>
              </FadeUp>
            ))}

            {/* Phone Card */}
            <FadeUp delay={addresses.length * 0.1}>
              <div className="info-card">
                <div className="icon-circle">
                  <Phone size={28} />
                </div>
                <span className="card-badge">Support Lines</span>
                <h3 className="card-title">Phone Numbers</h3>
                {phoneNumbers.map((phone, idx) => (
                  <div key={idx}>
                    <strong className="phone-label">{phone.label}</strong>
                    <p className="card-text">
                      <a
                        href={`tel:${phone.number.replace(/[^+\d]/g, "")}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {phone.number}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Email Card */}
            <FadeUp delay={(addresses.length + 1) * 0.1}>
              <div className="info-card">
                <div className="icon-circle">
                  <Mail size={28} />
                </div>
                <span className="card-badge">Global Inbox</span>
                <h3 className="card-title">Email Address</h3>
                <p
                  className="card-text"
                  style={{ wordBreak: "break-word", marginTop: "4px" }}
                >
                  <a
                    href="mailto:info@vietworldgate.com"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    info@vietworldgate.com
                  </a>
                </p>
              </div>
            </FadeUp>
          </div>

          {/* LOWER SECTION: MAP & WHATSAPP ROW */}
          <div className="content-grid">
            {/* Google Map */}
            <FadeUp delay={0.1}>
              <div className="map-container">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562141595166!2d77.31388547631557!3d28.597920175684534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4f62ca934f5%3A0x6ec0c55fde0787e9!2sBlock%20H%2C%20Sector%205%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </FadeUp>

            {/* WhatsApp Section */}
            <FadeUp delay={0.2}>
              <div className="form-container">
                <span className="form-tag">Quick Support</span>
                <h2 className="form-heading">
                  Chat on <span>WhatsApp</span>
                </h2>
                <p style={{ marginBottom: "20px", color: "#6b7280" }}>
                  Click below to start chatting instantly with our team.
                </p>
                <a
                  href="https://wa.me/917982295530?text=Hello%20VIET%20WORLDGATE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="submit-btn"
                  style={{ display: "inline-block", textAlign: "center" }}
                >
                  Start WhatsApp Chat
                </a>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}