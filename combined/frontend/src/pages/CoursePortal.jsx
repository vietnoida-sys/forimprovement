import React, { useState, useMemo, useRef } from 'react';
import './CoursePortal.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────
// COURSE DATA  (link field added to every course)
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
    link: 'https://tafeqld.edu.au/courses/industries/hospitality-tourism',
  },
  {
    id: 'CIV002',
    title: 'Certificate IV in Automotive Technology',
    university: 'TAFE NSW',
    intake: 'February, July',
    tuitionFee: 14000,
    faculty: 'Automotive',
    campuses: ['Sydney'],
    level: 'Certificate IV',
    duration: '12 - 24 Months',
    ielts: '5.5',
    country: 'Australia',
    link: 'https://www.tafensw.edu.au/courses',
  },
  {
    id: 'B005',
    title: 'Bachelor of Psychology',
    university: 'Macquarie University',
    intake: 'February, July',
    tuitionFee: 37000,
    faculty: 'Arts',
    campuses: ['Sydney'],
    level: 'Bachelor',
    duration: '36 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://www.mq.edu.au/study/find-a-course/courses/bachelor-of-psychology',
  },
  {
    id: 'B006',
    title: 'Bachelor of Accounting',
    university: 'Curtin University',
    intake: 'February, July',
    tuitionFee: 34000,
    faculty: 'Business',
    campuses: ['Perth'],
    level: 'Bachelor',
    duration: '36 Months',
    ielts: '6',
    country: 'Australia',
    link: 'https://study.curtin.edu.au/offering/course-ug--bachelor-of-commerce-in-accounting',
  },
  {
    id: 'M004',
    title: 'Master of Engineering Management',
    university: 'University of Melbourne',
    intake: 'February, July',
    tuitionFee: 50000,
    faculty: 'Engineering',
    campuses: ['Melbourne'],
    level: 'Master (coursework)',
    duration: '24 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://study.unimelb.edu.au/find/courses/graduate/master-of-engineering-management/',
  },
  {
    id: 'M005',
    title: 'Master of Finance',
    university: 'University of New South Wales',
    intake: 'February, September',
    tuitionFee: 55000,
    faculty: 'Finance',
    campuses: ['Sydney'],
    level: 'Master (coursework)',
    duration: '18 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://www.unsw.edu.au/study/postgraduate/master-of-finance',
  },
  {
    id: 'D004',
    title: 'Diploma of Early Childhood Education',
    university: 'Victoria University',
    intake: 'February, July',
    tuitionFee: 19000,
    faculty: 'Education',
    campuses: ['Melbourne'],
    level: 'Diploma',
    duration: '12 - 18 Months',
    ielts: '5.5',
    country: 'Australia',
    link: 'https://www.vu.edu.au/courses',
  },
  {
    id: 'CIV003',
    title: 'Certificate IV in Building and Construction',
    university: 'Holmesglen Institute',
    intake: 'February, July',
    tuitionFee: 16000,
    faculty: 'Construction',
    campuses: ['Melbourne'],
    level: 'Certificate IV',
    duration: '24 - 36 Months',
    ielts: '5.5',
    country: 'Australia',
    link: 'https://holmesglen.edu.au/courses/',
  },
  {
    id: 'D101',
    title: 'Diploma of Information Technology',
    university: 'TAFE NSW',
    intake: 'February, July',
    tuitionFee: 16000,
    faculty: 'IT',
    campuses: ['Sydney', 'Newcastle'],
    level: 'Diploma',
    duration: '12 - 24 Months',
    ielts: '6',
    country: 'Australia',
    link: 'https://www.tafensw.edu.au/courses/information-technology',
  },
  {
    id: 'D102',
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
    id: 'D103',
    title: 'Diploma of Engineering',
    university: 'Monash College',
    intake: 'February, July',
    tuitionFee: 30000,
    faculty: 'Engineering',
    campuses: ['Melbourne'],
    level: 'Diploma',
    duration: '12 Months',
    ielts: '6',
    country: 'Australia',
    link: 'https://www.monashcollege.edu.au/courses',
  },
  {
    id: 'D104',
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
    id: 'D105',
    title: 'Diploma of Early Childhood Education',
    university: 'Victoria University',
    intake: 'February, July',
    tuitionFee: 19000,
    faculty: 'Education',
    campuses: ['Melbourne'],
    level: 'Diploma',
    duration: '12 - 18 Months',
    ielts: '5.5',
    country: 'Australia',
    link: 'https://www.vu.edu.au/courses',
  },
  {
    id: 'D106',
    title: 'Diploma of Marketing and Communication',
    university: 'RMIT University',
    intake: 'February, July',
    tuitionFee: 21000,
    faculty: 'Marketing',
    campuses: ['Melbourne'],
    level: 'Diploma',
    duration: '12 Months',
    ielts: '6',
    country: 'Australia',
    link: 'https://www.rmit.edu.au/courses',
  },
  {
    id: 'M201',
    title: 'Master of Information Technology',
    university: 'University of Melbourne',
    intake: 'February, July',
    tuitionFee: 48000,
    faculty: 'IT',
    campuses: ['Melbourne'],
    level: 'Master (coursework)',
    duration: '24 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://study.unimelb.edu.au/find/courses/graduate/master-of-information-technology/',
  },
  {
    id: 'M202',
    title: 'Master of Business Administration (MBA)',
    university: 'Monash University',
    intake: 'February, July',
    tuitionFee: 50000,
    faculty: 'Business',
    campuses: ['Melbourne'],
    level: 'Master (coursework)',
    duration: '18 - 24 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://www.monash.edu/business/mba',
  },
  {
    id: 'M203',
    title: 'Master of Engineering',
    university: 'University of Sydney',
    intake: 'February, August',
    tuitionFee: 53000,
    faculty: 'Engineering',
    campuses: ['Sydney'],
    level: 'Master (coursework)',
    duration: '24 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://www.sydney.edu.au/courses/courses/pc/master-of-engineering.html',
  },
  {
    id: 'M204',
    title: 'Master of Public Health',
    university: 'Deakin University',
    intake: 'March, July, November',
    tuitionFee: 42000,
    faculty: 'Health',
    campuses: ['Melbourne'],
    level: 'Master (coursework)',
    duration: '18 - 24 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://www.deakin.edu.au/course/master-public-health',
  },
  {
    id: 'M205',
    title: 'Master of Data Science',
    university: 'RMIT University',
    intake: 'February, July',
    tuitionFee: 47000,
    faculty: 'Data Science',
    campuses: ['Melbourne'],
    level: 'Master (coursework)',
    duration: '24 Months',
    ielts: '6.5',
    country: 'Australia',
    link: 'https://www.rmit.edu.au/study-with-us/levels-of-study/postgraduate-study/masters/master-of-data-science-mc271',
  },
  {
    id: 'C401',
    title: 'Certificate IV in Information Technology',
    university: 'TAFE Queensland',
    intake: 'January, July',
    tuitionFee: 14000,
    faculty: 'IT',
    campuses: ['Brisbane'],
    level: 'Certificate IV',
    duration: '1 - 12 Months',
    ielts: '5.5',
    country: 'Australia',
    link: 'https://tafeqld.edu.au/courses/industries/information-technology',
  },
  {
    id: 'C402',
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
// HELPERS
// ─────────────────────────────────────────────
const CURRENCY_MAP = {
  Australia: 'A$', Canada: 'CA$', 'United Kingdom': '£',
  Germany: '€', 'New Zealand': 'NZ$', Russia: '₽',
};
const getCurrencySymbol = (country) => CURRENCY_MAP[country] || '$';

const FEE_RANGES = [
  { label: 'All', value: 'all' },
  { label: 'Under 20,000', value: '0-20000' },
  { label: '20,001 – 30,000', value: '20001-30000' },
  { label: '30,001 – 40,000', value: '30001-40000' },
  { label: '40,001 – 50,000', value: '40001-50000' },
  { label: 'Above 50,000', value: '50001+' },
];

const feeInRange = (fee, range) => {
  let numFee;
  if (typeof fee === 'number') {
    numFee = fee;
  } else if (typeof fee === 'string') {
    const nums = fee.match(/\d+/g);
    if (!nums) return false;
    numFee = nums.length >= 2
      ? (parseInt(nums[0], 10) + parseInt(nums[1], 10)) / 2
      : parseInt(nums[0], 10);
  } else return false;

  if (range === '0-20000')     return numFee >= 0     && numFee <= 20000;
  if (range === '20001-30000') return numFee >= 20001 && numFee <= 30000;
  if (range === '30001-40000') return numFee >= 30001 && numFee <= 40000;
  if (range === '40001-50000') return numFee >= 40001 && numFee <= 50000;
  if (range === '50001+')      return numFee > 50000;
  return false;
};

const CATEGORIES = [
  'Business','Allied Health','IT','Engineering','Health','Hospitality',
  'Medical','Arts','Finance','Education','Marketing','Accounting',
  'Construction','Automotive','Data Science','Science','Environment',
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
const CoursePortal = () => {
  const WHATSAPP_NUMBER = '7982295530';

  const [searchInput,     setSearchInput]     = useState('');
  const [searchLevel,     setSearchLevel]     = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Australia');
  const [openFilter,      setOpenFilter]      = useState(null);

  const [searchQuery,       setSearchQuery]       = useState('');
  const [activeSearchLevel, setActiveSearchLevel] = useState('');
  const [activeCountry,     setActiveCountry]     = useState('Australia');

  const [selectedFaculty,   setSelectedFaculty]   = useState('');
  const [selectedLevels,    setSelectedLevels]     = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedIntakes,   setSelectedIntakes]   = useState([]);
  const [selectedFees,      setSelectedFees]      = useState([]);

  const sliderRef = useRef(null);

  // ── handlers ──
  const toggleFilter = (name) => setOpenFilter(openFilter === name ? null : name);

  const scrollSlider = (dir) => {
    if (!sliderRef.current) return;
    const w = sliderRef.current.firstElementChild?.offsetWidth ?? 160;
    sliderRef.current.scrollLeft += dir === 'left' ? -w * 2 : w * 2;
  };

  const toggle = (setter) => (v) =>
    setter((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);

  const handleLevelChange    = toggle(setSelectedLevels);
  const handleDurationChange = toggle(setSelectedDurations);
  const handleIntakeChange   = toggle(setSelectedIntakes);
  const handleFeeChange      = toggle(setSelectedFees);

  const handleSearchSubmit = () => {
    setSearchQuery(searchInput);
    setActiveSearchLevel(searchLevel);
    setActiveCountry(selectedCountry);
  };

  const handleResetFilters = () => {
    setSearchInput(''); setSearchLevel(''); setSelectedCountry('');
    setSearchQuery(''); setActiveSearchLevel(''); setActiveCountry('');
    setSelectedFaculty(''); setSelectedLevels([]); setSelectedDurations([]);
    setSelectedIntakes([]); setSelectedFees([]);
  };

  // ── filtered ──
  const filteredCourses = useMemo(() => initialCourses.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchSearch   = c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
    const matchFaculty  = selectedFaculty ? c.faculty === selectedFaculty : true;
    const matchSidebarLevel = selectedLevels.length
      ? selectedLevels.includes('All') || selectedLevels.includes(c.level) : true;
    const matchHeaderLevel  = activeSearchLevel ? c.level === activeSearchLevel : true;
    const matchCountry      = activeCountry ? c.country.toLowerCase() === activeCountry.toLowerCase() : true;
    const matchDuration     = selectedDurations.length ? selectedDurations.includes(c.duration) : true;
    const matchIntake       = selectedIntakes.length  ? selectedIntakes.includes(c.intake)   : true;
    const matchFee          = selectedFees.length
      ? selectedFees.includes('all') || selectedFees.some((r) => feeInRange(c.tuitionFee, r)) : true;
    return matchSearch && matchFaculty && matchSidebarLevel && matchHeaderLevel &&
           matchCountry && matchDuration && matchIntake && matchFee;
  }), [searchQuery, selectedFaculty, selectedLevels, activeSearchLevel,
       activeCountry, selectedDurations, selectedIntakes, selectedFees]);

  const handleWhatsApp = (title, id) => {
    const msg = encodeURIComponent(`Hi! I am interested in learning more about: ${title} (${id}).`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  // ── render ──
  return (
    <>
      <Navbar />
      <div className="portalk-container">

        {/* ── HERO ── */}
        <motion.header 
          className="Herok-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1>4,000+ Best Courses Available Here!</h1>

          <div className="searchk-bar-container">
            <select className="searchk-select" value={searchLevel}
              onChange={(e) => setSearchLevel(e.target.value)}>
              <option value="">All Levels</option>
              {['Bachelor','Diploma','Master (coursework)','Associate Degree','Certificate IV'].map(l =>
                <option key={l} value={l}>{l}</option>)}
            </select>

            <select className="searchk-select" value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}>
              <option value="">All Countries</option>
              {['Australia','Germany','United Kingdom','Canada','Russia','New Zealand'].map(c =>
                <option key={c} value={c}>{c}</option>)}
            </select>

            <input type="text" placeholder="Search Courses…" className="searchk-input"
              value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()} />

            <button className="searchk-btn" onClick={handleSearchSubmit}>Search Here</button>
          </div>

          {/* category slider */}
          <div className="categoryk-slider-wrapper">
            <button className="sliderk-arrow left" onClick={() => scrollSlider('left')}>‹</button>
            <div className="categoryk-slider" ref={sliderRef}>
              {CATEGORIES.map((fac) => (
                <label key={fac}
                  className={`cat-chip ${selectedFaculty === fac ? 'active-chip' : ''}`}>
                  <input type="checkbox" style={{ display: 'none' }}
                    checked={selectedFaculty === fac}
                    onChange={() => setSelectedFaculty(selectedFaculty === fac ? '' : fac)} />
                  {fac}
                </label>
              ))}
            </div>
            <button className="sliderk-arrow right" onClick={() => scrollSlider('right')}>›</button>
          </div>
        </motion.header>

        {/* ── MAIN ── */}
        <div className="maink-layout">

          {/* SIDEBAR */}
          <motion.aside 
            className="sidebark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button className="resetk-btn" onClick={handleResetFilters}>⟲ Reset Filters</button>

            {/* Course Level */}
            <div className={`filterk-group ${openFilter === 'level' ? 'active' : ''}`}>
              <h3 onClick={() => toggleFilter('level')}>
                Course Level
              </h3>
              <div className="filterk-content">
                {['All','Bachelor','Diploma','Master (coursework)','Associate Degree','Certificate IV'].map(lvl => (
                  <label key={lvl}>
                    <input type="checkbox"
                      checked={selectedLevels.includes(lvl)}
                      onChange={() => handleLevelChange(lvl)} />
                    {lvl}
                  </label>
                ))}
              </div>
            </div>

            {/* Tuition Fee */}
            <div className={`filterk-group ${openFilter === 'fee' ? 'active' : ''}`}>
              <h3 onClick={() => toggleFilter('fee')}>
                Tuition Fee 
              </h3>
              <div className="filterk-content">
                {FEE_RANGES.map(({ label, value }) => (
                  <label key={value}>
                    <input type="checkbox"
                      checked={selectedFees.includes(value)}
                      onChange={() => handleFeeChange(value)} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* RESULTS */}
          <main className="resultsk-container">
            <div className="resultsk-header">
              <span>Total Records: <strong>{filteredCourses.length}</strong></span>
              <span>Page 1</span>
            </div>

            <div className="coursek-list">
              {filteredCourses.length === 0 ? (
                <div className="nok-records">No courses match your selected filters.</div>
              ) : filteredCourses.map((course) => (
                <motion.div 
                  key={course.id} 
                  className="coursek-card"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="countryk-ribbon">{course.country}</div>

                  <div className="cardk-body">
                    <div className="cardk-main-info">
                      <h2 className="coursek-title">{course.title} — {course.id}</h2>
                      <p className="univk-name">🏛️ <strong>University:</strong> {course.university}</p>

                      <div className="metak-row">
                        <span>📅 <strong>Intake:</strong> {course.intake}</span>
                        <span>💵 <strong>Tuition Fee:</strong>&nbsp;
                          {getCurrencySymbol(course.country)}
                          {typeof course.tuitionFee === 'number'
                            ? course.tuitionFee.toLocaleString()
                            : course.tuitionFee}
                        </span>
                      </div>

                      <p className="faculty-info">👤 <strong>Faculty:</strong> {course.faculty}</p>

                      <div className="badge-row">
                        <span className="badgek-pill">📍 Campus: {course.campuses.join(', ')}</span>
                        <span className="badgek-pill">🎓 Level: {course.level}</span>
                        <span className="badgek-pill">⏱️ Duration: {course.duration}</span>
                      </div>
                    </div>

                    <div className="cardk-right-info">
                      <span className="ieltsk-tag">📋 IELTS Band: {course.ielts}</span>
                    </div>
                  </div>

                  {/* ── FOOTER with working course link ── */}
                  <div className="cardk-footer">
                    <div className="footerk-left">
                      {course.link ? (
                        <a className="coursek-link-btn" href={course.link}
                          target="_blank" rel="noopener noreferrer">
                          🌐 View Course
                        </a>
                      ) : (
                        <span className="websitek-status">🌐 Website: Not Available</span>
                      )}
                    </div>
                    <div className="footerk-actions">
                      <button className="whatsappk-btn"
                        onClick={() => handleWhatsApp(course.title, course.id)}>
                        💬 Contact WhatsApp
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>
      <Footer /> 
    </>
  );
};

export default CoursePortal;