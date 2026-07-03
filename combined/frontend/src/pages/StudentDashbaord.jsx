import { useState, useRef, useEffect, useMemo } from "react";
import { FiBell, FiCalendar, FiFileText,FiArrowRight,FiUpload,FiTrash2,FiDownload,FiX,FiClock,FiCheckCircle,FiDollarSign,FiAlertCircle,} from "react-icons/fi";
import { GraduationCap } from "lucide-react";
import "./StudentDashbaord.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const TABS = ["Overview", "Notifications", "Documents", "Profile"];

const DOC_TYPES = [
  "Passport",
  "10th Marksheet",
  "12th Marksheet",
  "Graduation Certificate",
  "IELTS/TOEFL Score",
  "SOP",
  "LOR",
  "Resume",
  "Bank Statement",
  "Other",
];

// Documents required for a "complete" application checklist
const REQUIRED_DOC_TYPES = [
  "Passport",
  "10th Marksheet",
  "12th Marksheet",
  "Graduation Certificate",
  "IELTS/TOEFL Score",
  "SOP",
  "LOR",
  "Bank Statement",
];

// File-type → icon color class, for the document cards
const TYPE_ICON_MAP = {
  Passport: "doc-icon-blue",
  "10th Marksheet": "doc-icon-purple",
  "12th Marksheet": "doc-icon-purple",
  "Graduation Certificate": "doc-icon-purple",
  "IELTS/TOEFL Score": "doc-icon-teal",
  SOP: "doc-icon-amber",
  LOR: "doc-icon-amber",
  Resume: "doc-icon-gray",
  "Bank Statement": "doc-icon-green",
  Other: "doc-icon-gray",
};

// ==========================================
// DEMO PROFILE (replace with real data later)
// ==========================================
const DEMO_PROFILE = {
  name: "Rahul Kumar",
  email: "rahul@example.com",
  avatarInitials: "RK",
};

// ==========================================
// INITIAL DUMMY DATA
// ==========================================
const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    title: "Welcome to Viet Worldgate!",
    message:
      "Your account has been created. Start by uploading your documents to get your profile reviewed.",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_CONSULTATIONS = [];

// Important application deadlines (demo data — wire to real backend later)
const INITIAL_DEADLINES = [
  {
    id: "d1",
    title: "IELTS Exam Slot",
    date: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 9);
      return d.toISOString();
    })(),
    type: "exam",
  },
  {
    id: "d2",
    title: "University Application Deadline",
    date: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 21);
      return d.toISOString();
    })(),
    type: "application",
  },
  {
    id: "d3",
    title: "Visa Interview Appointment",
    date: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 35);
      return d.toISOString();
    })(),
    type: "visa",
  },
];

// Visa fee reference data (demo — replace with live/admin-configurable values)
const VISA_FEE_DATA = {
  Canada: { fee: 150, currency: "CAD", extra: "Biometrics: CAD 85" },
  Australia: { fee: 710, currency: "AUD", extra: "Subclass 500 student visa" },
  UK: { fee: 490, currency: "GBP", extra: "+ Immigration Health Surcharge" },
  Germany: { fee: 75, currency: "EUR", extra: "National (Type D) visa" },
  "New Zealand": { fee: 375, currency: "NZD", extra: "Fee Payer visa" },
  Dubai: { fee: 1000, currency: "AED", extra: "Student residence visa" },
  Italy: { fee: 116, currency: "EUR", extra: "National (Type D) visa" },
  Japan: { fee: 3000, currency: "JPY", extra: "Single-entry student visa" },
};

