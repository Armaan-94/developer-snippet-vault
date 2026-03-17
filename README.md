🚀 Developer Snippet Vault

A modern full-stack MERN application that allows developers to store, organize, search, and reuse code snippets.

This project showcases full-stack engineering skills including frontend UI development, backend API design, database integration, and deployment.

🌐 Live Demo

Frontend:
https://developer-snippet-vault.vercel.app

Backend API:
https://snippet-vault-api-ffyh.onrender.com/api/snippets

📌 Project Overview

Developers frequently reuse small pieces of code across projects.
This app acts as a personal code snippet manager, enabling users to:

Save reusable code snippets

Organize snippets by language

Search snippets instantly

Copy snippets to clipboard

View syntax-highlighted code

Edit or delete snippets

🛠 Tech Stack
Frontend

React

Vite

Tailwind CSS

Axios

Prism.js

Backend

Node.js

Express.js

Mongoose

Database

MongoDB

MongoDB Atlas

Deployment

Vercel (Frontend)

Render (Backend)

✨ Features
🔹 Core Features

Add new code snippets

Edit snippets

Delete snippets

View snippets in grid layout

Copy code to clipboard

🔹 Organization

Filter snippets by language

Tag-based categorization

Instant search functionality

🔹 UI/UX

Dark-themed developer interface

Fully responsive layout

Syntax highlighting (Prism.js)

Smooth hover animations

🔹 Backend Features

REST API architecture

MongoDB schema validation

Rate limiting

Request logging

Security headers (Helmet)

Input validation

🧱 Project Architecture
Client (React)
      │
      │ Axios API calls
      ▼
Backend (Express API)
      │
      │ Mongoose ODM
      ▼
MongoDB Atlas
Deployment Architecture
User Browser
      │
      ▼
Vercel (Frontend)
      │
      ▼
Render (Backend API)
      │
      ▼
MongoDB Atlas
📁 Folder Structure
developer-snippet-vault
│
├── client
│   ├── components
│   ├── pages
│   ├── api
│   └── App.jsx
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
🔌 API Endpoints
Get All Snippets
GET /api/snippets
Get Single Snippet
GET /api/snippets/:id
Create Snippet
POST /api/snippets
Request Body
{
  "title": "Binary Search",
  "language": "JavaScript",
  "description": "Classic binary search algorithm",
  "code": "...",
  "tags": ["algorithm"]
}
Update Snippet
PUT /api/snippets/:id
Delete Snippet
DELETE /api/snippets/:id
⚙️ Local Setup
1. Clone Repository
git clone https://github.com/Armaan-94/developer-snippet-vault.git
2. Setup Backend
cd server
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173

Run backend:

npm run dev
3. Setup Frontend
cd client
npm install

Create a .env file:

VITE_API_URL=http://localhost:5000/api

Run frontend:

npm run dev
🔐 Security Features

Rate limiting

Helmet security headers

Input validation

Request logging

Request body size limits

🚀 Deployment
Frontend (Vercel)

Push code to GitHub

Connect repository to Vercel

Set environment variable:

VITE_API_URL=https://your-backend-url/api
Backend (Render)

Connect GitHub repository

Select /server folder

Add environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=https://developer-snippet-vault.vercel.app
📚 Example Snippet Types

The application supports multiple categories:

Java algorithms

JavaScript utilities

React hooks

Node.js backend utilities

Python algorithms

Example Snippets

Binary Search

Debounce Function

Two Sum (Hash Map)

Merge Sort

React useLocalStorage Hook

📄 License

This project is open-source and available under the MIT License.
