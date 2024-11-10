# Project Overview

This project includes:
- A **NestJS backend** (located in the `backend` directory)
- A **React frontend** (located in the `client` directory)

## Prerequisites

Ensure you have the following installed:
- **Node.js** latest (with `npm`)

## Getting Started

Follow these steps to set up the backend and frontend applications locally.

---

### Backend (NestJS)

1. **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the backend server** in development mode:
    ```bash
    npm run start:dev
    ```

4. **Access the backend**:
    - The backend API will be available at: `http://localhost:4000`

---

### Frontend (React)

1. **Navigate to the client directory**:
    ```bash
    cd client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the frontend server**:
    ```bash
    npm run dev
    ```

4. **Access the frontend**:
    - The frontend app will be accessible at: `http://localhost:3000`

---

### Database (MongoDB)

- This project uses a **self-hosted MongoDB instance** on [MongoDB Atlas](https://cloud.mongodb.com/).
- You can find the MongoDB URL and database credentials in `backend/app.module.ts`.
- **Note**: The network IP is public, so the database is accessible from any IP.

---
