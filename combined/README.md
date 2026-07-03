# VietWorldGate + EduAdmin — Fully Merged Project

Is baar dono projects **ek hi frontend** aur **ek hi backend** mein merge kiye gaye hain
(pehle wali zip mein do alag apps thi — ab ek hi Vite app aur ek hi Express server hai).

```
combined/
├── backend/     Single Express + MongoDB server — public website API + EduAdmin CRM/Portal API
└── frontend/    Single React (Vite) app — public website (/) + Student/Admin Portal (/portal)
```

## Kaise kaam karta hai

- **Public website** (VietWorldGate) waise hi chalti hai — `http://localhost:5173/`
- **Student / Admin Portal** (EduAdmin) ab isi app ke andar `http://localhost:5173/portal` par
  chalta hai — same React app, same build, sirf ek dusre route ke through
- Dono backend **ek hi server** (`http://localhost:5000`) se serve hote hain — same MongoDB
  database, same `.env`

Website ke Navbar mein profile dropdown ke andar **"Student Portal (Upload Documents)"**
link hai jo `/portal/login` par le jaata hai.

---

## Naya kya add hua (aapki latest request ke mutabik)

### 1. Student document upload → Admin/Counsellor notification
Student `/portal` login karke apne documents upload karta hai
(Passport, Transcript, SOP, IELTS score, etc). Upload hote hi **Admin + Counsellor** dono ko
notification jaata hai (bell icon 🔔 + notifications page).

### 2. Admin document upload for students (NAYA)
Admin/Counsellor ab **Documents** page se "Share with students" button use karke:
- **Single student** ko koi document/form/circular bhej sakta hai, ya
- **All students** ko ek saath broadcast kar sakta hai (e.g. scholarship form, visa checklist,
  koi circular)

Jis student(s) ko document mila, unko turant notification jaata hai — "X ne aapke saath
document share kiya" — aur wo document unke "My Documents" section mein alag se
("Shared by ...") dikhta hai.

### 3. Scholarship notification (university ke naam ke saath)
Jab admin/counsellor koi naya scholarship add karta hai, **sab students** ko notification
jaata hai jisme scholarship ka naam, **university ka naam**, aur amount saaf dikhta hai —
e.g. *"Merit Scholarship at Oxford University — up to 5000 USD. Check eligibility."*

### 4. University add → students ko notification
Naya university add hone par bhi sab students ko notification jaata hai.

### 5. Website ka "Book Appointment" form ab EduAdmin se connected hai
VietWorldGate website ka appointment/inquiry form ab:
- Database mein save hota hai (pehle jaisa)
- Email bhejta hai (pehle jaisa)
- **Naya**: Admin/Counsellor ko EduAdmin ke andar bhi ek in-app notification milta hai, taaki
  wo CRM se bahar jaaye bina naye website inquiries dekh sakein

---

## Setup

### Backend
```bash
cd combined/backend
npm install
# .env already filled in with your existing MongoDB Atlas + Gmail credentials
npm run seed      # demo admin + counsellor + student accounts banata hai
npm run dev        # http://localhost:5000
```

Demo logins (seed ke baad):
| Role | Email | Password |
|---|---|---|
| Admin | admin@eduadmin.com | admin123 |
| Counsellor | counsellor@eduadmin.com | counsellor123 |
| Student | student@eduadmin.com | student123 |

### Frontend
```bash
cd combined/frontend
npm install
npm run dev        # http://localhost:5173
```

- Public site: `http://localhost:5173/`
- Portal login: `http://localhost:5173/portal/login`

## Test flow (5 minute check)

1. `student@eduadmin.com` se `/portal/login` par login karein → **My Documents** → koi
   document upload karein.
2. `admin@eduadmin.com` se login karke bell icon check karein → naya document notification
   dikhega.
3. Admin ke **Documents** page par "Share with students" click karke koi document **All
   students** ko share karein.
4. Student account se login karke bell icon check karein → "shared with you" notification
   dikhega, aur My Documents mein "Shared by Super Admin" wala document dikhega.
5. Admin ke **Scholarships** page se naya scholarship add karein (university select karke) →
   student ke notifications mein university ka naam ke saath scholarship notification aayega.
6. Website home page (`/`) par jaake "Book Appointment" form fill karein → admin/counsellor
   ke notifications mein naya website inquiry dikhega.

---

## Important notes

- `.env` mein aapke real MongoDB Atlas connection string aur Gmail app-password already daale
  hain (aapki original files se) — production mein deploy karne se pehle inhe apne production
  values se replace karein, aur `JWT_SECRET` ko bhi ek naya random secret bana lein.
- File uploads abhi local disk (`backend/uploads/`) par store hote hain — production ke liye
  S3/Cloudinary use karna recommend karta hoon.
- `.git` aur `node_modules` (dono projects se) is zip mein nahi hain — `npm install` se
  dobara ban jaayenge.
- Deploy karte waqt, static hosting (Vercel/Netlify) par SPA rewrite rule zaroor set karein
  (sab paths ko `index.html` par rewrite karna) — isse `/portal/...` routes bhi refresh par
  sahi se load honge.
