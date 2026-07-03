import React, { useRef, useState } from "react";
import "./Socialresponsibility.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

// Lucide Icons Import
import { 
  UserCheck, 
  GraduationCap, 
  ShieldCheck, 
  Home,
  Play,
  Pause
} from "lucide-react";

// Inline Standard SVG Wrappers for Social Brands
const InstagramIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const YoutubeIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

const LinkedinIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const FacebookIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

// Videos imports
import video1 from "../assets/story1video.mp4";
import video2 from "../assets/story2video.MOV";
import video3 from "../assets/story3video.mp4";
import video4 from "../assets/story4video.mp4";
import video5 from "../assets/story5video.mp4";

// Feed Images
import post2Img from "../assets/vietworldgate.png";
import post3Img from "../assets/vietworldgate.png";
import post4Img from "../assets/vietworldgate.png";
import post1Img from "../assets/vietworldgate.png";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/viet.india",
  youtube: "https://www.youtube.com/@viet.worldgate",
  linkedin: "https://www.linkedin.com/in/viet-worldgate-private-limited-7940b8419/",
  facebook: "https://www.facebook.com/vietworldgate", 
};

const VIDEOS = [
  { src: video1, duration: "0:39", title: "A candidate's journey...", tag: "Candidate story", platform: "youtube" },
  { src: video2, duration: "3:28", title: "Candidate's testimonial story...", tag: "Candidate story", platform: "youtube" },
  { src: video3, duration: "7:25", title: "A candidate's journey...", tag: "Candidate story", platform: "instagram" },
  { src: video4, duration: "5:35", title: "Verified employ opport...", tag: "Candidate story", platform: "instagram" },
  { src: video5, duration: "3:35", title: "Support after departure...", tag: "Candidate story", platform: "instagram" },
];

const SOCIAL_POSTS = [
  { platform: "instagram", image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=1200", title: "Candidate testimonial from South Korea", url: SOCIAL_LINKS.instagram },
  { platform: "instagram", image: "https://images.pexels.com/photos/37836828/pexels-photo-37836828.jpeg", title: "Candidate testimonial from South Korea", url: SOCIAL_LINKS.instagram },
  { platform: "linkedin", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9iSxMX6tupr7g5kCpLIfz6PGlF-tyimjS6HEefS2qyQ&s", title: "Candidate testimonial from South Korea",  url: SOCIAL_LINKS.linkedin },
  { platform: "linkedin", image: "https://images.pexels.com/photos/35555620/pexels-photo-35555620.jpeg", title: "Candidate testimonial from South Korea", url: SOCIAL_LINKS.linkedin },
];

const IMPACT_STATS = [
  { value: "1000+", label: "student placed abroad" },
  { value: "120+", label: "Verified partner employers" },
  { value: "50+", label: "Countries we operate in" },
  { value: "0", label: "Hidden fees, by policy" },
];

const JOURNEY = [
  { icon: UserCheck, title: "Honest counselling" },
  { icon: GraduationCap, title: "Skill & language readiness" },
  { icon: ShieldCheck, title: "Verified employers only" },
  { icon: Home, title: "Support after departure" },
];

// Animation presets
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true, margin: "-100px" }
};

