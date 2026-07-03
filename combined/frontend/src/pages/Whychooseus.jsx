import React from "react";
import "./Whychooseus.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/vietworldgate.png";
import { MessageCircle, Phone } from "lucide-react"; 
import { motion } from "framer-motion";

// --- Production-Grade Scroll Transition Presets ---
const slideUpScroll = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.55, 
      ease: [0.16, 1, 0.3, 1] // Custom premium cubic-bezier ease
    } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08 // Elegant cascade timing offset
    }
  }
};

const WhyChooseUs = () => {
  const whatsappNumber = "917982295530";
  const phoneNumber = "+917982295530";

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const features = [
    {
      title: "Expert Guidance",
      desc: "Experienced consultants guide you at every step of your journey.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      title: "High Visa Success",
      desc: "Strong track record with maximum visa approval success rate.",
      img: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
    {
      title: "Top Universities",
      desc: "We connect you with globally recognized universities.",
      img: "https://cdn-icons-png.flaticon.com/512/8074/8074809.png",
    },
    {
      title: "End-to-End Support",
      desc: "From application to visa approval and travel assistance.",
      img: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
    },
    {
      title: "Affordable Processing",
      desc: "Transparent pricing with no hidden charges.",
      img: "https://cdn-icons-png.flaticon.com/512/2331/2331941.png",
    },
    {
      title: "Fast Processing",
      desc: "Quick documentation and faster application processing.",
      img: "https://cdn-icons-png.flaticon.com/512/189/189792.png",
    },
  ];

  const countriesList = [
    { name: "Canada", code: "ca" },
    { name: "Australia", code: "au" },
    { name: "UK", code: "gb" },
    { name: "Japan", code: "jp" },
    { name: "Italy", code: "it" },
    { name: "Dubai", code: "ae" },
    { name: "Germany", code: "de" }
  ];

  return (
    <>
      <Navbar />
      
      {/* HERO SECTION */}
      <motion.section 
        className="heros"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Left Side Content Segment */}
        <motion.div className="heros-left" variants={staggerContainer}>
          <motion.h1 variants={slideUpScroll}>
            Study Abroad with <br />
            <motion.span className="brand" variants={slideUpScroll}>
              <motion.img 
                src={logo} 
                className="heros-logo" 
                alt="VietWorldGate Logo" 
                variants={slideUpScroll} 
              /> 
              VietWorldGate
            </motion.span>
          </motion.h1>

          <motion.div className="hero-action-btns" variants={staggerContainer}>
            <motion.button 
              className="whatsapp-btn2" 
              onClick={openWhatsApp}
              variants={slideUpScroll}
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </motion.button>
            <motion.a 
              href={`tel:${phoneNumber}`} 
              className="phone-btn-animated"
              variants={slideUpScroll}
            >
              <Phone size={18} /> Schedule Call
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Side Country Cards Uniform Grid */}
        <motion.div className="heros-right" variants={staggerContainer}>
          {countriesList.map((country, index) => (
            <motion.div 
              className="card" 
              key={index} 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <motion.img 
                src={`https://flagcdn.com/w320/${country.code}.png`} 
                alt={country.name} 
                variants={slideUpScroll}
              />
              <motion.span variants={slideUpScroll}>{country.name}</motion.span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* WHY CHOOSE US GRID SECTION */}
      <motion.div 
        className="whys-container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Animated Main Section Header */}
        <motion.h2 variants={slideUpScroll}>
          Why Choose Us
        </motion.h2>

        <motion.div className="why-container" variants={staggerContainer}>
          {features.map((item, index) => (
            <motion.div 
              className="why-card" 
              key={index}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {/* Every nested item (image, header, description) has individual scroll elements */}
              <motion.img 
                src={item.img} 
                alt={item.title} 
                className="why-icon" 
                variants={slideUpScroll}
              />
              <motion.h3 variants={slideUpScroll}>{item.title}</motion.h3>
              <motion.p variants={slideUpScroll}>{item.desc}</motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      <Footer />
    </>
  );
};

export default WhyChooseUs;