import React, { useEffect, useState } from "react";
import "./Feedback.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import feedbackBannerImg from "../assets/contactimage.jpeg";

const feedbackData = [
  {
    id: 1,
    title: "My UK Study Dream Became Reality",
    name: "Aman Sharma",
    country: "United Kingdom",
    rating: 5,
    text: "Studying in the UK was always my dream, but I was confused about admissions, scholarships, and visa procedures. The team at VIET Worldgate guided me professionally throughout the entire process. They helped me choose the right university, prepared my documents carefully, and supported me during visa filing. Their continuous guidance and quick responses gave me confidence. I am thankful for their support because today I am successfully studying in the UK."
  },
  {
    id: 2,
    title: "Excellent Counseling Support",
    name: "Priya Verma",
    country: "Canada",
    rating: 5,
    text: "I was confused about my career options after graduation, but the counselors at VIET Worldgate guided me properly according to my interests and goals. They explained every detail clearly, including university options, tuition fees, scholarships, and future opportunities. Their honest and professional guidance helped me make the right decision. I highly appreciate their support throughout the process."
  },
  {
    id: 3,
    title: "Professional & Transparent Process",
    name: "Rahul Singh",
    country: "Australia",
    rating: 5,
    text: "My admission process was handled very professionally by VIET Worldgate. The staff was supportive, transparent, and always available to answer my questions. They guided me through documentation and ensured my application was submitted correctly. Because of their smooth process, I received my admission successfully without stress."
  },
  {
    id: 4,
    title: "Best Consultancy Experience",
    name: "Simran Kaur",
    country: "United Kingdom",
    rating: 5,
    text: "My experience with VIET Worldgate was excellent from start to finish. The team was friendly, knowledgeable, and supportive. They guided me at every step and helped me understand the visa process properly. Their mock interview sessions increased my confidence, and I successfully received my visa approval."
  },
  {
    id: 5,
    title: "Amazing Scholarship Guidance",
    name: "Mohit Arora",
    country: "Europe",
    rating: 5,
    text: "One of my biggest concerns was managing study expenses abroad. The counselors at VIET Worldgate guided me about scholarship opportunities and helped me apply successfully. Because of their efforts, I received financial support that reduced my burden significantly. I am grateful for their dedication and professional guidance."
  },
  {
    id: 6,
    title: "Honest & Genuine Guidance",
    name: "Neha Gupta",
    country: "Canada",
    rating: 5,
    text: "What impressed me most about VIET Worldgate was their honesty and transparency. They provided genuine advice according to my profile and never made false promises. The counselors explained each step clearly and supported me throughout my journey. I truly trust their services."
  },
  {
    id: 7,
    title: "Stress-Free Admission Process",
    name: "Karan Malhotra",
    country: "United Kingdom",
    rating: 5,
    text: "I was worried about the complex admission process, but VIET Worldgate made everything simple and organized. Their team handled my documentation professionally and guided me step by step. Their communication was excellent, and I always felt informed about my application status."
  },
  {
    id: 8,
    title: "Highly Recommended",
    name: "Anjali Mehta",
    country: "Australia",
    rating: 5,
    text: "If anyone is planning to study abroad, I strongly recommend VIET Worldgate. Their counselors are experienced, supportive, and professional. They helped me choose the best university according to my budget and career goals. Their guidance made my overseas education journey smooth and successful."
  },
  {
    id: 9,
    title: "Friendly & Helpful Team",
    name: "Rohit Bansal",
    country: "Canada",
    rating: 5,
    text: "The entire team at VIET Worldgate is very friendly and cooperative. They patiently answered all my questions and explained everything clearly. I never felt confused during the process because they guided me properly from counseling to visa filing."
  },
  {
    id: 10,
    title: "Professional Visa Guidance",
    name: "Sneha Kapoor",
    country: "United Kingdom",
    rating: 5,
    text: "The visa process seemed stressful at first, but the counselors at VIET Worldgate supported me throughout. Their mock interview preparation sessions helped me feel confident and prepared. Thanks to their guidance, I successfully received my visa approval."
  },
  {
    id: 11,
    title: "Smooth Overseas Journey",
    name: "Vikas Yadav",
    country: "Canada",
    rating: 5,
    text: "My journey with VIET Worldgate was smooth and professionally managed. The counselors guided me about universities, scholarships, and documentation in detail. Their support and quick communication made the process stress-free."
  },
  {
    id: 12,
    title: "Reliable Consultancy Services",
    name: "Pooja Sharma",
    country: "Australia",
    rating: 5,
    text: "I found VIET Worldgate to be a reliable and trustworthy consultancy. Their counselors provided genuine guidance and supported me during every stage of the process. I am thankful for their professional approach and dedication."
  },
  {
    id: 13,
    title: "Supportive Staff",
    name: "Arjun Mehra",
    country: "United Kingdom",
    rating: 5,
    text: "The staff at VIET Worldgate was extremely supportive and cooperative. Whenever I had doubts or questions, they responded quickly and professionally. Their guidance made my admission and visa process much easier."
  },
  {
    id: 14,
    title: "Great Scholarship Opportunities",
    name: "Komal Arora",
    country: "Europe",
    rating: 5,
    text: "The team guided me properly about scholarship programs that matched my profile. They helped me prepare strong applications and supported me throughout the process. Their efforts helped reduce my financial burden significantly."
  },
  {
    id: 15,
    title: "Career-Oriented Counseling",
    name: "Deepak Verma",
    country: "Canada",
    rating: 5,
    text: "The counselors understood my career goals and guided me toward the right course and university. Their advice helped me make a confident decision about my future. I truly appreciate their professional counseling."
  },
  {
    id: 16,
    title: "Excellent Services",
    name: "Ritika Jain",
    country: "United Kingdom",
    rating: 5,
    text: "I am very satisfied with the professional services provided by VIET Worldgate. Their counselors guided me step by step and ensured everything was completed properly. The entire process was smooth and transparent."
  },
  {
    id: 17,
    title: "Trusted Overseas Consultancy",
    name: "Harsh Gupta",
    country: "Australia",
    rating: 5,
    text: "I trusted VIET Worldgate for my overseas education journey, and they exceeded my expectations. Their team handled my application professionally and provided complete support from start to finish."
  },
  {
    id: 18,
    title: "Good Communication",
    name: "Sakshi Malhotra",
    country: "Canada",
    rating: 5,
    text: "One of the best things about VIET Worldgate is their communication. They kept me updated throughout the admission process and answered all my queries patiently. Their professionalism impressed me a lot."
  },
  {
    id: 19,
    title: "Smooth Documentation Support",
    name: "Manpreet Singh",
    country: "United Kingdom",
    rating: 5,
    text: "The documentation process can be confusing, but VIET Worldgate handled everything efficiently. They guided me carefully and ensured all my documents were prepared correctly."
  },
  {
    id: 20,
    title: "Best Overseas Education Guidance",
    name: "Tanya Kapoor",
    country: "Europe",
    rating: 5,
    text: "The counselors at VIET Worldgate provided excellent guidance according to my academic profile and future goals. Their support helped me choose the right path for my career."
  },
  {
    id: 21,
    title: "Quick Response Team",
    name: "Ayush Sharma",
    country: "Canada",
    rating: 5,
    text: "The team was always available whenever I needed support. Their quick responses and helpful guidance made my experience stress-free and comfortable."
  },
  {
    id: 22,
    title: "Helpful Consultants",
    name: "Nidhi Arora",
    country: "Australia",
    rating: 5,
    text: "The counselors were patient, knowledgeable, and supportive throughout my journey. They explained every process clearly and guided me professionally."
  },
  {
    id: 23,
    title: "Successful Visa Approval",
    name: "Yash Verma",
    country: "United Kingdom",
    rating: 5,
    text: "I was nervous about my visa interview, but VIET Worldgate prepared me well through mock interview sessions. Their support increased my confidence, and I successfully received my visa."
  },
  {
    id: 24,
    title: "Experienced Team",
    name: "Mehak Jain",
    country: "Canada",
    rating: 5,
    text: "The professionalism and experience of the VIET Worldgate team impressed me a lot. They guided me correctly and ensured every step was handled smoothly."
  },
  {
    id: 25,
    title: "Great Support Throughout",
    name: "Rohan Malhotra",
    country: "Europe",
    rating: 5,
    text: "The team supported me during every stage of the process. Their guidance made my overseas education journey simple and stress-free."
  },
  {
    id: 26,
    title: "Positive Experience",
    name: "Ishita Sharma",
    country: "Australia",
    rating: 5,
    text: "My experience with VIET Worldgate was extremely positive. The counselors were professional, supportive, and always ready to help."
  },
  {
    id: 27,
    title: "Best Counseling Services",
    name: "Aakash Singh",
    country: "Canada",
    rating: 5,
    text: "They guided me according to my budget, academic profile, and future goals. Their counseling sessions helped me make the right decision."
  },
  {
    id: 28,
    title: "Knowledgeable Counselors",
    name: "Navya Kapoor",
    country: "United Kingdom",
    rating: 5,
    text: "The counselors are experienced and knowledgeable about overseas education. They guided me properly and supported me throughout the admission process."
  },
  {
    id: 29,
    title: "Easy Admission Process",
    name: "Kunal Mehta",
    country: "Australia",
    rating: 5,
    text: "The admission process became very easy because of VIET Worldgate. Their team handled everything professionally and kept me informed throughout."
  },
  {
    id: 30,
    title: "Friendly Professional Team",
    name: "Sonal Gupta",
    country: "Canada",
    rating: 5,
    text: "The staff is friendly, professional, and cooperative. They supported me throughout the process and answered all my questions patiently."
  },
  {
    id: 31,
    title: "Excellent Visa Support",
    name: "Abhishek Yadav",
    country: "United Kingdom",
    rating: 5,
    text: "Their visa preparation sessions helped me gain confidence and understand the process properly. I appreciate their professional support."
  },
  {
    id: 32,
    title: "Satisfied With Services",
    name: "Riya Verma",
    country: "Europe",
    rating: 5,
    text: "I am very happy with the services provided by VIET Worldgate. Their counselors were supportive and guided me properly throughout."
  },
  {
    id: 33,
    title: "Good Career Advice",
    name: "Aman Bhatia",
    country: "Australia",
    rating: 5,
    text: "The counselors helped me choose a course with better career opportunities according to my interests and goals."
  },
  {
    id: 34,
    title: "Organized & Smooth Process",
    name: "Pallavi Sharma",
    country: "Canada",
    rating: 5,
    text: "The entire process was well-organized and transparent. Their professional approach made everything stress-free."
  },
  {
    id: 35,
    title: "Highly Professional Team",
    name: "Jatin Arora",
    country: "United Kingdom",
    rating: 5,
    text: "They handled my application professionally and supported me throughout the process. I truly appreciate their dedication."
  },
  {
    id: 36,
    title: "Patient & Helpful Counselors",
    name: "Shreya Malhotra",
    country: "Europe",
    rating: 5,
    text: "The counselors answered all my questions patiently and explained every step clearly. Their support was excellent."
  },
  {
    id: 37,
    title: "Wonderful Experience",
    name: "Nikhil Gupta",
    country: "Australia",
    rating: 5,
    text: "I had a wonderful experience with VIET Worldgate. The team was professional, supportive, and always available to help."
  },
  {
    id: 38,
    title: "Complete Support",
    name: "Radhika Jain",
    country: "Canada",
    rating: 5,
    text: "They provided complete support from university selection to visa approval. Their guidance made my journey successful."
  },
  {
    id: 39,
    title: "Easy Visa Filing",
    name: "Tarun Singh",
    country: "United Kingdom",
    rating: 5,
    text: "The visa filing process was handled smoothly and professionally. Their support helped me avoid mistakes."
  },
  {
    id: 40,
    title: "Very Supportive Team",
    name: "Kritika Sharma",
    country: "Europe",
    rating: 5,
    text: "The team motivated and guided me throughout my journey. Their support gave me confidence."
  },
  {
    id: 41,
    title: "Professional Communication",
    name: "Varun Kapoor",
    country: "Australia",
    rating: 5,
    text: "Their communication throughout the process was excellent. They kept me updated regularly and guided me properly."
  },
  {
    id: 42,
    title: "Trustworthy Guidance",
    name: "Muskan Verma",
    country: "Canada",
    rating: 5,
    text: "I trusted their guidance completely, and they helped me achieve my dream of studying abroad."
  },
  {
    id: 43,
    title: "Informative Counseling Sessions",
    name: "Aditya Malhotra",
    country: "United Kingdom",
    rating: 5,
    text: "The counseling sessions were detailed and informative. They helped me understand all available opportunities clearly."
  },
  {
    id: 44,
    title: "Best Decision for My Future",
    name: "Sana Khan",
    country: "Europe",
    rating: 5,
    text: "Choosing VIET Worldgate was one of the best decisions for my career and future. Their support was outstanding."
  },
  {
    id: 45,
    title: "Helpful Staff",
    name: "Gaurav Sharma",
    country: "Australia",
    rating: 5,
    text: "The staff was always ready to support and guide me whenever I needed assistance."
  },
  {
    id: 46,
    title: "Great Overseas Education Guidance",
    name: "Priti Mehra",
    country: "Canada",
    rating: 5,
    text: "They simplified the entire process and made studying abroad possible for me."
  },
  {
    id: 47,
    title: "Very Organized Process",
    name: "Rajat Verma",
    country: "United Kingdom",
    rating: 5,
    text: "The team handled everything professionally and ensured my process remained smooth and stress-free."
  },
  {
    id: 48,
    title: "Excellent Consultancy Services",
    name: "Khushi Arora",
    country: "Europe",
    rating: 5,
    text: "I strongly recommend VIET Worldgate to students planning to study abroad. Their services are excellent."
  },
  {
    id: 49,
    title: "Fantastic Experience",
    name: "Sahil Kapoor",
    country: "Australia",
    rating: 5,
    text: "My overall experience with VIET Worldgate was fantastic. The counselors were supportive and professional."
  },
  {
    id: 50,
    title: "Dream Come True",
    name: "Isha Sharma",
    country: "Canada",
    rating: 5,
    text: "Thanks to VIET Worldgate, my dream of studying abroad became a reality. Their guidance helped me achieve success."
  }
];

