
---

# Loan Management System - CreditSea

## Table of Contents
- [Project Overview](#project-overview)
- [Roles and Responsibilities](#roles-and-responsibilities)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Usage](#usage)
- [CORS Configuration](#cors-configuration)
- [Error Handling](#error-handling)
- [Acknowledgements](#acknowledgements)

## Project Overview
The Loan Management System is crafted to enhance the loan approval process for CreditSea. It incorporates three main roles: **User**, **Verifier**, and **Admin**. Users can submit loan applications, verifiers are tasked with assessing these applications, and admins oversee the final decisions regarding loan approvals or rejections. The system offers real-time updates on loan statuses and provides role-specific access.

## Roles and Responsibilities

### User
- Submit loan applications, providing necessary information such as loan amount, purpose, and employment status.
- Monitor the status of their loan applications, which may be **PENDING**, **VERIFIED**, **APPROVED**, or **REJECTED**.

### Verifier
- Evaluate loan applications submitted by users.
- Update the loan status to **VERIFIED** if accepted or **REJECTED** if deemed invalid.

### Admin
- Serve as the final authority on loan applications.
- Approve or reject loans and reset statuses as required.
- Manage loans in both **PENDING** and **APPROVED** categories.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Others**: TypeScript, Mongoose

## Features

- **User Application**:
  - Users can complete and submit loan requests via a straightforward form.
  - Loan statuses are updated based on actions taken by verifiers and admins.

- **Verifier Actions**:
  - Verifiers assess submitted loan applications, approving or rejecting them based on their evaluations.
  - Only loans that are not marked as **APPROVED** are available for verification.

- **Admin Controls**:
  - Admins can review loans with statuses of **VERIFIED**, **APPROVED**, and **REJECTED**.
  - Admins possess the ability to approve or reject loans.
  - They can reset loan statuses when necessary.

Here's a README section specifically detailing the API endpoints based on the provided routes for your Loan Management System. 

## API Endpoints

### Loan Operations

1. **Create a New Loan**
   - **Method**: `POST`
   - **URL**: `/loans`
   - **Description**: Allows users to submit a new loan application. The request body should contain the necessary details such as loan amount, purpose, and personal information.

2. **Get Loan Applications by Role**
   - **Method**: `GET`
   - **URL**: `/loans`
   - **Description**: Retrieves loan applications filtered by the user's role (admin or verifier). The response will vary based on the user's permissions and the status of the loans.

3. **Get Loan Applications by ID**
   - **Method**: `GET`
   - **URL**: `/loans/id`
   - **Description**: Fetches loan applications associated with a specific user, identified by their ID number. This is useful for users wanting to view their loan history.

4. **Update Loan Status by Verifier**
   - **Method**: `PATCH`
   - **URL**: `/loans/status-verifier`
   - **Description**: Enables verifiers to change the status of loan applications to either VERIFIED or REJECTED based on their review.

5. **Update Loan Status by Admin**
   - **Method**: `PATCH`
   - **URL**: `/loans/status-admin`
   - **Description**: Allows admins to approve or reject loans and update their statuses as necessary.

6. **Get Loan Summary**
   - **Method**: `GET`
   - **URL**: `/loans/summary`
   - **Description**: Provides a summary of loans, including total counts and relevant statistics for active users and disbursed amounts.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kunalthgr8/CreditSea-Assignment.git
   ```

2. **Install dependencies**:
   ```bash
   cd frontend
   cd CreditSea
   npm install
   cd ../../
   cd backend
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file and configure your MongoDB URI.

4. **Start the backend server**:
   ```bash
   cd backend
   npm run dev
   ```

5. **Start the frontend server**:
   Navigate to the frontend directory and launch the React application:
   ```bash
   cd frontend
   cd CreditSea
   npm start
   ```

## Usage

- **Users** can fill out the loan application form, submit requests, and check the status of their applications.
- **Verifiers** can review loans that are not marked as **APPROVED**.
- **Admins** can approve or reject loans and review the statuses of verified, rejected, or approved loans.

## CORS Configuration
To enable seamless communication between the frontend and backend, CORS is configured as follows:

```javascript
const corsOptions = {
  origin: 'https://credit-sea-flax.vercel.app', // Link to the frontend
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));
```
Ensure you update the origin according to your frontend deployment URL.

## Error Handling
A centralized error handler is utilized to manage both client-side and server-side errors:

```javascript
const errorHandler = (res, statusCode, message, details = null) => {
  res.status(statusCode).json({ error: message, details });
};
```

**Note**: If the API fails to respond to the frontend, please attempt to reload, as it may be a Vercel issue (where the application is hosted).

### Metrics
- **Active Users**: The total count of users who have submitted loan applications.
- **Borrowers**: The total count of users who have received at least one loan.
- **Loans**: The overall number of loans applied for by all users.
- **Total Disbursed**: The aggregate amount of approved loans.
