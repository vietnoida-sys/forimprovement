# VietWorldGate + EduAdmin — Fully Merged Project

This version combines both projects into **a single frontend** and **a single backend**.
Previously, the ZIP file contained two separate applications. Now, everything runs from **one Vite React application** and **one Express server**.

```text
combined/
├── backend/     Single Express + MongoDB server — Public Website API + EduAdmin CRM/Portal API
└── frontend/    Single React (Vite) application — Public Website (/) + Student/Admin Portal (/portal)
```

## How It Works

* The **Public Website (VietWorldGate)** continues to run as usual at `http://localhost:5173/`.
* The **Student/Admin Portal (EduAdmin)** is now integrated into the same React application and is accessible at `http://localhost:5173/portal`. It uses the same React build and is served through a different route.
* Both applications share a **single backend server** running at `http://localhost:5000`, using the same MongoDB database and the same `.env` configuration.

The website's profile dropdown in the navigation bar includes a **"Student Portal (Upload Documents)"** option that redirects users to `/portal/login`.

---

# What's New (Based on Your Latest Requirements)

## 1. Student Document Upload → Admin & Counsellor Notifications

Students can log in to the `/portal` and upload their documents, such as:

* Passport
* Transcript
* Statement of Purpose (SOP)
* IELTS Score
* Other required documents

As soon as a document is uploaded, both the **Admin** and the **assigned Counsellor** receive an in-app notification, which appears in the notification bell (🔔) and on the Notifications page.

---

## 2. Admin Document Sharing with Students (NEW)

Admins and Counsellors can now use the **Documents** page to share documents with students.

They can:

* Share a document, form, or circular with **a single student**, or
* Broadcast the same document to **all students** (for example, scholarship forms, visa checklists, or important announcements).

Students instantly receive a notification informing them that a document has been shared with them.

The shared document also appears in the student's **My Documents** section under a separate category labeled **"Shared by ..."**.

---

## 3. Scholarship Notifications (Including University Name)

Whenever an Admin or Counsellor creates a new scholarship, **all students** automatically receive a notification containing:

* Scholarship Name
* University Name
* Scholarship Amount

Example:

> **Merit Scholarship at Oxford University — Up to USD 5,000. Check your eligibility.**

---

## 4. New University Notifications

Whenever a new university is added by the Admin or Counsellor, all students automatically receive an in-app notification informing them about the newly added university.

---

## 5. Website "Book Appointment" Form Integrated with EduAdmin

The **Book Appointment** form on the VietWorldGate public website is now fully integrated with EduAdmin.

When a visitor submits the form:

* The inquiry is saved to the database (existing functionality).
* A confirmation email is sent (existing functionality).
* **New:** An in-app notification is created inside EduAdmin so that Admins and Counsellors can immediately view new website inquiries directly from the CRM without leaving the system.

---

# Setup

## Backend

```bash
cd combined/backend

npm install

# The .env file already contains your existing MongoDB Atlas
# connection string and Gmail credentials.

npm run seed      # Creates demo Admin, Counsellor, and Student accounts
npm run dev       # Starts the server at http://localhost:5000
```

### Demo Login Credentials

| Role       | Email                                                     | Password      |
| ---------- | --------------------------------------------------------- | ------------- |
| Admin      | [admin@eduadmin.com](mailto:admin@eduadmin.com)           | admin123      |
| Counsellor | [counsellor@eduadmin.com](mailto:counsellor@eduadmin.com) | counsellor123 |
| Student    | [student@eduadmin.com](mailto:student@eduadmin.com)       | student123    |

---

## Frontend

```bash
cd combined/frontend

npm install

npm run dev
```

Application URLs:

* **Public Website:** `http://localhost:5173/`
* **Portal Login:** `http://localhost:5173/portal/login`

---

# Quick Test Flow (5-Minute Verification)

### 1. Student Upload

* Log in using `student@eduadmin.com`.
* Navigate to **My Documents**.
* Upload any document.

**Expected Result:**
The Admin and Counsellor should receive a notification about the uploaded document.

---

### 2. Admin Notification Check

* Log in using `admin@eduadmin.com`.
* Click the notification bell.

**Expected Result:**
A notification for the newly uploaded student document should be visible.

---

### 3. Share a Document

* Go to the **Documents** page.
* Click **Share with Students**.
* Share any document with **All Students**.

---

### 4. Student Notification

* Log back in as the student.
* Check the notification bell.

**Expected Result:**

* A notification indicating that a document has been shared.
* The document appears in **My Documents** under **"Shared by Super Admin."**

---

### 5. Scholarship Notification

* Log in as the Admin.
* Navigate to **Scholarships**.
* Create a new scholarship and select a university.

**Expected Result:**
Students receive a notification displaying:

* Scholarship Name
* University Name
* Scholarship Amount

---

### 6. Website Inquiry

* Open the public website homepage.
* Submit the **Book Appointment** form.

**Expected Result:**
# 
* The inquiry is saved in the database.
* A confirmation email is sent.
* Admins and Counsellors receive an in-app notification inside EduAdmin.

---

# Important Notes

* The `.env` file already contains your existing MongoDB Atlas connection string and Gmail App Password from your original project. Before deploying to production, replace these values with your production credentials and generate a new secure `JWT_SECRET`.

* File uploads are currently stored locally in:

```
backend/uploads/
```

For production deployments, it is recommended to use cloud storage services such as **Amazon S3** or **Cloudinary**.

* The project package does **not** include:

  * `.git`
  * `node_modules`

Simply run:

```bash
npm install
```

to reinstall all required dependencies.

* When deploying to static hosting platforms such as **Vercel** or **Netlify**, make sure to configure an SPA rewrite rule that redirects all routes to `index.html`. This ensures routes such as `/portal/login`, `/portal/dashboard`, and `/portal/documents` continue to work correctly even after a browser refresh.
