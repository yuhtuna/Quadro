# Backend Setup

This document provides instructions on how to set up and run the backend server for local development.

## Prerequisites

- Node.js
- npm
- MongoDB (running locally)

## Installation

1.  From the root of the project, install the backend dependencies:
    ```bash
    npm install --prefix backend
    ```

## Configuration

1.  Create a `.env` file in the `backend` directory.
2.  Add the following environment variables to the `.env` file:
    ```
    MONGO_URI=mongodb://localhost:27017/local_db
    JWT_SECRET=a_secure_secret_key
    ```
    - `MONGO_URI`: The connection string for your local MongoDB instance.
    - `JWT_SECRET`: A strong, unique secret for JWT signing.

## Running the Server

1.  Make sure your local MongoDB server is running.
2.  From the root of the project, start the server:
    ```bash
    node backend/server.js
    ```
3.  The server will be running on `http://localhost:5000`.

## API Documentation

The API documentation is generated using Swagger and is available when the server is running.

1.  Start the server as described above.
2.  Open your web browser and navigate to:
    ```
    http://localhost:5000/api-docs
    ```
    You can use this interface to view and test all the available API endpoints.
