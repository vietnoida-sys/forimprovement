import { useState, useEffect } from "react";
import { FiChevronDown, FiSearch, FiBell } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

// IMPORT LOGO
import logo from "../assets/vietworldgate.png";
import logo1 from "../assets/profile.png";
import { useAuth } from "../portal/context/AuthContext";
import api from "../portal/api/axiosClient.js";

// ==========================================
// TIME AGO HELPER
// ==========================================
function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ==========================================
// SEARCHBOX COMPONENT
// ==========================================
const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = searchTerm.toLowerCase().trim();

    const routes = {
      "education fair": "/EducationFair",
      education: "/EducationFair",
      "our presence": "/OurPresence",
      "our services": "/OurServices",
      infrastructure: "/Infrastructure",
      "why choose us": "/WhyChooseUs",
      "course portal": "/CoursePortal",
      careers: "/Careers",
      "contact london": "/ContactLondon",
      "contact ghaziabad": "/ContactGhaziabad",
      "contact noida": "/ContactNoida",
      "contact delhi": "/ContactDelhi",
      scholarships: "/Scholarships",
      italy: "/ItalyDestination",
      japan: "/JapanDestination",
      "new zealand": "/NZDestination",
      nz: "/NZDestination",
      uk: "/UKDestination",
      dubai: "/DubaiDestination",
      germany: "/GermanyDestination",
      canada: "/CanadaDestination",
      australia: "/AustraliaDestination",
      "pre departure": "/PreDeparture",
      "shortlist universities": "/ShortlistUniversities",
      "course advice": "/courseAdvice",
      "visa assistance": "/visaAssistance",
      "our team": "/ourteam",
      "mission vision": "/MissionVision",
      "contact us": "/contact-us",
      "company profile": "/companyprofile",
      values: "/ValuesGrid",
      feedback: "/feedback",
      "university partners": "/universitypartner",
      certificate: "/Certificate",
      "upcoming events": "/upcomingevents",
      seminar: "/seminar",
      gallery: "/gallary",
      video: "/gallary",
      "terms and conditions": "/termsandconditions",
      accreditations: "/Accrediations",
    };

    if (routes[query]) {
      navigate(routes[query]);
      setSearchTerm("");
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button type="button" onClick={handleSearch}>
        <FiSearch />
      </button>
    </div>
  );
};