// Approx conversion to INR for display purposes (demo rates)
const INR_RATES = {
  CAD: 61,
  AUD: 56,
  GBP: 107,
  EUR: 91,
  NZD: 51,
  AED: 23,
  JPY: 0.56,
};

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  const [profile] = useState(DEMO_PROFILE);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [documents, setDocuments] = useState([]);
  const [consultations] = useState(INITIAL_CONSULTATIONS);
  const [deadlines] = useState(INITIAL_DEADLINES);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDocType, setSelectedDocType] = useState(DOC_TYPES[0]);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Visa fee calculator state
  const [selectedCountry, setSelectedCountry] = useState("Canada");
  const [numApplicants, setNumApplicants] = useState(1);

  // Live countdown ticking state
  const [now, setNow] = useState(new Date());

  const fileInputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const stats = {
    consultations: consultations.filter((c) => c.status === "Upcoming").length,
    savedUniversities: 0,
    documents: documents.length,
    notifications: unreadCount,
  };

  // ==========================================
  // DOCUMENT CHECKLIST PROGRESS
  // ==========================================
  const uploadedTypes = useMemo(
    () => new Set(documents.map((d) => d.docType)),
    [documents]
  );

  const completedRequiredCount = REQUIRED_DOC_TYPES.filter((t) =>
    uploadedTypes.has(t)
  ).length;

  const progressPercent = Math.round(
    (completedRequiredCount / REQUIRED_DOC_TYPES.length) * 100
  );

  // ==========================================
  // UPLOAD HANDLERS (frontend-only, in-memory)
  // ==========================================
  const ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError("Only PDF, DOC, DOCX, JPG, and PNG files are allowed.");
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_SIZE) {
      setUploadError("File size must be under 10 MB.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setUploadError("");
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadError("Please choose a file first.");
      return;
    }

    setUploading(true);

    setTimeout(() => {
      const newDoc = {
        id: `doc_${Date.now()}`,
        docType: selectedDocType,
        originalName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
        status: "Pending Review",
        createdAt: new Date().toISOString(),
        previewUrl: URL.createObjectURL(selectedFile),
      };

      setDocuments((prev) => [newDoc, ...prev]);

      setNotifications((prev) => [
        {
          id: `notif_${Date.now()}`,
          title: "Document uploaded successfully",
          message: `Your ${newDoc.docType} (${newDoc.originalName}) has been uploaded and is pending review.`,
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);

      setUploading(false);
      setShowUploadModal(false);
      setSelectedFile(null);
      setSelectedDocType(DOC_TYPES[0]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 600);
  };

  const handleDeleteDocument = (id) => {
    if (!window.confirm("Delete this document?")) return;

    const doc = documents.find((d) => d.id === id);
    if (doc?.previewUrl) URL.revokeObjectURL(doc.previewUrl);

    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  // ==========================================
  // HELPERS
  // ==========================================
  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const statusBadgeClass = (status) => {
    if (status === "Approved") return "badge badge-approved";
    if (status === "Rejected") return "badge badge-rejected";
    return "badge badge-pending";
  };

  const getDaysLeft = (dateStr) => {
    const diffMs = new Date(dateStr).getTime() - now.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  const urgencyClass = (daysLeft) => {
    if (daysLeft <= 7) return "deadline-urgent";
    if (daysLeft <= 21) return "deadline-soon";
    return "deadline-normal";
  };

  const nextDeadline = useMemo(() => {
    return [...deadlines].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    )[0];
  }, [deadlines]);

  // Visa fee calculation
  const visaCalc = useMemo(() => {
    const data = VISA_FEE_DATA[selectedCountry];
    const totalForeign = data.fee * numApplicants;
    const inrRate = INR_RATES[data.currency] || 1;
    const totalINR = Math.round(totalForeign * inrRate);
    return { ...data, totalForeign, totalINR };
  }, [selectedCountry, numApplicants]);

  return (
  <>
    <Navbar />
    <div className="dash-wrapper">
      {/* =========================
          NOTIFICATION BANNER
      ========================= */}
      {unreadCount > 0 && (
        <div className="notif-banner">
          <FiBell />
          <span>
            You have {unreadCount} new notification{unreadCount > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* =========================
          STAT CARDS
      ========================= */}
      <div className="stat-cards">
        <div className="stat-card">
          <p className="stat-label">Consultations</p>
          <div className="stat-value-row">
            <span className="stat-value">{stats.consultations}</span>
            <FiCalendar className="stat-icon" />
          </div>
        </div>

        <div className="stat-card">
          <p className="stat-label">Saved Universities</p>
          <div className="stat-value-row">
            <span className="stat-value">{stats.savedUniversities}</span>
            <GraduationCap className="stat-icon" size={18} />
          </div>
        </div>

        <div className="stat-card">
          <p className="stat-label">Documents</p>
          <div className="stat-value-row">
            <span className="stat-value">{stats.documents}</span>
            <FiFileText className="stat-icon" />
          </div>
        </div>

        <div className="stat-card">
          <p className="stat-label">Notifications</p>
          <div className="stat-value-row">
            <span className="stat-value">{unreadCount}</span>
            <FiBell className="stat-icon" />
          </div>
        </div>
      </div>

      {/* =========================
          TABS
      ========================= */}
      <div className="tabs-row">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab === "Notifications" && unreadCount > 0 && (
              <span className="tab-badge">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* =========================
          TAB CONTENT
      ========================= */}
      {activeTab === "Overview" && (
        <div className="overview-grid">
          {/* LEFT COLUMN */}
          <div className="overview-left">
            {/* CONSULTATIONS PANEL */}
            <div className="panel">
              <div className="panel-header">
                <h3><FiCalendar /> Your Consultations</h3>
                <button className="btn-outline">Book New</button>
              </div>

              {consultations.length === 0 ? (
                <div className="empty-state">
                  <FiCalendar className="empty-icon" />
                  <p>No consultations yet</p>
                </div>
              ) : (
                <ul className="consult-list">
                  {consultations.slice(0, 4).map((c) => (
                    <li key={c.id} className="consult-item">
                      <div>
                        <p className="consult-date">{formatDate(c.date)} • {c.time}</p>
                        <p className="consult-meta">{c.consultant} • {c.mode}</p>
                      </div>
                      <span className={`badge badge-${c.status.toLowerCase()}`}>{c.status}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="overview-right">
            {/* DEADLINE COUNTDOWN — replaces "Chat with VIET.AI" */}
            <div className="panel countdown-panel">
              <h3 className="panel-title-only"><FiClock /> Upcoming Deadlines</h3>

              {nextDeadline && (
                <div className={`countdown-hero ${urgencyClass(getDaysLeft(nextDeadline.date))}`}>
                  <span className="countdown-days">{getDaysLeft(nextDeadline.date)}</span>
                  <span className="countdown-unit">days left</span>
                  <p className="countdown-title">{nextDeadline.title}</p>
                  <p className="countdown-date">{formatDate(nextDeadline.date)}</p>
                </div>
              )}

              <ul className="deadline-list">
                {deadlines
                  .filter((d) => d.id !== nextDeadline?.id)
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((d) => {
                    const days = getDaysLeft(d.date);
                    return (
                      <li key={d.id} className="deadline-row">
                        <span className={`deadline-pill ${urgencyClass(days)}`}>
                          {days > 0 ? `${days}d` : "Today"}
                        </span>
                        <div>
                          <p className="deadline-row-title">{d.title}</p>
                          <p className="deadline-row-date">{formatDate(d.date)}</p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>

            {/* QUICK ACTIONS PANEL */}
            <div className="panel">
              <h3 className="panel-title-only">Quick Actions</h3>
              <div className="quick-actions">
                <button className="qa-item" onClick={() => setShowUploadModal(true)}>
                  <span><FiUpload /> Upload Document</span>
                  <FiArrowRight />
                </button>
                <button className="qa-item">
                  <span><GraduationCap size={16} /> Explore Universities</span>
                  <FiArrowRight />
                </button>
                <button className="qa-item">
                  <span><GraduationCap size={16} /> Find Scholarships</span>
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="panel full-panel">
          <h3 className="panel-title-only">All Notifications</h3>
          {notifications.length === 0 ? (
            <div className="empty-state">
              <FiBell className="empty-icon" />
              <p>No notifications</p>
            </div>
          ) : (
            <ul className="notif-list">
              {notifications.map((n) => (
                <li key={n.id} className={`notif-list-item ${!n.isRead ? "unread" : ""}`}>
                  <div className="notif-icon-circle"><FiBell /></div>
                  <div className="notif-list-text">
                    <p className="notif-list-title">{n.title}</p>
                    <p className="notif-list-msg">{n.message}</p>
                    <span className="notif-list-time">
                      {new Date(n.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* =========================
          DOCUMENTS — CARD GRID VIEW
      ========================= */}
      {activeTab === "Documents" && (
        <div className="panel full-panel">
          <div className="panel-header">
            <h3><FiFileText /> My Documents</h3>
            <button className="btn-primary" onClick={() => setShowUploadModal(true)}>
              <FiUpload /> Upload Document
            </button>
          </div>

          {/* APPLICATION CHECKLIST PROGRESS — moved here from Overview */}
          <div className="doc-checklist-block">
            <div className="panel-header" style={{ marginBottom: "10px" }}>
              <h3 style={{ fontSize: "14px" }}><FiCheckCircle /> Application Checklist</h3>
              <span className="progress-percent-tag">{progressPercent}% complete</span>
            </div>

            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="progress-caption">
              {completedRequiredCount} of {REQUIRED_DOC_TYPES.length} required documents uploaded
            </p>

            <ul className="checklist">
              {REQUIRED_DOC_TYPES.map((type) => {
                const done = uploadedTypes.has(type);
                return (
                  <li key={type} className={`checklist-item ${done ? "done" : ""}`}>
                    <span className="checklist-dot">
                      {done ? <FiCheckCircle /> : <FiClock />}
                    </span>
                    {type}
                  </li>
                );
              })}
            </ul>
          </div>

          {documents.length === 0 ? (
            <div className="empty-state">
              <FiFileText className="empty-icon" />
              <p>No documents uploaded yet</p>
              <button className="btn-outline" onClick={() => setShowUploadModal(true)}>
                Upload your first document
              </button>
            </div>
          ) : (
            <div className="doc-card-grid">
              {documents.map((doc) => {
                const iconClass = TYPE_ICON_MAP[doc.docType] || "doc-icon-gray";
                const isImage = doc.fileType?.startsWith("image/");
                return (
                  <div className="doc-card" key={doc.id}>
                    <div className="doc-card-top">
                      {isImage ? (
                        <img src={doc.previewUrl} alt={doc.originalName} className="doc-thumb" />
                      ) : (
                        <div className={`doc-icon-box ${iconClass}`}>
                          <FiFileText />
                        </div>
                      )}
                      <span className={statusBadgeClass(doc.status)}>{doc.status}</span>
                    </div>

                    <p className="doc-card-type">{doc.docType}</p>
                    <p className="doc-card-name" title={doc.originalName}>
                      {doc.originalName}
                    </p>
                    <p className="doc-card-meta">
                      {formatFileSize(doc.fileSize)} • {formatDate(doc.createdAt)}
                    </p>

                    <div className="doc-card-actions">
                      <a
                        href={doc.previewUrl}
                        download={doc.originalName}
                        className="icon-btn"
                        title="View / Download"
                      >
                        <FiDownload />
                      </a>
                      <button
                        className="icon-btn icon-btn-danger"
                        onClick={() => handleDeleteDocument(doc.id)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === "Profile" && profile && (
        <div className="panel full-panel">
          <h3 className="panel-title-only">My Profile</h3>
          <div className="profile-view">
            <div className="profile-avatar-xl">{profile.avatarInitials}</div>
            <div className="profile-fields">
              <div className="profile-field">
                <label>Full Name</label>
                <p>{profile.name}</p>
              </div>
              <div className="profile-field">
                <label>Email</label>
                <p>{profile.email}</p>
              </div>
            </div>
          </div>

          {/* ==========================================
              VISA FEE CALCULATOR — unique widget
          ========================================== */}
          <div className="fee-calc">
            <h3 className="panel-title-only"><FiDollarSign /> Visa Fee Calculator</h3>

            <div className="fee-calc-controls">
              <div className="fee-field">
                <label>Destination Country</label>
                <select
                  className="field-select"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {Object.keys(VISA_FEE_DATA).map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div className="fee-field">
                <label>Number of Applicants</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="field-select"
                  value={numApplicants}
                  onChange={(e) =>
                    setNumApplicants(Math.max(1, Math.min(10, Number(e.target.value) || 1)))
                  }
                />
              </div>
            </div>

            <div className="fee-result">
              <div className="fee-result-row">
                <span>Visa fee (per applicant)</span>
                <span>{visaCalc.fee} {visaCalc.currency}</span>
              </div>
              <div className="fee-result-row">
                <span>Total ({numApplicants} applicant{numApplicants > 1 ? "s" : ""})</span>
                <span>{visaCalc.totalForeign.toLocaleString()} {visaCalc.currency}</span>
              </div>
              <div className="fee-result-row fee-result-inr">
                <span>Approx. in INR</span>
                <span>₹{visaCalc.totalINR.toLocaleString("en-IN")}</span>
              </div>
              <p className="fee-note">
                <FiAlertCircle /> {visaCalc.extra}. Rates are indicative — confirm exact fees on the
                official embassy website before payment.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          UPLOAD MODAL
      ========================= */}
      {showUploadModal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target.classList.contains("modal-overlay") && setShowUploadModal(false)}
        >
          <div className="modal-box">
            <div className="modal-header">
              <h3>Upload Document</h3>
              <button onClick={() => setShowUploadModal(false)}><FiX /></button>
            </div>

            <div className="modal-body">
              <label className="field-label">Document Type</label>
              <select
                className="field-select"
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
              >
                {DOC_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <label className="field-label">Choose File</label>
              <div className="dropzone" onClick={() => fileInputRef.current?.click()}>
                <FiUpload className="dropzone-icon" />
                <p>{selectedFile ? selectedFile.name : "Click to browse PDF, DOC, JPG or PNG"}</p>
                <span>Max file size: 10 MB</span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                hidden
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
              />

              {uploadError && <p className="upload-error">{uploadError}</p>}
            </div>

            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowUploadModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    <Footer />
  </>
);
}

export default StudentDashboard;