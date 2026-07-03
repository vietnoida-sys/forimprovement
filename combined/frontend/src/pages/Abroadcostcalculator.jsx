import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Abroadcalculator.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const COUNTRIES = {
  USA: {
    code: "us", flag: "🇺🇸", label: "United States",
    visa: { min: 13000, max: 15000 },
    flight: { min: 60000, max: 120000 },
    rent: { shared: { min: 40000, max: 80000 }, private: { min: 80000, max: 150000 } },
    food: { min: 20000, max: 40000 },
    transport: { min: 8000, max: 15000 },
    utilities: { min: 3000, max: 6000 },
    tuition: { min: 800000, max: 2500000 },
    insurance: { min: 60000, max: 120000 },
  },
  UK: {
    code: "gb", flag: "🇬🇧", label: "United Kingdom",
    visa: { min: 10000, max: 12000 },
    flight: { min: 45000, max: 90000 },
    rent: { shared: { min: 35000, max: 70000 }, private: { min: 70000, max: 130000 } },
    food: { min: 15000, max: 30000 },
    transport: { min: 6000, max: 12000 },
    utilities: { min: 2500, max: 5000 },
    tuition: { min: 700000, max: 2000000 },
    insurance: { min: 50000, max: 100000 },
  },
  Canada: {
    code: "ca", flag: "🇨🇦", label: "Canada",
    visa: { min: 6000, max: 10000 },
    flight: { min: 50000, max: 100000 },
    rent: { shared: { min: 25000, max: 50000 }, private: { min: 50000, max: 100000 } },
    food: { min: 12000, max: 25000 },
    transport: { min: 4000, max: 8000 },
    utilities: { min: 2000, max: 4000 },
    tuition: { min: 500000, max: 1800000 },
    insurance: { min: 40000, max: 80000 },
  },
  Germany: {
    code: "de", flag: "🇩🇪", label: "Germany",
    visa: { min: 7000, max: 8000 },
    flight: { min: 35000, max: 75000 },
    rent: { shared: { min: 15000, max: 35000 }, private: { min: 35000, max: 70000 } },
    food: { min: 10000, max: 20000 },
    transport: { min: 3000, max: 7000 },
    utilities: { min: 2000, max: 4000 },
    tuition: { min: 200000, max: 800000 },
    insurance: { min: 30000, max: 60000 },
  },
  Australia: {
    code: "au", flag: "🇦🇺", label: "Australia",
    visa: { min: 9000, max: 13000 },
    flight: { min: 55000, max: 110000 },
    rent: { shared: { min: 30000, max: 60000 }, private: { min: 60000, max: 120000 } },
    food: { min: 14000, max: 28000 },
    transport: { min: 5000, max: 10000 },
    utilities: { min: 2500, max: 5000 },
    tuition: { min: 600000, max: 2200000 },
    insurance: { min: 45000, max: 90000 },
  },
  NewZealand: {
    code: "nz", flag: "🇳🇿", label: "New Zealand",
    visa: { min: 6000, max: 9000 },
    flight: { min: 60000, max: 115000 },
    rent: { shared: { min: 25000, max: 50000 }, private: { min: 50000, max: 95000 } },
    food: { min: 12000, max: 24000 },
    transport: { min: 4000, max: 8000 },
    utilities: { min: 2000, max: 4000 },
    tuition: { min: 500000, max: 1600000 },
    insurance: { min: 35000, max: 70000 },
  },
  Singapore: {
    code: "sg", flag: "🇸🇬", label: "Singapore",
    visa: { min: 3000, max: 5000 },
    flight: { min: 20000, max: 50000 },
    rent: { shared: { min: 30000, max: 60000 }, private: { min: 60000, max: 120000 } },
    food: { min: 10000, max: 22000 },
    transport: { min: 3000, max: 7000 },
    utilities: { min: 2000, max: 4000 },
    tuition: { min: 400000, max: 1500000 },
    insurance: { min: 30000, max: 65000 },
  },
  UAE: {
    code: "ae", flag: "🇦🇪", label: "UAE (Dubai)",
    visa: { min: 5000, max: 8000 },
    flight: { min: 15000, max: 40000 },
    rent: { shared: { min: 20000, max: 45000 }, private: { min: 45000, max: 100000 } },
    food: { min: 10000, max: 22000 },
    transport: { min: 4000, max: 9000 },
    utilities: { min: 2000, max: 5000 },
    tuition: { min: 300000, max: 1200000 },
    insurance: { min: 25000, max: 55000 },
  },
  France: {
    code: "fr", flag: "🇫🇷", label: "France",
    visa: { min: 7000, max: 9000 },
    flight: { min: 35000, max: 80000 },
    rent: { shared: { min: 18000, max: 40000 }, private: { min: 40000, max: 85000 } },
    food: { min: 11000, max: 22000 },
    transport: { min: 3000, max: 7000 },
    utilities: { min: 2000, max: 4000 },
    tuition: { min: 150000, max: 900000 },
    insurance: { min: 30000, max: 65000 },
  },
  Netherlands: {
    code: "nl", flag: "🇳🇱", label: "Netherlands",
    visa: { min: 7000, max: 9000 },
    flight: { min: 35000, max: 75000 },
    rent: { shared: { min: 20000, max: 45000 }, private: { min: 45000, max: 90000 } },
    food: { min: 11000, max: 22000 },
    transport: { min: 3000, max: 7000 },
    utilities: { min: 2000, max: 4000 },
    tuition: { min: 200000, max: 1000000 },
    insurance: { min: 30000, max: 65000 },
  },
  Italy: {
    code: "it", flag: "🇮🇹", label: "Italy",
    visa: { min: 7000, max: 9000 },
    flight: { min: 40000, max: 85000 },
    rent: { shared: { min: 18000, max: 40000 }, private: { min: 40000, max: 80000 } },
    food: { min: 10000, max: 20000 },
    transport: { min: 2000, max: 5000 },
    utilities: { min: 1500, max: 3500 },
    tuition: { min: 150000, max: 800000 },
    insurance: { min: 25000, max: 50000 },
  },
  Japan: {
    code: "jp", flag: "🇯🇵", label: "Japan",
    visa: { min: 8000, max: 10000 },
    flight: { min: 50000, max: 100000 },
    rent: { shared: { min: 35000, max: 70000 }, private: { min: 70000, max: 140000 } },
    food: { min: 15000, max: 30000 },
    transport: { min: 5000, max: 10000 },
    utilities: { min: 3000, max: 6000 },
    tuition: { min: 600000, max: 2000000 },
    insurance: { min: 40000, max: 80000 },
  },
};

