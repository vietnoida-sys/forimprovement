import React from "react";
import "./VideoGallery.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import visaFirst from "../assets/visa_first.png";
import visaSecond from "../assets/visa_second.png";
import visaThird from "../assets/visa_third.png";
import visaFourth from "../assets/visa_fourth.png";
import visaFifth from "../assets/visa_fifth.png";
import visaSix from "../assets/visa_six.png";
import visaSeven from "../assets/visa_seven.png";

const galleryItems = [
  { id: 1, image: visaFirst },
  { id: 2, image: visaSecond },
  { id: 3, image: visaThird },
  { id: 4, image: visaFourth },
  { id: 5, image: visaFifth },
  { id: 6, image: visaSix  },
  { id: 7, image: visaSeven },
];

const VideoGallery = () => {
  return (
    <>
      <Navbar />

      <section className="video-gallery">
        <div className="container">
          <div className="gallery-heading">
            <span className="gallery-tag">STUDENT STORIES</span>
            <h1>Students Gallery</h1>
            <p>
              Explore our students' study abroad journey, visa success and
              international education experience.
            </p>
          </div>

          <div className="video-grid">
            {galleryItems.map((item) => (
              <div className="video-card" key={item.id}>
                <div className="image-wrapper">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <span className="card-title">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default VideoGallery;