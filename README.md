# 🤖 MockMentor — AI-Powered Mock Interview Platform

MockMentor is a full-stack AI-powered interview preparation platform designed to help students and job seekers practice real-world technical and HR interviews through personalized interview simulations, resume-based question generation, and intelligent AI feedback.

The platform creates an interactive interview environment where users can improve confidence, communication, and problem-solving skills before actual placements and job interviews.

---

# 🚀 Key Features

* 🤖 AI-generated interview questions
* 📄 Resume-based personalized interview flow
* 🧠 Technical & HR interview simulations
* 📊 AI-powered interview feedback and evaluation
* 📚 Interview history tracking
* 🔐 Secure Google Authentication with Firebase
* 💳 Credit-based interview system
* 💰 Razorpay payment integration
* 📥 PDF resume upload support
* 🎨 Modern UI with smooth animations using Framer Motion
* 📱 Fully responsive across devices.

---

# 🧠 What Problem Does It Solve?

Many students struggle with interview preparation because of:

* lack of real interview exposure.
* absence of personalized guidance.
* limited feedback mechanisms.
* low confidence during placements.
* 

MockMentor solves this by providing a realistic AI-driven mock interview experience tailored to individual resumes and career goals.

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Redux Toolkit
* Framer Motion
* Axios

## Backend & Database

* Node.js
* Express.js
* MongoDB Atlas
* OpenAI API

## Payments

* Razorpay

## Deployment

* Vercel (Frontend)
* Render (Backend)

---

# 📂 Project Structure

```bash
MockMentor/
│
├── frontend/       # React + Vite frontend
├── backend/        # Node + Express backend
└── README.md
```

---

# ⚙️ Environment Variables

## Frontend (`frontend/.env`)

```env
VITE_API_URL=your_backend_url
VITE_FIREBASE_APIKEY=your_firebase_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

---

## Backend (`backend/.env`)

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=your_frontend_url
```

---

# ⚙️ Local Setup

## Clone Repository

```bash
git clone https://github.com/anjalideshmukh969/MockMentor.git
cd MockMentor
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🌐 Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |

---


# 🎯 Future Enhancements

* 🎙️ Voice-based AI interviews
* 📹 Real-time video interview simulation
* 📈 Advanced performance analytics
* 🌍 Multi-language interview support
* 🧑‍💼 Company-specific interview preparation
* 🏆 Gamification and leaderboards

---

# 👩‍💻 Author

**Anjali Deshmukh**
