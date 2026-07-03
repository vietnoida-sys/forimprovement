import React, { useState } from 'react';
import './Scholarships.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { FiChevronDown, FiSearch } from "react-icons/fi";

const scholarshipData = [
  // ================= EXISTING =================

  {
    id: 1,
    institution: "University of West London",
    country: "UK",
    logoUrl: "data:image/png;base64,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",
    scholarships: [
      {
        name: "International Ambassador Scholarship",
        value: "Up to £5,000",
        description: "Awarded to outstanding international students.",
        eligibility: "International Students",
        level: "Undergraduate, Postgraduate",
        deadline: "30 Jun 2026",
        iconType: "global",
        targetUrl: "https://www.uwl.ac.uk/international"
      },
      {
        name: "Vice Chancellor Scholarship",
        value: "Up to £3,000",
        description: "Merit-based award.",
        eligibility: "International Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://www.uwl.ac.uk"
      },
      {
        name: "Early Payment Discount",
        value: "£500",
        description: "Fee discount.",
        eligibility: "All Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "fee",
        targetUrl: "https://www.uwl.ac.uk"
      },
      {
        name: "Sports Scholarship",
        value: "Up to £1,500",
        description: "For sports students.",
        eligibility: "All Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "sports",
        targetUrl: "https://www.uwl.ac.uk"
      }
    ]
  },

  // ================= NEW UNIVERSITIES =================

  {
    id: 20,
    institution: "ETH Zurich",
    country: "Switzerland",
    logoUrl: "data:image/png;base64,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",
    scholarships: [
      {
        name: "Excellence Scholarship",
        value: "Fully Funded",
        description: "Covers tuition + living costs.",
        eligibility: "International Students",
        level: "Postgraduate",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://ethz.ch"
      },
      {
        name: "ESOP Scholarship",
        value: "CHF 12,000/year",
        description: "Merit-based support.",
        eligibility: "Top Students",
        level: "Postgraduate",
        deadline: "Varies",
        iconType: "global",
        targetUrl: "https://ethz.ch"
      },
      {
        name: "Research Grant",
        value: "Varies",
        description: "Funding for research students.",
        eligibility: "Researchers",
        level: "PhD",
        deadline: "Varies",
        iconType: "pg",
        targetUrl: "https://ethz.ch"
      },
      {
        name: "Department Scholarship",
        value: "CHF 5,000",
        description: "Faculty-based award.",
        eligibility: "Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://ethz.ch"
      }
    ]
  },

  {
    id: 21,
    institution: "Technical University of Munich",
    country: "Germany",
    logoUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQEAAADECAMAAACoYGR8AAAAS1BMVEX///8wcLN6oMwnbLEbZ6+pwd0fabATZa5xmslZisG+0OXE0uXh5/GkvduRrdCUsNTS3+0AX6xcjMGApM1LgbxsmMfp7vWeudm1yeFSZN5GAAABV0lEQVR4nO3czW6CQBSAUS0jTMGf2tbq+z9pu5I7RBpIF1I9ZzmTO5EvbEyA1QoAAAAAAAAAAAAAAAAAAACAv+ryyyyHYvpt5vRA7u501dGmqeaoX4vp9jhreqjZ3Omqo029nqMaFEizpodqBRRQQAEFFFBAgSUU2B3TVYxRpZvrvxSIEylVI2cVO4sosG2vukP/46r3rl8P98l4gTjxM/MRzsrFTu53FlEg6sL15LC+baYUyMVOqFaX/6b2YeeRC+wUUEABBRRQQAEFFFBAAQUUUEABBRRQQAEFFFBAAQUUUEABBRRQQAEFFFBAAQUUUOBRC6w/2/B4ZPEM5rMUWI89Ifs8BcYooIACCiiggAIKPEaB/k38dArr2ynv2Nen4qxdf1azL3b2aVlv30fxewrnsP416TsL5+Kstp/Jl2LnsrAvMAAAAAAAAAAAAAAAAAAAAAD8d99lRjaFaMLOwgAAAABJRU5ErkJggg==",
    scholarships: [
      {
        name: "TUM Scholarship",
        value: "€500/month",
        description: "Support for international students.",
        eligibility: "International Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "global",
        targetUrl: "https://tum.de"
      },
      {
        name: "Deutschlandstipendium",
        value: "€300/month",
        description: "Merit-based funding.",
        eligibility: "Top Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://tum.de"
      },
      {
        name: "Research Scholarship",
        value: "Varies",
        description: "Funding for research work.",
        eligibility: "Researchers",
        level: "PhD",
        deadline: "Varies",
        iconType: "pg",
        targetUrl: "https://tum.de"
      },
      {
        name: "Industry Scholarship",
        value: "€2,000",
        description: "Sponsored by companies.",
        eligibility: "Engineering Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "global",
        targetUrl: "https://tum.de"
      }
    ]
  },

  {
    id: 22,
    institution: "Delft University of Technology",
    country: "Netherlands",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC-bEE6QZPAnVnWLlI4Xe_bMF4fV3yCm5izQ&s",
    scholarships: [
      {
        name: "Justus & Louise Scholarship",
        value: "Fully Funded",
        description: "Full tuition + stipend.",
        eligibility: "International Students",
        level: "Masters",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://tudelft.nl"
      },
      {
        name: "Excellence Scholarship",
        value: "€30,000",
        description: "High merit students.",
        eligibility: "Top Students",
        level: "Masters",
        deadline: "Varies",
        iconType: "global",
        targetUrl: "https://tudelft.nl"
      },
      {
        name: "Faculty Scholarship",
        value: "€10,000",
        description: "Department-based award.",
        eligibility: "Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://tudelft.nl"
      },
      {
        name: "Research Grant",
        value: "Varies",
        description: "For research projects.",
        eligibility: "Researchers",
        level: "PhD",
        deadline: "Varies",
        iconType: "pg",
        targetUrl: "https://tudelft.nl"
      }
    ]
  },

  {
    id: 23,
    institution: "University of Bologna",
    country: "Italy",
    logoUrl: "data:image/jpeg;base64,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",
    scholarships: [
      {
        name: "Unibo Scholarship",
        value: "€11,000",
        description: "For international students.",
        eligibility: "International Students",
        level: "Masters",
        deadline: "Varies",
        iconType: "global",
        targetUrl: "https://unibo.it"
      },
      {
        name: "Study Grant",
        value: "€5,000",
        description: "Merit-based funding.",
        eligibility: "Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://unibo.it"
      },
      {
        name: "Research Scholarship",
        value: "Varies",
        description: "For research students.",
        eligibility: "Researchers",
        level: "PhD",
        deadline: "Varies",
        iconType: "pg",
        targetUrl: "https://unibo.it"
      },
      {
        name: "Regional Scholarship",
        value: "€7,000",
        description: "Government support.",
        eligibility: "International Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "global",
        targetUrl: "https://unibo.it"
      }
    ]
  },

  {
    id: 24,
    institution: "PSL University",
    country: "France",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTETik08LipJHL7jEVxHhtwpUt8DAlpSD-qbQ&s",
    scholarships: [
      {
        name: "PSL Excellence Scholarship",
        value: "€10,000",
        description: "Merit-based award.",
        eligibility: "International Students",
        level: "Masters",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://psl.eu"
      },
      {
        name: "Eiffel Scholarship",
        value: "€1,181/month",
        description: "Government scholarship.",
        eligibility: "International Students",
        level: "Masters",
        deadline: "Varies",
        iconType: "global",
        targetUrl: "https://psl.eu"
      },
      {
        name: "Research Grant",
        value: "Varies",
        description: "For PhD students.",
        eligibility: "Researchers",
        level: "PhD",
        deadline: "Varies",
        iconType: "pg",
        targetUrl: "https://psl.eu"
      },
      {
        name: "Faculty Award",
        value: "€5,000",
        description: "Department-based award.",
        eligibility: "Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://psl.eu"
      }
    ]
  },

  {
    id: 25,
    institution: "University of British Columbia",
    country: "Canada",
    logoUrl: "data:image/png;base64,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",
    scholarships: [
      {
        name: "International Scholars Program",
        value: "Fully Funded",
        description: "Full tuition + living.",
        eligibility: "International Students",
        level: "Undergraduate",
        deadline: "Varies",
        iconType: "global",
        targetUrl: "https://ubc.ca"
      },
      {
        name: "Merit Scholarship",
        value: "CAD 10,000",
        description: "Top students.",
        eligibility: "Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://ubc.ca"
      },
      {
        name: "Faculty Award",
        value: "CAD 5,000",
        description: "Department-based.",
        eligibility: "Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://ubc.ca"
      },
      {
        name: "Research Grant",
        value: "Varies",
        description: "Research funding.",
        eligibility: "Researchers",
        level: "Postgraduate",
        deadline: "Varies",
        iconType: "pg",
        targetUrl: "https://ubc.ca"
      }
    ]
  },

  {
    id: 26,
    institution: "University of Waterloo",
    country: "Canada",
    logoUrl: "data:image/png;base64,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",
    scholarships: [
      {
        name: "International Student Entrance",
        value: "CAD 10,000",
        description: "Entrance scholarship.",
        eligibility: "International Students",
        level: "Undergraduate",
        deadline: "Varies",
        iconType: "global",
        targetUrl: "https://uwaterloo.ca"
      },
      {
        name: "Merit Scholarship",
        value: "CAD 5,000",
        description: "Academic excellence.",
        eligibility: "Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://uwaterloo.ca"
      },
      {
        name: "Co-op Scholarship",
        value: "Varies",
        description: "Work-study support.",
        eligibility: "Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "global",
        targetUrl: "https://uwaterloo.ca"
      },
      {
        name: "Research Grant",
        value: "Varies",
        description: "Research funding.",
        eligibility: "Researchers",
        level: "Postgraduate",
        deadline: "Varies",
        iconType: "pg",
        targetUrl: "https://uwaterloo.ca"
      }
    ]
  },

  {
    id: 27,
    institution: "McGill University",
    country: "Canada",
    logoUrl: "data:image/jpeg;base64,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",
    scholarships: [
      {
        name: "Entrance Scholarship",
        value: "CAD 12,000",
        description: "Merit-based.",
        eligibility: "International Students",
        level: "Undergraduate",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://mcgill.ca"
      },
      {
        name: "Major Scholarship",
        value: "CAD 48,000",
        description: "Highly competitive.",
        eligibility: "Top Students",
        level: "Undergraduate",
        deadline: "Varies",
        iconType: "merit",
        targetUrl: "https://mcgill.ca"
      },
      {
        name: "PBEEE",
        value: "Varies",
        description: "Gov-funded.",
        eligibility: "Students",
        level: "Postgraduate",
        deadline: "Varies",
        iconType: "pg",
        targetUrl: "https://mcgill.ca"
      },
      {
        name: "Faculty Award",
        value: "CAD 5,000",
        description: "Department award.",
        eligibility: "Students",
        level: "All Programs",
        deadline: "Varies",
        iconType: "global",
        targetUrl: "https://mcgill.ca"
      }
    ]
  }
,
  // ================= AUSTRALIA UNIVERSITIES =================

{
  id: 30,
  institution: "University of Melbourne",
  country: "Australia",
  logoUrl: "data:image/png;base64,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",
  scholarships: [
    {
      name: "Melbourne International Scholarship",
      value: "Up to AUD 56,000",
      description: "For high-achieving international students.",
      eligibility: "International Students",
      level: "Undergraduate, Postgraduate",
      deadline: "Varies",
      iconType: "global",
      targetUrl: "https://unimelb.edu.au"
    },
    {
      name: "Graduate Research Scholarship",
      value: "Fully Funded",
      description: "Covers tuition + stipend.",
      eligibility: "Researchers",
      level: "Postgraduate",
      deadline: "Varies",
      iconType: "pg",
      targetUrl: "https://unimelb.edu.au"
    },
    {
      name: "Faculty Scholarship",
      value: "AUD 10,000",
      description: "Department-based award.",
      eligibility: "Students",
      level: "All Programs",
      deadline: "Varies",
      iconType: "merit",
      targetUrl: "https://unimelb.edu.au"
    },
    {
      name: "Sports Scholarship",
      value: "AUD 5,000",
      description: "For sports students.",
      eligibility: "All Students",
      level: "All Programs",
      deadline: "Varies",
      iconType: "sports",
      targetUrl: "https://unimelb.edu.au"
    }
  ]
},

{
  id: 31,
  institution: "Australian National University",
  country: "Australia",
  logoUrl: "data:image/png;base64,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",
  scholarships: [
    {
      name: "ANU Chancellor Scholarship",
      value: "Up to AUD 25,000",
      description: "Merit-based award.",
      eligibility: "International Students",
      level: "Undergraduate",
      deadline: "Varies",
      iconType: "merit",
      targetUrl: "https://anu.edu.au"
    },
    {
      name: "Research Scholarship",
      value: "Fully Funded",
      description: "Covers research expenses.",
      eligibility: "Researchers",
      level: "Postgraduate",
      deadline: "Varies",
      iconType: "pg",
      targetUrl: "https://anu.edu.au"
    },
    {
      name: "Global Diversity Scholarship",
      value: "AUD 15,000",
      description: "For international students.",
      eligibility: "International Students",
      level: "All Programs",
      deadline: "Varies",
      iconType: "global",
      targetUrl: "https://anu.edu.au"
    },
    {
      name: "Faculty Award",
      value: "AUD 8,000",
      description: "Department-based award.",
      eligibility: "Students",
      level: "All Programs",
      deadline: "Varies",
      iconType: "merit",
      targetUrl: "https://anu.edu.au"
    }
  ]
},

{
  id: 32,
  institution: "University of Sydney",
  country: "Australia",
  logoUrl: "data:image/png;base64,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",
  scholarships: [
    {
      name: "Sydney Scholars Award",
      value: "AUD 6,000/year",
      description: "Merit-based scholarship.",
      eligibility: "Students",
      level: "Undergraduate",
      deadline: "Varies",
      iconType: "merit",
      targetUrl: "https://sydney.edu.au"
    },
    {
      name: "International Scholarship",
      value: "AUD 40,000",
      description: "For international students.",
      eligibility: "International Students",
      level: "Postgraduate",
      deadline: "Varies",
      iconType: "global",
      targetUrl: "https://sydney.edu.au"
    },
    {
      name: "Research Training Program",
      value: "Fully Funded",
      description: "Covers tuition + stipend.",
      eligibility: "Researchers",
      level: "Postgraduate",
      deadline: "Varies",
      iconType: "pg",
      targetUrl: "https://sydney.edu.au"
    },
    {
      name: "Faculty Scholarship",
      value: "AUD 10,000",
      description: "Department award.",
      eligibility: "Students",
      level: "All Programs",
      deadline: "Varies",
      iconType: "merit",
      targetUrl: "https://sydney.edu.au"
    }
  ]
},

{
  id: 33,
  institution: "Monash University",
  country: "Australia",
  logoUrl: "data:image/png;base64,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",
  scholarships: [
    {
      name: "Monash International Merit",
      value: "AUD 10,000/year",
      description: "High academic achievers.",
      eligibility: "International Students",
      level: "Undergraduate, Postgraduate",
      deadline: "Varies",
      iconType: "merit",
      targetUrl: "https://monash.edu"
    },
    {
      name: "Monash Research Scholarship",
      value: "Fully Funded",
      description: "Research funding.",
      eligibility: "Researchers",
      level: "Postgraduate",
      deadline: "Varies",
      iconType: "pg",
      targetUrl: "https://monash.edu"
    },
    {
      name: "Faculty Scholarship",
      value: "AUD 5,000",
      description: "Department award.",
      eligibility: "Students",
      level: "All Programs",
      deadline: "Varies",
      iconType: "global",
      targetUrl: "https://monash.edu"
    },
    {
      name: "Equity Scholarship",
      value: "AUD 6,000",
      description: "For disadvantaged students.",
      eligibility: "Students",
      level: "All Programs",
      deadline: "Varies",
      iconType: "global",
      targetUrl: "https://monash.edu"
    }
  ]
},

{
  id: 34,
  institution: "University of Queensland",
  country: "Australia",
  logoUrl: "data:image/png;base64,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",
  scholarships: [
    {
      name: "UQ International Excellence",
      value: "Up to AUD 15,000",
      description: "Merit-based.",
      eligibility: "International Students",
      level: "All Programs",
      deadline: "Varies",
      iconType: "merit",
      targetUrl: "https://uq.edu.au"
    },
    {
      name: "Research Training Scholarship",
      value: "Fully Funded",
      description: "Covers tuition + stipend.",
      eligibility: "Researchers",
      level: "Postgraduate",
      deadline: "Varies",
      iconType: "pg",
      targetUrl: "https://uq.edu.au"
    },
    {
      name: "Faculty Award",
      value: "AUD 8,000",
      description: "Department award.",
      eligibility: "Students",
      level: "All Programs",
      deadline: "Varies",
      iconType: "global",
      targetUrl: "https://uq.edu.au"
    },
    {
      name: "Sports Scholarship",
      value: "AUD 5,000",
      description: "Sports-based funding.",
      eligibility: "All Students",
      level: "All Programs",
      deadline: "Varies",
      iconType: "sports",
      targetUrl: "https://uq.edu.au"
    }
  ]
  
  
}
,{
  id: 35,
  institution: "Coventry University",
  country: "United Kingdom",
  logoUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX///8UdsYAbsMAbMMAb8QAcsUAc8UAasIAaMH7/v+Artzs9Prx9vvU5PNinNXM3vCZvuKpyOdMkNDl7/jd6/Y5h81TldK20eosgMrB2O4AZsHi7fdyptmty+i10OoAYb+Is96fwuRsotcdfcmPuOBGjs+Dsd1wpNgyhMtVmdRdn9d2rNwAXb4GeceJuOFJP8OHAAAOoElEQVR4nO1aaZuqvLINSZhkVlBwoGWytb30//95typBxVax977n3POe56n1YW8bklArqRkYIxAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAI/2/wg6KIFv9pKX4gmrzrTt++gxcfheBciP6Q/h+FeinOX8xp3whz+rWwlSEtQ0Oah78Q5R0WSZf8xazmzbbMtr9cKeTGCHz5N9s9hdVccvGHDPF0tvM3g7bJ6leLnaQ6PG4ZXP9a/pkwb7GFHZR/xrAAEwvq7M2oMK3xv82bYTGeoGXsA99PWwO1le+uN133Fwf6dMxo5swEhrsnY15jCT7vvDLfPPzoxQH8V0w7yIWJBJvBZhcNUDQNLWMSHvs+P1Ue/lXEgGqYFOAfsXr+qj42/bEuB154HY6rCPO+6faemjiHNa0wbmN9G4b6RYW/AjZe77I4wF9vmLv0PgI2BV+4KXqNKJ4cNkPN5NeDTqXkXYuyVyY3UTRL2i0us5ZSimG3QgG/Q7zaCAsHmSJX0ngmznfntpoqeQEO0VZeDP5omM9h3onFAv4fVlBYwnr27CZUuSxZNGPm6NITFD1jaKpFNzkMHy9H/vMca7Zb5X4s6+J83KN11V+3wYsgfcKtyyDLLHBb8ddybg4TLWvBWjm4MCtnPvKuYzFc6X39TA//EKMDmyUhq3Zsa3pTop/AlW5hz+OvqWEBPs18jCutus6PR4kCStjtPfww9a5HXItXcBVfjkeOqi49zRDPy8xyRV7OWNxrNk2fKYZGpqgrgx90e8fRUEZP/9oI7xCxyJkKB6kDe7qDPc+qqdBfgdzW8XG2kv0Me+yqM4DFUnHddUV2y1wU00Rz9Le4THhhKNEwFjmSAEUaeRrfGnag22Z4nIPXRkOVI2NyT6ypMfdYrovXoi97ePLmzAKeVq9HsTM83To9XN7CZbPWv5GiBaqOEnO1WyidiFjFb4KhkDzVDM1PdanArRH+wDC5MbSyVJ+bwdWGeT/1aFGDDjVgLQE3XoaC3RrdAzux5dxtJxjWyPBBF1zULDEs7vfaF8UgsdzDhQ3qJPjbDuS9pB2FZqsY6m3Qv9E3/WTY+Je72q4TrrfwiuAMLl7gKmeR+88Fj6Sh7nwl64pN5WHPGQZSOYbRGDCZ1BwuokTg5jz8u4s0VlIpnWY1GD76JpE+MJTV7clKTdX5XxRtAVsWwZkcZL9BnyaPT4NiYNk6hwi55brnCYZKHcOfV1dcm5UGqilqI54ZnkmIEkfaSVlcQw7OUp3MIFP2nOEQmpSbMmG5hRx+aNEjDKE41Gw8PCr5LIvcGFKndIUJejDJUBnZQ3aknNv1ZKtBPdX/IOlwlsUQT27oXcVQTjPU2jWEnGpwdtdM0QN1LfBAO2nmQBFiZ/1IsLcMtSUJN2GmYviqzoiUlf8055LfHA3TBtgypZZw3jgF/1RTjXyE468YXkx3P3iwzrpLFOc1K3DwueSKYi25NjM/KgY5N4Ypla3PhIUPUAxfZQeuCncjX7QvXB3wbrZ/vki4RAHdPZploCOKNccE9Ar2Jwx1KN4ov8Vv/qT4mCmGn2ygmFk20mm/ktXpgNK5jSUwkro1N48HYO3DFszKFwzZ5yVYa0RQBX+uPGsk6CU4aOXlEey50mvlcH+UcH/CUIUfWaGSmuN4NRc5aukW4408+sxrzAzTHLb6KtLiC+5IjkfiLjkkiDGIvolZZb8iCImo8hGDoXs9PjXXMXhwb8relFg+ntryEtK1jx0qNDd9zVDpQPvIMFZqiqP4uM7ze5OfPXZAXTLRoWwMO/BRo4Lted+B7qgNcTMpQDNnMCxIzh8T1dleVU99m/ruouotnXGWyk8qXU+x3Bj0+IROZohy8Hwb5VXppB/yLk5fMFTeDOKa+4OhKmvuElSNzdGSffWNehVJDptZrmMPvEKJOdYCyj0LH3/icjhq92CJyZp2PlTARq9yUIOjE+2UnoZVtVVVgqGlKnU34OJ8sXa2zLpKZg3k2phEPmVY6go0z34w1HaN90beEm96DYcaRalQKTia4pYBhS89cSvQ88yExIzO3bOqkTx7kRdcKN51MXRN46vThOfo4mHI+32dRV8Kdv8o9SA8DBOz26cM9VqX2mLEcNgwbeQDdnh3Gxy5xTvU/NbZQ1DYYk0c68fWDhzhyraUXZSZxaU5FQ8VWmvUiRr86mLOLzvMj9fCplZWew3P/lJcB811LgZuaBzxbZSjUFuADEEhrBtD39Czx+5KNSZq5laGaSpZsqNKAZI9c3UNOsMqpDFxV9LQtEz++aUWe0nPXSzYYt9gN5ELY7Zhi8GxlpnqMNp5dROgMBrAyPOVnW5D5np//Rxu98P4Dn4baqfT0BBCQAWMs0dp2LbBsH9f6O47l7UB7l4uROaxApL3JGILywPDx9USeHyEnsU/Q40uwsDf4yNeV1DBh4OUvGhVqohafhgXEeDaKposQpEUTPxFK9n3r5vserc1T3jO982KpSwD9NVFUMwdiOyWy7YgUQdmHjvAYwNmVB0xFxLcCOHJOzDIaMLVBOK+kl6J/NXQfxEScU0mVDb/ozx1585xjlsG1lUcxSrEeIcG6aPLKFCH2e7gLtdWGCmHC3/H1kTD7T/KUIXUhzbcwZFyXoIWwtHF/5OyGR5/sYagubBEwSIIO3VmtwumSl//a5c7U1X+f5Ihdmwe8344WuwhW/ugbbEJx77xWrRGU6/4UITPMdJ/Y5su404+2TJ9zjBYgVFv2mXW1bvBgFYrj/mrYuSz/GKlpm7isOtO8cUYoxX8css6A41yixmssZzt8Ga6AumiYiazArFRdRjXjYqguGtYLPc559YWLbT2VQaVqN4i5KRYQBf76DuOV8HhKDnv4+m+6nOG24+Wzey1NLhj91oF7HXEXGM9ytKr9Rr5zrjjmJbj8MEnLj92LMpt+2PFgqOzln0j1x8YBNoPOLzmQxjW+uPDsZdYnvAhluVrXa1FseorpWdWLG0h6g37dlFbi6EVfzax4sLVvBicvbCaw7um9XOGMxGH6zM656iTXLl8C/Wj5fltwRw5uZmwMP31KkPoqjS0V9Gan5LCX5g8VHM3FW5MjMlVEB1kFkVRzKEUzsUQeQquM0EXHGVwgNMqgPBi39t2e4DAsWzWtX7ujmMGdGZB6Ai72Rbp+7czLxjKoz2oDaS44ZWhJ3hxmylTbKxeGuabXKgDDkXV6OC853d+MtbpY6J2wm2gqk4uGjGXQ0tBLYb97+ILdX3X2ZiRpdegBSUVcDpshQP0XJZiKuftkmrircELhqZqOg2LqrJcMWQhv3Y3thyPRPCrH4u4xIMIzXxIpUN+F8zvGII63HKZ1L6sEvHzZjjB+lwsFrt6no/VsJW8ZIFh11gpshZP8LvyVWj5Q4ZDKwvhqbMaGEbcHob7BnhuoDlKm0MRK4YXcbfy9RmiOlw3/syvAWSx/Di2QXTCNuyqSrC+HHlb9ygzSEqrqgo2UXvCWK863slEu+0FQ35LElypJLYGP82HFulOwOa6uRj5wFLJHsqLSHCo3ShhuWcI4y60YLNGWhaFfG0Yx3ALzlJt8/bm3WK7WUQ90PZWSYkxAoIJWHn+2Mt5z3BkweaYYSUG+TustMGXjMJHKlDxRrqZCMnn5bXkvWdYcHuw4Irf9wq8JDQcDi7akce6SlmHnkxNWXe+r1qorpdGRVluuzZsPozJN6U/GZaDL33F0B+KnUBiXzSQUFleIS1cS+uqxiaE2G3OvGcMWSaHhxz5Y9fam32V8aFeHq01z6CSL74XLDHhqD+T5DOznPXacYTj2CLfTrT+/4YhOwvVtZ+pQjKQ1vIOPxhi2oCxu3rGsNIuDA6TP8vv91pydxFVfV6CWzntXUixzSZb1ufZft/Gzax8WxmABJzftRornk0zDJyRa00lf1jxniHmNRkX+ycMfYuromv5oyWaVqViPrsezsHffgbbsvLnYXXryBxe9tfuoF3iDWcVDiYYsg4/Oyi1OfqG/dCK/cmQYW/UCR4ZsrPySRtb3tVPiwryQJWJHYoiafdxEoCnrHpwbv2CRZexbj39iviG+X3QOqpXCFMMFbml0K24jj/QecIQPHD7hGEqsLM74/cfXWwwtrlxEBwysHHhCOPYfBVtVLiHXRB8dsf82NVVgBkBBpRd/K46rcS41QU2sXjD0G2cdDGYEMweBeSZytKfMVT+9YEh+Jqa+b344Qr3zaGKz6bqOuRnyOOTwM8qONHAb9ryXNaWzaVoZinb4UcG/tuvIJrR9yWbXqfCUwxZa+9jMbvQvcWVynE2zxn6DWr2wLAQ1zyg5MJNxMMb2nS/zJu86dpVgI/B9xjbXeS67nnvsRZ2MdpKDk6633u+V2RvnU1k8k7lQMxPDK7bKJMMFzLPr+ZXCF6rR7it1G+8bgx3l0885hJbIwPDBZfF8BUY7E/ciaevcIHP9wpSipm/ipEzvgbdpTuYecA+fhrFc9N0bNPqfvHtV9TYdj8Pw860naVWvpnzebvP1YsDaV8T0BOXt0xqJW0z3O9rrAPUhdC5MOyc42cb75fS7tErxI5Wz9qWQ4uK7cXtbdwjgnZ2OGS4bVEcgC4maQkK7X+v8EHF92YRRcH7aKGQLA2InrypLySqcKRp4Sm4/qu3JAxH/teHahWib7MdNrM9Xbx4Ne+Fs3bMTrfrytOQPcbLLNPuYRH2cvqbEsw5Iy+YY6HvnmcbrNPi+Ps7/tNvDN1Fmnp//UWbl6aLp5MhuUo3Uw1pTz6823tcpKiqXp1Vany338l0g/ufhlD87gPDJMP3auBR/9XfFf67kYj+lyeytw8HOfXRxT8TsRRv0uYbotn+t0nMPwZV7og/+2bxvw2RqP9dH13/U/Df5jUIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIhGn8L/zt9/If+GaQAAAAAElFTkSuQmCC",
  scholarships: [
    {
      name: "Vice-Chancellor Undergraduate Scholarship",
      amount: "Up to £2,000",
      eligibility: "International undergraduate students",
       level: "All Programs",
      deadline: "Varies",
      iconType: "merit",
      targetUrl: "https://www.coventry.ac.uk"
    },
    {
      name: "Vice-Chancellor Postgraduate Scholarship",
      amount: "Up to £3,000",
      eligibility: "International postgraduate students",
       level: "All Programs",
      deadline: "Varies",
      iconType: "Pg",
      targetUrl: "https://www.coventry.ac.uk"
    },
    {
      name: "Early Payment Discount",
      amount: "£2,000",
      eligibility: "Students who pay tuition fees early",
       level: "All Programs",
      deadline: "Varies",
      iconType: "global",
      targetUrl: "https://www.coventry.ac.uk"
    },
    {
      name: "EU Support Bursary",
      amount: "Variable",
      eligibility: "EU students enrolling at Coventry University",
       level: "All Programs",
      deadline: "Varies",
      iconType: "Sports",
      targetUrl: "https://www.coventry.ac.uk"
    }
  ]
}
];




