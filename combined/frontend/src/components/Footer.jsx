import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

import logo from '../assets/vietworldgate1.png';

import { 
  FaRegEnvelopeOpen, 
  FaArrowRight, 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedinIn, 
  FaWhatsapp,
  FaRegEnvelope
} from 'react-icons/fa';

import { 
  FaLocationDot, 
  FaMobileScreenButton 
} from 'react-icons/fa6';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="newsletter-info">
            <FaRegEnvelopeOpen className="newsletter-icon" />

            <p>
              Get the latest creative news from VIET WORLDGATE about
              courses, offers, events and many more.
            </p>
          </div>

          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
            />

            <button type="submit">
              SUBSCRIBE <FaArrowRight />
            </button>
          </form>
        </div>

        <div className="footer-divider"></div>

        {/* Main Footer Content */}
        <div className="footer-content">

          {/* Column 1 */}
          <div className="footer-col">

            <img
              src={logo}
              alt="VIET WORLDGATE Logo"
              className="footer-logo"
            />

            <p>
              VIET WORLDGATE is one of the largest international
              student recruitment companies in South Asia.
              In the last 6+ years, through our vast network
              of over 200+ Institutions worldwide & 7+ Branches,
              we have placed 2600+ students all over the world.
            </p>

            <div className="social-icons">
              <a href="#facebook" aria-label="Facebook">
                <FaFacebookF />
              </a>

              <a href="//www.instagram.com/viet.india" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="https://www.youtube.com/@viet.worldgate" aria-label="YouTube">
                <FaYoutube />
              </a>

              <a href="https://www.linkedin.com/in/viet-worldgate-private-limited-7940b8419" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>

              <a href="https://wa.me/7982295530" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="footer-col">

            <h4>VIET WORLDGATE</h4>

            <ul>
              <li>
                <Link to="/ContactDelhi">VIET WORLDGATE Delhi</Link>
              </li>

              <li>
                <Link to="/ContactGhaziabad">
                  VIET WORLDGATE Ghaziabad(Registered Office)
                </Link>
              </li>

              <li>
                <Link to="/ContactNoida">VIET WORLDGATE Noida</Link>
              </li>

              <li>
                <Link to="/ContactLondon">
                  VIET WORLDGATE International branch London
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col">

            <h4>VIET WORLDGATE STUDY ABROAD</h4>

            <ul>
              <li>
                <Link to="/OurServices">
                  Service to Students
                </Link>
              </li>

              <li>
                <Link to="/universitypartner">
                  Service to institutions
                </Link>
              </li>

              <li>
                <Link to="/Scholarships">
                  Scholarships
                </Link>
              </li>

              <li>
                <Link to="/upcomingevents">
                  Events
                </Link>
              </li>

              <li>
                <Link to="/feedback">
                  Testimonials
                </Link>
              </li>

              <li>
                <Link to="/Careers">
                  Careers
                </Link>
              </li>

              <li>
                <Link to="/gallary">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-col">

            <h4>GET IN TOUCH</h4>

            {/* Domestic Address */}
         <div className="contact-item">
  <a
    href="https://www.google.com/maps?q=28.6293590,77.3788000"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaLocationDot className="contact-icon" />
  </a>

  <div className="contact-info">
    <strong>Domestic Address</strong>

    <a
      href="https://www.google.com/maps?q=28.6293590,77.3788000"
      target="_blank"
      rel="noopener noreferrer"
      className="contact-link"
    >
      36, Block H, Sector 63, <br />
      Noida, Uttar Pradesh 201301 <br />
      India
    </a>
  </div>
</div>
            {/* Domestic Phone */}
          <div className="contact-item">
  <FaMobileScreenButton className="contact-icon" />

  <div className="contact-info">
    <strong>Phone</strong>

    <a href="tel:+917982295530" className="contact-link">
      +91 79822 95530
    </a>
  </div>
</div>

            {/* International Address */}
           <div className="contact-item">
  <FaLocationDot className="contact-icon" />

  <div className="contact-info">
    <strong>International Address</strong>

    <a
      href="https://www.google.com/maps?q=401+A+Oxford+Street+London+United+Kingdom"
      target="_blank"
      rel="noopener noreferrer"
      className="contact-link"
    >
      401, A Oxford Street <br />
      London <br />
      United Kingdom
    </a>
  </div>
</div>

            {/* International Phone */}
            <div className="contact-item">
  <FaMobileScreenButton className="contact-icon" />

  <div className="contact-info">
    <strong>Phone</strong>

    <a href="tel:+447500494401" className="contact-link">
      +44 7500 494401
    </a>
  </div>
</div>
            {/* Email */}
           <div className="contact-item">
  <FaRegEnvelope className="contact-icon" />

  <div className="contact-info">
    <strong>Email Address</strong>

    <a 
      href="mailto:info@vietworldgate.com" 
      className="contact-link"
    >
      info@vietworldgate.com
    </a>
  </div>
</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom-divider"></div>

        <div className="footer-bottom">

          <div className="copyright">
            Copyright © 2020 All Rights Reserved.
            VIET WORLDGATE Pvt. Ltd. Company
          </div>

          <div className="footer-bottom-links">

            <Link to="/companyprofile" onClick={scrollToTop}>
              About Us
            </Link>

            <Link to="/contact-us" onClick={scrollToTop}>
              Contact Us
            </Link>

            <Link to="/termsandconditions" onClick={scrollToTop}>
              Privacy Policy
            </Link>

            <Link to="/ContactNoida" onClick={scrollToTop}>
              Branches
            </Link>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;