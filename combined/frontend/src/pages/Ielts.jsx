import React, { useState } from "react";
import "./Ielts.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const QUICK_FACTS = [
  ["EXAM", "IELTS"],
  ["FULL FORM", "International English Language Testing System"],
  ["OFFICIAL SITE", "ielts.org"],
  ["PURPOSE", "Study · Work · Relocation"],
  ["CONDUCTED BY", "IDP Education Ltd."],
  ["FORMAT", "Academic / General Training"],
  ["MODE", "Computer-based / Paper-based"],
  ["FEE (INDIA)", "₹19,000"],
  ["SCORE RANGE", "Band 1 – 9"],
];

const WHY_2026 = [
  "Recognised at nearly every major university across English-speaking countries, so it keeps your options open.",
  "A strong band score works directly in your favour during programme admissions.",
  "Employers abroad often ask for proof of English fluency — your score does that talking for you.",
  "Visa applications for most English-speaking countries call for an IELTS result, so sitting the test early keeps your timeline realistic.",
  "Booking further ahead gives you more runway to train all four skills properly instead of cramming.",
];

const REG_STEPS = {
  online: [
    "Open the official IELTS website and choose your test centre.",
    "Pick your preferred exam date and time slot.",
    "Fill in your personal and contact details.",
    "Complete the rest of the registration form and attach a scanned passport copy.",
    "Select the institutions you'd like your score sent to.",
    "Pay the exam fee to confirm your seat.",
  ],
  offline: [
    "Download the registration form from the IDP India website.",
    "Choose your test date and centre.",
    "Fill out the form by hand and attach the required documents.",
    "Submit the form along with the ₹19,000 exam fee.",
  ],
};

const ELIGIBILITY = [
  {
    tag: "AGE",
    title: "No ceiling, one floor",
    body: "There's no maximum age for sitting IELTS. The only rule: you need to be at least 16 on the day you register.",
  },
  {
    tag: "EDUCATION",
    title: "Open to any background",
    body: "IELTS sets no minimum qualification. High-schoolers and postgraduates board the same flight — everyone is welcome to sit the test.",
  },
];

const PATTERN = [
  { section: "Listening", duration: "30 min", qs: "40", note: "Recordings play once — conversations, monologues, and academic lectures." },
  { section: "Reading", duration: "60 min", qs: "40", note: "Academic-style passages from journals, newspapers, and books." },
  { section: "Writing", duration: "60 min", qs: "2", note: "Task 1: describe visual data. Task 2: argumentative essay." },
  { section: "Speaking", duration: "11–14 min", qs: "3", note: "A face-to-face interview across three structured parts." },
];

const SYLLABUS = [
  {
    key: "L",
    title: "Listening",
    body: "You'll hear conversations, monologues, and academic talks — each played only once — then answer through multiple-choice, short-answer, and completion tasks.",
  },
  {
    key: "R",
    title: "Reading",
    body: "Academic-style texts pulled from journals, magazines, and books test how well you find main ideas, spot detail, and follow an argument.",
  },
  {
    key: "W",
    title: "Writing",
    body: "Task 1 asks you to summarise a chart, graph, or diagram. Task 2 is a full essay built on a clear thesis and organised argument.",
  },
  {
    key: "S",
    title: "Speaking",
    body: "A live interview assessing fluency, vocabulary, grammar, and pronunciation through spontaneous, unscripted answers.",
  },
];

const FEES = [
  ["IELTS (Academic / General)", "₹19,000"],
  ["IELTS for UKVI", "₹19,250"],
  ["IELTS Life Skills (A1 / B1)", "₹18,000"],
];

const DATES_NOTE =
  "The test runs multiple times a month, so there's rarely a long wait for a slot. Book 3–4 months out to leave room for results processing — and a retake, if you need one.";

const CENTRE_STATES = [
  "Delhi NCR",
  "Andhra Pradesh",
  "Chandigarh",
  "Gujarat",
  "Kerala",
  "Madhya Pradesh",
  "Punjab",
];

const PREP_TIPS = [
  "Start early and study in consistent, short sessions rather than last-minute marathons.",
  "Learn the exact task types, timing, and scoring criteria for every section before test day.",
  "Build a daily English habit — newspapers, podcasts, shows — so the language stops feeling foreign.",
  "Run through official practice tests to calibrate against the real format and difficulty.",
  "Train your ear on a mix of accents and speeds, not just one.",
  "Practise skimming and scanning so you're not re-reading passages under time pressure.",
  "Rewrite what you read in your own words — paraphrasing is graded directly in Writing and Speaking.",
  "Structure every essay with a clear intro, body, and conclusion before you worry about polish.",
  "Speak out loud regularly, even solo, to build comfort before the live interview.",
];

