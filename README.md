

Task and Habit Tracker API
This is a Node.js REST API built with Express and MongoDB that provides functionality for users to manage tasks and track habits. The API includes authentication, task management, and habit tracking with streak calculations.

Features
Authentication
Register and Login using JSON Web Tokens (JWT).
Passwords are securely hashed using bcrypt.
Middleware for token validation ensures protected endpoints.
Task Management
CRUD operations for managing tasks.
Tasks are associated with authenticated users.
Fields include title, description, status, and due date.
Habit Tracking
Create and manage recurring habits.
Track daily habit completion and maintain streaks.
Prevent marking habits as completed more than once in 24 hours.