const Feedback = () => {
  const [activeCards, setActiveCards] = useState([]);

  useEffect(() => {
    const cards = document.querySelectorAll(".feedback-card-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCards((prev) =>
              prev.includes(entry.target.dataset.id)
                ? prev
                : [...prev, entry.target.dataset.id]
            );
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
     
    <div className="feedback-page-main-layout">
      <Navbar />

      <main className="feedback-page-wrapper">
        {/* HERO BANNER */}
        <div
          className="feedback-hero-banner"
          style={{
            backgroundImage: `url(${feedbackBannerImg})`
          }}
        >
          <div className="feedback-banner-overlay">
            <div className="feedback-banner-container">
              <h1 className="feedback-main-title">Testimonials</h1>
              <div className="feedback-breadcrumbs-nav">
                <span className="home-icon">🏠</span>
                <span className="arrow-sep">→</span>
                <span className="current-page">Testimonials</span>
              </div>
            </div>
          </div>
        </div>

        {/* TESTIMONIAL SECTION */}
        <div className="feedback-main-container">
          {feedbackData.map((item) => (
            <div
              key={item.id}
              data-id={item.id}
              className={`feedback-card-item ${
                activeCards.includes(item.id.toString())
                  ? "animate-visible"
                  : ""
              }`}
            >
              {/* LEFT SIDE */}
              <div className="feedback-card-left">
                <div className="feedback-timeline-line"></div>
                <div className="feedback-avatar-border-glow">
                  <div className="feedback-avatar-circle-inner">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="avatar-icon-svg"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="feedback-card-right">
                <h3 className="feedback-review-title">
                   "{item.title}"
                </h3>

                <h2 className="feedback-student-name">{item.name}</h2>

                <p className="feedback-country-name">{item.country}</p>

                <div className="feedback-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`feedback-star ${
                        i < item.rating ? "active-gold" : "muted-grey"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="feedback-text-block">
                  <p className="feedback-paragraph-item">"{item.text}"</p>
                </div>
              </div>

              {/* WATERMARK */}
              <div className="feedback-quote-watermark">"</div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* FLOATING BUTTONS */}
      <button className="sticky-action-chat-bubble" aria-label="Chat">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      </button>

      <button
        className="sticky-action-scroll-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ▲
      </button>
    </div>
    </>
  );
};

export default Feedback;