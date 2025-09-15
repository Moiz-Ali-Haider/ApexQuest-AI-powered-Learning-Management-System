# ApexQuest: An AI-Powered, Cloud-Native Learning Management System

![CI/CD - Backend](https://github.com/AmarNarayanDwivedi/ApexQuest-AI-powered-Learning-Management-System/actions/workflows/backend.yml/badge.svg)
![CI/CD - Frontend](https://github.com/AmarNarayanDwivedi/ApexQuest-AI-powered-Learning-Management-System/actions/workflows/frontend.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

An intelligent, full-stack Learning Management System (LMS) designed from the ground up with a modern, cloud-native architecture. ApexQuest leverages AI to enhance the learning experience and is built on a fully automated CI/CD pipeline for rapid, reliable deployments.

### ✨ **Live Demo**

**Check out the live application hosted on Render:** **[https://apexquest-a-lms-website-1.onrender.com](https://apexquest-a-lms-website-1.onrender.com)**

## **Demo Video**
[![ApexQuest Demo Video](https://github.com/user-attachments/assets/ed279db7-d443-4351-801c-496d39c241b6)](https://drive.google.com/file/d/1HnOinxAZ5ZBMK5p7Xf4JAcFrOFFayks2/view?usp=sharing)

---

## 🚀 Key Features

* **User Authentication:** Secure JWT-based authentication with signup, login, and forgot password functionality.
* **Comprehensive Course Management (for Educators):**
    * Full CRUD (Create, Read, Update, Delete) operations for courses.
    * Dynamic lecture management (add, edit, and reorder video lectures).
    * Rich content uploading via Cloudinary integration.
* **Interactive Student Experience:**
    * Seamless course enrollment and progress tracking.
    * Integrated Razorpay payment gateway for course purchases.
* **AI-Powered Course Assistant:**
    * Leverages the Gemini API to provide intelligent answers to student questions based on course content.
    * Enhances learning through an interactive Q&A interface.
* **User Profile Management:** Users can view and update their profiles, including uploading a profile picture.

---

## 🛠️ Tech Stack & Architecture

This project is built with a modern MERN stack and is fully containerized with Docker for consistency across all environments. It follows a microservices-inspired architecture with a separate frontend and backend.

| Category    | Technologies & Tools                                            |
|-------------|-----------------------------------------------------------------|
| **Frontend**| React.js (Vite), Redux Toolkit, Axios                           |
| **Backend** | Node.js, Express.js                                             |
| **Database**| MongoDB (with Mongoose)                                         |
| **DevOps** | **Docker, Docker Compose, Nginx, GitHub Actions, Render, Docker Hub** |
| **Services**| Cloudinary (Media), Razorpay (Payments), Gemini API (AI)          |

### System Architecture

The application is architected for scalability and automation, leveraging a full CI/CD pipeline.

```
+-----------+       +-----------------+       +-------------------+       +----------------------+       +----------------+
| Developer | ----> |  git push main  | ----> |  GitHub Actions   | ----> |  Build & Push Image  | ----> |   Docker Hub   |
+-----------+       +-----------------+       +-------------------+       +----------------------+       +----------------+
      ^                                             | (CI/CD)                                                |
      |                                             |                                                        | (Pulls Image)
      |                                             V                                                        V
      |                                   +-------------------+                             +-------------------------+
      +-----------------------------------|  Automated Tests  |                             |  Render Cloud Hosting   |
                                          +-------------------+                             +-------------------------+
                                                                                                  | (Frontend & Backend)
                                                                                                  V
                                                                                            +-----------+
                                                                                            | End User  |
                                                                                            +-----------+

```
---

## ⚙️ DevOps & CI/CD Workflow

This project is built with a **fully automated Continuous Integration and Continuous Deployment (CI/CD) pipeline** using GitHub Actions, a cornerstone of modern DevOps practices.

1.  **Trigger:** Any `git push` to the `main` branch automatically triggers the pipeline.
2.  **Path Filtering:** The pipeline is intelligent; it only builds and deploys the service (frontend or backend) that had code changes, saving time and resources.
3.  **Build:** A job runs on a fresh Ubuntu virtual machine, checks out the code, and builds a production-ready Docker image using multi-stage builds for minimal size and enhanced security.
4.  **Push:** The newly built image is pushed and tagged on Docker Hub, creating a versioned, portable artifact of the application.
5.  **Deploy:** The pipeline sends a webhook request to Render, which triggers an immediate, zero-downtime deployment by pulling the new image from Docker Hub and restarting the service.

This end-to-end automation ensures rapid, reliable, and consistent deployments, allowing for a focus on feature development rather than manual release management.

---

## 📦 Getting Started (Local Development)

To run this project on your local machine, please follow these steps.

### Prerequisites

* Node.js (v18 or later)
* Docker & Docker Compose
* A Git client

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AmarNarayanDwivedi/ApexQuest-AI-powered-Learning-Management-System.git](https://github.com/AmarNarayanDwivedi/ApexQuest-AI-powered-Learning-Management-System.git)
    cd ApexQuest-AI-powered-Learning-Management-System
    ```

2.  **Configure Environment Variables:**
    Create two `.env` files based on the provided templates.
    * Create a file at `./backend/.env` and fill in the values from `./backend/.env.example`.
    * Create a file at the root `./.env` for frontend build arguments (see the root `.env.example` in the repo). For local development, `VITE_SERVER_URL` should be `http://localhost:8000`.

3.  **Build and Run the Application with Docker Compose:**
    ```bash
    # This command will build the Docker images and start the containers in the background.
    docker-compose up --build -d
    ```

4.  **Access the Application:**
    * Frontend is available at: `http://localhost:5173`
    * Backend API is available at: `http://localhost:8000`

---

## 🔮 Future Improvements

- [ ] Implement a staging environment for pre-production testing.
- [ ] Increase test coverage with E2E tests using Cypress.
- [ ] Integrate a WebSocket layer for real-time notifications.
- [ ] Explore deployment on Kubernetes (K8s) for advanced orchestration.

---

## 👨‍💻 Contact

Amar Narayan Dwivedi - amardwivedi792@gmail.com

Project Link: [https://github.com/AmarNarayanDwivedi/ApexQuest-AI-powered-Learning-Management-System](https://github.com/AmarNarayanDwivedi/ApexQuest-AI-powered-Learning-Management-System)