const childFadeIn = {
  initial: { opacity: 0, y: 25 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export default function SocialResponsibility() {
  const videoRefs = useRef([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(-1);

  const handleVideoClick = (index) => {
    const currentVideo = videoRefs.current[index];
    if (!currentVideo) return;

    if (currentlyPlaying === index) {
      currentVideo.pause();
      setCurrentlyPlaying(-1);
    } else {
      if (currentlyPlaying !== -1 && videoRefs.current[currentlyPlaying]) {
        videoRefs.current[currentlyPlaying].pause();
      }
      currentVideo.muted = false; 
      currentVideo.play().catch((err) => console.log("Video play interrupted:", err));
      setCurrentlyPlaying(index);
    }
  };

  return (
    <>
      <Navbar />
      <main className="sr-page">
        
        {/* Fixed Hero Background Image & Gradient Overlays */}
        <section className="sr-hero-container">
          <motion.div 
            className="sr-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="sr-hero-eyebrow">VietWorldGate &middot; Social responsibility</p>
            <h1 className="sr-hero-title">
              Every visa we issue carries <br className="desktop-br"/>someone's future. 
              <span className="sr-hero-title-accent"> We don't treat that lightly.</span>
            </h1>
            <p className="sr-hero-subtitle">We help people leave home to build a better one...</p>
          </motion.div>
        </section>

        {/* Impact Board */}
        <motion.section 
          className="sr-board"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="sr-board-header">Our impact</div>
          <div className="sr-board-grid">
            {IMPACT_STATS.map((stat, idx) => (
              <motion.div 
                className="sr-board-cell" 
                key={idx}
                variants={childFadeIn}
              >
                <div className="sr-board-value">{stat.value}</div>
                <div className="sr-board-caption">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Journey Timeline */}
        <section className="sr-journey">
          <motion.h2 
            className="sr-section-title sr-center-title"
            {...fadeInUp}
          >
            How we take responsibility, step by step
          </motion.h2>
          <motion.div 
            className="sr-journey-track"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            {JOURNEY.map((item, idx) => {
              const JourneyIcon = item.icon;
              return (
                <motion.div 
                  className="sr-journey-item" 
                  key={idx}
                  variants={childFadeIn}
                >
                  <div className="sr-journey-icon-wrap">
                    <span className="sr-step-icon">
                      <JourneyIcon size={24} className="sr-social-icon" />
                    </span>
                  </div>
                  <h3 className="sr-journey-title">{item.title}</h3>
                  {idx < JOURNEY.length - 1 && <div className="sr-journey-line" />}
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Video Gallery with Native Playable Fixed State */}
        <section className="sr-videos">
          <motion.h2 
            className="sr-section-title"
            {...fadeInUp}
          >
            See it for yourself
          </motion.h2>
          <motion.div 
            className="sr-videos-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
          >
            {VIDEOS.map((video, idx) => (
              <motion.div 
                className="sr-video-card" 
                key={idx}
                variants={childFadeIn}
              >
                <div 
                  className="sr-clip-frame" 
                  onClick={() => handleVideoClick(idx)}
                >
                  <video 
                    ref={(el) => (videoRefs.current[idx] = el)}
                    src={video.src} 
                    preload="metadata" 
                    controls={currentlyPlaying === idx}
                    playsInline
                    className="sr-clip-player"
                    onPlay={() => setCurrentlyPlaying(idx)}
                    onPause={() => {
                      if (currentlyPlaying === idx) setCurrentlyPlaying(-1);
                    }}
                  />
                  <div className="sr-clip-badge-top">video{idx+1}</div>

                  {currentlyPlaying !== idx && (
                    <div className="sr-clip-duration">{video.duration}</div>
                  )}

                  {currentlyPlaying !== idx && (
                    <div className="sr-clip-play-overlay">
                      <Play size={20} color="#fff" fill="#fff" />
                    </div>
                  )}
                </div>
                <div className="sr-video-info">
                  <span className="sr-video-tag">{video.tag}</span>
                  <h4 className="sr-video-card-title">{video.title}</h4>
                  <a href={video.platform === "youtube" ? SOCIAL_LINKS.youtube : SOCIAL_LINKS.instagram} className="sr-video-action-link" target="_blank" rel="noreferrer">
                    {video.platform === "youtube" ? <YoutubeIcon size={18} className="sr-social-icon" /> : <InstagramIcon size={18} className="sr-social-icon" />}
                    <span>Show more on {video.platform === "youtube" ? "YouTube" : "Instagram"}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Dynamic Clickable Feed Grid Section */}
        <section className="sr-posts">
          <motion.h2 
            className="sr-section-title"
            {...fadeInUp}
          >
            From our feed
          </motion.h2>
          <motion.div 
            className="sr-posts-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
          >
            {SOCIAL_POSTS.map((post, idx) => (
              <motion.a 
                href={post.url} 
                className="sr-post-card-link" 
                target="_blank" 
                rel="noreferrer" 
                key={idx}
                variants={childFadeIn}
              >
                <div className="sr-post-card">
                  <div className="sr-post-img-container">
                    <img src={post.image} alt="Feed content" className="sr-post-img" />
                    <div className={`sr-feed-icon-badge sr-badge-${post.platform}`}>
                      {post.platform === "instagram" ? <InstagramIcon size={16} className="sr-social-icon" /> : <LinkedinIcon size={16} className="sr-social-icon" />}
                    </div>
                  </div>
                  <div className="sr-post-details">
                    <div className="sr-post-header-row">
                      <span className="sr-post-desc">{post.title}</span>
                      <span className="sr-inline-icon">{post.platform === "instagram" ? <InstagramIcon size={14} className="sr-social-icon" /> : <LinkedinIcon size={14} className="sr-social-icon" />}</span>
                    </div>
                    {post.subTitle && <p className="sr-post-subtext">{post.subTitle}</p>}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* Dynamic Follow Strip Block */}
        <motion.section 
          className="sr-social-strip"
          {...fadeInUp}
        >
          <div className="sr-social-strip-text">
            <h2>Follow along</h2>
            <p>We share the journeys, not just the paperwork</p>
          </div>
          <div className="sr-social-cards">
            <a href={SOCIAL_LINKS.instagram} className="sr-bottom-card sr-card-insta" target="_blank" rel="noreferrer">
              <InstagramIcon size={28} className="sr-social-icon" />
              <h4>Instagram</h4>
              <span>Daily stories & reels</span>
            </a>
            <a href={SOCIAL_LINKS.facebook} className="sr-bottom-card sr-card-fb" target="_blank" rel="noreferrer">
              <FacebookIcon size={28} className="sr-social-icon" />
              <h4>Facebook</h4>
              <span>Community & news</span>
            </a>
            <a href={SOCIAL_LINKS.youtube} className="sr-bottom-card sr-card-yt" target="_blank" rel="noreferrer">
              <YoutubeIcon size={28} className="sr-social-icon" />
              <h4>YouTube</h4>
              <span>Full candidate journeys</span>
            </a>
            <a href={SOCIAL_LINKS.linkedin} className="sr-bottom-card sr-card-li" target="_blank" rel="noreferrer">
              <LinkedinIcon size={28} className="sr-social-icon" />
              <h4>LinkedIn</h4>
              <span>Company updates</span>
            </a>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}