// Monthly PhD stipend per country (in INR) — sourced from official funding guides
const PHD_STIPENDS = {
  USA:         { min: 220000, max: 350000, note: "Fully funded via tuition waiver. Includes health insurance." },
  UK:          { min: 220000, max: 250000, note: "UKRI minimum stipends apply. London universities pay higher." },
  Canada:      { min: 160000, max: 250000, note: "U15 universities guarantee minimum funding packages." },
  Germany:     { min: 280000, max: 350000, note: "PhD classified as employee (TV-L E13 contract)." },
  Australia:   { min: 190000, max: 220000, note: "RTP Scholarship — tax-free stipend, tuition covered." },
  NewZealand:  { min: 150000, max: 180000, note: "International students pay same fees as domestic students." },
  Singapore:   { min: 180000, max: 220000, note: "NUS/NTU scholarship — tuition subsidy + monthly stipend." },
  UAE:         { min: 230000, max: 290000, note: "Graduate Assistantship — fully funded for top applicants." },
  France:      { min: 170000, max: 200000, note: "Contrat Doctoral — structured as a salary contract." },
  Netherlands: { min: 250000, max: 290000, note: "CAO contract — PhD is employee with pension & benefits." },
  Italy:       { min: 100000, max: 150000, note: "National fixed stipend — covers living outside major cities." },
  Japan:       { min: 75000,  max: 85000,  note: "MEXT scholarship — covers tuition, flights & living costs." },
};

