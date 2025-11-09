# Backend

This directory contains the Node.js and Express backend for the Quadro application.

## Overview

The backend is responsible for:
*   User authentication (registration and login).
*   Managing user data and history.
*   Providing a RESTful API for the frontend.

## Local Development

For detailed instructions on how to run the backend server as part of the full local development environment, please see the main [README.md](../../README.md) in the root of the project.

### Quick Start

1.  **Install dependencies:** `npm install --prefix backend`
2.  **Set up your `.env` file:** See the main README for details.
3.  **Run the server:** `node backend/server.js`

## API Documentation

The API is documented using OpenAPI (Swagger). When the server is running, you can access the interactive documentation at [http://localhost:5000/api-docs](http://localhost:5000/api-docs).

## Deployment

For instructions on how to deploy this backend to a VM as a persistent service, please see the "Deployment" section in the main [README.md](../../README.md).
