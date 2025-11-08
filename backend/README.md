# Backend Setup

This document provides instructions on how to set up and run the backend server.

## Prerequisites

- Node.js
- npm

## Installation

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

## Configuration

1.  Create a `.env` file in the `backend` directory.
2.  Add the following environment variables to the `.env` file:
    ```
    VULTR_MONGO_URI=<your_vultr_mongodb_connection_string>
    JWT_SECRET=<a_secure_secret_key>
    ```
    Replace `<your_vultr_mongodb_connection_string>` with your actual MongoDB connection string and `<a_secure_secret_key>` with a strong, unique secret.

## Running the Server

1.  Start the server:
    ```bash
    node server.js
    ```
2.  The server will be running on `http://localhost:5000`.
