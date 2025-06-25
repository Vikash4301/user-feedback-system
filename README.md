# user-feedback-system

A full-stack web application for collecting and managing user feedback. Built with the MERN stack (MongoDB, Express, React, Node.js).

## 📦 Tech Stack

### Frontend
• React.js  
• Axios  
• CSS Modules or Tailwind CSS (optional)

### Backend
• Node.js  
• Express.js  
• MongoDB with Mongoose  


## ✨ Features

- Feedback form with:
  - Name input
  - Email input
  - Category (radio buttons — none selected by default)
  - Feedback textarea (slightly larger than inputs)
- Responsive design with centered heading
- Feedback text area centered but aligned from left
- Padding adjusted for better spacing
- Stores submitted feedback in the backend database

---

## 🏁 Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or Atlas) or PostgreSQL

---

## 🚀 Project Setup

### 1. Clone the Repository
```
git clone https://github.com/Vikash4301/user-feedback-system
cd user-feedback-system
```


 💻 Frontend Setup
 ```
 cd ../frontend
npm install
npm start
```


💻 Backend Setup
```
cd backend
npm install


Create a .env file and add your MongoDB connection string:
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/userfeedback

start the server:
node server.js
```

📂 Folder Structure
```
user-feedback-system/
│
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── server.js
│   └── .env
│
└── frontend/
    |   node_modules
    ├── src/
    │   ├── components/
    │   ├── App.js
    │   └── index.js
```

## 🌐 API Endpoints

| Method | Route                  | Description               |
|--------|------------------------|---------------------------|
| POST   | /api/feedback          | Submit new feedback       |
| GET    | /api/feedback          | Get all feedback entries  |


📊 Features
```
Submit feedback via form

Dashboard view with:

Category filter

Date range filter

Sort by newest/oldest

Pie chart analytics using Chart.js
```


🧪 Testing
```
Backend tested via Postman

Frontend tested manually in browser

Database verified using MongoDB Compass
```

👨‍💻 Author
```
Vikash Kumar Pathak
```










