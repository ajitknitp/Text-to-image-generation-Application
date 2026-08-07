# Imagify — Text to Image Generation App

Imagify is a full-stack MERN application that allows users to generate AI images from text prompts. It features user authentication, a credit-based usage system, and integrated payment gateway support for purchasing additional credits.

**Live Demo:** [imagify](https://ai-text-to-image-saas-web-app.vercel.app/)
**Backend API:** [backend](https://ai-text-to-image-saas-web-app.onrender.com/)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
 

---

## Features

- 🔐 User authentication (Sign up / Login) with JWT-based sessions
- 🎨 Text-to-image generation using AI
- 💳 Credit-based system with secure payment gateway integration
- 📱 Fully responsive UI across devices
- ⚡ Fast, optimized frontend built with Vite + React
- 🌐 RESTful API backend with MongoDB for data persistence
- 🔄 Real-time credit balance updates

---

## Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- Axios
- React Toastify
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT) for authentication
- Payment Gateway Integration (Razorpay / Stripe)

**Deployment**
- Frontend: [Vercel](https://vercel.com)
- Backend: [Render](https://render.com)
- Database: [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## Project Structure

```
imagify/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── assets/
│   ├── .env
│   └── package.json
│
├── server/                 # Node/Express backend
│   ├── config/
│   │   └── mongodb.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── imageRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/imagify.git
   cd imagify
   ```

2. **Setup the backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory (see [Environment Variables](#environment-variables)).
   ```bash
   npm run server
   ```

3. **Setup the frontend**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file in the `client` directory (see [Environment Variables](#environment-variables)).
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Environment Variables

### Backend (`server/.env`)

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend.vercel.app
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLIPDROP_API_KEY=your_image_generation_api_key
```

### Frontend (`client/.env`)

```env
VITE_BACKEND_URL=https://your-backend.onrender.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

> **Note:** Never commit `.env` files to version control. Ensure `.env` is listed in `.gitignore`.

---

## API Endpoints

### User Routes (`/api/user`)

| Method | Endpoint          | Description                  | Auth Required |
|--------|-------------------|-------------------------------|----------------|
| POST   | `/register`       | Register a new user           | No             |
| POST   | `/login`           | Login an existing user        | No             |
| GET    | `/credits`         | Get user credit balance       | Yes            |
| POST   | `/pay-razor`       | Initiate a payment order       | Yes            |
| POST   | `/verify-razor`    | Verify payment and add credits | Yes            |

### Image Routes (`/api/image`)

| Method | Endpoint     | Description                | Auth Required |
|--------|--------------|------------------------------|----------------|
| POST   | `/generate`  | Generate an image from text | Yes            |

---

## Deployment

### Backend — Render

1. Push the `server` folder to GitHub.
2. Create a new **Web Service** on [Render](https://render.com).
3. Set the **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add all backend environment variables in the Render dashboard.

### Frontend — Vercel

1. Push the `client` folder to GitHub.
2. Import the project on [Vercel](https://vercel.com/new).
3. Set the **Root Directory** to `client`.
4. Framework Preset: Vite
5. Add all frontend environment variables in the Vercel dashboard.
6. Deploy.

> After deployment, update `FRONTEND_URL` in the backend environment variables with the live Vercel URL to enable CORS.

---

 

## Author

**Your Name**
- GitHub: [shivam kumar](https://github.com/shivam-singh6110)
- LinkedIn: [shivam kumar](https://www.linkedin.com/in/shivam-kumar61/)

---

*Feel free to star ⭐ this repository if you found it useful!*
