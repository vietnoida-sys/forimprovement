import React from "react";
import Navbar from "../components/Navbar"; 
const partners = [
  {
    name: "SBI",
    logo: "https://sbi.bank.in/o/SBI-Theme/images/custom/logo.png",
  },
  {
    name: "Bank of Baroda",
    logo: "https://tse1.mm.bing.net/th/id/OIP.Vi4xayCmsKDHn7Wlgy-18gHaB-?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "Bank of India",
    logo: "https://tse3.mm.bing.net/th/id/OIP.Tm3mZuObk8flgHit1yikugAAAA?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "UBI Services",
    logo: "https://tse4.mm.bing.net/th/id/OIP.YLQIPy37N6EJNNUdCB_gbAHaCK?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "Bank of Maharashtra",
    logo: "https://tse1.mm.bing.net/th/id/OIP.7u6LMpfkyz1GV71FQq5s4gHaBg?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "PNB",
    logo: "https://tse2.mm.bing.net/th/id/OIP.IDFR5K3QIecBHMrqxPmTZQHaDt?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "Saraswat Bank",
    logo: "https://tse3.mm.bing.net/th/id/OIP.dDG9jRJAPY-54AGgGZaHfAHaCN?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "ICICI Bank",
    logo: "https://tse4.mm.bing.net/th/id/OIP.NXKvf6MylCQhlGqqRG89GwHaBd?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "IDFC FIRST Bank",
    logo: "https://tse4.mm.bing.net/th/id/OIP.6VlGpXHRm1M2XdDrvBfKygHaEH?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "Axis Bank",
    logo: "https://tse4.mm.bing.net/th/id/OIP.vuay4ohGaUxfnmT1r9XFZQHaHa?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "Yes Bank",
    logo: "https://tse4.mm.bing.net/th/id/OIP.GfzzLZvig1OpjPsVtHMazwHaDa?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "Credila",
    logo: "https://tse1.mm.bing.net/th/id/OIP.Hck3Y9G1uHKSKdbBCBP8PAHaCa?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "Avanse",
    logo: "https://tse1.mm.bing.net/th/id/OIP.zfQRcGdozjRQu23igLK1EAHaC5?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "Auxilo",
    logo: "https://tse1.mm.bing.net/th/id/OIP.JL5v_hQRdoe1vf1-pgR5ewHaHa?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "InCred",
    logo: "https://images.financialexpressdigital.com/2025/08/Incred-1-1024x450-edtttt.png",
  },
  {
    name: "Tata Capital",
    logo: "https://tse4.mm.bing.net/th/id/OIP.8MnqjdSnan-aSfLAK3OaSQHaEK?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "MPower Financing",
    logo: "https://tse1.mm.bing.net/th/id/OIP.0vHoxp26aFjZBwjnbpD4AAHaCU?r=0&pid=Api&h=220&P=0",
  },
  {
    name: "Prodigy Finance",
    logo: "https://tse1.mm.bing.net/th/id/OIP.LHB9m0piVp1OaLhcmyE7wQHaD4?r=0&pid=Api&h=220&P=0",
  },
];

export default function LoanProcessSection() {
  return (
    <>
      <Navbar />

      <div className="lp-page">
        <style>{`
          .lp-page {
            --cream: #FBF4E9;
            --accent-dark: #0b0802;
            font-family: 'Segoe UI', system-ui, sans-serif;
          }

          .lp-partners {
            background: var(--cream);
            padding: 64px 8vw 72px;
          }

          .lp-partners-title {
            text-align: center;
            color: var(--accent-dark);
            font-size: clamp(1.8rem, 2.6vw, 2.3rem);
            font-weight: 800;
            margin-bottom: 50px;
          }

          .lp-partners-grid {
            display: grid;
            grid-template-columns: repeat(3, 2fr);
            gap: 32px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .lp-partner-badge {
            background: #fff;
            border-radius: 12px;
            min-height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-shadow: 0 5px 18px rgba(0,0,0,.08);
            transition: .3s;
          }

          .lp-partner-badge:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 24px rgba(0,0,0,.12);
          }

          .lp-partner-logo {
            width: 180px;
            max-width: 100%;
            max-height: 70px;
            object-fit: contain;
          }

          @media (max-width: 900px) {
            .lp-partners-grid {
              grid-template-columns: repeat(2, 2fr);
            }
          }

          @media (max-width: 520px) {
            .lp-partners-grid {
              grid-template-columns: 2fr;
            }

            .lp-partner-logo {
              width: 150px;
            }
          }
        `}</style>

        <section className="lp-partners">
          <h3 className="lp-partners-title">
            Our Banking Partners
          </h3>

          <div className="lp-partners-grid">
            {partners.map((partner) => (
              <div
                className="lp-partner-badge"
                key={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="lp-partner-logo"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </section>
      </div>

     
    </>
  );
}