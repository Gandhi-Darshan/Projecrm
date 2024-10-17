Health Sector CRM System
Project Overview
This project is a full-stack CRM (Customer Relationship Management) solution specifically designed for healthcare centers, built using the MERN stack (MongoDB, Express.js, React, and Node.js). It offers a streamlined way to manage patients, employees, and tasks, all within a secure, user-friendly interface. The system includes both an admin and employee dashboard, tailored to meet the operational needs of the healthcare sector.

Key Features:
Authentication System:

JWT-based authentication for secure admin and employee logins
Separate roles for Admin and Employee
Customer Management:

Create, update, and delete customer profiles
Manage customer-related information, including insurance details
Task Management:

Assign tasks to employees, track their progress, and mark them as completed
Automated reminders for employees about pending tasks and upcoming deadlines
Automated Follow-Ups:

Schedule automatic reminders and notifications for customer appointments, upcoming deals, and more
Equipment and Insurance:

Track the use of both electric and hand equipment for specific tasks
Manage customer insurance information, which is crucial for the Canadian healthcare sector
Reports Dashboard:

Admins can generate reports to track employee performance and task completion
Oversee system-wide data for better decision-making
Technology Stack:
Frontend: React.js, TailwindCSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Authentication: JWT (JSON Web Tokens)
Setup Instructions:
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/health-crm.git
Navigate to the project directory:

bash
Copy code
cd health-crm
Install dependencies for both the backend and frontend:

bash
Copy code
npm install
cd client
npm install

Run the development server:

bash
Copy code
npm run dev
Build the frontend:

bash
Copy code
cd client
npm run build
