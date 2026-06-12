# JBL Website — Headphones & Speakers (MVC Architecture)

A modern, fully responsive JBL-style website built using the **MVC (Model-View-Controller)** architecture.

> Sections built (as per requirement): **Hero Section, About Us page, Login page, Signup page** — plus a shared Navbar & Footer so the site looks complete.

## Features
- ✅ User Signup with MongoDB storage (bcrypt password hashing)
- ✅ Duplicate email detection with friendly redirect to Login
- ✅ User Login with JWT authentication
- ✅ Forgot Password with 6-digit token (15-minute expiry)
- ✅ Reset Password with token validation
- ✅ User avatar shown on Navbar after login (initials-based)
- ✅ Dropdown on user icon shows name + email + Logout button
- ✅ Logout clears session and redirects to Home



## Prerequisites

## Tech Stack

| Layer       | Technology                                |
|-------------|-------------------------------------------|
| Frontend    | React 18, React Router v6, Axios, CSS3    |
| Backend     | Node.js, Express.js, express-validator    |
| Database    | MongoDB (Compass) |
| Pattern     | MVC                                       |
| Styling     | Custom CSS (responsive, mobile-first)     |
| Icons/Fonts | FontAwesome 6, Oswald & Poppins (Google)  |
Install these tools before running the project:

1. **Node.js** (v16 or higher) — https://nodejs.org/
2. **npm** (comes with Node.js) — OR **yarn** (recommended)
3. **MongoDB** *(optional)* — only required if you want to persist users; current code only validates without storing.
4. A code editor (VS Code recommended).

- MongoDB Compass running locally (`mongodb://localhost:27017`)

## Setup & Run

### 1. Start MongoDB Compass
Open MongoDB Compass and connect to:
```
mongodb://localhost:27017
```
The database `jbl_website` will be created automatically on first signup.

### 2. Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```



## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/forgot-password` | Generate reset token |
| POST | `/api/auth/reset-password` | Reset password with token |
| GET  | `/api/auth/me` | Get logged-in user (JWT required) |
| GET  | `/api/health` | Health check |



## Forgot Password (Dev Mode)
Since no email service is configured, the reset token is returned directly in the API response and displayed on screen in a blue box. In production, replace with Nodemailer/SendGrid to email the token.


## MongoDB Collections
- **users** — stores fullName, email, hashed password, resetPasswordToken, resetPasswordExpires, timestamps
