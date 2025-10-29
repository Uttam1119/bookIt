# BookIt

A full-stack booking platform built with **Vite + React** for the frontend and **Node.js + Express + MongoDB** for the backend.  
The project enables users to browse experiences, select date & time slots, apply promo codes, and book with real-time capacity tracking and duplication prevention.

## 📦 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **API:** REST endpoints for experiences & bookings
- **Deployment:** Render for backend and Vercel for frontend
- **Other Features:**
  - Slot capacity reduction after booking
  - Prevent duplicate bookings per slot & email
  - Promo code validation
  - Fully responsive UI (light theme only)

## 🎯 Features

- Browse experiences with images, titles, locations, pricing.
- Choose a date, pick a time slot showing “X left” availability.
- Book with name, email, promo codes and qty.
- Booking result page shows _Booking Confirmed_ or _Failed / Duplicate_.
- Capacity automatically updates so next user sees real availability.
- Responsive header, input validations, clean UI using Tailwind.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Uttam1119/bookIt.git
cd bookIt
```

### 2. Backend setup

```bash
cd backend
npm install
*create a .env file using .env.example*
npm start
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
*create a .env file using .env.example*
npm run dev
```

### 4. Access the app

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:4000](http://localhost:4000)

## 🧭 Project Structure

```
backend
├── src
│   ├── models
│   │   ├── Booking.js
│   │   └── Experience.js
│   ├── routes
│   │   ├── bookings.js
│   │   ├── experiences.js
│   │   ├── promo.js
│   └── index.js
│   └── seed.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

frontend
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── ExperienceCard.tsx
│   │   ├── Header.tsx
│   │   └── Loader.tsx
│   ├── pages
│   │   ├── Checkout.tsx
│   │   ├── Details.tsx
│   │   ├── Home.tsx
│   │   └── Result.tsx
│   ├── utils/
│   │   └── getErrorMessage.ts
│   ├── api.ts
│   ├── types.ts
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── vite-env.d.ts
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tailwind.config.cjs
├── postcss.config.cjs
├── vite.config.ts
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.json
└── README.md

```

## ✅ Important Behaviors & Implementation Details

- **Prevent Double-Booking:** Backend checks if a slot is already booked by the same email for the same slot.
- **Reduce Slot Capacity:** On successful booking, `slot.capacity` is reduced and `Experience` document saved.
- **Validation:** Full name (min length), email pattern, quantity within available capacity.

## 📄 API Endpoints

- `GET /experiences` → List of experiences
- `GET /experiences/:id` → Experience with slots
- `POST /bookings`

  ```json
  {
    "experienceId": "<id>",
    "slotId": "<slot id>",
    "name": "Your Name",
    "email": "you@example.com",
    "promoCode": "PROMO123", // optional
    "quantity": 2
  }
  ```

  Response success:

  ```json
  { "success": true, "booking": { ... } }
  ```

  Errors:

  - `400` missing fields
  - `409` duplicate booking or capacity exceeded

---
