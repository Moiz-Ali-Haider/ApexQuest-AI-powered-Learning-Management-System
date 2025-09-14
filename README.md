# ApexQuest: A Feature-Rich Learning Management System

![ApexQuest Logo](frontend/src/assets/logo.png)

**Live Demo:** https://apexquest-a-lms-website-1.onrender.com

ApexQuest is a modern, **AI-enhanced** Learning Management System (LMS) built to provide an intelligent and interactive learning experience. This full-stack MERN application features a powerful **AI-powered search assistant**, alongside robust functionalities like secure payments with Razorpay, complete course and lecture management, and seamless user authentication with Google OAuth.

## 🌟 Key Features

* **🤖 AI-Powered Course Search:** The standout feature of ApexQuest. An intelligent assistant helps students discover the perfect course by understanding natural language queries, making course discovery intuitive and efficient.

* **💳 Secure Payment Gateway:** Fully integrated with Razorpay to handle course purchases securely, providing a seamless and trustworthy transaction process for students.

* **🔐 Comprehensive User Authentication:** Secure signup/login with email and password, plus Google OAuth for one-click access. Includes a robust OTP-based password reset system.

* **📚 Full Course & Lecture Management:** A dedicated dashboard for educators to create, update, and manage their courses and video lectures with ease.

* **👤 Personalized Student Dashboards:** Allows students to view their enrolled courses, track their progress, and manage their profiles.

## 🎥 Project Demo

*(It is highly recommended to add a GIF or a short video demonstrating your application here, especially the AI search feature.)*

![ApexQuest AI Demo GIF](link-to-your-demo.gif)

## 🛠️ Tech Stack

### Frontend:
* **React.js:** A JavaScript library for building user interfaces.
* **Redux Toolkit:** For predictable state management.
* **React Router:** For declarative routing in your React application.
* **Axios:** For making HTTP requests to the backend.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Firebase:** For Google OAuth authentication.

### Backend:
* **Node.js:** A JavaScript runtime for building server-side applications.
* **Express.js:** A fast and minimalist web framework for Node.js.
* **MongoDB:** A NoSQL database for storing application data.
* **Mongoose:** An ODM for modeling and managing data in MongoDB.
* **JWT (JSON Web Tokens):** For secure user authentication and authorization.
* **Bcrypt.js:** For hashing user passwords.
* **Cloudinary:** For storing and managing user-uploaded images and videos.
* **Nodemailer:** For sending emails (e.g., OTP for password reset).
* **Razorpay:** For processing payments.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js
* npm (or yarn)
* MongoDB

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/ApexQuest-A-LMS-Website.git](https://github.com/your-username/ApexQuest-A-LMS-Website.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd ApexQuest-A-LMS-Website-main
    ```
3.  **Install backend dependencies:**
    ```sh
    cd backend
    npm install
    ```
4.  **Install frontend dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

### Configuration

1.  **Backend Environment Variables:** Create a `.env` file in the `backend` directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    SMTP_HOST=your_smtp_host
    SMTP_PORT=your_smtp_port
    SMTP_USER=your_smtp_user
    SMTP_PASS=your_smtp_password
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```
2.  **Frontend Environment Variables:** Create a `.env` file in the `frontend` directory and add your backend server URL:
    ```env
    VITE_SERVER_URL=http://localhost:5000
    ```

### Running the Application

1.  **Start the backend server:**
    ```sh
    cd backend
    npm start
    ```
2.  **Start the frontend development server:**
    ```sh
    cd ../frontend
    npm run dev
    ```

Open [http://localhost:5173](http://localhost:5173) (or whatever port your terminal indicates) to view it in the browser.
Open [http://localhost:5173](http://localhost:5173) (or whatever port your terminal indicates) to view it in the browser.
