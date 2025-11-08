# Backend Setup

This document provides instructions on how to set up and run the backend server for local development. This setup uses an in-memory database, so **no external database is required**.

## Prerequisites

- Node.js
- npm

## Installation

1.  From the root of the project, install the backend dependencies:
    ```bash
    npm install --prefix backend
    ```

## Configuration

1.  Create a `.env` file in the `backend` directory.
2.  Add the following environment variable to the `.env` file:
    ```
    JWT_SECRET=a_secure_secret_key
    ```
    - `JWT_SECRET`: A strong, unique secret for JWT signing.

## Running the Server

1.  From the root of the project, start the server:
    ```bash
    node backend/server.js
    ```
2.  The server will be running on `http://localhost:5000`.

## API Documentation

The API documentation is generated using Swagger and is available when the server is running.

1.  Start the server as described above.
2.  Open your web browser and navigate to:
    ```
    http://localhost:5000/api-docs
    ```
    You can use this interface to view and test all the available API endpoints.
