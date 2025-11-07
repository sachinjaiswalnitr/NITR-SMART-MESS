# 🍽️ NITR Mess Plus – Digital Mess Management System

**NITR Mess Plus** is a full-stack web application developed for **NIT Rourkela** to digitalize hostel mess operations.  
It enables students to **book meals, view menus, and track tokens**, while administrators can **verify bookings** and manage daily records — ensuring a transparent and paperless mess experience.

---

## ✨ Key Features

### 🍛 Meal Booking
- Book meals for the next day (Breakfast, Lunch, Snacks, Dinner) using digital tokens.
- Tokens are automatically deducted upon booking to prevent duplicates.
- Real-time dashboard displaying remaining tokens for each meal.

### 🧑‍💼 Admin Verification
- Separate admin dashboard to view all bookings for today and yesterday.
- One-click meal verification — once verified, it can’t be reused.
- Tracks daily consumption and maintains a record of verified meals.

### 🎟️ Token Management
- Each student starts with **15 tokens per meal type** per month.
- Tokens are **automatically reset monthly** using scheduled cron jobs.
- Prevents overbooking or token misuse through server-side checks.

### 🔐 User Experience
- Separate login portals for **students** and **administrators**.
- Secure authentication using **JWT** and **bcrypt** encryption.
- Modern, responsive UI built with **ReactJS** and **TailwindCSS**.
- Profile image uploads handled via **Cloudinary** integration.

---

## 🛠️ Tech Stack

**Frontend:** ReactJS, TailwindCSS  
**Backend:** NodeJS, ExpressJS, MongoDB  
**Authentication:** JWT, bcrypt  
**Image Uploads:** Cloudinary  
**Automation:** Node-cron (for monthly token reset)  
**Other:** Axios, CORS  

---

## 🚀 Live Demo & Code
🔗 **Live Link:** [Add your deployed link here]  
📦 **GitHub Repository:** [Add your repository link here]

---