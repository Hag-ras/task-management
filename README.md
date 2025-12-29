# Task Management Application

A modern, full-stack task management application designed to provide a seamless and responsive user experience for organizing daily tasks. Built with the MERN stack and a focus on clean code, scalability, and a polished user interface.

---

## ✨ Features

- **Secure Authentication**: JWT-based user registration and login flow.
- **CRUD Operations**: Create, Read, Update, and Delete tasks with intuitive modals.
- **User-Specific Tasks**: Users can only view and manage their own tasks.
- **Responsive Design**: A great user experience on both desktop and mobile devices.
- **Modern UI**: Built with Ant Design, styled with Tailwind CSS, and enhanced with smooth animations from Framer Motion.
- **Intuitive UX**: A clean landing page, a single authentication modal, and helpful confirmation dialogues.

---

## 📸 Screenshots

### Authentication Flow

The user journey begins with a clean landing page, leading to a single, elegant modal for both signing in and signing up.

![Landing Page](./screenshots/landing-page.png) | ![Sign-In Modal](./screenshots/Sign-in.png) | ![Sign-Up Modal](./screenshots/Sign-up.png) |

### Application & Task Management

Once logged in, users are presented with a clean dashboard where they can create, edit, and delete their tasks.

| Home Dashboard                            | Create Task Modal                                   | Edit Task Modal                                 | Delete Confirmation                                           | Not Found Page                                          |
| ----------------------------------------- | --------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| ![Home Dashboard](./screenshots/Home.png) | ![Create Task Modal](./screenshots/Create-task.png) | ![Edit Task Modal](./screenshots/Edit-task.png) | ![Delete Confirmation](./screenshots/Delete-Confirmation.png) | ![404 Not Found Page](./screenshots/Not-found-page.png) |

---

## 🛠️ Tech Stack

### Frontend

- **React (Vite)**: A fast and modern JavaScript library for building user interfaces.
- **Ant Design**: A comprehensive UI component library for building elegant interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid styling.
- **Framer Motion**: A production-ready animation library for React.
- **Axios**: For making HTTP requests to the backend API.
- **React Router DOM**: For handling client-side routing.

### Backend

- **Node.js**: A JavaScript runtime environment.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing user and task data.
- **Mongoose**: An ODM library for MongoDB to model application data.
- **JSON Web Token (JWT)**: For implementing secure, stateless authentication.
- **bcryptjs**: For hashing user passwords.
- **CORS**: To enable cross-origin resource sharing between the frontend and backend.

---

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- `npm` (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) or [Docker](https://www.docker.com/)

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
# and add the following variables:
# MONGO_URI=mongodb://localhost:27017/taskmanager
# JWT_SECRET=your_super_secret_and_long_key
# PORT=5000

# Start the backend server
nodemon server.js
```