export default function Scholarships() {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState('All Country');
  const [showAll, setShowAll] = useState(false);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleReset = () => {
    setSearchTerm('');
    setCountry('All Country');
    setOpenAccordion(null);
    setShowAll(false);
  };

  // Filtering Logic
  const filteredData = scholarshipData.filter(item => {
    const matchesSearch = item.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = country === 'All Country' || item.country === country;
    return matchesSearch && matchesCountry;
  });

  // Determines initial pagination limits
  const displayedData = showAll ? filteredData : filteredData.slice(0, 4);

  // Appends and displays all filtered universities inline on the same page
  const handleShowMore = () => {
    setShowAll(true);
  };

  // Redirect handler to open the respective university link in a new browser tab
  const handleRedirect = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert("Official link not available for this scholarship.");
    }
  };

  // WhatsApp Share Handler
// WhatsApp Share Handler
const handleWhatsAppShare = (sch, institution) => {
  const phoneNumber = "+91 79822 95530"; // 👉 apna number yahan dalo (country code ke sath, + nahi lagana)

  const message = `*Scholarship Alert!* 🎓%0A%0A*University:* ${institution}%0A*Scholarship:* ${sch.name}%0A*Value:* ${sch.value}%0A*Eligibility:* ${sch.eligibility}%0A*Deadline:* ${sch.deadline}%0A%0ACheck details here: ${sch.targetUrl}`;

  window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`, '_blank');
};

  // Helper method to assign matching visual representations
  const getIcon = (type) => {
    switch(type) {
      case 'merit': return '🎓';
      case 'vc': return '⭐';
      case 'global': return '🌐';
      case 'pg': return '👥';
      default: return '📜';
    }
  };

  return (
    <> 
   
      <Navbar />
      <div className="scholarship-portal">
        
        {/* Hero Banner Section */}
        <div className="hero-banner">
          <div className="hero-content">
          </div>
        </div>


        

        {/* Filter Bar Section */}
        <div className="filter-container">
          <div className="filter-bar">
            <select 
              value={country} 
              onChange={(e) => {
                setCountry(e.target.value);
                setOpenAccordion(null);
              }}
              className="filter-select"
            >
              <option value="All Country">All Country</option>
              <option value="Australia">Australia</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
            </select>
            
            <input 
              type="text" 
              placeholder="Search university..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input"
            />
            
            <button onClick={handleReset} className="reset-btn">
              RESET
            </button>
          </div>
        </div>

           <div className="whatsapp-top">

  {/* Phone Button */}
  <a href="tel:+91 79822 95530" className="phone-btn">
    <img
      src="https://img.icons8.com/ios-filled/50/ffffff/phone.png"
      alt="phone"
    />
    <span>Call Us</span>
  </a>

 

</div>

        {/* Accordion List Section */}
        <div className="accordion-container">
          {displayedData.length > 0 ? (
            displayedData.map((item) => {
              const isOpen = openAccordion === item.id;
              return (
                <div key={item.id} className={`accordion-item ${isOpen ? 'active' : ''}`}>
                  <div 
                    className="accordion-header" 
                    onClick={() => toggleAccordion(item.id)}
                  >
                    <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {/* 1. UNIVERSITY LOGO SECTION */}
                      {item.logoUrl && (
                        <img 
                          src={item.logoUrl} 
                          alt={`${item.institution} logo`} 
                          className="university-logo"
                          style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                        />
                      )}
                      <span className="institution-title">{item.institution}</span>
                    </div>
                    <span className={`arrow-icon ${isOpen ? 'up' : 'down'}`}>
                      {isOpen ? <FiChevronDown /> : <FiChevronDown />}
                    </span>
                  </div>

                  {isOpen && (
                    <div className="accordion-content">
                      {item.placeholder || !item.scholarships ? (
                        <div className="no-data">No active scholarship details available for this selection.</div>
                      ) : (
                        <div className="scholarships-card-grid">
                          {item.scholarships.map((sch, index) => (
                            <div key={index} className="scholarship-card">
                              <div>
                                <div className="card-header">
                                  <div className={`icon-wrapper ${sch.iconType}-icon`}>
                                    {getIcon(sch.iconType)}
                                  </div>
                                  <div className="header-title-group">
                                    <h3>{sch.name}</h3>
                                    <span className="value-badge">{sch.value}</span>
                                  </div>
                                </div>
                                <p className="card-description">{sch.description}</p>
                              </div>

                              <div>
                                <div className="card-meta">
                                  <div className="meta-item">
                                    <span className="meta-label">👤 Eligibility:</span>
                                    <span className="meta-value">{sch.eligibility}</span>
                                  </div>
                                  <div className="meta-item">
                                    <span className="meta-label">🎓 Level:</span>
                                    <span className="meta-value">{sch.level}</span>
                                  </div>
                                  <div className="meta-item">
                                    <span className="meta-label">⏰ Deadline:</span>
                                    <span className="meta-value">{sch.deadline}</span>
                                  </div>
                                </div>
                                
                                {/* ACTION BUTTONS ROW */}
                                <div className="card-actions-wrapper" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                  <button 
                                    className="card-action-btn"
                                    onClick={() => handleRedirect(sch.targetUrl)}
                                    style={{ flex: 1 }}
                                  >
                                    CLICK HERE <span className="arrow">➔</span>
                                  </button>
                                  
                                  {/* 2. WHATSAPP SHARE BUTTON */}
                                  
                                  
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="no-results">No universities found matching your criteria.</div>
          )}
        </div>

        {/* Show More Button Controls */}
        {!showAll && filteredData.length > 4 && (
          <div className="show-more-container">
            <button onClick={handleShowMore} className="show-more-btn">
              Show More Universities ➔
            </button>
          </div>
        )}
      </div>

    <div className="search-section">

      {/* WhatsApp Button */}
      <div className="whatsapp-top">
        <a
          href="https://api.whatsapp.com/send?phone=79822 95530&text=Hello%20I%20want%20scholarship%20details"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <img
            src="https://img.icons8.com/color/48/whatsapp.png"
            alt="WhatsApp"
          />
          <span>Get Help on WhatsApp</span>
        </a>
      </div>

      

    </div>
 
      <Footer />
    </>
  );
}