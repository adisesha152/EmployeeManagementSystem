# Employee Management System

## Overview
The Employee Management System is a web application designed to manage employee details. It provides separate logins for admins and employees. Admins can add and manage employee information including first name, last name, address, role, and more. The application is built using ReactJS for the frontend and NodeJS, ExpressJS, and SQL for the backend.

## Features
- **Admin Login**: Admins can log in to manage employee details.
- **Employee Login**: Employees can log in to view their own details.
- **Add Employee**: Admins can add new employee information including first name, last name, address, and role.
- **Manage Employees**: Admins can update or delete employee details.
- **View Employee Details**: Employees can view their own information.

## Technologies Used
- **Frontend**: ReactJS
- **Backend**: NodeJS, ExpressJS
- **Database**: SQL

## Installation

### Prerequisites
- Node.js and npm installed
- SQL Database setup

### Steps
1. **Clone the repository**:
    ```bash
    git clone https://github.com/adisesha152/EmployeeManagementSystem.git
    cd employee
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure the database**:
    - Set up your SQL database.
    - Update the database configuration in the `config` folder.

4. **Run the backend server**:
    ```bash
    cd server
    npm start
    ```

5. **Run the frontend**:
    ```bash
    cd client
    npm start
    ```

6. **Open your browser**:
    - Navigate to `http://localhost:5173` for the frontend.
    - Backend runs on `http://localhost:3000`.

## Project Structure
```plaintext
employee-management-system/
├── Employee/               # ReactJS frontend
├── Server/               # NodeJS and ExpressJS backend
├── package.json          # NPM dependencies
└── README.md             # Project documentation
```

## Usage
1. **Admin Login**: Use the admin credentials to log in and manage employee details.
2. **Employee Login**: Employees can log in using their credentials to view their own details.
3. **Add Employee**: Admins can navigate to the "Add Employee" section to add new employee information.
4. **Manage Employees**: Admins can edit or delete employee details as necessary.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.