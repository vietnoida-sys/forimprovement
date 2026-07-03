import { useState } from "react";
import bannerImg from "../assets/Preloaderimage.jpeg"; // apni image ka naam yahan likho

export default function SwinburneBanner() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      onClick={() => setIsOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 11000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          width: "min(560px, 95vw)",
          maxHeight: "92vh",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "28px",
            height: "28px",
            background: "#c0392b",
            border: "none",
            borderRadius: "50%",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          ✕
        </button>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSefWVUVnbBT3GSCLjJM9bKP7hymqVhPTHbixEvbltPcJtVbMA/viewform?usp=publish-editor"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            textDecoration: "none",
          }}
        >
          <img
            src={bannerImg}
            alt="Banner"
            style={{
              width: "100%",
              display: "block",
            }}
          />
        </a>
      </div>
    </div>
  );
}