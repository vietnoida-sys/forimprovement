import { useState, useEffect } from "react";
import { cmsApi as api } from "../portal/api/axiosClient"; 
import bannerImg from "../assets/Preloaderimage.jpeg"; 

const DEFAULT_LINK =
  "/consultationform";

export default function SwinburneBanner() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState(null); 

  useEffect(() => {
    let isMounted = true;

    const loadBanner = async () => {
      try {
        const data = await api.list("banners");
        if (!isMounted) return;

        // Sirf active banners me se sabse naya (latest) chuno
        const active = [...(data || [])]
          .filter((b) => b.active)
          .sort((a, b) => {
            const aTime = new Date(a.createdAt || a.updatedAt || 0).getTime();
            const bTime = new Date(b.createdAt || b.updatedAt || 0).getTime();
            return bTime - aTime;
          });

        setBanner(active[0] || null);
      } catch (err) {
      
        if (isMounted) setBanner(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    loadBanner();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || !isOpen) return null;

  const imageSrc = banner?.imageUrl || bannerImg;
  const imageAlt = banner?.heading || "Banner";
  const linkHref = banner?.link || DEFAULT_LINK;

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
          href={linkHref}
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
            src={imageSrc}
            alt={imageAlt}
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