import React, { useState } from "react";
import "./ConsultationForm.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CONSULTATION_TYPES = [
  "Study Visa",
  "PR/Immigration",
  "Career Counselling",
  "SOP Review",
  "General Inquiry",
];

const COUNTRIES = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "New Zealand",
  "Ireland",
  "Other",
];

const CalendarIcon = ({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function ConsultationForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    targetCountry: "",
    consultationType: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateClientSide = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.targetCountry) newErrors.targetCountry = "Target country is required";
    if (!form.consultationType) newErrors.consultationType = "Consultation type is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validateClientSide();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch(`${API_URL}/consultations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (!res.ok) {
        setErrors(result.errors || {});
        setStatus("error");
        setServerMessage(result.message || "Please fix the errors below.");
        return;
      }

      setStatus("success");
      setServerMessage("Your consultation request has been submitted. Our team will reach out shortly.");
      setForm({
        fullName: "",
        email: "",
        whatsappNumber: "",
        targetCountry: "",
        consultationType: "",
      });
    } catch (err) {
      setStatus("error");
      setServerMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="cf-card">
        <div className="cf-header">
          <CalendarIcon className="cf-header-icon" />
          <h2>Consultation Details</h2>
        </div>

        <form className="cf-body" onSubmit={handleSubmit} noValidate>
          <div className="cf-grid">
            <div className="cf-field">
              <label htmlFor="fullName">
                Full Name <span className="cf-required">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Your full name"
                value={form.fullName}
                onChange={handleChange("fullName")}
                className={errors.fullName ? "cf-input cf-input-error" : "cf-input"}
              />
              {errors.fullName && <span className="cf-error-text">{errors.fullName}</span>}
            </div>

            <div className="cf-field">
              <label htmlFor="email">
                Email <span className="cf-required">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={handleChange("email")}
                className={errors.email ? "cf-input cf-input-error" : "cf-input"}
              />
              {errors.email && <span className="cf-error-text">{errors.email}</span>}
            </div>

            <div className="cf-field">
              <label htmlFor="whatsappNumber">WhatsApp Number</label>
              <input
                id="whatsappNumber"
                type="tel"
                placeholder="+91 xxxx xxxx"
                value={form.whatsappNumber}
                onChange={handleChange("whatsappNumber")}
                className="cf-input"
              />
            </div>

            <div className="cf-field">
              <label htmlFor="targetCountry">
                Target Country <span className="cf-required">*</span>
              </label>
              <div className="cf-select-wrap">
                <select
                  id="targetCountry"
                  value={form.targetCountry}
                  onChange={handleChange("targetCountry")}
                  className={
                    errors.targetCountry ? "cf-input cf-select cf-input-error" : "cf-input cf-select"
                  }
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </div>
              {errors.targetCountry && <span className="cf-error-text">{errors.targetCountry}</span>}
            </div>
          </div>

          <div className="cf-field cf-field-full">
            <label htmlFor="consultationType">
              Consultation Type <span className="cf-required">*</span>
            </label>
            <div className="cf-select-wrap">
              <select
                id="consultationType"
                value={form.consultationType}
                onChange={handleChange("consultationType")}
                className={
                  errors.consultationType ? "cf-input cf-select cf-input-error" : "cf-input cf-select"
                }
              >
                <option value="" disabled>
                  Select consultation type
                </option>
                {CONSULTATION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>
            {errors.consultationType && (
              <span className="cf-error-text">{errors.consultationType}</span>
            )}
          </div>

          {serverMessage && (
            <div className={status === "success" ? "cf-banner cf-banner-success" : "cf-banner cf-banner-error"}>
              {serverMessage}
            </div>
          )}

          <button type="submit" className="cf-submit" disabled={status === "submitting"}>
            <CalendarIcon />
            {status === "submitting" ? "Submitting..." : "Submit Consultation Request"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