// ==========================================
// MAIN NAVBAR COMPONENT
// ==========================================
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // ==========================================
  // NOTIFICATIONS STATE
  // ==========================================
  const [notifItems, setNotifItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadUnread = async () => {
    try {
      const res = await api.get("/notifications/unread-count");
      setUnreadCount(res.data.count);
    } catch {
      /* ignore */
    }
  };

  const loadNotifList = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifItems(res.data.slice(0, 8));
    } catch {
      /* ignore */
    }
  };

  // Poll unread count only when logged in
  useEffect(() => {
    if (!user) return;
    loadUnread();
    const interval = setInterval(loadUnread, 20000);
    return () => clearInterval(interval);
  }, [user]);

  // Load full list when panel opens
  useEffect(() => {
    if (notifOpen) loadNotifList();
  }, [notifOpen]);

  const handleNotifItemClick = async (n) => {
    if (!n.read) {
      try {
        await api.patch(`/notifications/${n._id}/read`);
        setUnreadCount((u) => Math.max(0, u - 1));
      } catch {
        /* ignore */
      }
    }
    setNotifOpen(false);
    if (n.link) navigate(n.link.startsWith("/portal") ? n.link : `/portal${n.link}`);
  };

  const handleMarkAllRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      setNotifItems((list) => list.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch {
      /* ignore */
    }
  };

  // Body scroll lock on mobile menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (!e.target.closest(".notif-wrapper")) setNotifOpen(false);
      if (!e.target.closest(".profile-wrapper")) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setActiveDropdown(null);
  };

  const handleDropdownClick = (e, index) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      e.stopPropagation();
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  // ==========================================
  // SHARED RIGHT-SIDE MARKUP (Login OR Bell+Profile)
  // Reused in top-header (desktop/tablet) AND navbar (mobile)
  // ==========================================
  const headerRightMarkup =
    user == null ? (
      <Link to="/portal/login" className="login-btn">
        Login
      </Link>
    ) : (
      <>
        {/* NOTIFICATION BELL */}
        <div className="notif-wrapper">
          <button
            className="notif-btn"
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
          >
            <FiBell />
            {unreadCount > 0 && (
              <span className="notif-badge">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* NOTIFICATION DROPDOWN */}
          {notifOpen && (
            <div className="notif-panel">
              <div className="notif-panel-header">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <button className="notif-markall" onClick={handleMarkAllRead}>
                    Mark all read
                  </button>
                )}
                <button className="notif-panel-close" onClick={() => setNotifOpen(false)}>✕</button>
              </div>

              <div className="notif-tabs">
                <span className="ntab active">All</span>
                <span className="ntab">Unread ({unreadCount})</span>
              </div>

              {notifItems.length === 0 && (
                <div className="notif-empty">No notifications yet.</div>
              )}

              {notifItems.map((n) => (
                <div
                  key={n._id}
                  className={`notif-item ${n.read ? "" : "unread"}`}
                  onClick={() => handleNotifItemClick(n)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="notif-icon-circle">🔔</div>
                  <div className="notif-text">
                    <p className="notif-title">{n.title}</p>
                    <p className="notif-desc">{n.message}</p>
                    <span className="notif-time">{timeAgo(n.createdAt)}</span>
                  </div>
                  {!n.read && <div className="notif-dot"></div>}
                </div>
              ))}

              <div className="notif-footer">
                <Link
                  to="/portal/notifications"
                  onClick={() => setNotifOpen(false)}
                >
                  View all notifications →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* PROFILE BUTTON */}
        <div className="profile-wrapper">
          <button
            className="profile-btn"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
          >
            
           
            <img src= {logo1} alt="Profile" className={`profile-arrow ${profileOpen ? "rotated" : ""}`} />
           
          </button>

          {/* PROFILE DROPDOWN */}
          {profileOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-avatar-lg">P</div>
                <div>
                  <p className="pd-name">{user?.name}</p>
                  <p className="pd-email">{user?.email}</p>
                </div>
              </div>
              <ul className="profile-menu">
                <li><Link to="/portal" onClick={() => setProfileOpen(false)}>Dashboard</Link></li>
                <li><Link to="/profile" onClick={() => setProfileOpen(false)}>My Profile</Link></li>
                <li><Link to="/settings" onClick={() => setProfileOpen(false)}>Settings</Link></li>
                <li className="divider">
                  <button onClick={() => logout()}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </>
    );

  return (
    <>
      {/* =========================
          TOP HEADER (desktop / tablet)
      ========================= */}
      <div className="top-header">

        {/* SCROLLING TEXT */}
        <div className="top-scroll">
          <div className="top-left">
            <span className="branch-heading">Our New Branches In India –</span>
            <a href="/">Noida</a>
            <a href="/">Ghaziabad</a>
            <a href="/">Delhi</a>
            <div className="international-branch">
              <span className="branch-heading">International Branch –</span>
              <span className="london-text">OXFORD STREET, LONDON</span>
            </div>
          </div>
        </div>

        {/* SEARCH BOX */}
        <SearchBox />

        {/* RIGHT SIDE — Login OR Notification + Profile */}
        <div className="header-right header-right-desktop">
          {headerRightMarkup}
        </div>
      </div>

      {/* =========================
          MAIN NAVBAR
      ========================= */}
      <nav className="navbar">

        {/* LOGO SECTION */}
        <div className="logo-section">
          <img src={logo} alt="Viet World Gate Logo" className="logo-img" />
          <div className="logo-text">
            <h2>VIET WORLDGATE</h2>
            <p>Your Gateway to Global Opportunities</p>
          </div>
        </div>

        {/* MOBILE-ONLY RIGHT GROUP: Hamburger + Login/Profile (shows at end of navbar on mobile) */}
        <div className="navbar-mobile-actions">
          <div
            className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="header-right header-right-mobile">
            {headerRightMarkup}
          </div>
        </div>

        {/* NAV LINKS */}
        <ul className={`nav-links ${isMenuOpen ? "nav-active" : ""}`}>

          <li onClick={closeMenu}>
            <Link to="/">Home</Link>
          </li>

          {/* ABOUT */}
          <li
            className={`dropdown ${activeDropdown === 1 ? "drop-active" : ""}`}
            onClick={(e) => handleDropdownClick(e, 1)}
          >
            <span className="nav-item">
              About Us
              <span className="arrow"><FiChevronDown /></span>
            </span>
            <ul className="dropdown-menu">
              <li onClick={closeMenu}><Link to="/companyprofile">Company Profile</Link></li>
              <li onClick={closeMenu}><Link to="/Certificate">Certificate</Link></li>
              <li onClick={closeMenu}><Link to="/ourteam">Our Team</Link></li>
              <li onClick={closeMenu}><Link to="/MissionVision">Mission & Vision</Link></li>
              <li onClick={closeMenu}><Link to="/feedback">Success Stories</Link></li>
            </ul>
          </li>

          {/* SERVICES */}
          <li
            className={`dropdown ${activeDropdown === 2 ? "drop-active" : ""}`}
            onClick={(e) => handleDropdownClick(e, 2)}
          >
            <span className="nav-item">
              Services
              <span className="arrow"><FiChevronDown /></span>
            </span>
            <ul className="dropdown-menu">
              <li onClick={closeMenu}><Link to="/PreDeparture">Pre-Departure Guidelines</Link></li>
              <li onClick={closeMenu}><Link to="/VisaAssistance">Visa Assistance</Link></li>
              <li onClick={closeMenu}><Link to="/ShortlistUniversities">Shortlist University</Link></li>
              <li onClick={closeMenu}><Link to="/CourseAdvice">Course Advice</Link></li>
              <li onClick={closeMenu}><Link to="/Abroadcostcalculator">Cost Calculator</Link></li>
            </ul>
          </li>

          {/* DESTINATIONS */}
          <li
            className={`dropdown ${activeDropdown === 3 ? "drop-active" : ""}`}
            onClick={(e) => handleDropdownClick(e, 3)}
          >
            <span className="nav-item">
              Destinations
              <span className="arrow"><FiChevronDown /></span>
            </span>
            <ul className="dropdown-menu">
              <li onClick={closeMenu}><Link to="/CanadaDestination">Canada</Link></li>
              <li onClick={closeMenu}><Link to="/AustraliaDestination">Australia</Link></li>
              <li onClick={closeMenu}><Link to="/DubaiDestination">Dubai</Link></li>
              <li onClick={closeMenu}><Link to="/GermanyDestination">Germany</Link></li>
              <li onClick={closeMenu}><Link to="/ItalyDestination">Italy</Link></li>
              <li onClick={closeMenu}><Link to="/JapanDestination">Japan</Link></li>
              <li onClick={closeMenu}><Link to="/NZDestination">New Zealand</Link></li>
              <li onClick={closeMenu}><Link to="/UKDestination">UK</Link></li>
            </ul>
          </li>

          <li onClick={closeMenu}>
            <Link to="/scholarships">Scholarships</Link>
          </li>

          {/* BRANCHES */}
          <li
            className={`dropdown ${activeDropdown === 4 ? "drop-active" : ""}`}
            onClick={(e) => handleDropdownClick(e, 4)}
          >
            <span className="nav-item">
              Branches
              <span className="arrow"><FiChevronDown /></span>
            </span>
            <ul className="dropdown-menu">
              <li onClick={closeMenu}><Link to="/ContactDelhi">Delhi</Link></li>
              <li onClick={closeMenu}><Link to="/ContactNoida">Noida</Link></li>
              <li onClick={closeMenu}><Link to="/ContactGhaziabad">Ghaziabad</Link></li>
              <li onClick={closeMenu}><Link to="/ContactLondon">International Branch London</Link></li>
            </ul>
          </li>

          <li onClick={closeMenu}>
            <Link to="/gallary">Gallery</Link>
          </li>

          {/* EVENTS */}
          <li
            className={`dropdown ${activeDropdown === 5 ? "drop-active" : ""}`}
            onClick={(e) => handleDropdownClick(e, 5)}
          >
            <span className="nav-item">
              Events
              <span className="arrow"><FiChevronDown /></span>
            </span>
            <ul className="dropdown-menu">
              <li onClick={closeMenu}><Link to="/upcomingevents">Upcoming Events</Link></li>
              <li onClick={closeMenu}><Link to="/seminar">Seminars</Link></li>
              <li onClick={closeMenu}><Link to="/EducationFair">Education Fair</Link></li>
            </ul>
          </li>

          <li onClick={closeMenu}><Link to="/CoursePortal">Find a Course</Link></li>
          <li onClick={closeMenu}><Link to="/careers">Careers</Link></li>
          <li onClick={closeMenu}><Link to="/contact-us">Contact Us</Link></li>

        </ul>
      </nav>
    </>
  );
}

export default Navbar;