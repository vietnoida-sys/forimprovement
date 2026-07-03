import React, { useState } from 'react';
import './TermsConditions.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

// --- Static Data Arrays for Clean & Maintainable Production Code ---
const SERVICES = [
  "Study Visa Assistance",
  "Visit Visa Assistance",
  "Documentation Guidance",
  "Application Filing Support",
  "SOP / Cover Letter Guidance",
  "IELTS Preparation Guidance"
];

const DISCLAIMERS = [
  "Visa Approval / Admission Confirmation",
  "Job Placement / Scholarship Approval",
  "IELTS/PTE Results"
];

const RESPONSIBILITIES = [
  "Provide accurate and genuine information",
  "Submit authentic documents",
  "Attend interviews, biometrics, and appointments when required",
  "Follow timelines and instructions provided by our team",
  "Pay agreed fees on time"
];

const REFUND_CONDITIONS = [
  "Visa applications are rejected or clients voluntarily withdraw applications.",
  "Incorrect, misleading, incomplete, or fraudulent documents are submitted.",
  "Services have already been initiated."
];

const PRIVACY_BADGES = [
  "Full Name", "Email Address", "Phone Number", "Passport Information",
  "Educational Documents", "Financial Documents", "Application Info", "Communication Records"
];

const USAGE_POINTS = [
  "Evaluate eligibility and process applications.",
  "Prepare documentation and visa submission forms.",
  "Communicate updates and provide expert consultancy services.",
  "Maintain strict internal compliance records."
];