const FAQ = [
  { q: "What does IELTS stand for?", a: "International English Language Testing System." },
  { q: "What's the score range?", a: "Band 1 through Band 9, in half-band increments." },
  { q: "How long is the test?", a: "About 2 hours and 45 minutes in total." },
  { q: "Who administers it?", a: "IDP Education Ltd. runs the test; in India that's IDP IELTS India." },
  { q: "What does it cost in India?", a: "₹19,000 for the standard Academic or General Training test." },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function SectionLabel({ gate, title }) {
  return (
    <div className="section-label">
      <span className="section-gate">GATE {gate}</span>
      <h2>{title}</h2>
    </div>
  );
}

function BoardRow({ cols }) {
  return (
    <div className="board-row">
      {cols.map((c, i) => (
        <span key={i} className="board-cell">
          {c}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function App() {
  const [regMode, setRegMode] = useState("online");

  return (
    <>
      <Navbar />
      <div className="vwg">
        {/* ---------------- Hero / boarding pass ---------------- */}
      <section className="hero">
        <p className="hero-eyebrow">DEPARTURE GUIDE — CLASS OF 2026</p>
        <h1 className="hero-title">
          Your boarding pass
          <br />
          to study abroad.
        </h1>
        <p className="hero-sub">
          IELTS is the checkpoint most English-speaking countries ask you to clear
          before granting admission, work rights, or a visa. Here's everything
          VietWorldGate students need to book, prepare for, and pass it in 2026.
        </p>

        <div className="ticket">
          <div className="ticket-main">
            <div className="ticket-row ticket-row-top">
              <div>
                <span className="ticket-label">Passenger</span>
                <span className="ticket-value">You</span>
              </div>
              <div>
                <span className="ticket-label">Flight</span>
                <span className="ticket-value mono">IELTS-2026</span>
              </div>
            </div>
            <div className="ticket-row">
              <div>
                <span className="ticket-label">From</span>
                <span className="ticket-value">Everyday English</span>
              </div>
              <div className="ticket-plane">✈</div>
              <div>
                <span className="ticket-label">To</span>
                <span className="ticket-value">World-Ready</span>
              </div>
            </div>
            <div className="ticket-row">
              <div>
                <span className="ticket-label">Class</span>
                <span className="ticket-value">Academic / General</span>
              </div>
              <div>
                <span className="ticket-label">Gate</span>
                <span className="ticket-value mono">2h 45m</span>
              </div>
            </div>
          </div>
          <div className="ticket-perf" aria-hidden="true" />
          <div className="ticket-stub">
            <span className="ticket-label">Boarding board</span>
            <div className="stub-board">
              {QUICK_FACTS.slice(0, 4).map(([k, v]) => (
                <div key={k} className="stub-row">
                  <span>{k}</span>
                  <span className="mono">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Quick facts board ---------------- */}
      <section id="overview" className="board-panel">
        <SectionLabel gate="01" title="Departure board — quick facts" />
        <div className="board">
          {QUICK_FACTS.map(([k, v]) => (
            <BoardRow key={k} cols={[k, v]} />
          ))}
        </div>
      </section>

      {/* ---------------- 2026 update stamp ---------------- */}
      <section className="stamp-panel">
        <div className="stamp">UPDATED · 2026</div>
        <p>
          The 2026 format changes touch only Reading and Writing. Expect{" "}
          <strong>85 questions in 2 hours 45 minutes</strong> overall. If you're
          eyeing a May sitting, seats open between the <strong>15th and 31st</strong>.
        </p>
      </section>

      {/* ---------------- What is IELTS ---------------- */}
      <section className="prose-panel">
        <SectionLabel gate="02" title="What is IELTS?" />
        <p>
          IELTS measures how well a non-native speaker can operate in English —
          reading it, writing it, listening to it, and speaking it under pressure.
          Universities across the UK, Canada, Australia, and the US lean on the
          result to judge whether a candidate is ready for an English-medium
          classroom.
        </p>
        <p>
          There are two runways to choose from. <strong>IELTS Academic</strong> suits
          anyone applying to higher education abroad, while{" "}
          <strong>IELTS General Training</strong> is built for people relocating to
          work or live in an English-speaking country.
        </p>
      </section>

      {/* ---------------- Why take it ---------------- */}
      <section className="announce-panel">
        <SectionLabel gate="03" title="Why board this flight in 2026" />
        <ul className="announce-list">
          {WHY_2026.map((w, i) => (
            <li key={i}>
              <span className="announce-icon">▸</span>
              {w}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- Eligibility ---------------- */}
      <section id="eligibility" className="cards-panel">
        <SectionLabel gate="04" title="Eligibility check-in" />
        <div className="card-row">
          {ELIGIBILITY.map((e) => (
            <div className="gate-card" key={e.tag}>
              <span className="gate-card-tag">{e.tag}</span>
              <h3>{e.title}</h3>
              <p>{e.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Registration ---------------- */}
      <section id="registration" className="registration-panel">
        <SectionLabel gate="05" title="Registration — check-in counter" />
        <div className="toggle-row">
          <button
            className={regMode === "online" ? "toggle active" : "toggle"}
            onClick={() => setRegMode("online")}
          >
            Online
          </button>
          <button
            className={regMode === "offline" ? "toggle active" : "toggle"}
            onClick={() => setRegMode("offline")}
          >
            Offline
          </button>
        </div>
        <ol className="steps">
          {REG_STEPS[regMode].map((s, i) => (
            <li key={i}>
              <span className="step-index mono">{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <div className="note-strip">
          <strong>Document required:</strong> a valid passport is the only thing
          Indian test-takers need for registration — and to carry to the centre on
          exam day.
        </div>
      </section>

      {/* ---------------- Fees ---------------- */}
      <section id="fees" className="board-panel">
        <SectionLabel gate="06" title="Fare board — exam fees" />
        <div className="board">
          {FEES.map(([k, v]) => (
            <BoardRow key={k} cols={[k, v]} />
          ))}
        </div>
        <p className="footnote">
          One flat fare nationwide — the price doesn't shift between cities or
          states.
        </p>
      </section>

      {/* ---------------- Exam dates ---------------- */}
      <section id="exam-dates" className="prose-panel">
        <SectionLabel gate="07" title="Departure times — exam dates" />
        <p>{DATES_NOTE}</p>
        <div className="chip-row">
          {CENTRE_STATES.map((c) => (
            <span className="chip mono" key={c}>
              {c}
            </span>
          ))}
        </div>
        <p className="footnote">
          ~82 test centres nationwide — pick the one with the shortest commute so
          you land at your desk fresh.
        </p>
      </section>

      {/* ---------------- Pattern ---------------- */}
      <section id="pattern" className="schedule-panel">
        <SectionLabel gate="08" title="Flight schedule — exam pattern" />
        <div className="schedule">
          <div className="schedule-head">
            <span>Section</span>
            <span>Duration</span>
            <span>Questions</span>
            <span>What to expect</span>
          </div>
          {PATTERN.map((p) => (
            <div className="schedule-row" key={p.section}>
              <span className="schedule-name">{p.section}</span>
              <span className="mono">{p.duration}</span>
              <span className="mono">{p.qs}</span>
              <span className="schedule-note">{p.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Syllabus ---------------- */}
      <section id="syllabus" className="cards-panel">
        <SectionLabel gate="09" title="Cabin briefing — the syllabus" />
        <div className="card-row four">
          {SYLLABUS.map((s) => (
            <div className="gate-card" key={s.key}>
              <span className="gate-card-tag mono">{s.key}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Prep tips ---------------- */}
      <section id="prep-tips" className="announce-panel alt">
        <SectionLabel gate="10" title="Pre-flight checklist — prep tips" />
        <ul className="check-list">
          {PREP_TIPS.map((t, i) => (
            <li key={i}>
              <span className="check-box" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- Result ---------------- */}
      <section id="result" className="prose-panel">
        <SectionLabel gate="11" title="Arrivals — checking your result" />
        <p>
          Results land within a week for computer-based tests, or 13 days for the
          paper version — sent straight to your registered email. Log in with your
          candidate number, ID number, and date of birth to view your band score
          for each section, plus the overall average.
        </p>
        <p className="footnote">
          Universities set their own minimum band requirements, so confirm the
          threshold for your target programme before you book your test date.
        </p>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="faq-panel">
        <SectionLabel gate="12" title="Ask at the counter — FAQ" />
        <div className="faq-list">
          {FAQ.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
}