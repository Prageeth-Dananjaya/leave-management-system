# Leave Management System

---

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Prageeth-Dananjaya/leave-management-system.git

   ```

2. **Start the Backend**

   ```bash
   cd backend
   npm install
   npm start

   ```

3. **Start the Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Backend

## 🚀 Features

---

- JWT Authentication
- Employee leave apply, update, delete
- Admin can view, approve, or reject leaves
- Role-based authorization middleware

---

## 🧩 Tech Stack

- Node.js + Express
- JWT (jsonwebtoken)
- Jest + Supertest (for testing)

---

# API Endpoints

## 📋 API Endpoints Summary

| Method | Endpoint              | Auth | Role        | Description                                 |
|--------|----------------------|------|------------|---------------------------------------------|
| POST   | /api/auth/login       | ❌   | Any        | Authenticate user and get JWT               |
| POST   | /api/leaves           | ✅   | Employee/Admin | Submit a new leave request                  |
| GET    | /api/leaves           | ✅   | Admin      | Get all leave requests (filter by employee) |
| GET    | /api/leaves/:id       | ✅   | Employee/Admin | Get specific leave by ID                   |
| PUT    | /api/leaves/:id       | ✅   | Employee/Admin | Update leave or status                      |
| DELETE | /api/leaves/:id       | ✅   | Employee/Admin | Cancel or delete a leave                     |
| GET    | /api/admin/leaves     | ✅   | Admin      | Admin view all leaves                        |


---

## Login User (Employee / Admin)

**POST** `/api/auth/login`  
**Auth Required:** ❌  

**Description:** Authenticate a user and return a JWT token.

**Request Body:**

```json
{
  "username": "employee",
  "password": "emp123"
}
```

```json
{
  "username": "admin",
  "password": "admin123"
}