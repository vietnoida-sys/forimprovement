import React from "react";
import "./VideoGallery.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const videos = [
  
  {
    id: 1,
    title: "Coming Soon...",
    url: "",
  },
  {
    id: 2,
    title: "Coming Soon...",
    url: "",
  },

  {
    id: 3,
    title: "Coming Soon...",
    url: "",
  },

  {
    id: 4,
    title: "Coming Soon...",
    url: "",
  },

  {
    id:5,
    title:"Coming Soon...",
    url: "",
  },

  {
    id:6,
    title:"Coming Soon...",
    url:"",
  }
]

const VideoGallery = () => {
  return (
    <>
     <Navbar/>
    <section className="video-gallery">
      <div className="container">
        <h2>Gallery</h2>
        <p>Watch real students sharing their study abroad journey.</p>

        <div className="video-grid">
  {videos.map((video) => (
    <div className="video-card" key={video.id}>
      <iframe
        src={video.url}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <h3>{video.title}</h3>
    </div>
  ))}
</div>
         
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default VideoGallery;