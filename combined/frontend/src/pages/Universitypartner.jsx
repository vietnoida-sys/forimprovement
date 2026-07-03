import React from "react";
import "./Universitypartner.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const countries = {
  Germany: [
    {
      id: 1,
      name: "Freie Universität Berlin",
      website: "https://www.fu-berlin.de",
      logo: "https://tse2.mm.bing.net/th/id/OIP.SSjC9MyyS55_MlglzYtp4gAAAA?pid=Api&P=0"
    },
    {
      id: 2,
      name: "University of Bonn",
      website: "https://www.uni-bonn.de",
      logo: "https://tse4.mm.bing.net/th/id/OIP.bPt4P55NoFN1-FjJmEeS9gAAAA?pid=Api&h=220&P=0"
    },
    {
      id: 3,
      name: "RWTH Aachen University",
      website: "https://www.rwth-aachen.de",
      logo: "https://tse4.mm.bing.net/th/id/OIP.yNw5C65_EqXC4hPtLNU5ZAHaEA?pid=Api&h=220&P=0"
    },
    {
      id: 4,
      name: "Technical University of Chemnitz",
      website: "https://www.tu-chemnitz.de",
      logo: "https://tse1.mm.bing.net/th/id/OIP.ZE1zXQX4bG2UIqPfTDhTLwHaEH?pid=Api&h=220&P=0"
    },
    {
      id: 5,
      name: "FAU Erlangen-Nürnberg",
      website: "https://www.fau.eu",
      logo: "https://tse1.mm.bing.net/th/id/OIP.MhtKDmyunsCtVAZ0hYCVEgHaHa?pid=Api&h=220&P=0"
    }
  ],

  Australia: [
    {
      id: 1,
      name: "Federation University Australia",
      website: "https://www.federation.edu.au",
      logo: "https://tse3.mm.bing.net/th/id/OIP.aKHw17lfZYCuINVmlIT4ZAAAAA?pid=Api&h=220&P=0"
    },
    {
      id: 2,
      name: "Central Queensland University",
      website: "https://www.cqu.edu.au",
      logo: "https://tse4.mm.bing.net/th/id/OIP.zmzeoEZLSh942jPuErsrMQHaHa?pid=Api&h=220&P=0"
    },
    {
      id: 3,
      name: "Southern Cross University",
      website: "https://www.scu.edu.au",
      logo: "https://tse3.mm.bing.net/th/id/OIP.kAXqShZBVIFM-yKQTDrAWQHaHb?pid=Api&h=220&P=0"
    },
    {
      id: 4,
      name: "University of Southern Queensland",
      website: "https://www.unisq.edu.au",
      logo: "https://tse3.mm.bing.net/th/id/OIP.QPzFVbb9mRfIXW69nfhZPQHaHv?pid=Api&h=220&P=0"
    },
    {
      id: 5,
      name: "Edith Cowan University",
      website: "https://www.ecu.edu.au",
      logo: "https://tse3.mm.bing.net/th/id/OIP.f7tF3dY_pSIwLdQFR6gJYwHaF2?pid=Api&h=220&P=0"
    }
  ],

  Canada: [
    {
      id: 1,
      name: "Cape Breton University",
      website: "https://www.cbu.ca",
      logo: "https://tse3.mm.bing.net/th/id/OIP.bLYtJY6BsnwTfZl8dG5cVwHaHa?pid=Api&h=220&P=0"
    },
    {
      id: 2,
      name: "University Canada West",
      website: "https://www.ucanwest.ca",
      logo: "https://tse3.mm.bing.net/th/id/OIP.DyvZAlYhC62yhZEF7HjmMQHaHa?pid=Api&h=220&P=0"
    },
    {
      id: 3,
      name: "Memorial University of Newfoundland",
      website: "https://www.mun.ca",
      logo: "https://tse1.mm.bing.net/th/id/OIP.W5oEFsFE3eDkCWMSoRsx8QAAAA?pid=Api&h=220&P=0"
    },
    {
      id: 4,
      name: "University of Prince Edward Island",
      website: "https://www.upei.ca",
      logo: "https://tse2.mm.bing.net/th/id/OIP.FSBJNjtvB-Mqyja2e2e24wHaEH?pid=Api&h=220&P=0"
    },
    {
      id: 5,
      name: "University of Regina",
      website: "https://www.uregina.ca",
      logo: "https://tse3.mm.bing.net/th/id/OIP.nUkih_RHuv1CUeM1BcXomQHaEK?pid=Api&h=220&P=0"
    },
  ],
  NewZealand: [
    {
      id: 1,
      name: "Southern Institute of Technology",
      website: "https://www.sit.ac.nz/",
      logo: "https://tse4.mm.bing.net/th/id/OIP.ZA7VyrKz8a8MmeHUgrm6EAHaE8?pid=Api&h=220&P=0"
    },
    {
      id: 2,
      name: "Unitec Institude of Technology",
      website: "https://www.unitec.ac.nz",
      logo: "https://tse1.mm.bing.net/th/id/OIP.ceq3aynLix7FQUsHgaQa8AHaHa?pid=Api&h=220&P=0"
    },
    {
      id: 3,
      name: "Ara Institute of Canterbury",
      website: "https://www.ara.ac.nz",
      logo: "https://tse3.mm.bing.net/th/id/OIP.OZ4jRGM9gquzGScJbfVnAwAAAA?pid=Api&h=220&P=0"
    },
    {
      id: 4,
      name: "Otago Polytechnic",
      website: "https://www.op.ac.nz",
      logo: "https://tse3.mm.bing.net/th/id/OIP.yQcA_EIJMmdFVmNKf7GEaQAAAA?pid=Api&h=220&P=0"
    },
    {
      id: 5,
      name: "Manukau Institute of Technology",
      website: "https://www.manukau.ac.nz",
      logo: "https://tse4.mm.bing.net/th/id/OIP.jr2CWC5EJ7-emFkBuy9YFgAAAA?pid=Api&h=220&P=0"
    },
  ],
  Russia: [
    {
      id: 1,
      name: "Peoples' Friendship University of Russia (RUDN University)",
      website: "https://www.rudn.ru",
      logo: "https://tse2.mm.bing.net/th/id/OIP.GXkic9ZyF7tY-iQcpouLVAHaDA?pid=Api&h=220&P=0"
    },
    {
      id: 2,
      name: "Kazan Federal University",
      website: "https://kpfu.ru/en",
      logo: "https://tse2.mm.bing.net/th/id/OIP.V71lmBPYaahKcqfzA66xDgHaHc?pid=Api&h=220&P=0"
    },
    {
      id: 3,
      name: "Belgorod State University",
      website: "https://bsuedu.ru",
      logo: "https://tse1.mm.bing.net/th/id/OIP.QkT1SjW9GCzp0omra3r15gHaLB?pid=Api&h=220&P=0"
    },
    {
      id: 4,
      name: "South Ural State University",
      website: "https://www.susu.ru/en",
      logo: "https://tse3.mm.bing.net/th/id/OIP.qAmU1W2jNhml8dD3zXaTYwHaDl?pid=Api&h=220&P=0"
    },
    {
      id: 5,
      name: "Far Eastern Federal University",
      website: "https://www.dvfu.ru/en",
      logo: "https://tse2.mm.bing.net/th/id/OIP.RgOZjbiwWLZNzcZ2CICfiQHaHa?pid=Api&h=220&P=0"
    },
  ]
};