// --- High-End Enterprise Animation Presets ---
const slideUpScroll = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.65, 
      ease: [0.16, 1, 0.3, 1] // Premium cubic-bezier transition
    } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const PolicyPage = () => {
  const [activeTab, setActiveTab] = useState('terms');

  return (
    <>
      <Navbar />

      <div className="policy-container">
        {/* Header Section (Triggers automatically on load) */}
        <header className="policy-header">
          <motion.div 
            className="header-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="brand-subtext">Viet Worldgate</span>
            <h1 className="header-title">Legal & Privacy Center</h1>
            <p className="header-desc">
              Please read our Terms & Conditions and Privacy Policy carefully to understand our services and guidelines.
            </p>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="policy-main">

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              onClick={() => setActiveTab('terms')}
              className={`tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
            >
              Privacy Policy
            </button>
          </div>

          {/* Dynamic Content Box */}
          <div className="content-card">

            {/* TERMS & CONDITIONS SECTION */}
            {activeTab === 'terms' && (
              <div className="tab-pane-content">
                <motion.h2 
                  className="section-heading"
                  variants={slideUpScroll}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  Terms & Conditions
                </motion.h2>
                <motion.p 
                  className="intro-text"
                  variants={slideUpScroll}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  Welcome to <strong>Viet Worldgate</strong>. By accessing our website and using our consultancy services, you agree to comply with the following Terms & Conditions.
                </motion.p>

                <div className="sections-wrapper">
                  
                  {/* Section 1 */}
                  <motion.section 
                    className="content-section"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <h3 className="sub-heading">
                      <span className="step-num"></span> Services Offered
                    </h3>
                    <p className="section-p">We provide consultancy and support services including:</p>
                    <motion.ul 
                      className="services-grid" 
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                    >
                      {SERVICES.map((service, index) => (
                        <motion.li key={index} variants={slideUpScroll}>
                          {service}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.section>

                  {/* Section 2 */}
                  <motion.section 
                    className="content-section"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <h3 className="sub-heading">
                      <span className="step-num"></span> Nature of Services
                    </h3>
                    <div className="alert-box warning-box">
                      <p className="alert-title">Important Disclaimer:</p>
                      <p>Our services are advisory and consultancy-based only. We do not guarantee visa approvals or job placements.</p>
                    </div>
                    <p className="section-p">We explicitly do <strong>NOT</strong> guarantee:</p>
                    <motion.ul 
                      className="bullet-list"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                    >
                      {DISCLAIMERS.map((disclaimer, index) => (
                        <motion.li key={index} variants={slideUpScroll}>
                          {disclaimer}
                        </motion.li>
                      ))}
                    </motion.ul>
                    <p className="footnote">All final decisions are made solely by the respective universities, embassies, consulates, and immigration authorities.</p>
                  </motion.section>

                  {/* Section 3 */}
                  <motion.section 
                    className="content-section"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <h3 className="sub-heading">
                      <span className="step-num"></span> Client Responsibilities
                    </h3>
                    <motion.ul 
                      className="bullet-list text-list"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                    >
                      {RESPONSIBILITIES.map((resp, index) => (
                        <motion.li key={index} variants={slideUpScroll}>
                          {resp}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.section>

                  {/* Section 4 */}
                  <motion.section 
                    className="content-section"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <h3 className="sub-heading">
                      <span className="step-num"></span> Fees & Payments
                    </h3>
                    <p className="section-p">
                      All consultancy fees, processing charges, government fees, biometric fees, booking charges, and third-party charges must be paid as agreed.
                    </p>
                    <p className="highlight-text">Payment obligations remain applicable once the process has been initiated.</p>
                  </motion.section>

                  {/* Section 5 */}
                  <motion.section 
                    className="content-section"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <h3 className="sub-heading">
                      <span className="step-num"></span> Refund Policy
                    </h3>
                    <p className="section-p">Refunds will <strong>not</strong> be provided if:</p>
                    <motion.ul 
                      className="bullet-list"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                    >
                      {REFUND_CONDITIONS.map((cond, index) => (
                        <motion.li key={index} variants={slideUpScroll}>
                          {cond}
                        </motion.li>
                      ))}
                    </motion.ul>
                    <div className="alert-box success-box">
                      Refunds may be considered only if the company fails to initiate the agreed process after receiving payment.
                    </div>
                  </motion.section>

                  {/* Section 6 */}
                  <motion.section 
                    className="content-section"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <h3 className="sub-heading">
                      <span className="step-num"></span> No Guarantee Disclaimer
                    </h3>
                    <p className="section-p text-justify">
                      Visa approval, admission offers, scholarships, and immigration outcomes depend entirely on external authorities. The company shall not be responsible for visa refusals, processing delays, admission rejection, embassy decisions, or financial/travel losses resulting from such decisions.
                    </p>
                  </motion.section>

                  {/* Two Column Grid */}
                  <motion.div 
                    className="two-column-row"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <div>
                      <h4 className="mini-title">Communication</h4>
                      <p className="mini-desc">Email shall be considered the primary official mode of communication. Verbal discussions or informal assurances shall not override written agreements.</p>
                    </div>
                    <div>
                      <h4 className="mini-title"> Document Handling</h4>
                      <p className="mini-desc">Clients voluntarily submit documents. Reasonable care will be taken, but we are not liable for delays or losses caused by couriers, embassies, or third-parties.</p>
                    </div>
                  </motion.div>

                  {/* Alert Box */}
                  <motion.div 
                    className="alert-box danger-box"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <p className="alert-title">Misrepresentation Alert</p>
                    <p>Submission of forged, fake, or misleading documents may result in immediate termination of services, no refund eligibility, and reporting to relevant authorities where required.</p>
                  </motion.div>

                  {/* Footer Notes */}
                  <motion.footer 
                    className="footer-notes"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <p><strong>Limitation of Liability:</strong> Limited strictly to services directly provided.</p>
                    <p><strong>Force Majeure:</strong> Not responsible for delays caused by policy changes, natural disasters, etc.</p>
                  </motion.footer>
                </div>
              </div>
            )}

            {/* PRIVACY POLICY SECTION */}
            {activeTab === 'privacy' && (
              <div className="tab-pane-content">
                <motion.h2 
                  className="section-heading"
                  variants={slideUpScroll}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  Privacy Policy
                </motion.h2>
                <motion.p 
                  className="intro-text"
                  variants={slideUpScroll}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <strong>Viet Worldgate</strong> respects your privacy and is committed to protecting your personal information.
                </motion.p>

                <div className="sections-wrapper">
                  
                  {/* Privacy Section 1 */}
                  <motion.section 
                    className="content-section"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <h3 className="sub-heading-simple">1. Information We Collect</h3>
                    <motion.div 
                      className="badge-container"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                    >
                      {PRIVACY_BADGES.map((badge, index) => (
                        <motion.span className="badge" key={index} variants={slideUpScroll}>
                          {badge}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.section>

                  {/* Privacy Section 2 */}
                  <motion.section 
                    className="content-section"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <h3 className="sub-heading-simple">2. How We Use Information</h3>
                    <motion.ul 
                      className="bullet-list spacing-list"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                    >
                      {USAGE_POINTS.map((point, index) => (
                        <motion.li key={index} variants={slideUpScroll}>
                          {point}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.section>

                  {/* Two Column Cards */}
                  <motion.div 
                    className="two-column-row gray-cards"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <div className="info-card">
                      <h4 className="mini-title">3. Document Storage & Security</h4>
                      <p className="mini-desc">We securely store copies for application processing, compliance, and internal records. We implement reasonable technical measures to protect against unauthorized access or misuse.</p>
                    </div>
                    <div className="info-card">
                      <h4 className="mini-title">4. Sharing of Information</h4>
                      <p className="mini-desc">Shared only when necessary with Universities, Embassies, Immigration Authorities, or authorized third-party providers. <strong className="text-red">We never sell data.</strong></p>
                    </div>
                  </motion.div>

                  {/* Privacy Section 5 */}
                  <motion.section 
                    className="content-section"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <h3 className="sub-heading-simple">5. Marketing Consent</h3>
                    <p className="section-p">
                      By using our services, you allow us to use non-sensitive information (Name, Testimonials, Success Stories, Reviews) for promotional purposes. Sensitive data like passport or financial documents will never be disclosed without explicit consent.
                    </p>
                  </motion.section>

                  {/* Three Column Info Block */}
                  <motion.div 
                    className="three-column-row"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <div>
                      <h5 className="column-title">6. Cookies & Analytics</h5>
                      <p className="column-desc">Used to improve user experience, monitor web performance, and analyze traffic behavior.</p>
                    </div>
                    <div>
                      <h5 className="column-title">7. Data Retention</h5>
                      <p className="column-desc">Information is retained as long as required for operational, legal, and compliance laws.</p>
                    </div>
                    <div>
                      <h5 className="column-title">8. Your Rights</h5>
                      <p className="column-desc">You can request access, correction, or deletion (where legally permissible) of your personal data.</p>
                    </div>
                  </motion.div>

                  {/* Contact Banner */}
                  <motion.div 
                    className="contact-banner"
                    variants={slideUpScroll}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <div>
                      <p className="banner-title">9. Policy Updates</p>
                      <p className="banner-desc">We reserve the right to update this policy at any time. Changes will reflect immediately on this page.</p>
                    </div>
                    <div className="banner-action">
                      <p>Questions regarding privacy?</p>
                      <button
                        className="contact-link-btn"
                        onClick={() => window.open("https://wa.me/+917982295530", "_blank")}
                      >
                        Contact Official Support
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Acknowledgment Text */}
          <motion.p 
            className="page-footer-text"
            variants={slideUpScroll}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            By continuing to browse Viet Worldgate, you acknowledge that you have read and accepted these terms.
          </motion.p>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default PolicyPage;