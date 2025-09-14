# ApexQuest: Frontend

This is the frontend for ApexQuest, a modern Learning Management System. It's built with React.js and utilizes a suite of modern technologies to create a fast, responsive, and user-friendly experience.

## ✨ Features

* **Component-Based Architecture:** Built with reusable and maintainable React components.
* **State Management with Redux:** Centralized and predictable state management using Redux Toolkit for user data, courses, and lectures.
* **Responsive Design:** A mobile-first approach using Tailwind CSS to ensure a great experience on all devices.
* **Routing:** Client-side routing with React Router for a seamless single-page application (SPA) experience.
* **Custom Hooks:** Custom hooks for fetching and managing data, promoting code reuse and separation of concerns.

##🛠️ Tech Stack

* **React.js:** A JavaScript library for building user interfaces.
* **Redux Toolkit:** For predictable state management.
* **React Router:** For declarative routing in your React application.
* **Axios:** For making HTTP requests to the backend.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Firebase:** For Google OAuth authentication.
* **React Icons:** For including popular icons in your project.
* **React Toastify:** For displaying notifications to the user.
* **React Spinners:** For loading indicators.

## 🚀 Getting Started

### Prerequisites

* Node.js
* npm (or yarn)

### Installation

1.  **Clone the repository (if you haven't already):**
    ```sh
    git clone [https://github.com/your-username/ApexQuest-A-LMS-Website.git](https://github.com/your-username/ApexQuest-A-LMS-Website.git)
    ```
2.  **Navigate to the frontend directory:**
    ```sh
    cd ApexQuest-A-LMS-Website-main/frontend
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```

### Configuration

Create a `.env` file in the `frontend` directory and add the following environment variables:

```env
VITE_SERVER_URL=http://localhost:5000 # Your backend server URL
VITE_FIREBASE_API_KEY=your_firebase_api_key

