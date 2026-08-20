import React from "react";
import "./VideoGallery.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const videos = [
  {
    id: 1,
    title: "Canada Visa",
    url: "",
  },
  {
    id: 2,
    title:"UK Visa",
    url: "",
  },
  {
    id:3,
    title:"AUS Visa",
    url:"",
  },
   {
    id:4,
    tittle:"Germany Visa",
    url:"",
   }
];

const VideoGallery = () => {
  return (
    <>
      <Navbar />

      <section className="video-gallery">
        <div className="container">
          <h2>Gallery</h2>
          <p>Watch real students sharing their study abroad journey.</p>

          <div className="video-grid">
            {videos.map((video) => (
              <div className="video-card" key={video.id}>
                {video.url ? (
                  <iframe
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="video-placeholder">
                    <span>Coming Soon...</span>
                  </div>
                )}

                <h3>{video.title}</h3>
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