const fmt = (n) => "₹" + Math.abs(n).toLocaleString("en-IN");
const avg = (min, max) => Math.round((min + max) / 2);

const CostTag = ({ label, amount, onDelete, isIncome }) => (
  <motion.div 
    className="cost-tag"
    initial={{ opacity: 0, y: 15, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -15, scale: 0.95 }}
    transition={{ duration: 0.2 }}
    layout
  >
    <span className="cost-tag-label">{label}</span>
    <span
      className="cost-tag-amount"
      style={isIncome ? { color: "#4CAF50" } : {}}
    >
      {isIncome ? "−" : ""}
      {fmt(amount)}
    </span>
    <button className="delete-btn" onClick={onDelete} title="Remove this cost">
      ×
    </button>
  </motion.div>
);

export default function Abroadcostcalculator() {
  const [selectedCountry, setSelectedCountry] = useState("Canada");
  const [months, setMonths] = useState(6);
  const [isStudent, setIsStudent] = useState(false);
  const [studyType, setStudyType] = useState("bachelor"); // "bachelor" | "master" | "phd"
  const [roomType, setRoomType] = useState("shared");
  const [tripType, setTripType] = useState("one-way");

  const [items, setItems] = useState({
    visa: true,
    biometrics: true,
    serviceCharge: true,
    flight: true,
    rent: true,
    food: true,
    transport: true,
    utilities: true,
    passport: true,
    ielts: false,
    consultancy: false,
    tuition: false,
    stipend: false,
    insurance: false,
  });

  const country = COUNTRIES[selectedCountry];
  const isPhd = isStudent && studyType === "phd";

  const costs = useMemo(() => {
    const visaFee = avg(country.visa.min, country.visa.max);
    const biometrics = 3000;
    const serviceCharge = 2500;
    const flightCost =
      tripType === "round"
        ? avg(country.flight.min, country.flight.max) * 2
        : avg(country.flight.min, country.flight.max);
    const rentMonthly = avg(
      country.rent[roomType].min,
      country.rent[roomType].max
    );
    const foodMonthly = avg(country.food.min, country.food.max);
    const transportMonthly = avg(country.transport.min, country.transport.max);
    const utilitiesMonthly = avg(country.utilities.min, country.utilities.max);
    const passport = 2500;
    const ielts = 19000;
    const consultancy = 0;

    // Tuition is calculated ONLY when user selects PhD
    const tuition =
      isStudent && isPhd
        ? avg(country.tuition.min, country.tuition.max)
        : 0;

    const insurance = isStudent
      ? avg(country.insurance.min, country.insurance.max)
      : 0;

    // PhD monthly stipend × months (treated as income, subtracted from total)
    const phdData = PHD_STIPENDS[selectedCountry];
    const stipendMonthly = isPhd && phdData
      ? Math.round((phdData.min + phdData.max) / 2)
      : 0;

    return {
      visa: { 
        label: (
          <span className="label-with-flag">
            <img src={`https://flagcdn.com/w40/${country.code}.png`} className="inline-flag" alt="" /> Visa Fee
          </span>
        ), 
        amount: visaFee 
      },
      biometrics: { label: "Biometrics", amount: biometrics },
      serviceCharge: { label: "Service Charge", amount: serviceCharge },
      flight: { label: `Flight (${tripType})`, amount: flightCost },
      rent: { label: `Rent × ${months} months`, amount: rentMonthly * months },
      food: { label: `Food × ${months} months`, amount: foodMonthly * months },
      transport: {
        label: `Transport × ${months} months`,
        amount: transportMonthly * months,
      },
      utilities: {
        label: `Utilities × ${months} months`,
        amount: utilitiesMonthly * months,
      },
      passport: { label: "Passport", amount: passport },
      ielts: { label: "IELTS/PTE", amount: ielts },
      consultancy: { label: "Consultancy", amount: consultancy },
      tuition: {
        label: (
          <span className="label-with-flag">
            Tuition (<img src={`https://flagcdn.com/w40/${country.code}.png`} className="inline-flag" alt="" /> PhD per year)
          </span>
        ),
        amount: tuition,
      },
      stipend: {
        label: (
          <span className="label-with-flag">
            <img src={`https://flagcdn.com/w40/${country.code}.png`} className="inline-flag" alt="" /> PhD Stipend × {months} mo (₹{phdData ? phdData.min.toLocaleString("en-IN") : 0}–{phdData ? phdData.max.toLocaleString("en-IN") : 0}/mo)
          </span>
        ),
        amount: stipendMonthly * months,
      },
      insurance: { label: "Health Insurance", amount: insurance },
    };
  }, [selectedCountry, months, isStudent, isPhd, roomType, tripType]);

  const total = useMemo(
    () =>
      Object.entries(items)
        .filter(([_, on]) => on)
        .reduce((sum, [key]) => {
          if (!costs[key]) return sum;
          // stipend is income — subtract it
          if (key === "stipend") return sum - costs[key].amount;
          return sum + costs[key].amount;
        }, 0),
    [items, costs]
  );

  const toggle = (key) => setItems((prev) => ({ ...prev, [key]: !prev[key] }));
  const remove = (key) => setItems((prev) => ({ ...prev, [key]: false }));

  const activeItems = Object.entries(items).filter(([_, on]) => on);

  return (
    <>
      <Navbar />
      <div className="app">
        {/* Header Hero Section */}
        <motion.header 
          className="header"
          initial="initial"
          animate="animate"
        >
          <div className="header-content">
            <motion.div 
              className="header-eyebrow"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Company Abroad Planner
            </motion.div>
            <motion.h1 
              className="header-title"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Abroad Cost <span className="accent">Calculator</span>
            </motion.h1>
            <motion.p 
              className="header-sub"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Estimate your international relocation budget — accurate,
              transparent, adjustable.
            </motion.p>
          </div>
          <motion.div 
            className="header-image-container"
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" 
              alt="Students planning their study abroad budget" 
              className="header-hero-image"
            />
          </motion.div>
        </motion.header>

        <div className="layout">
          {/* LEFT: Controls */}
          <motion.div 
            className="panel controls-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Country Selector */}
            <motion.section 
              className="section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="section-label">Destination Country</div>
              <div className="country-grid">
                {Object.entries(COUNTRIES).map(([key, c]) => (
                  <motion.button
                    key={key}
                    className={`country-btn${
                      selectedCountry === key ? " active" : ""
                    }`}
                    onClick={() => setSelectedCountry(key)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <img src={`https://flagcdn.com/w40/${c.code}.png`} className="country-flag-img" alt="" />
                    <span className="country-name">{c.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.section>

            {/* Duration */}
            <motion.section 
              className="section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <div className="section-label">
                Duration:{" "}
                <span className="accent">{months} months</span>
              </div>
              <motion.input
                type="range"
                min={1}
                max={24}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="slider"
                whileHover={{ scaleY: 1.25 }}
                transition={{ duration: 0.15 }}
              />
              <div className="slider-labels">
                <span>1 month</span>
                <span>24 months</span>
              </div>
            </motion.section>

            {/* Toggles */}
            <motion.section 
              className="section toggles-row"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {/* Traveller Type */}
              <div className="toggle-group">
                <div className="section-label">Traveller Type</div>
                <div className="toggle-btns">
                  <motion.button
                    className={`toggle-btn${!isStudent ? " active" : ""}`}
                    onClick={() => setIsStudent(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Tourist / Work
                  </motion.button>
                  <motion.button
                    className={`toggle-btn${isStudent ? " active" : ""}`}
                    onClick={() => setIsStudent(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Student
                  </motion.button>
                </div>

                {/* Study level — shown only when Student is selected */}
                {isStudent && (
                  <div className="toggle-btns" style={{ marginTop: "6px" }}>
                    
                    <motion.button
                      className={`toggle-btn${
                        studyType === "phd" ? " active" : ""
                      }`}
                      onClick={() => setStudyType("phd")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      PhD
                    </motion.button>
                  </div>
                )}

                {/* PhD info badge */}
                <AnimatePresence>
                  {isPhd && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        marginTop: "8px",
                        padding: "8px 12px",
                        background: "rgba(76,175,80,0.1)",
                        border: "1px solid rgba(76,175,80,0.35)",
                        borderRadius: "8px",
                        fontSize: "12px",
                        color: "#4CAF50",
                        lineHeight: "1.5",
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "4px"
                      }}
                    >
                      🎓 PhD students get a monthly stipend of{" "}
                      <strong>
                        ₹{PHD_STIPENDS[selectedCountry]?.min.toLocaleString("en-IN")} – ₹{PHD_STIPENDS[selectedCountry]?.max.toLocaleString("en-IN")}/mo
                      </strong>{" "}
                      in <img src={`https://flagcdn.com/w40/${country.code}.png`} className="inline-flag" alt="" /> <strong>{country.label}</strong>.{" "}
                      <span style={{opacity:0.8}}>{PHD_STIPENDS[selectedCountry]?.note}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accommodation */}
              <div className="toggle-group">
                <div className="section-label">Accommodation</div>
                <div className="toggle-btns">
                  <motion.button
                    className={`toggle-btn${
                      roomType === "shared" ? " active" : ""
                    }`}
                    onClick={() => setRoomType("shared")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Shared
                  </motion.button>
                  <motion.button
                    className={`toggle-btn${
                      roomType === "private" ? " active" : ""
                    }`}
                    onClick={() => setRoomType("private")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Private
                  </motion.button>
                </div>
              </div>

              {/* Flight Type */}
              <div className="toggle-group">
                <div className="section-label">Flight Type</div>
                <div className="toggle-btns">
                  <motion.button
                    className={`toggle-btn${
                      tripType === "one-way" ? " active" : ""
                    }`}
                    onClick={() => setTripType("one-way")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    One-way
                  </motion.button>
                  <motion.button
                    className={`toggle-btn${
                      tripType === "round" ? " active" : ""
                    }`}
                    onClick={() => setTripType("round")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Round Trip
                  </motion.button>
                </div>
              </div>
            </motion.section>

            {/* Cost Items Toggle */}
            <motion.section 
              className="section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <div className="section-label">Include / Exclude Costs</div>
              <div className="item-toggles">
                {Object.entries(costs).map(([key, { label, amount }]) => {
                  // Hide student-only items for non-students
                  if (
                    !isStudent &&
                    (key === "tuition" ||
                      key === "insurance" ||
                      key === "stipend")
                  )
                    return null;

                  // Hide stipend unless PhD
                  if (key === "stipend" && !isPhd) return null;

                  // Hide tuition checkbox for normal students (Show ONLY when PhD is active)
                  if (key === "tuition" && !isPhd) return null;

                  return (
                    <motion.label
                      key={key}
                      className={`item-toggle${items[key] ? " checked" : ""}`}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <input
                        type="checkbox"
                        checked={!!items[key]}
                        onChange={() => toggle(key)}
                      />
                      <span className="item-toggle-label">{label}</span>
                      <span
                        className="item-toggle-amount"
                        style={
                          key === "stipend" ? { color: "red" } : {}
                        }
                      >
                        {key === "stipend" ? "−" : ""}
                        {fmt(amount)}
                      </span>
                    </motion.label>
                  );
                })}
              </div>
            </motion.section>
          </motion.div>

          {/* RIGHT: Summary */}
          <motion.div 
            className="panel summary-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            <div className="summary-header">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedCountry}
                  className="summary-country"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <img src={`https://flagcdn.com/w40/${country.code}.png`} className="summary-flag-img" alt="" />
                  {COUNTRIES[selectedCountry].label}
                </motion.div>
              </AnimatePresence>
              <div className="summary-duration">
                {months} month{months !== 1 ? "s" : ""} stay
              </div>
            </div>

            {/* Total Ticker */}
            <motion.div 
              className="total-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="total-label">Estimated Total Cost</div>
              <div className="total-amount">{fmt(total)}</div>
              <div className="total-sub">
                {isPhd && items.stipend
                  ? "After PhD stipend deduction"
                  : "All selected items combined"}
              </div>
            </motion.div>

            {/* Active Tags */}
            <div className="tags-section">
              <div className="section-label">
                Selected Costs{" "}
                <span className="tag-count">{activeItems.length} items</span>
              </div>
              {activeItems.length === 0 ? (
                <div className="empty-state">
                  No costs selected. Toggle items on the left.
                </div>
              ) : (
                <div className="tags-list">
                  <AnimatePresence mode="popLayout">
                    {activeItems.map(([key]) => (
                      <CostTag
                        key={key}
                        label={costs[key].label}
                        amount={costs[key].amount}
                        isIncome={key === "stipend"}
                        onDelete={() => remove(key)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Breakdown Bar */}
            {activeItems.length > 0 && (
              <div className="breakdown-section">
                <div className="section-label">Cost Breakdown</div>
                <AnimatePresence mode="popLayout">
                  {activeItems.map(([key]) => {
                    const pct =
                      total > 0 ? (costs[key].amount / total) * 100 : 0;
                    return (
                      <motion.div 
                        key={key} 
                        className="breakdown-row"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        layout
                        transition={{ duration: 0.2 }}
                      >
                        <span className="breakdown-label">
                          {costs[key].label}
                        </span>
                        <div className="breakdown-bar-wrap">
                          <motion.div
                            className="breakdown-bar"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(0, pct)}%` }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            style={{
                              background:
                                key === "stipend"
                                  ? "linear-gradient(90deg,#2e7d32,#4CAF50)"
                                  : undefined,
                            }}
                          />
                        </div>
                        <span
                          className="breakdown-pct"
                          style={
                            key === "stipend" ? { color: "#4CAF50" } : {}
                          }
                        >
                          {key === "stipend" ? "−" : ""}
                          {Math.abs(pct).toFixed(1)}%
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* Formula */}
           {/* Formula & Apply Section */}
            <motion.div 
              className="formula-box"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
             <div className="formula-title">Contact Us</div>
             

              {/* Professional Apply CTA Button */}
              <div 
                className="apply-cta-section" 
                style={{ 
                  marginTop: "20px", 
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)", 
                  paddingTop: "15px" 
                }}
              >
                <p 
                  style={{ 
                    fontSize: "12px", 
                    color: "rgba(255, 255, 255, 0.7)", 
                    marginBottom: "12px", 
                    lineHeight: "1.4" 
                  }}
                >
                  Ready to take the next step? Connect with our experts for university applications and visa guidance.
                </p>
                <motion.a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSefWVUVnbBT3GSCLjJM9bKP7hymqVhPTHbixEvbltPcJtVbMA/viewform?usp=publish-editor" // यहाँ अपना वास्तविक अप्लाई लिंक डालें
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    padding: "12px 20px",
                    background: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
                    color: "#ffffff",
                    textDecoration: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                    boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                    textAlign: "center",
                    cursor: "pointer",
                    boxSizing: "border-box"
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    background: "linear-gradient(135deg, #5cba60 0%, #388e3c 100%)",
                    boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Apply Now <span style={{ marginLeft: "8px", fontSize: "16px" }}>→</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}