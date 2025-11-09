<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Quadro - Your Local AI Video Hub

This project is a full-stack application for processing and managing video files, powered by a Node.js backend and a React frontend.

## Local Development Setup

Follow these instructions to run both the frontend and backend on your local machine for development.

### Prerequisites

*   **Node.js:** Make sure Node.js is installed on your system.
*   **MongoDB:** For the production-like setup, you will need a local MongoDB instance running.

### Running the Backend

1.  **Install Dependencies:** In a terminal, from the project root, run:
    ```bash
    npm install --prefix backend
    ```

2.  **Configure Environment:**
    *   Navigate to the `backend` directory.
    *   Create a `.env` file and add the following, replacing the placeholders with your own values:
        ```env
        MONGO_URI=mongodb://localhost:27017/quadro
        JWT_SECRET=your_super_secret_key
        ```

3.  **Start the Server:** From the project root, run:
    ```bash
    node backend/server.js
    ```
    The backend API will be running at `http://localhost:5000`. You can view the API documentation at `http://localhost:5000/api-docs`.

### Running the Frontend

1.  **Install Dependencies:** In a separate terminal, from the project root, run:
    ```bash
    npm install
    ```

2.  **Configure Environment:**
    *   In the project root, create a `.env` file.
    *   Add the following line to point the frontend to your local backend:
        ```env
        VITE_API_URL=http://localhost:5000
        ```

3.  **Start the Server:** From the project root, run:
    ```bash
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Deployment to a Single VM

These instructions guide you through deploying the frontend, backend, and an AI brain as long-running services on a single Virtual Machine.

### Vultr Compatibility and Tips

This deployment guide is fully compatible with a **Vultr Cloud Compute** instance. Here are a few tips for a smooth setup on Vultr:

*   **Operating System:** When deploying your Vultr instance, choose a recent version of a common Linux distribution, such as **Ubuntu 22.04 LTS**. The commands in this guide are based on a standard Linux environment.
*   **Firewall Configuration:** Vultr provides a cloud firewall. You must configure it to allow incoming traffic on the ports your application uses. At a minimum, you will need to allow:
    *   **TCP Port 22:** For SSH access to manage your VM.
    *   **TCP Port 80:** For standard HTTP traffic to your frontend.
    *   **TCP Port 443:** For HTTPS traffic if you set up an SSL certificate with NGINX.
*   **Public IP Address:** Your Vultr instance will have a public IP address. Use this IP address for the `VITE_API_URL` in your `.env.production` file.

### Prerequisites on the VM

1.  **Node.js:** Install Node.js.
2.  **MongoDB:** Install and run the MongoDB database service.
3.  **PM2:** Install PM2, a process manager for Node.js, to keep your apps alive:
    ```bash
    npm install pm2 -g
    ```
4.  **NGINX (Recommended):** Install NGINX to act as a reverse proxy.

### Deployment Steps

1.  **Clone the Repository:** Clone your project onto the VM.

2.  **Install Dependencies:**
    *   **Backend:** `npm install --prefix backend`
    *   **Frontend:** `npm install`

3.  **Configure Environment Variables:**
    *   **Backend:** Create a `/backend/.env` file and set your `MONGO_URI` and `JWT_SECRET`.
    *   **Frontend:** Create a `.env.production` file in the root directory. Set `VITE_API_URL` to your VM's public IP address or domain name (e.g., `VITE_API_URL=http://203.0.113.1`).

4.  **Build the Frontend:**
    ```bash
    npm run build
    ```
    This creates a `dist` directory with your static frontend files.

5.  **Start Services with PM2:**
    *   **Backend:**
        ```bash
        pm2 start backend/server.js --name "quadro-backend"
        ```
    *   **Frontend (using a static server):**
        ```bash
        pm2 serve dist --name "quadro-frontend" --spa --port 80
        ```
    *   **AI Brain:** (Assuming your AI brain has a start script, e.g., `brain.js`)
        ```bash
        pm2 start path/to/your/ai/brain.js --name "quadro-ai-brain"
        ```

6.  **Save the PM2 Process List:**
    ```bash
    pm2 save
    ```
    This ensures your apps will restart automatically if the VM reboots.

7.  **Configure NGINX (Recommended):**
    Set up NGINX as a reverse proxy to direct traffic. For example, you can route requests to your domain to the frontend service (port 80) and requests to `/api` to your backend service (port 5000).
