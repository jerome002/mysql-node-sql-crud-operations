# MySQL + Node.js SQL CRUD Operations

A simple Node.js application demonstrating **CRUD (Create, Read, Update, Delete)** operations with a MySQL database using the `mysql2` library.

---

## Features

- Connects to a MySQL database
- Performs CRUD operations on three tables:
  - `students`
  - `courses`
  - `enrollments`
- Uses SQL constraints like **foreign keys** with `ON DELETE CASCADE`
- Clean, modular structure for learning and extending
-  **Helper Module** for enrolling students and auto-creating courses if they don't exist

---

## Technologies Used

- Node.js
- MySQL
- [mysql2](https://www.npmjs.com/package/mysql2)
- JavaScript (ES6)

---

## Project Structure

mysql-node-sql-crud-operations/
├── db.js # Database connection setup
├── queries/
│ ├── students.js # CRUD for students table
│ ├── courses.js # CRUD for courses table
│ └── enrollments.js # CRUD for enrollments table
├── helpers/
│ └── enrollmentHelper.js # Helper function to enroll students & insert courses if needed
├── index.js # Main entry to test modules
├── testEnrollment.js # Test script for the enrollment helper
├── package.json
└── README.md