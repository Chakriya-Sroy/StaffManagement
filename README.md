# StaffManagement

This project is a staff management application built using Next.js for the frontend and Node.js for the backend. It allows users to perform CRUD (Create, Read, Update, Delete) operations on staff members.

Features
- View a list of all staff members
- Add a new staff member
- Update existing staff member information
- Delete staff members
- Search staff member base on their fullname, staffID or birthday
- Export result  as PDF file after search query

Technologies Used
- Frontend: Next.js, React, Tailwind CSS
- Backend: Node.js, Express.js, MySQL
- Testing: Jest, Supertest
- Other Tools:  Postman


Getting Started
To run this project locally, follow these steps:
- Clone the repository :https://github.com/Chakriya-Sroy/StaffManagement
- Install dependencies:
```bash
cd frontend
npm install
cd ../backend
npm install
```

Set up environment variables:
- Create a .env file in the backend directory and add your database connection details
```bash
MYSQL_HOST="localhost"
MYSQL_USER ='root'
MYSQL_PASSWORD=''
MYSQL_DATABASE='staff_management'
MySQO_PORT="3308"
```

Run the backend server: 
```bash
npm start
```

Run the frontend server: 
```bash
npm run dev
```

Testing
- To run tests for the frontend and backend, use the following commands:
Run the backend Test case 
```bash
npm test
```

Access the application in your browser at http://localhost:3000


