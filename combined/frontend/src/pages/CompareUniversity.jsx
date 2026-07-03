import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaClipboardList,
  FaHistory,
  FaEye,
  FaGem,
  FaThumbsUp,
  FaTrophy,
  FaUsers,
  FaBuilding,
  FaAward,
  FaGlobe,
  FaHeart,
  FaImages,
  FaBullseye,
  FaLightbulb,
  FaCogs,
  FaBriefcase,
  FaHeadphones,
} from "react-icons/fa";
import './CompareUniversity.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaWhatsapp } from "react-icons/fa";

// ─────────────────────────────────────────────
// COMPLETE INITIAL COURSES DATA (ALL 70+ ITEMS)
// ─────────────────────────────────────────────
const initialCourses = [
  {
    id: 'GER001',
    title: 'Bachelor in Business & Social Sciences',
    university: 'Freie Universität Berlin',
    intake: 'April, October',
    tuitionFee: 500,
    faculty: 'Business',
    campuses: ['Berlin'],
    level: 'Bachelor',
    duration: '36 Months',
    ielts: '6.5',
    country: 'Germany',
    link: 'https://www.fu-berlin.de/en/studium/studienangebot/index.html',
  },
  {
    id: 'GER002',
    title: 'Bachelor in Engineering',
    university: 'RWTH Aachen University',
    intake: 'April, October',
    tuitionFee: 700,
    faculty: 'Engineering',
    campuses: ['Aachen'],
    level: 'Bachelor',
    duration: '36 - 48 Months',
    ielts: '6.5',
    country: 'Germany',
    link: 'https://www.rwth-aachen.de/cms/root/studium/vor-dem-studium/studiengaenge/~b/ingenieurwissenschaften/',
  },
  {
    id: 'UK001',
    title: 'Bachelor in Business & Computing',
    university: 'University of Sunderland',
    intake: 'January, September',
    tuitionFee: 16000,
    faculty: 'Business',
    campuses: ['Sunderland'],
    level: 'Bachelor',
    duration: '36 Months',
    ielts: '6.0',
    country: 'United Kingdom',
    link: 'https://www.sunderland.ac.uk/study/business/',
  },
  {
    id: 'UK002',
    title: 'Diploma in Business & Engineering',
    university: 'University of Bolton',
    intake: 'January, September',
    tuitionFee: 16500,
    faculty: 'Engineering',
    campuses: ['Bolton'],
    level: 'Diploma',
    duration: '24 Months',
    ielts: '6.0',
    country: 'United Kingdom',
    link: 'https://www.bolton.ac.uk/courses/',
  },
  {
    id: 'CAN001',
    title: 'Bachelor in Business & IT',
    university: 'Cape Breton University',
    intake: 'January, May, September',
    tuitionFee: 22000,
    faculty: 'IT',
    campuses: ['Nova Scotia'],
    level: 'Bachelor',
    duration: '48 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://www.cbu.ca/academics/programs/',
  },
  {
    id: 'CAN002',
    title: 'Associate Degree in Business',
    university: 'University Canada West',
    intake: 'Multiple',
    tuitionFee: 25000,
    faculty: 'Business',
    campuses: ['British Columbia'],
    level: 'Associate Degree',
    duration: '24 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://www.ucanwest.ca/programs/',
  },
  {
    id: 'AUS001',
    title: 'Bachelor in IT & Business',
    university: 'Federation University Australia',
    intake: 'February, July',
    tuitionFee: 30000,
    faculty: 'IT',
    campuses: ['Victoria'],
    level: 'Bachelor',
    duration: '36 - 48 Months',
    ielts: '6.0',
    country: 'Australia',
    link: 'https://federation.edu.au/courses',
  },
  {
    id: 'AUS002',
    title: 'Certificate IV in IT',
    university: 'Central Queensland University',
    intake: 'February, July, November',
    tuitionFee: 32000,
    faculty: 'IT',
    campuses: ['Queensland'],
    level: 'Certificate IV',
    duration: '12 Months',
    ielts: '6.0',
    country: 'Australia',
    link: 'https://www.cqu.edu.au/courses',
  },
  {
    id: 'NZ001',
    title: 'Diploma in IT & Business',
    university: 'Southern Institute of Technology',
    intake: 'February, July',
    tuitionFee: 24000,
    faculty: 'IT',
    campuses: ['Invercargill'],
    level: 'Diploma',
    duration: '24 Months',
    ielts: '6.0',
    country: 'New Zealand',
    link: 'https://www.sit.ac.nz/Courses',
  },
  {
    id: 'RUS001',
    title: 'Bachelor in Medicine',
    university: 'Peoples Friendship University of Russia',
    intake: 'September',
    tuitionFee: 6000,
    faculty: 'Medical',
    campuses: ['Moscow'],
    level: 'Bachelor',
    duration: '60 Months',
    ielts: 'Not Required',
    country: 'Russia',
    link: 'https://www.rudn.ru/en/education',
  },
  {
    id: '078172B',
    title: 'Bachelor of Occupational Therapy',
    university: 'Australian Catholic University',
    intake: 'February',
    tuitionFee: 52544,
    faculty: 'Allied Health',
    campuses: ['Bel', 'Bris', 'Can', 'Mel', 'North Syd'],
    level: 'Bachelor',
    duration: '36 - 48 Months',
    ielts: '7',
    country: 'Australia',
    link: 'https://www.acu.edu.au/course/bachelor-of-occupational-therapy',
  },
  {
    id: '071515G',
    title: 'Bachelor of Physiotherapy',
    university: 'Australian Catholic University',
    intake: 'February',
    tuitionFee: 52544,
    faculty: 'Allied Health',
    campuses: ['Bal', 'Bris', 'North Syd'],
    level: 'Bachelor',
    duration: '36 - 48 Months',
    ielts: '7',
    country: 'Australia',
    link: 'https://www.acu.edu.au/course/bachelor-of-physiotherapy',
  },
  {
    id: '084790C',
    title: 'Bachelor of Social Work',
    university: 'Australian Catholic University',
    intake: 'February',
    tuitionFee: 32392,
    faculty: 'Allied Health',
    campuses: ['Can', 'str'],
    level: 'Bachelor',
    duration: '36 - 48 Months',
    ielts: '7',
    country: 'Australia',
    link: 'https://www.acu.edu.au/course/bachelor-of-social-work',
  },
  {
    id: '078174M',
    title: 'Bachelor of Speech Pathology',
    university: 'Australian Catholic University',
    intake: 'February',
    tuitionFee: 43785,
    faculty: 'Allied Health',
    campuses: ['Bris', 'Mel', 'North Syd'],
    level: 'Bachelor',
    duration: '36 - 48 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://www.acu.edu.au/course/bachelor-of-speech-pathology',
  },
  {
    id: '097207E',
    title: 'Master of Leadership and Management in Health Care',
    university: 'Australian Catholic University',
    intake: 'January',
    tuitionFee: 32688,
    faculty: 'Allied Health',
    campuses: ['North Syd'],
    level: 'Master (coursework)',
    duration: '12 - 24 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://www.acu.edu.au/course/master-of-leadership-and-management-in-health-care',
  },
  {
    id: 'B001',
    title: 'Bachelor of Nursing',
    university: 'Deakin University',
    intake: 'February, July',
    tuitionFee: 36000,
    faculty: 'Health',
    campuses: ['Melbourne', 'Geelong'],
    level: 'Bachelor',
    duration: '36 Months',
    ielts: '7',
    country: 'Australia',
    link: 'https://www.deakin.edu.au/course/bachelor-nursing',
  },
  {
    id: 'B002',
    title: 'Bachelor of Information Technology',
    university: 'University of Technology Sydney',
    intake: 'February, July',
    tuitionFee: 42000,
    faculty: 'IT',
    campuses: ['Sydney'],
    level: 'Bachelor',
    duration: '36 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://www.uts.edu.au/study/find-a-course/bachelor-information-technology',
  },
  {
    id: 'B003',
    title: 'Bachelor of Business',
    university: 'Griffith University',
    intake: 'February, July, November',
    tuitionFee: 33000,
    faculty: 'Business',
    campuses: ['Gold Coast', 'Brisbane'],
    level: 'Bachelor',
    duration: '36 Months',
    ielts: '6',
    country: 'Australia',
    link: 'https://www.griffith.edu.au/business-government/bachelor-business',
  },
  {
    id: 'B004',
    title: 'Bachelor of Engineering (Civil)',
    university: 'University of Adelaide',
    intake: 'February, July',
    tuitionFee: 45000,
    faculty: 'Engineering',
    campuses: ['Adelaide'],
    level: 'Bachelor',
    duration: '48 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://www.adelaide.edu.au/degree-finder/beng_bengciv.html',
  },
  {
    id: 'D001',
    title: 'Diploma of Business',
    university: 'La Trobe College Australia',
    intake: 'February, June, October',
    tuitionFee: 22000,
    faculty: 'Business',
    campuses: ['Melbourne'],
    level: 'Diploma',
    duration: '12 Months',
    ielts: '5.5',
    country: 'Australia',
    link: 'https://www.latrobecollegeaustralia.edu.au/courses',
  },
  {
    id: 'D002',
    title: 'Diploma of Engineering',
    university: 'Monash College',
    intake: 'February, July',
    tuitionFee: 30000,
    faculty: 'Engineering',
    campuses: ['Melbourne'],
    level: 'Diploma',
    duration: '1 - 12 Months',
    ielts: '6',
    country: 'Australia',
    link: 'https://www.monashcollege.edu.au/courses',
  },
  {
    id: 'D003',
    title: 'Diploma of Hospitality Management',
    university: 'William Angliss Institute',
    intake: 'February, July',
    tuitionFee: 18000,
    faculty: 'Hospitality',
    campuses: ['Melbourne'],
    level: 'Diploma',
    duration: '12 - 18 Months',
    ielts: '5.5',
    country: 'Australia',
    link: 'https://www.angliss.edu.au/courses/',
  },
  {
    id: 'M001',
    title: 'Master of Business Administration (MBA)',
    university: 'University of Sydney',
    intake: 'February, August',
    tuitionFee: 60000,
    faculty: 'Business',
    campuses: ['Sydney'],
    level: 'Master (coursework)',
    duration: '18 Months',
    ielts: '7',
    country: 'Australia',
    link: 'https://www.sydney.edu.au/courses/courses/pc/master-of-business-administration.html',
  },
  {
    id: 'M002',
    title: 'Master of Cyber Security',
    university: 'RMIT University',
    intake: 'February, July',
    tuitionFee: 47000,
    faculty: 'IT',
    campuses: ['Melbourne'],
    level: 'Master (coursework)',
    duration: '24 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://www.rmit.edu.au/study-with-us/levels-of-study/postgraduate-study/masters/mc264',
  },
  {
    id: 'M003',
    title: 'Master of Public Health',
    university: 'University of Queensland',
    intake: 'February, July',
    tuitionFee: 42000,
    faculty: 'Health',
    campuses: ['Brisbane'],
    level: 'Master (coursework)',
    duration: '24 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://study.uq.edu.au/study-options/programs/master-public-health-5664',
  },
  {
    id: 'AD001',
    title: 'Associate Degree in IT',
    university: 'University of Canberra',
    intake: 'February, July',
    tuitionFee: 26000,
    faculty: 'IT',
    campuses: ['Canberra'],
    level: 'Associate Degree',
    duration: '12 - 24 Months',
    ielts: '6',
    country: 'Australia',
    link: 'https://www.canberra.edu.au/courses',
  },
  {
    id: 'AD002',
    title: 'Associate Degree in Business',
    university: 'Swinburne University',
    intake: 'February, July',
    tuitionFee: 27000,
    faculty: 'Business',
    campuses: ['Melbourne'],
    level: 'Associate Degree',
    duration: '1 - 12 Months',
    ielts: '6',
    country: 'Australia',
    link: 'https://www.swinburne.edu.au/courses/',
  },
  {
    id: 'CIV001',
    title: 'Certificate IV in Kitchen Management',
    university: 'TAFE Queensland',
    intake: 'January, April, July',
    tuitionFee: 15000,
    faculty: 'Hospitality',
    campuses: ['Brisbane'],
    level: 'Certificate IV',
    duration: '1 - 12 Months',
    ielts: '5.5',
    country: 'Australia',
    link: 'https://tafeqld.edu.au/courses/industries/information-technology',
  },
  {
    id: 'CIV002',
    title: 'Certificate IV in Business',
    university: 'TAFE NSW',
    intake: 'February, July',
    tuitionFee: 13000,
    faculty: 'Business',
    campuses: ['Sydney'],
    level: 'Certificate IV',
    duration: '1 - 12 Months',
    ielts: '5.5',
    country: 'Australia',
    link: 'https://www.tafensw.edu.au/courses',
  },
  {
    id: 'C403',
    title: 'Certificate IV in Marketing and Communication',
    university: 'RMIT University',
    intake: 'February, July',
    tuitionFee: 15000,
    faculty: 'Marketing',
    campuses: ['Melbourne'],
    level: 'Certificate IV',
    duration: '1 - 12 Months',
    ielts: '5.5',
    country: 'Australia',
    link: 'https://www.rmit.edu.au/courses',
  },
  {
    id: 'C404',
    title: 'Certificate IV in Hospitality',
    university: 'William Angliss Institute',
    intake: 'February, July',
    tuitionFee: 13500,
    faculty: 'Hospitality',
    campuses: ['Melbourne'],
    level: 'Certificate IV',
    duration: '1 - 12 Months',
    ielts: '5.5',
    country: 'Australia',
    link: 'https://www.angliss.edu.au/courses/',
  },
  {
    id: 'C405',
    title: 'Certificate IV in Accounting and Bookkeeping',
    university: 'Victoria University',
    intake: 'February, July',
    tuitionFee: 14500,
    faculty: 'Accounting',
    campuses: ['Melbourne'],
    level: 'Certificate IV',
    duration: '1 - 12 Months',
    ielts: '5.5',
    country: 'Australia',
    link: 'https://www.vu.edu.au/courses',
  },
  // ── Canada ──
  {
    id: 'CB101',
    title: 'Bachelor of Computer Science',
    university: 'University of Toronto',
    intake: 'September, January',
    tuitionFee: 60000,
    faculty: 'IT',
    campuses: ['Toronto'],
    level: 'Bachelor',
    duration: 'Above 48 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://web.cs.toronto.edu/undergraduate/programs',
  },
  {
    id: 'CB102',
    title: 'Bachelor of Business Administration',
    university: 'York University',
    intake: 'September, January',
    tuitionFee: 55000,
    faculty: 'Business',
    campuses: ['Toronto'],
    level: 'Bachelor',
    duration: '48 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://schulich.yorku.ca/programs/bba/',
  },
  {
    id: 'CB103',
    title: 'Bachelor of Engineering',
    university: 'University of British Columbia',
    intake: 'September',
    tuitionFee: 58000,
    faculty: 'Engineering',
    campuses: ['Vancouver'],
    level: 'Bachelor',
    duration: '48 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://engineering.ubc.ca/programs',
  },
  {
    id: 'CB104',
    title: 'Bachelor of Nursing',
    university: 'McMaster University',
    intake: 'September',
    tuitionFee: 52000,
    faculty: 'Health',
    campuses: ['Hamilton'],
    level: 'Bachelor',
    duration: '48 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://nursing.mcmaster.ca/programs/undergraduate',
  },
  {
    id: 'CB105',
    title: 'Bachelor of Data Science',
    university: 'University of Waterloo',
    intake: 'September, January',
    tuitionFee: 61000,
    faculty: 'Data Science',
    campuses: ['Waterloo'],
    level: 'Bachelor',
    duration: '48 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://uwaterloo.ca/future-students/programs/data-science',
  },
  {
    id: 'CD101',
    title: 'Diploma in Business Administration',
    university: 'Seneca College',
    intake: 'January, May, September',
    tuitionFee: 17000,
    faculty: 'Business',
    campuses: ['Toronto'],
    level: 'Diploma',
    duration: '24 Months',
    ielts: '6',
    country: 'Canada',
    link: 'https://www.senecapolytechnic.ca/programs/fulltime/BAA.html',
  },
  {
    id: 'CD102',
    title: 'Diploma in Computer Programming',
    university: 'George Brown College',
    intake: 'January, May, September',
    tuitionFee: 18000,
    faculty: 'IT',
    campuses: ['Toronto'],
    level: 'Diploma',
    duration: '24 Months',
    ielts: '6',
    country: 'Canada',
    link: 'https://www.georgebrown.ca/programs/computer-programmer-program-t177',
  },
  {
    id: 'CD103',
    title: 'Diploma in Engineering Technology',
    university: 'Centennial College',
    intake: 'January, September',
    tuitionFee: 17500,
    faculty: 'Engineering',
    campuses: ['Toronto'],
    level: 'Diploma',
    duration: '24 Months',
    ielts: '6',
    country: 'Canada',
    link: 'https://www.centennialcollege.ca/programs-courses/full-time/engineering-technology/',
  },
  {
    id: 'CD104',
    title: 'Diploma in Hospitality Management',
    university: 'Fanshawe College',
    intake: 'January, May, September',
    tuitionFee: 16500,
    faculty: 'Hospitality',
    campuses: ['London'],
    level: 'Diploma',
    duration: '24 Months',
    ielts: '6',
    country: 'Canada',
    link: 'https://www.fanshawec.ca/programs-and-courses/program/hosp1-hospitality-management/next-year',
  },
  {
    id: 'CD105',
    title: 'Diploma in Accounting',
    university: 'Humber College',
    intake: 'January, May, September',
    tuitionFee: 18000,
    faculty: 'Accounting',
    campuses: ['Toronto'],
    level: 'Diploma',
    duration: '24 Months',
    ielts: '6',
    country: 'Canada',
    link: 'https://humber.ca/programs/accounting/',
  },
  {
    id: 'M301',
    title: 'Master of Business Administration',
    university: 'University of Toronto',
    intake: 'January, September',
    tuitionFee: 45000,
    faculty: 'Business',
    campuses: ['Toronto'],
    level: 'Master (coursework)',
    duration: '24 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://www.rotman.utoronto.ca/Degrees/MBAPrograms',
  },
  {
    id: 'M302',
    title: 'Master of Data Science',
    university: 'University of British Columbia',
    intake: 'September',
    tuitionFee: 42000,
    faculty: 'IT',
    campuses: ['Vancouver'],
    level: 'Master (coursework)',
    duration: '18 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://masterdatascience.ubc.ca/',
  },
  {
    id: 'M303',
    title: 'Master of Engineering',
    university: 'University of Alberta',
    intake: 'January, September',
    tuitionFee: 40000,
    faculty: 'Engineering',
    campuses: ['Edmonton'],
    level: 'Master (coursework)',
    duration: '24 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://www.ualberta.ca/engineering/graduate-studies/index.html',
  },
  {
    id: 'M304',
    title: 'Master of Public Health',
    university: 'University of Ottawa',
    intake: 'September',
    tuitionFee: 38000,
    faculty: 'Health',
    campuses: ['Ottawa'],
    level: 'Master (coursework)',
    duration: '24 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://www.uottawa.ca/faculty-medicine/public-health/programs',
  },
  {
    id: 'M305',
    title: 'Master of Finance',
    university: 'York University',
    intake: 'January, September',
    tuitionFee: 47000,
    faculty: 'Finance',
    campuses: ['Toronto'],
    level: 'Master (coursework)',
    duration: '18 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://schulich.yorku.ca/programs/mf/',
  },
  {
    id: 'A401',
    title: 'Associate of Arts',
    university: 'Douglas College',
    intake: 'January, May, September',
    tuitionFee: 18000,
    faculty: 'Arts',
    campuses: ['New Westminster'],
    level: 'Associate Degree',
    duration: '24 Months',
    ielts: '6',
    country: 'Canada',
    link: 'https://www.douglascollege.ca/programs-courses/programs/arts',
  },
  {
    id: 'A402',
    title: 'Associate of Science',
    university: 'Langara College',
    intake: 'January, September',
    tuitionFee: 17500,
    faculty: 'Science',
    campuses: ['Vancouver'],
    level: 'Associate Degree',
    duration: '24 Months',
    ielts: '6',
    country: 'Canada',
    link: 'https://langara.ca/programs-and-courses/programs/science/',
  },
  {
    id: 'A403',
    title: 'Associate of Business',
    university: 'Capilano University',
    intake: 'January, September',
    tuitionFee: 17000,
    faculty: 'Business',
    campuses: ['North Vancouver'],
    level: 'Associate Degree',
    duration: '24 Months',
    ielts: '6',
    country: 'Canada',
    link: 'https://www.capilanou.ca/programs--courses/',
  },
  {
    id: 'A404',
    title: 'Associate of Computer Science',
    university: 'Columbia College',
    intake: 'January, May, September',
    tuitionFee: 18500,
    faculty: 'IT',
    campuses: ['Vancouver'],
    level: 'Associate Degree',
    duration: '24 Months',
    ielts: '6',
    country: 'Canada',
    link: 'https://www.columbiacollege.ca/programs/',
  },
  {
    id: 'A405',
    title: 'Associate of Environmental Studies',
    university: 'Camosun College',
    intake: 'September',
    tuitionFee: 16000,
    faculty: 'Environment',
    campuses: ['Victoria'],
    level: 'Associate Degree',
    duration: '24 Months',
    ielts: '6',
    country: 'Canada',
    link: 'https://camosun.ca/programs-courses',
  },
  {
    id: 'C501',
    title: 'Certificate IV in Business Administration',
    university: 'Seneca College',
    intake: 'January, May, September',
    tuitionFee: 14000,
    faculty: 'Business',
    campuses: ['Toronto'],
    level: 'Certificate IV',
    duration: '12 Months',
    ielts: '5.5',
    country: 'Canada',
    link: 'https://www.senecapolytechnic.ca/programs/fulltime/BAA.html',
  },
  {
    id: 'C502',
    title: 'Certificate IV in Information Technology',
    university: 'George Brown College',
    intake: 'January, September',
    tuitionFee: 15000,
    faculty: 'IT',
    campuses: ['Toronto'],
    level: 'Certificate IV',
    duration: '12 Months',
    ielts: '5.5',
    country: 'Canada',
    link: 'https://www.georgebrown.ca/programs/computer-systems-technology-program-t147',
  },
  {
    id: 'C503',
    title: 'Certificate IV in Accounting',
    university: 'Humber College',
    intake: 'January, May, September',
    tuitionFee: 14500,
    faculty: 'Accounting',
    campuses: ['Toronto'],
    level: 'Certificate IV',
    duration: '12 Months',
    ielts: '5.5',
    country: 'Canada',
    link: 'https://humber.ca/programs/accounting/',
  },
  {
    id: 'C504',
    title: 'Certificate IV in Hospitality',
    university: 'Fanshawe College',
    intake: 'January, September',
    tuitionFee: 13500,
    faculty: 'Hospitality',
    campuses: ['London'],
    level: 'Certificate IV',
    duration: '1 - 12 Months',
    ielts: '5.5',
    country: 'Canada',
    link: 'https://www.fanshawec.ca/programs-and-courses/program/hosp1-hospitality-management/next-year',
  },
  {
    id: 'C505',
    title: 'Diploma in Business Management',
    university: 'Humber College',
    intake: 'January, May, September',
    tuitionFee: 16000,
    faculty: 'Business',
    campuses: ['Toronto'],
    level: 'Diploma',
    duration: '12 - 24 Months',
    ielts: '6.0',
    country: 'Canada',
    link: 'https://humber.ca/programs/business-management/',
  },
  {
    id: 'C506',
    title: 'Bachelor of Computer Science',
    university: 'University of Windsor',
    intake: 'September',
    tuitionFee: 22000,
    faculty: 'IT',
    campuses: ['Windsor'],
    level: 'Bachelor',
    duration: '36 - 48 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://www.uwindsor.ca/science/computerscience/',
  },
  {
    id: 'C507',
    title: 'Master of Data Analytics',
    university: 'Ryerson University',
    intake: 'January, September',
    tuitionFee: 25000,
    faculty: 'Data Science',
    campuses: ['Toronto'],
    level: 'Master (coursework)',
    duration: '12 - 24 Months',
    ielts: '6.5',
    country: 'Canada',
    link: 'https://www.torontomu.ca/graduate/programs/data-science-management/',
  },
  {
    id: 'C508',
    title: 'PhD in Engineering',
    university: 'University of Toronto',
    intake: 'September',
    tuitionFee: 30000,
    faculty: 'Engineering',
    campuses: ['Toronto'],
    level: 'Doctorate',
    duration: 'Above 48 Months',
    ielts: '7.0',
    country: 'Canada',
    link: 'https://engineering.utoronto.ca/graduate/',
  },
  {
    id: 'C701', title: 'Bachelor of Business Administration', university: 'University of Windsor',
    intake: 'January', tuitionFee: 21000, faculty: 'Business', campuses: ['Windsor'],
    level: 'Bachelor', duration: '36 - 48 Months', ielts: '6.5', country: 'Canada',
    link: 'https://www.uwindsor.ca/odette/',
  },
  {
    id: 'C702', title: 'Diploma in Business Management', university: 'Humber College',
    intake: 'February', tuitionFee: 16000, faculty: 'Business', campuses: ['Toronto'],
    level: 'Diploma', duration: '12 - 24 Months', ielts: '6.0', country: 'Canada',
    link: 'https://humber.ca/programs/business-management/',
  },
  {
    id: 'C703', title: 'Master of Information Technology', university: 'Ryerson University',
    intake: 'March', tuitionFee: 25000, faculty: 'IT', campuses: ['Toronto'],
    level: 'Master (coursework)', duration: '12 - 24 Months', ielts: '6.5', country: 'Canada',
    link: 'https://www.torontomu.ca/graduate/programs/',
  },
  {
    id: 'C704', title: 'Associate Degree in Arts', university: 'George Brown College',
    intake: 'April', tuitionFee: 18000, faculty: 'Arts', campuses: ['Toronto'],
    level: 'Associate Degree', duration: '24 - 36 Months', ielts: '6.0', country: 'Canada',
    link: 'https://www.georgebrown.ca/programs',
  },
  {
    id: 'C705', title: 'Certificate IV in Hospitality', university: 'Fanshawe College',
    intake: 'January', tuitionFee: 13500, faculty: 'Hospitality', campuses: ['London'],
    level: 'Certificate IV', duration: '1 - 12 Months', ielts: '5.5', country: 'Canada',
    link: 'https://www.fanshawec.ca/programs-and-courses/program/hosp1-hospitality-management/next-year',
  },
  {
    id: 'C706', title: 'Bachelor of Computer Science', university: 'University of Manitoba',
    intake: 'February', tuitionFee: 22000, faculty: 'IT', campuses: ['Winnipeg'],
    level: 'Bachelor', duration: '36 - 48 Months', ielts: '6.5', country: 'Canada',
    link: 'https://umanitoba.ca/science/computer-science/',
  },
  {
    id: 'C707', title: 'Diploma in Hospitality Management', university: 'Seneca College',
    intake: 'March', tuitionFee: 15500, faculty: 'Hospitality', campuses: ['Toronto'],
    level: 'Diploma', duration: '12 - 24 Months', ielts: '6.0', country: 'Canada',
    link: 'https://www.senecapolytechnic.ca/programs/fulltime/HTM.html',
  },
  {
    id: 'C708', title: 'Master of Data Science', university: 'University of Toronto',
    intake: 'April', tuitionFee: 27000, faculty: 'Data Science', campuses: ['Toronto'],
    level: 'Master (coursework)', duration: '12 - 24 Months', ielts: '6.5', country: 'Canada',
    link: 'https://datasciences.utoronto.ca/',
  },
  {
    id: 'C709', title: 'Associate Degree in Computer Science', university: 'Douglas College',
    intake: 'January', tuitionFee: 17000, faculty: 'IT', campuses: ['Vancouver'],
    level: 'Associate Degree', duration: '24 - 36 Months', ielts: '6.0', country: 'Canada',
    link: 'https://www.douglascollege.ca/programs-courses/programs/computing-science',
  },
  {
    id: 'C710', title: 'Certificate IV in Business', university: 'Centennial College',
    intake: 'February', tuitionFee: 14000, faculty: 'Business', campuses: ['Toronto'],
    level: 'Certificate IV', duration: '1 - 12 Months', ielts: '5.5', country: 'Canada',
    link: 'https://www.centennialcollege.ca/programs-courses/full-time/business/',
  },
  // ── Germany extended ──
  { id: 'DE01', title: 'Business, Social Sciences Program', university: 'Freie Universität Berlin', intake: 'April, October', tuitionFee: '~500 Semester', faculty: 'Business, Social Sciences', campuses: ['Berlin'], level: 'Degree/Program', duration: 'N/A', ielts: '6.5', country: 'Germany', link: 'https://www.fu-berlin.de/en/studium/studienangebot/index.html' },
  { id: 'DE02', title: 'Science, Business Program', university: 'University of Bonn', intake: 'April, October', tuitionFee: '300–700', faculty: 'Science, Business', campuses: ['Bonn'], level: 'Degree/Program', duration: 'N/A', ielts: '6.5', country: 'Germany', link: 'https://www.uni-bonn.de/en/studying/study-programs' },
  { id: 'DE03', title: 'Engineering Program', university: 'RWTH Aachen University', intake: 'April, October', tuitionFee: '300–700', faculty: 'Engineering', campuses: ['Aachen'], level: 'Degree/Program', duration: 'N/A', ielts: '6.5', country: 'Germany', link: 'https://www.rwth-aachen.de/cms/root/studium/vor-dem-studium/studiengaenge/' },
  { id: 'DE04', title: 'Engineering, IT Program', university: 'Technical University of Chemnitz', intake: 'April, October', tuitionFee: '300–600', faculty: 'Engineering, IT', campuses: ['Chemnitz'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'Germany', link: 'https://www.tu-chemnitz.de/studium/studienangebot.php' },
  { id: 'DE05', title: 'Engineering, Management Program', university: 'FAU Erlangen-Nürnberg', intake: 'April, October', tuitionFee: '150–300', faculty: 'Engineering, Management', campuses: ['Erlangen'], level: 'Degree/Program', duration: 'N/A', ielts: '6.5', country: 'Germany', link: 'https://www.fau.eu/education/academic-programmes/' },
  // ── UK extended ──
  { id: 'UK01', title: 'Business, Computing Program', university: 'University of Sunderland', intake: 'January, September', tuitionFee: '13000–16000', faculty: 'Business, Computing', campuses: ['Sunderland'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'United Kingdom', link: 'https://www.sunderland.ac.uk/study/' },
  { id: 'UK02', title: 'Business, Engineering Program', university: 'University of Bolton', intake: 'January, September', tuitionFee: '13000–16500', faculty: 'Business, Engineering', campuses: ['Bolton'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'United Kingdom', link: 'https://www.bolton.ac.uk/courses/' },
  { id: 'UK03', title: 'Health, Business Program', university: 'University of Cumbria', intake: 'January, September', tuitionFee: '14000–17000', faculty: 'Health, Business', campuses: ['Carlisle'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'United Kingdom', link: 'https://www.cumbria.ac.uk/study/courses/' },
  { id: 'UK04', title: 'Business, Media Program', university: 'Leeds Trinity University', intake: 'January, September', tuitionFee: '13500–16500', faculty: 'Business, Media', campuses: ['Leeds'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'United Kingdom', link: 'https://www.leedstrinity.ac.uk/courses/' },
  { id: 'UK05', title: 'Business, Computing Program', university: 'University of Suffolk', intake: 'January, September', tuitionFee: '15000–18000', faculty: 'Business, Computing', campuses: ['Ipswich'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'United Kingdom', link: 'https://www.uos.ac.uk/courses' },
  // ── Canada extended ──
  { id: 'CA01', title: 'Business, IT Program', university: 'Cape Breton University', intake: 'January, May, September', tuitionFee: '18000–22000', faculty: 'Business, IT', campuses: ['Nova Scotia'], level: 'Degree/Program', duration: 'N/A', ielts: '6.5', country: 'Canada', link: 'https://www.cbu.ca/academics/programs/' },
  { id: 'CA02', title: 'MBA, Commerce Program', university: 'University Canada West', intake: 'Multiple', tuitionFee: '20000–25000', faculty: 'MBA, Commerce', campuses: ['British Columbia'], level: 'Degree/Program', duration: 'N/A', ielts: '6.5', country: 'Canada', link: 'https://www.ucanwest.ca/programs/' },
  { id: 'CA03', title: 'Engineering Program', university: 'Memorial University of Newfoundland', intake: 'January, September', tuitionFee: '12000–20000', faculty: 'Engineering', campuses: ['Newfoundland'], level: 'Degree/Program', duration: 'N/A', ielts: '6.5', country: 'Canada', link: 'https://www.mun.ca/engineering/' },
  { id: 'CA04', title: 'Business Program', university: 'University of Prince Edward Island', intake: 'January, September', tuitionFee: '15000–22000', faculty: 'Business', campuses: ['PEI'], level: 'Degree/Program', duration: 'N/A', ielts: '6.5', country: 'Canada', link: 'https://www.upei.ca/programs' },
  { id: 'CA05', title: 'Engineering, Business Program', university: 'University of Regina', intake: 'January, September', tuitionFee: '18000–24000', faculty: 'Engineering, Business', campuses: ['Saskatchewan'], level: 'Degree/Program', duration: 'N/A', ielts: '6.5', country: 'Canada', link: 'https://www.uregina.ca/academics/programs/' },
  // ── Australia extended ──
  { id: 'AU01', title: 'IT, Business Program', university: 'Federation University Australia', intake: 'February, July', tuitionFee: '24000–30000', faculty: 'IT, Business', campuses: ['Victoria'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'Australia', link: 'https://federation.edu.au/courses' },
  { id: 'AU02', title: 'Nursing, Business Program', university: 'Central Queensland University', intake: 'February, July, November', tuitionFee: '25000–32000', faculty: 'Nursing, Business', campuses: ['Queensland'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'Australia', link: 'https://www.cqu.edu.au/courses' },
  { id: 'AU03', title: 'Hospitality, Business Program', university: 'Southern Cross University', intake: 'February, July', tuitionFee: '25000–31000', faculty: 'Hospitality, Business', campuses: ['NSW'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'Australia', link: 'https://www.scu.edu.au/study-at-scu/courses/' },
  { id: 'AU04', title: 'Engineering, IT Program', university: 'University of Southern Queensland', intake: 'February, July', tuitionFee: '26000–32000', faculty: 'Engineering, IT', campuses: ['Queensland'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'Australia', link: 'https://www.unisq.edu.au/study/courses' },
  { id: 'AU05', title: 'Computing, Business Program', university: 'Edith Cowan University', intake: 'February, July', tuitionFee: '28000–35000', faculty: 'Computing, Business', campuses: ['Perth'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'Australia', link: 'https://www.ecu.edu.au/degrees' },
  // ── New Zealand extended ──
  { id: 'NZ01', title: 'IT, Business Program', university: 'Southern Institute of Technology', intake: 'February, July', tuitionFee: '18000–24000', faculty: 'IT, Business', campuses: ['Invercargill'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'New Zealand', link: 'https://www.sit.ac.nz/Courses' },
  { id: 'NZ02', title: 'Engineering, IT Program', university: 'Unitec Institute of Technology', intake: 'February, July', tuitionFee: '22000–28000', faculty: 'Engineering, IT', campuses: ['Auckland'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'New Zealand', link: 'https://www.unitec.ac.nz/courses' },
  { id: 'NZ03', title: 'Nursing, Hospitality Program', university: 'Ara Institute of Canterbury', intake: 'February, July', tuitionFee: '21000–28000', faculty: 'Nursing, Hospitality', campuses: ['Christchurch'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'New Zealand', link: 'https://www.ara.ac.nz/study/' },
  { id: 'NZ04', title: 'Applied Management Program', university: 'Otago Polytechnic', intake: 'February, July', tuitionFee: '20000–27000', faculty: 'Applied Management', campuses: ['Dunedin'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'New Zealand', link: 'https://www.op.ac.nz/study/' },
  { id: 'NZ05', title: 'Engineering, Business Program', university: 'Manukau Institute of Technology', intake: 'February, July', tuitionFee: '22000–29000', faculty: 'Engineering, Business', campuses: ['Auckland'], level: 'Degree/Program', duration: 'N/A', ielts: '6.0', country: 'New Zealand', link: 'https://www.manukau.ac.nz/study/' },
  // ── Russia extended ──
  { id: 'RU01', title: 'Medicine, Engineering Program', university: "Peoples' Friendship University of Russia", intake: 'September', tuitionFee: '3500–6000', faculty: 'Medicine, Engineering', campuses: ['Moscow'], level: 'Degree/Program', duration: 'N/A', ielts: 'Not Mandatory', country: 'Russia', link: 'https://www.rudn.ru/en/education' },
  { id: 'RU02', title: 'Medicine, Business Program', university: 'Kazan Federal University', intake: 'September', tuitionFee: '3000–5500', faculty: 'Medicine, Business', campuses: ['Kazan'], level: 'Degree/Program', duration: 'N/A', ielts: 'Not Mandatory', country: 'Russia', link: 'https://kpfu.ru/eng' },
  { id: 'RU03', title: 'Medicine Program', university: 'Belgodrot State University', intake: 'September', tuitionFee: '3000–5500', faculty: 'Medicine', campuses: ['Belgorod'], level: 'Degree/Program', duration: 'N/A', ielts: 'Not Mandatory', country: 'Russia', link: 'https://www.bsu.edu.ru/bsu/' },
  { id: 'RU04', title: 'Engineering, IT Program', university: 'South Ural State University', intake: 'September', tuitionFee: '2500–4500', faculty: 'Engineering, IT', campuses: ['Chelyabinsk'], level: 'Degree/Program', duration: 'N/A', ielts: 'Not Mandatory', country: 'Russia', link: 'https://www.susu.ru/en' },
  { id: 'RU05', title: 'Technology, Business Program', university: 'Far Eastern Federal University', intake: 'September', tuitionFee: '3500–5500', faculty: 'Technology, Business', campuses: ['Vladivostok'], level: 'Degree/Program', duration: 'N/A', ielts: 'Not Mandatory', country: 'Russia', link: 'https://www.dvfu.ru/en/' },
];

// ─────────────────────────────────────────────
// PRE-DEFINED RATING INDICES & STATS FOR DYNAMIC LOOKUP
// ─────────────────────────────────────────────
const countryConfig = {
  'Canada': { flag: '🇨🇦', livingCost: '₹8 Lakhs/Yr', salary: '₹45 LPA', workHours: '24 hrs/week', visaTime: '4-8 Weeks', pr: 'High', scholarships: 'Up to 50%', climate: 'Cold / Snowy', safety: 9.4, rating: 4.8, overall: 9.4, scoreTuition: 85, scoreSalary: 88 },
  'Australia': { flag: '🇦🇺', livingCost: '₹10 Lakhs/Yr', salary: '₹50 LPA', workHours: '48 hrs/fortnight', visaTime: '2-4 Weeks', pr: 'High', scholarships: 'Up to 30%', climate: 'Sunny / Warm', safety: 8.8, rating: 4.7, overall: 9.1, scoreTuition: 75, scoreSalary: 92 },
  'United Kingdom': { flag: '🇬🇧', livingCost: '₹9 Lakhs/Yr', salary: '₹42 LPA', workHours: '20 hrs/week', visaTime: '3 Weeks', pr: 'Moderate', scholarships: 'Commonwealth Funding', climate: 'Rainy / Mild', safety: 8.5, rating: 4.5, overall: 8.8, scoreTuition: 78, scoreSalary: 82 },
  'Germany': { flag: '🇩🇪', livingCost: '₹7 Lakhs/Yr', salary: '₹38 LPA', workHours: '20 hrs/week', visaTime: '6-12 Weeks', pr: 'High', scholarships: 'DAAD Scholarships', climate: 'Moderate / Cold', safety: 9.2, rating: 4.9, overall: 9.5, scoreTuition: 99, scoreSalary: 78 },
  'New Zealand': { flag: '🇳🇿', livingCost: '₹8.5 Lakhs/Yr', salary: '₹40 LPA', workHours: '20 hrs/week', visaTime: '3-5 Weeks', pr: 'High', scholarships: 'Govt Scholarships', climate: 'Temperate / Scenic', safety: 9.3, rating: 4.6, overall: 9.2, scoreTuition: 80, scoreSalary: 84 },
  'Russia': { flag: '🇷🇺', livingCost: '₹4 Lakhs/Yr', salary: '₹25 LPA', workHours: '20 hrs/week', visaTime: '3-4 Weeks', pr: 'Moderate', scholarships: 'State Sponsored', climate: 'Extreme Cold', safety: 8.0, rating: 4.2, overall: 7.9, scoreTuition: 95, scoreSalary: 60 }
};

const universityConfig = {
  'University of Toronto': { ranking: 21, acceptance: '43%', placement: '91%', size: '180 Acres', population: '97,000', scholarships: 'Need-based funds', scoreRanking: 96, rating: 4.8 },
  'University of Melbourne': { ranking: 14, acceptance: '70%', placement: '89%', size: '100 Acres', population: '54,000', scholarships: 'Merit waivers', scoreRanking: 98, rating: 4.7 },
  'Freie Universität Berlin': { ranking: 98, acceptance: '15%', placement: '85%', size: '40 Acres', population: '33,000', scholarships: 'DAAD Supported', scoreRanking: 90, rating: 4.6 },
  'RWTH Aachen University': { ranking: 106, acceptance: '10%', placement: '92%', size: '60 Acres', population: '47,000', scholarships: 'Corporate Funded', scoreRanking: 89, rating: 4.7 },
  'University of Sydney': { ranking: 19, acceptance: '30%', placement: '93%', size: '178 Acres', population: '73,000', scholarships: 'Outstanding Merit', scoreRanking: 97, rating: 4.9 },
  'RMIT University': { ranking: 140, acceptance: '65%', placement: '88%', size: '80 Acres', population: '90,000', scholarships: 'Up to 30% Waiver', scoreRanking: 82, rating: 4.5 },
  'Deakin University': { ranking: 233, acceptance: '75%', placement: '84%', size: '120 Acres', population: '60,000', scholarships: 'Up to 25% Off', scoreRanking: 72, rating: 4.4 },
  'Swinburne University': { ranking: 285, acceptance: '70%', placement: '82%', size: '50 Acres', population: '25,000', scholarships: 'Up to 30% Off', scoreRanking: 68, rating: 4.3 }
};

const CURRENCY_MAP = {
  Australia: 'A$', Canada: 'CA$', 'United Kingdom': '£',
  Germany: '€', 'New Zealand': 'NZ$', Russia: '₽',
};
const getCurrencySymbol = (country) => CURRENCY_MAP[country] || '$';

const parseFeeToNumeric = (fee) => {
  if (typeof fee === 'number') return fee;
  if (!fee) return 0;
  const nums = String(fee).match(/\d+/g);
  if (!nums) return 0;
  return nums.length >= 2
    ? (parseInt(nums[0], 10) + parseInt(nums[1], 10)) / 2
    : parseInt(nums[0], 10);
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
const CompareUniversity = () => {
  const [activeTab, setActiveTab] = useState('universities');
  const [selectedIds, setSelectedIds] = useState(['University of Toronto', 'University of Melbourne']);
  const [searchFilter, setSearchFilter] = useState('');

  const dynamicCountries = useMemo(() => {
    return Object.keys(countryConfig).map(name => ({
      id: name,
      name: name,
      ...countryConfig[name]
    }));
  }, []);

  const dynamicUniversities = useMemo(() => {
    const list = [...new Set(initialCourses.map(c => c.university))].sort();
    return list.map(uni => {
      const uniCourses = initialCourses.filter(c => c.university === uni);
      const country = uniCourses[0]?.country || 'Australia';
      const parsedFees = uniCourses.map(c => parseFeeToNumeric(c.tuitionFee)).filter(f => f > 0);
      const minFee = parsedFees.length > 0 ? Math.min(...parsedFees) : 25000;
      const currency = getCurrencySymbol(country);

      const staticConfig = universityConfig[uni] || {
        ranking: 250 + (uni.length % 50),
        acceptance: '65%',
        placement: '83%',
        size: '75 Acres',
        population: '30,000',
        scholarships: 'Scholarships Available',
        scoreRanking: 70,
        rating: 4.3
      };

      return {
        id: uni,
        name: uni,
        logo: <FaBuilding />,
        country: country,
        tuition: `${currency}${minFee.toLocaleString()}/Yr`,
        avgSalary: `${currency}${(minFee * 1.5).toLocaleString()}`,
        overall: Math.min(9.9, (staticConfig.scoreRanking / 10).toFixed(1)),
        ...staticConfig
      };
    });
  }, []);

  const dynamicCourses = useMemo(() => {
    return initialCourses.map((c) => {
      const tuitionVal = parseFeeToNumeric(c.tuitionFee);
      const currency = getCurrencySymbol(c.country);
      
      const scoreDemand = 70 + (c.title.length % 29);
      const scoreSalary = 75 + (c.title.length % 23);

      return {
        id: c.id,
        name: `${c.title} (${c.id})`,
        university: c.university,
        logo: <FaAward />,
        duration: c.duration,
        tuition: tuitionVal > 1000 ? `${currency}${tuitionVal.toLocaleString()}/Yr` : `${c.tuitionFee} Semester`,
        opportunities: `${c.faculty} Specialist, Consultant`,
        salary: tuitionVal > 1000 ? `${currency}${(tuitionVal * 1.8).toLocaleString()}` : `${currency}45,000`,
        skills: `Core ${c.faculty}, Research, Case Studies`,
        demand: scoreDemand > 85 ? 'Very High' : 'High',
        future: Math.min(9.9, (scoreDemand / 10).toFixed(1)),
        rating: Math.min(5, (scoreDemand / 20).toFixed(1)),
        overall: Math.min(9.9, ((scoreDemand + scoreSalary) / 20).toFixed(1)),
        scoreDemand: scoreDemand,
        scoreSalary: scoreSalary
      };
    });
  }, []);

  const currentDataset = useMemo(() => {
    if (activeTab === 'countries') return dynamicCountries;
    if (activeTab === 'universities') return dynamicUniversities;
    return dynamicCourses;
  }, [activeTab, dynamicCountries, dynamicUniversities, dynamicCourses]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchFilter('');
    if (tab === 'countries') {
      setSelectedIds(['Canada', 'Australia']);
    } else if (tab === 'universities') {
      setSelectedIds(['University of Toronto', 'University of Melbourne']);
    } else {
      setSelectedIds(['GER001', 'UK001']);
    }
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev;
        return prev.filter(x => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectedObjects = useMemo(() => {
    return currentDataset.filter(item => selectedIds.includes(item.id));
  }, [currentDataset, selectedIds]);

  const searchedItems = useMemo(() => {
    return currentDataset.filter(item => 
      item.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [currentDataset, searchFilter]);

  const summaryText = useMemo(() => {
    if (selectedObjects.length < 2) return "Please choose at least 2 cards to formulate comparative analysis.";
    const names = selectedObjects.map(o => o.name);
    if (activeTab === 'countries') {
      return `Comparing ${names.join(' & ')}: Germany delivers exceptional public-fund affordability, while Canada and Australia offer excellent career salaries balanced by high PR opportunity ratings.`;
    }
    if (activeTab === 'universities') {
      return `Among ${names.join(', ')}: Top global rankings favor ${selectedObjects[0].name} (Rank #${selectedObjects[0].ranking}), while placement profiles across standard institutions remain highly competitive.`;
    }
    return `Course pathways offer targeted expertise. Select based on specific syllabus structures, minimum IELTS score thresholds, and intake timelines.`;
  }, [selectedObjects, activeTab]);

  const highlights = useMemo(() => {
    if (selectedObjects.length < 2) return { tuitionWinner: 'N/A', placementWinner: 'N/A' };
    
    let bestFeeItem = selectedObjects[0];
    let bestPerformanceItem = selectedObjects[0];

    selectedObjects.forEach(item => {
      const feeVal = parseFeeToNumeric(item.tuition);
      const bestFeeVal = parseFeeToNumeric(bestFeeItem.tuition);
      if (feeVal > 0 && feeVal < bestFeeVal) {
        bestFeeItem = item;
      }
      
      const perfVal = item.scoreRanking || item.scoreDemand || item.scoreTuition || 0;
      const bestPerfVal = bestPerformanceItem.scoreRanking || bestPerformanceItem.scoreDemand || bestPerformanceItem.scoreTuition || 0;
      if (perfVal > bestPerfVal) {
        bestPerformanceItem = item;
      }
    });

    return {
      tuitionWinner: bestFeeItem.name,
      placementWinner: bestPerformanceItem.name,
    };
  }, [selectedObjects]);

  const renderStars = (rating) => {
    const rounded = Math.round(rating);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  };

  const scrollSlideUp = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="comp-univ-page-wrapper">
      <Navbar />
     
      <div className="comp-univ-page-container">

        {/* ── SPLIT HERO SECTION ── */}
        <motion.section 
          className="comp-univ-hero-section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.div 
            className="comp-univ-hero-content-left"
            variants={itemVariants}
          >
            <span className="comp-univ-badge">
              <FaBuilding style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Live Comparison  
            </span>
            <h1 className="comp-univ-hero-title">
              Master Comparison Dashboard
            </h1>
            <p className="comp-univ-hero-subtitle">
              Compare tuition structures, entrance criteria, visa processing timelines, and starting salaries across our complete 70+ course profiles.
            </p>

            <div className="comp-univ-hero-stats-row">
              <div className="comp-univ-hero-stat-box">
                <strong>70+</strong>
                <span>Programs Loaded</span>
              </div>
              <div className="comp-univ-hero-stat-box">
                <strong>6</strong>
                <span>Major Countries</span>
              </div>
              <div className="comp-univ-hero-stat-box">
                <strong>100%</strong>
                <span>Verified Criteria</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="comp-univ-hero-image-right"
            variants={itemVariants}
          >
            <div className="comp-univ-hero-image-wrapper">
              <img 
                src="https://www.themeadows.com/wp-content/uploads/2024/12/comparison.jpg" 
                alt="University Education Comparison" 
                className="comp-univ-hero-main-img"
              />
              
            </div>
          </motion.div>
        </motion.section>

        {/* ── SELECTION DRAWER ── */}
        <motion.section 
          className="comp-univ-selector-panel" 
          {...scrollSlideUp}
        >
          <div className="comp-univ-tab-container">
            {['countries', 'universities', 'courses'].map((tab) => (
              <button 
                key={tab}
                className={`comp-univ-tab-btn ${activeTab === tab ? 'comp-univ-active' : ''}`} 
                onClick={() => handleTabChange(tab)}
              >
                {tab === 'countries' && (
                  <>
                    <FaGlobe style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Countries
                  </>
                )}
                {tab === 'universities' && (
                  <>
                    <FaBuilding style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Universities
                  </>
                )}
                {tab === 'courses' && (
                  <>
                    <FaClipboardList style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Programs / Courses
                  </>
                )}
              </button>
            ))}
          </div>

          <div className="comp-univ-search-container">
            <input
              type="text"
              placeholder={`Search in our database of ${activeTab}...`}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="comp-univ-search-bar"
            />
          </div>

          <div className="comp-univ-selection-tray">
            <motion.p 
              className="comp-univ-selection-tray-title"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Click items below to toggle them on the board (Selected: {selectedIds.length}):
            </motion.p>
            
            <motion.div 
              className="comp-univ-selection-chip-wrapper"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              key={activeTab}
            >
              <AnimatePresence>
                {searchedItems.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <motion.button
                      key={item.id}
                      variants={itemVariants}
                      layout
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`comp-univ-select-chip ${isSelected ? 'comp-univ-active' : ''}`}
                      onClick={() => toggleSelection(item.id)}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        {item.flag || item.logo}
                      </span>
                      <span>{item.name}</span>
                      <span className="comp-univ-action-indicator">{isSelected ? "✕" : "+"}</span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.section>

        {/* ── INTERACTIVE OVERVIEW CARDS ── */}
        <motion.section 
          className="comp-univ-section-margin" 
          {...scrollSlideUp}
        >
          <motion.h2 
            className="comp-univ-section-header"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <FaClipboardList style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Side-by-Side Snapshot Cards
          </motion.h2>

          <motion.div 
            className="comp-univ-grid-layout"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
          >
            <AnimatePresence mode="popLayout">
              {selectedObjects.map((item) => (
                <motion.div 
                  key={item.id} 
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}
                  className="comp-univ-comparison-card"
                >
                  <div className="comp-univ-card-header">
                    <span className="comp-univ-card-flag" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {item.flag || item.logo}
                    </span>
                    <div>
                      <h3 className="comp-univ-card-title">{item.name}</h3>
                      <span className="comp-univ-overall-badge">⭐ {item.overall}/10 Rating</span>
                    </div>
                  </div>

                  <div className="comp-univ-card-details">
                    <div className="comp-univ-detail-row">
                      <span>Approx Cost:</span>
                      <strong>{item.tuition}</strong>
                    </div>
                    <div className="comp-univ-detail-row">
                      <span>Starting Package:</span>
                      <strong>{item.salary || item.avgSalary}</strong>
                    </div>
                    {item.pr && (
                      <div className="comp-univ-detail-row">
                        <span>PR Scope:</span>
                        <strong style={{ color: '#27ae60' }}>{item.pr}</strong>
                      </div>
                    )}
                    {item.ranking && (
                      <div className="comp-univ-detail-row">
                        <span>World Rank:</span>
                        <strong>#{item.ranking}</strong>
                      </div>
                    )}
                    {item.duration && (
                      <div className="comp-univ-detail-row">
                        <span>Duration:</span>
                        <strong>{item.duration}</strong>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* ── DYNAMIC PROGRESS BARS ── */}
        <motion.section 
          className="comp-univ-section-margin" 
          {...scrollSlideUp}
        >
          <div className="comp-univ-container-box">
            <motion.h2 
              className="comp-univ-section-header"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <FaCogs style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Affordability & Performance Score
            </motion.h2>

            <AnimatePresence mode="popLayout">
              {selectedObjects.map((item) => {
                const score = activeTab === 'countries' ? item.scoreTuition : (item.scoreRanking || item.scoreDemand);
                return (
                  <motion.div 
                    key={item.id} 
                    className="comp-univ-progress-bar-item"
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="comp-univ-progress-bar-label">
                      <span style={{ fontWeight: '600', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {item.flag || item.logo} {item.name}
                      </span>
                      <span style={{ color: '#1a73e8', fontWeight: 'bold', fontSize: '14px' }}>{score}% score</span>
                    </div>
                    <div className="comp-univ-progress-bar-bg">
                      <motion.div 
                        className="comp-univ-progress-bar-fill" 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* ── COMPARATIVE PROPERTIES TABLE ── */}
        <motion.section 
          className="comp-univ-section-margin" 
          {...scrollSlideUp}
        >
          <div className="comp-univ-container-box">
            <motion.h2 
              className="comp-univ-section-header"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <FaEye style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Deep Feature Matrix
            </motion.h2>

            <motion.div 
              className="comp-univ-table-responsive-wrapper"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <table className="comp-univ-comparison-table">
                <thead>
                  <tr style={{ borderBottom: '2px solid #ddd' }}>
                    <th className="comp-univ-table-th">Properties / Specifications</th>
                    {selectedObjects.map(item => (
                      <th key={item.id} className="comp-univ-table-th-header">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          {item.flag || item.logo} {item.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeTab === 'countries' && (
                    <>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">💰 Average Tuition Fees</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.tuition}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">🏡 Average Living Costs</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.livingCost}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">⏱️ Part-Time Work Hours</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.workHours}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">📄 Visa Processing Windows</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.visaTime}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">🎓 Scholarship Scope</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.scholarships}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">🛡️ Overall Safety Index</td>
                        {selectedObjects.map(item => (
                          <td key={item.id} className="comp-univ-table-td">
                            <div className="comp-univ-stars-wrapper">{renderStars(item.safety / 2)}</div>
                            <span style={{ fontSize: '12px', color: '#666' }}>{item.safety} / 10</span>
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  {activeTab === 'universities' && (
                    <>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">🏆 World Ranking Estimation</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td"><strong>#{item.ranking}</strong></td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">🌎 Home Country</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.country}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">💰 Base Tuition (Estimate)</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.tuition}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">🤝 Standard Acceptance Rate</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.acceptance}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">🎓 Graduate Placement Rate</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td"><strong style={{ color: '#27ae60' }}>{item.placement}</strong></td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">⭐ Star Ratings</td>
                        {selectedObjects.map(item => (
                          <td key={item.id} className="comp-univ-table-td">
                            <div className="comp-univ-stars-wrapper-no-margin">{renderStars(item.rating)}</div>
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  {activeTab === 'courses' && (
                    <>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">🏛️ Provider University</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.university}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">⏱️ Academic Duration</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.duration}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">💰 Tuition Estimate</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.tuition}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">📊 Employment Target Positions</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.opportunities}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">🛠️ Foundational Skills</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td">{item.skills}</td>)}
                      </tr>
                      <tr className="comp-univ-table-tr">
                        <td className="comp-univ-table-td-left">📈 Relative Future Scope</td>
                        {selectedObjects.map(item => <td key={item.id} className="comp-univ-table-td"><strong style={{ color: '#e67e22' }}>{item.demand}</strong></td>)}
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </motion.div>
          </div>
        </motion.section>

        {/* ── HIGHLIGHTS & QUICK SUMMARY ── */}
        <AnimatePresence mode="popLayout">
          {selectedObjects.length >= 2 && (
            <motion.section 
              className="comp-univ-section-margin"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div className="comp-univ-summary-grid">
                <div className="comp-univ-summary-container">
                  <h3 className="comp-univ-winner-header">
                    <FaTrophy style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Fast Winners
                  </h3>
                  <div className="comp-univ-winner-list">
                    <div className="comp-univ-winner-item">
                      <div className="comp-univ-winner-title">
                        <FaGem style={{ marginRight: '6px', color: '#27ae60', verticalAlign: 'middle' }} /> Most Economical Tuition Option
                      </div>
                      <div className="comp-univ-winner-value-green">🏆 {highlights.tuitionWinner}</div>
                    </div>
                    <div className="comp-univ-winner-item">
                      <div className="comp-univ-winner-title">
                        <FaTrophy style={{ marginRight: '6px', color: '#1a73e8', verticalAlign: 'middle' }} /> Most Powerful/Demanded Option
                      </div>
                      <div className="comp-univ-winner-value-blue">🏆 {highlights.placementWinner}</div>
                    </div>
                  </div>
                </div>

                <div className="comp-univ-summary-container comp-univ-analysis-card">
                  <h3 className="comp-univ-analysis-header">
                    <FaLightbulb style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Analysis Summary
                  </h3>
                  <p className="comp-univ-analysis-text">
                    {summaryText}
                  </p>
                  <span className="comp-univ-ai-tag">Generated directly from standard curriculum maps</span>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── FAQ ── */}
        <motion.section 
          className="comp-univ-section-margin" 
          {...scrollSlideUp}
        >
          <div className="comp-univ-container-box">
            <motion.h2 
              className="comp-univ-section-header"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <FaHeadphones style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Frequently Asked Questions
            </motion.h2>

            <motion.div 
              className="comp-univ-faq-box"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="comp-univ-faq-question">Q. How up-to-date is this comparison matrix?</h4>
              <p className="comp-univ-faq-answer">
                Our comparative data parses core values, academic durations, and campuses directly from active program registries.
              </p>
            </motion.div>

            <motion.div 
              className="comp-univ-faq-box"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <h4 className="comp-univ-faq-question">Q. Can I download my custom compared list?</h4>
              <p className="comp-univ-faq-answer">
                Currently, you can print or save this dashboard. Connect with our WhatsApp desk below to request a compiled PDF report for your selected courses.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ── CALL TO ACTION ── */}
        <motion.section 
          className="comp-univ-cta-card"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <motion.h2 
            className="comp-univ-cta-title"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Want to Finalize Your Shortlist?
          </motion.h2>

          <motion.p 
            className="comp-univ-cta-subtitle"
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            Compare admissions cycles and lock in priority scholarships with an expert admissions mentor.
          </motion.p>

          <motion.button 
            className="comp-univ-cta-button"
            whileHover={{ scale: 1.04, backgroundColor: "#f1f3f5" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.open(`https://wa.me/7982295530?text=Hi!%20I%20have%20compared%20courses%20on%20the%20Comparison%20Tool%20and%20want%20to%20consult%20an%20expert%20mentor.`, '_blank')}
          >
          <FaWhatsapp size={40} color="#25D366" /> 
          </motion.button>
        </motion.section>

      </div>
      <Footer />
    </div>
  );
};

export default CompareUniversity;