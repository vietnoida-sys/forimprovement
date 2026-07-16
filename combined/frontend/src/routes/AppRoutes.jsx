import {Routes, Route } from "react-router-dom";
import PortalApp from "../portal/PortalApp";
import Dashboard from "../pages/Dashboard";
import ContactUs from "../pages/ContactUs";
import CompanyProfile from "../pages/CompanyProfile";
import MissionVision from "../pages/MissionVision";
import ValuesGrid from "../pages/ValuesGrid";
import OurTeam from "../pages/OurTeam";
import Feedback from "../pages/Feedback"
import VisaAssistance from "../pages/VisaAssistance";
import CourseAdvice from "../pages/CourseAdvice";
import ShortlistUniversities from "../pages/ShortlistUniversities";
import PreDeparture from "../pages/PreDeparture";
import AustraliaDestination from "../pages/AustraliaDestination";
import CanadaDestination from "../pages/CanadaDestination";
import GermanyDestination from "../pages/GermanyDestination";
import DubaiDestination from "../pages/DubaiDestination";
import UKDestination from "../pages/UKDestination";
import NZDestination from "../pages/NZDestination";
import JapanDestination from "../pages/JapanDestination";
import ItalyDestination from "../pages/ItalyDestination";
import Scholarships from "../pages/Scholarships";
import ContactDelhi from "../pages/branches/ContactDelhi";
import ContactNoida from "../pages/branches/ContactNoida";
import ContactGhaziabad from "../pages/branches/ContactGhaziabad";
import ContactLondon from "../pages/branches/ContactLondon";
import Careers from "../pages/Careers";
import CoursePortal from "../pages/CoursePortal";
import UniversityPartners from "../pages/Universitypartner";
import Certificate from "../pages/Certificate";
import WhyChooseUs from "../pages/Whychooseus";
import Infrastructure from "../pages/Infrastructure";
import OurServices from "../pages/Ourservices";
import UpcomingEvents from "../pages/UpcomingEvents";
import OurPresence from "../pages/OurPresence";

import Seminar from "../pages/Seminar";
import TermsConditions from "../pages/TermsConditions";
import EducationFair from '../pages/EducationFair';
import VideoGallery from "../pages/VideoGallery";



import Accreditations from "../pages/Accreditations";
import CompanyHistory from "../pages/CompanyHistory";
import SocialResponsibility from "../pages/Socialresponsibility";

import ComparisonPage from "../pages/CompareUniversity";
import Abroadcostcalculator from "../pages/Abroadcostcalculator";
import StudentDashbaord from "../pages/StudentDashbaord";
import { AuthProvider, useAuth } from "../portal/context/AuthContext";
import ConsultationForm from "../pages/Consultationform";
import ConsultationsList from "../portal/pages/consultation";

function AppRoutes() {
  return (
   
    <AuthProvider>
      <Routes>
          
        <Route path="/Abroadcostcalculator" element={<Abroadcostcalculator />} /> 
         <Route path="/CompareUniversity" element={<ComparisonPage />} />
        <Route path="/EducationFair" element={<EducationFair/>} />
          <Route path = "/OurPresence" element={<OurPresence />} />
          <Route path = "/OurServices" element={<OurServices />} />
        <Route path = "/Infrastructure" element={<Infrastructure />} />
         <Route path = "/WhyChooseUs" element={<WhyChooseUs />} />
         <Route path = "/CoursePortal" element={<CoursePortal />} />
       <Route path = "/Careers" element={<Careers />} />
        <Route path = "/ContactLondon" element={<ContactLondon />} />
         <Route path = "/ContactGhaziabad" element={<ContactGhaziabad />} />
         <Route path = "/ContactNoida" element={<ContactNoida />} />
         <Route path = "/ContactDelhi" element={<ContactDelhi />} />
         <Route path = "/Scholarships" element={<Scholarships  />} />
        <Route path = "/ItalyDestination" element={<ItalyDestination  />} />
          <Route path = "/JapanDestination" element={<JapanDestination  />} />
          <Route path = "/NZDestination" element={<NZDestination  />} />
          <Route path = "/UKDestination" element={<UKDestination />} />
        <Route path = "/DubaiDestination" element={<DubaiDestination />} />
        <Route path = "/GermanyDestination" element={<GermanyDestination />} />
        <Route path = "/CanadaDestination" element={<CanadaDestination />} />
        <Route path = "/AustraliaDestination" element={<AustraliaDestination />} />
          <Route path="/PreDeparture" element={<PreDeparture />} />
         <Route path="/ShortlistUniversities" element={<ShortlistUniversities />} />
         <Route path="/courseAdvice" element={<CourseAdvice />} />
        <Route path="/visaAssistance" element={<VisaAssistance />} />
     {  /* <Route path = "/ourteam" element = {<OurTeam />} />  */ }
        <Route path="/" element={<Dashboard />} />
        <Route path="/MissionVision" element={<MissionVision />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/companyprofile" element={<CompanyProfile/>} />
        <Route path="/ValuesGrid" element={<ValuesGrid/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/universitypartner" element={<UniversityPartners/>} />
        <Route path="/Certificate" element={<Certificate/>} />
        <Route path="/upcomingevents" element={<UpcomingEvents/>} />
        <Route path="/seminar" element={<Seminar/>} />
        <Route path="/gallary" element={<VideoGallery/>} />
        <Route path="/termsandconditions" element={<TermsConditions/>} />
          <Route path="/CompanyHistory" element={<CompanyHistory/>} />
      
         <Route path="/Accrediations" element={<Accreditations/>} />
         <Route path="/SocialResponsibility" element={<SocialResponsibility/>} />
          <Route path="/studentdashbaord" element={<StudentDashbaord/>} />
          {/* EduAdmin CRM + Student Portal — mounted at /portal */}
          <Route path="/portal/*" element={<PortalApp />} />
          <Route path="/consultationform"  element={<ConsultationForm />} />
          <Route path="/consultations" element={<ConsultationsList />} />
         
      </Routes>
        </AuthProvider>
   
  );
}

export default AppRoutes;