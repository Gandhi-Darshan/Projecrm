Here's a revised version of the README file that excludes any bash commands, Makefile references, or `.env` information:

---

# **Health Sector CRM System**

## **Project Overview**
This project is a full-stack CRM (Customer Relationship Management) solution specifically designed for healthcare centers, built using the MERN stack (MongoDB, Express.js, React, and Node.js). It offers a streamlined way to manage patients, employees, and tasks, all within a secure, user-friendly interface. The system includes both an admin and employee dashboard, tailored to meet the operational needs of the healthcare sector.

### **Key Features:**
1. **Authentication System**:
   - JWT-based authentication for secure admin and employee logins
   - Separate roles for **Admin** and **Employee**
  
2. **Customer Management**:
   - Create, update, and delete customer profiles
   - Manage customer-related information, including insurance details

3. **Task Management**:
   - Assign tasks to employees, track their progress, and mark them as completed
   - Automated reminders for employees about pending tasks and upcoming deadlines

4. **Automated Follow-Ups**:
   - Schedule automatic reminders and notifications for customer appointments, upcoming deals, and more

5. **Equipment and Insurance**:
   - Track the use of both **electric** and **hand equipment** for specific tasks
   - Manage customer insurance information, which is crucial for the Canadian healthcare sector

6. **Reports Dashboard**:
   - Admins can generate reports to track employee performance and task completion
   - Oversee system-wide data for better decision-making

### **Technology Stack**:
- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
  
Here’s a simple step-by-step guide for installing the Health Sector CRM System:

---

## **Installation Guide**

### **1. Clone the Repository**
Start by cloning the repository from GitHub to your local machine. Navigate to the directory where you want to store the project and run:

```
git clone <repository_url>
```

### **2. Install Dependencies**

#### Backend (Server):
Navigate to the `/crm_backend` directory:

```
cd crm_backend
```

Install all the required dependencies for the backend:

```
npm install
```

#### Frontend (Client):
Navigate to the `/crm_fronend` directory:

```
cd crm_frontend
```

Install all the required dependencies for the frontend:

```
npm install
```

### **3. Configure Environment Variables**
In the `/crm_backend` directory, create a `.env` file to store your environment variables like database connection strings, JWT secrets, etc. (Make sure to exclude this from version control by adding `.env` to your `.gitignore` file).

**Note**: Ensure to correctly set up the environment variables as per your MongoDB connection and JWT configuration.

### **4. Run the Application**

#### Backend (Server):
To start the backend server, navigate to the `/crm_backend` directory and run:

```
npm run dev
```

This will start the Express server on the specified port (default is `http://localhost:5000`).

#### Frontend (Client):
To start the frontend, navigate to the `/client` directory and run:

```
npm start
```

This will start the React application on the specified port (default is `http://localhost:3000`).


