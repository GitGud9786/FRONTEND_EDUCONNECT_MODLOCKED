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
To set up EDUCONNECT locally, follow these steps:

### Prerequisites
Before starting, ensure you have the following installed on your system:
- **Node.js** and **npm**: Required to run the ReactJS application and backend server.
- **MySQL**: The database used for this project.

### Step 1: Install Node.js and npm
1. Download and install Node.js from the [official website](https://nodejs.org/).
2. Verify the installation by running the following commands in your terminal:
   ```bash
   node -v
   npm -v

This will display the installed versions of Node.js and npm.

### Step 2: Install MySQL
1.Download and install MySQL from the official website.
2.Set up MySQL with a username and password during installation.
3.Verify the installation by running the following commands in your terminal:
   ```bash
   node -v
   npm -v

This will display the installed versions of Node.js and npm.

### Step 3: Clone the Repositories
EDUCONNECT has two separate repositories for the frontend and backend. Clone both repositories to your local machine:

   git clone https://github.com/your-username/educonnect-frontend.git
   git clone https://github.com/your-username/educonnect-backend.git

### Step 4: Set Up the Database
1. Navigate to the backend repository:

   cd educonnect-backend

2. Locate the database setup file:
   - Go to the directory: backend/Admin/Config.
   - You will find a file named db.sql.
   - Import the db.sql file into your MySQL database:

3. Open MySQL and log in:

   mysql -u your_username -p
   source backend/Admin/Config/db.sql

4. Update the database configuration:
   - Open the db.js file located in backend/Admin/Config.
   - Update the MySQL connection details (username, password, and database name) to match your local setup.

### Step 5: Install Dependencies and Run the Backend
1. Navigate to the backend directory:

   cd educonnect-backend

2. Install the required dependencies:

   npm install

3. Start the backend server:

   npm run dev

The backend server will start running.
   

### Step 6: Install Dependencies and Run the Frontend
1. Navigate to the frontend directory:

   cd educonnect-frontend

2. Install the required dependencies:

   npm install

3. Start the frontend application:

   npm start

The React application will start and automatically open in your browser at http://localhost:3000.


