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


## Step 1: Install Node.js and npm
#### Download and install Node.js from https://nodejs.org/
#### Verify installation:
```bash
node -v
npm -v
```

## Step 2: Install MySQL
### Download and install MySQL from https://dev.mysql.com/downloads/mysql/
### Set up MySQL with a username and password during installation.
### Verify installation:
```bash
mysql --version
```
## Step 3: Clone the Repositories
### Clone the frontend and backend repositories:
```bash
git clone https://github.com/GitGud9786/FRONTEND_EDUCONNECT_MODLOCKED.git
git clone https://github.com/Oshayer-Siddique/EDUCONNECT-MODLOCKED-1-Backend-.git
```
## Step 4: Set Up the Database
### Navigate to the backend repository:
```bash
cd EDUCONNECT-MODLOCKED-1-Backend-/BACKEND
```
### Setup your database for the project
### Open MySQL and log in:
```bash
mysql -u your_username -p
```

### Import the db.sql file:
```bash
source EDUCONNECT-MODLOCKED-1-Backend-/BACKEND/Admin/Config/db.sql;
```
### Update the database configuration:
Open the db.js file located in EDUCONNECT-MODLOCKED-1-Backend-/BACKEND/Admin/Config and update the MySQL connection details (username, password, and database name).

## Step 5: Install Dependencies and Run the Backend
### Navigate to the backend directory:
```bash
cd EDUCONNECT-MODLOCKED-1-Backend-/BACKEND
```
### Install dependencies:
```bash
npm install
```
### Start the backend server:
```bash
npm run dev
```
## Step 6: Install Dependencies and Run the Frontend
### Navigate to the frontend directory:
```bash
cd ../FRONTEND_EDUCONNECT_MODLOCKED
```
### Install dependencies:
```bash
npm install
```
### Start the frontend application:
```bash
npm start
```

This will start the application on your browser at localhost://3000.

---

## Usage

EDUCONNECT is designed to be intuitive and user-friendly. Here’s how to use the application:

1. **Login**:
   - Open the application in your browser at `http://localhost:3000`.
   - On the login page, select your role: **Admin**, **Teacher**, or **Student**.
   - Enter your registered email and password.
   - Click the **Login** button.

2. **Dashboard**:
   - After a successful login, you will be redirected to your respective dashboard based on your role:
     - **Admin**: Manage enrollments, departments, courses, and assignments.
     - **Teacher**: Announcements, online classes, file uploads, grading students, and calendar.
     - **Student**: Course lists, announcements, assignment submissions, group chats, and calendar.

3. **Navigation**:
   - Use the **navigation bar** at the top of the application to access different features.
   - Each role has specific functionalities accessible through the navigation bar.

4. **Performing Tasks**:
   - For any task (e.g., creating a course, uploading a file, or grading an assignment), click the respective button with a conventional name (e.g., **Create Course**, **Upload File**, **Grade Assignment**).
   - Follow the on-screen instructions to complete the task.

5. **Logout**:
   - To log out, click the **Logout** button in the navigation bar.

---

## Technologies Used
EDUCONNECT is built using the following technologies:

### Frontend
- **ReactJS**: A JavaScript library for building user interfaces.
- **HTML/CSS**: For structuring and styling the application.
- **JavaScript**: For adding interactivity and dynamic features.

### Backend
- **Node.js**: A JavaScript runtime for building the backend server.
- **Express.js**: A web application framework for Node.js.
- **JavaScript**: The primary programming language for backend logic.

### Database
- **MySQL**: A relational database management system for storing and managing data.

### Additional Tools
- **npm**: Package manager for installing dependencies.
- **Git**: Version control system for managing the codebase.

---

