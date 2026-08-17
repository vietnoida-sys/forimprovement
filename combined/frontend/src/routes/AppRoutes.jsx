import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard"; // homepage: keep eager for fast first paint

// Everything below is code-split so the homepage bundle stays small.
const PortalApp = lazy(() => import("../portal/PortalApp"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const CompanyProfile = lazy(() => import("../pages/CompanyProfile"));
const MissionVision = lazy(() => import("../pages/MissionVision"));
const ValuesGrid = lazy(() => import("../pages/ValuesGrid"));
const OurTeam = lazy(() => import("../pages/OurTeam"));
const Feedback = lazy(() => import("../pages/Feedback"));
const VisaAssistance = lazy(() => import("../pages/VisaAssistance"));
const CourseAdvice = lazy(() => import("../pages/CourseAdvice"));
const ShortlistUniversities = lazy(() => import("../pages/ShortlistUniversities"));
const PreDeparture = lazy(() => import("../pages/PreDeparture"));
const AustraliaDestination = lazy(() => import("../pages/AustraliaDestination"));
const CanadaDestination = lazy(() => import("../pages/CanadaDestination"));
const GermanyDestination = lazy(() => import("../pages/GermanyDestination"));
const DubaiDestination = lazy(() => import("../pages/DubaiDestination"));
const UKDestination = lazy(() => import("../pages/UKDestination"));
const NZDestination = lazy(() => import("../pages/NZDestination"));
const JapanDestination = lazy(() => import("../pages/JapanDestination"));
const ItalyDestination = lazy(() => import("../pages/ItalyDestination"));
const Scholarships = lazy(() => import("../pages/Scholarships"));
const ContactDelhi = lazy(() => import("../pages/branches/ContactDelhi"));
const ContactNoida = lazy(() => import("../pages/branches/ContactNoida"));
const ContactGhaziabad = lazy(() => import("../pages/branches/ContactGhaziabad"));
const ContactLondon = lazy(() => import("../pages/branches/ContactLondon"));
const Careers = lazy(() => import("../pages/Careers"));
const CoursePortal = lazy(() => import("../pages/CoursePortal"));
const UniversityPartners = lazy(() => import("../pages/Universitypartner"));
const Certificate = lazy(() => import("../pages/Certificate"));
const WhyChooseUs = lazy(() => import("../pages/Whychooseus"));
const Infrastructure = lazy(() => import("../pages/Infrastructure"));
const OurServices = lazy(() => import("../pages/Ourservices"));
const UpcomingEvents = lazy(() => import("../pages/UpcomingEvents"));
const OurPresence = lazy(() => import("../pages/OurPresence"));
const Seminar = lazy(() => import("../pages/Seminar"));
const TermsConditions = lazy(() => import("../pages/TermsConditions"));
const EducationFair = lazy(() => import("../pages/EducationFair"));
const VideoGallery = lazy(() => import("../pages/VideoGallery"));
const Accreditations = lazy(() => import("../pages/Accreditations"));
const CompanyHistory = lazy(() => import("../pages/CompanyHistory"));
const SocialResponsibility = lazy(() => import("../pages/Socialresponsibility"));
const ComparisonPage = lazy(() => import("../pages/CompareUniversity"));
const Abroadcostcalculator = lazy(() => import("../pages/Abroadcostcalculator"));
const StudentDashbaord = lazy(() => import("../pages/StudentDashbaord"));
const ConsultationForm = lazy(() => import("../pages/Consultationform"));
const ConsultationsList = lazy(() => import("../portal/pages/consultation"));
const LoanProcessSection = lazy(() => import("../components/Loanprocesssection"));
const Ielts = lazy(() => import("../pages/Ielts"));

function PageFallback() {
  return <div className="page-loader" style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
}

function AppRoutes() {
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/Abroadcostcalculator" element={<Abroadcostcalculator />} />
          <Route path="/CompareUniversity" element={<ComparisonPage />} />
          <Route path="/EducationFair" element={<EducationFair />} />
          <Route path="/OurPresence" element={<OurPresence />} />
          <Route path="/OurServices" element={<OurServices />} />
          <Route path="/Infrastructure" element={<Infrastructure />} />
          <Route path="/WhyChooseUs" element={<WhyChooseUs />} />
          <Route path="/CoursePortal" element={<CoursePortal />} />
          <Route path="/Careers" element={<Careers />} />
          <Route path="/ContactLondon" element={<ContactLondon />} />
          <Route path="/ContactGhaziabad" element={<ContactGhaziabad />} />
          <Route path="/ContactNoida" element={<ContactNoida />} />
          <Route path="/ContactDelhi" element={<ContactDelhi />} />
          <Route path="/Scholarships" element={<Scholarships />} />
          <Route path="/ItalyDestination" element={<ItalyDestination />} />
          <Route path="/JapanDestination" element={<JapanDestination />} />
          <Route path="/NZDestination" element={<NZDestination />} />
          <Route path="/UKDestination" element={<UKDestination />} />
          <Route path="/DubaiDestination" element={<DubaiDestination />} />
          <Route path="/GermanyDestination" element={<GermanyDestination />} />
          <Route path="/CanadaDestination" element={<CanadaDestination />} />
          <Route path="/AustraliaDestination" element={<AustraliaDestination />} />
          <Route path="/PreDeparture" element={<PreDeparture />} />
          <Route path="/ShortlistUniversities" element={<ShortlistUniversities />} />
          <Route path="/courseAdvice" element={<CourseAdvice />} />
          <Route path="/visaAssistance" element={<VisaAssistance />} />
          {/* <Route path="/ourteam" element={<OurTeam />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/MissionVision" element={<MissionVision />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/companyprofile" element={<CompanyProfile />} />
          <Route path="/ValuesGrid" element={<ValuesGrid />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/universitypartner" element={<UniversityPartners />} />
          <Route path="/Certificate" element={<Certificate />} />
          <Route path="/upcomingevents" element={<UpcomingEvents />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/gallary" element={<VideoGallery />} />
          <Route path="/termsandconditions" element={<TermsConditions />} />
          <Route path="/CompanyHistory" element={<CompanyHistory />} />
          <Route path="/Accrediations" element={<Accreditations />} />
          <Route path="/SocialResponsibility" element={<SocialResponsibility />} />
          <Route path="/studentdashbaord" element={<StudentDashbaord />} />
          {/* EduAdmin CRM + Student Portal — mounted at /portal */}
          <Route path="/portal/*" element={<PortalApp />} />
          <Route path="/consultationform" element={<ConsultationForm />} />
          <Route path="/consultations" element={<ConsultationsList />} />
          <Route path="/loansection" element={<LoanProcessSection />} />
          <Route path="ielts" element={<Ielts />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default AppRoutes;