const fallbackLogo = "https://cdn-icons-png.flaticon.com/512/8074/8074800.png";

// --- High-End Enterprise Animation Presets ---
const slideUpScroll = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.65, 
      ease: [0.16, 1, 0.3, 1] // Apple/Stripe-style cubic-bezier ease
    } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function UniversityPartners() {
  return (
    <>
      <Navbar />

      <div className="partner-page">

        {/* Banner Section (Triggers on Load) */}
        <section className="partner-banner">
          <motion.div 
            className="banner-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1>University Partners</h1>
            <p>
              Explore our global network of trusted universities and
              institutions across multiple countries.
            </p>
          </motion.div>
        </section>

        {/* Main Section */}
        <section className="partner-section">

          {Object.entries(countries).map(([country, universities]) => (
            <motion.div 
              className="country-section" 
              key={country}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.h2 className="country-title" variants={slideUpScroll}>
                {country}
              </motion.h2>

              <motion.p className="country-subtitle" variants={slideUpScroll}>
                {universities.length} Partner Universities
              </motion.p>

              <div className="table-container">
                <table className="uni-table">
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>University Partner</th>
                      <th>Website</th>
                    </tr>
                  </thead>

                  <motion.tbody variants={staggerContainer}>
                    {universities.map((uni, index) => (
                      <tr key={uni.id}>
                        {/* Serial Number Cell */}
                        <td>
                          <motion.span 
                            variants={slideUpScroll} 
                            style={{ display: "inline-block" }}
                          >
                            {index + 1}
                          </motion.span>
                        </td>

                        {/* Logo and University Name Cell */}
                        <td>
                          <div className="uni-info">
                            <motion.div 
                              className="uni-logo-box" 
                              variants={slideUpScroll}
                            >
                              <img
                                src={uni.logo}
                                alt={uni.name}
                                onError={(e) => {
                                  e.target.src = fallbackLogo;
                                }}
                              />
                            </motion.div>
                            <motion.span 
                              className="uni-name" 
                              variants={slideUpScroll}
                              style={{ display: "inline-block" }}
                            >
                              {uni.name}
                            </motion.span>
                          </div>
                        </td>

                        {/* Visit Website Button Cell */}
                        <td>
                          <motion.div variants={slideUpScroll}>
                            <a
                              href={uni.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="website-btn"
                            >
                              Visit Website ↗
                            </a>
                          </motion.div>
                        </td>
                      </tr>
                    ))}
                  </motion.tbody>
                </table>
              </div>
            </motion.div>
          ))}

        </section>

      </div>

      <Footer />
    </>
  );
}