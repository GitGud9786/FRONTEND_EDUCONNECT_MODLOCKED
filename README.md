# EDUCONNECT

## Description
EDUCONNECT is a comprehensive university management system designed to streamline and unify all academic and administrative processes within a single platform. Unlike existing solutions that require multiple apps (e.g., Google Classroom, Google Meet, and separate university's own application for management, enrollments, results, and announcements), EDUCONNECT integrates all these functionalities into one cohesive system. 

With EDUCONNECT, universities can manage student and teacher enrollment, course creation, online classes, assignments, grading, announcements, and more—all in one place. This eliminates the need for multiple platforms and provides a seamless experience for admins, teachers, and students.

## Features
EDUCONNECT offers a wide range of features tailored to three types of users: **Admin**, **Teacher**, and **Student**.

### **Admin Features**
- **Student/Faculty Management**: Enroll students, teachers into the university or system.
- **Department and Course Creation**: Create and manage departments and courses.
- **Teacher Assignment**: Assign teachers to specific courses.
- **Student Enrollment**: Enroll students into courses.
- **System Oversight**: Monitor and manage the overall system.

### **Teacher Features**
- **Announcements**: Post announcements to respective classes.
- **Online Classes**: Conduct live online classes.
- **File and Assignment Upload**: Share files and assignments with students.
- **Grading**: Grade students' assignments and exams.
- **Calendar**: Manage events, reminders, and schedules.


### **Student Features**
- **Course Management**: View enrolled courses and related details.
- **Announcements**: Receive and view announcements from teachers.
- **Assignment Submission**: Submit assignments and upload files.
- **Group Chats**: Participate in course-specific group chats.
- **Results**: View grades and results.
- **Online Classes**: Join live classes hosted by teachers.
- **Calendar**: Access a personalized calendar for events and reminders.

---


## Installation
To set up EDUCONNECT locally, follow these steps. Copy and paste the commands below into your terminal:

```bash
# Step 1: Install Node.js and npm
# Download and install Node.js from https://nodejs.org/
# Verify installation:
node -v
npm -v

# Step 2: Install MySQL
# Download and install MySQL from https://dev.mysql.com/downloads/mysql/
# Set up MySQL with a username and password during installation.
# Verify installation:
mysql --version

# Step 3: Clone the Repositories
# Clone the frontend and backend repositories:
git clone https://github.com/your-username/educonnect-frontend.git
git clone https://github.com/your-username/educonnect-backend.git

# Step 4: Set Up the Database
# Navigate to the backend repository:
cd educonnect-backend

# Import the database setup file:
# Open MySQL and log in:
mysql -u your_username -p

# Create a new database (if not already created):
CREATE DATABASE educonnect;
USE educonnect;

# Import the db.sql file:
source backend/Admin/Config/db.sql;

# Update the database configuration:
# Open the db.js file located in backend/Admin/Config and update the MySQL connection details (username, password, and database name).

# Step 5: Install Dependencies and Run the Backend
# Navigate to the backend directory:
cd educonnect-backend

# Install dependencies:
npm install

# Start the backend server:
npm run dev

# Step 6: Install Dependencies and Run the Frontend
# Navigate to the frontend directory:
cd ../educonnect-frontend

# Install dependencies:
npm install

# Start the frontend application:
npm start

# Step 7: Access the Application
# Once both the backend and frontend are running, access EDUCONNECT at:
# http://localhost:3000
