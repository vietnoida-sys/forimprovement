import { useState, useEffect } from "react";
import { cmsApi as api } from "../portal/api/axiosClient"; // apne project ke hisaab se path check kar lena
import bannerImg from "../assets/Preloaderimage.jpeg"; // koi active banner na mile to yehi fallback dikhega

// Agar CMS me active banner na ho to popup isi link pe le jayega
const DEFAULT_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSefWVUVnbBT3GSCLjJM9bKP7hymqVhPTHbixEvbltPcJtVbMA/viewform?usp=publish-editor";

export default function SwinburneBanner() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState(null); // CMS se aaya hua active banner

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
        // Fetch fail ho jaye to bhi popup local fallback image ke saath chalega
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

  // Jab tak fetch complete nahi hota, popup mat dikhao (flash/flicker avoid karne ke liye)
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