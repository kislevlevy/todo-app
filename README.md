# Todo App

## Project Overview

Todo App is a fully responsive task management application that enables users to organize their tasks by title, urgency, and due date. The app supports task creation, editing, deletion, and completion, with data securely stored locally and on a backend server for enhanced functionality and scalability.

## Features

- **Task Management**: Create, edit, delete, and mark tasks as complete, with the ability to set urgency levels and due dates.
- **Task Filtering**: Filter tasks by urgency and toggle visibility of completed tasks.
- **Data Storage**: Securely store data both in the browser's local storage and on a MongoDB database through a Node.js and Express backend.
- **Fully Responsive Design**: Optimized for all devices, ensuring a seamless experience across desktops, tablets, and smartphones.

## Technologies and Tools

### Frontend:

- **React:** Component-based UI library for building interactive user interfaces
- **JavaScript:** Programming language for implementing the app's logic
- **Bootstrap:** CSS framework for responsive design
- **HTML & CSS:** Markup and styling of the web page
- **JSON:** Data format for exchanging information between frontend and backend

### Backend:

- **Node.js:** JavaScript runtime for server-side programming
- **Express:** Web framework for building the backend API
- **MongoDB:** NoSQL database for storing tasks
- **Mongoose:** ODM library for MongoDB

## Skills Demonstrated

- **React component design and state management:** Building reusable components and managing application state
- **Integration of Node.js and Express for backend services:** Creating RESTful APIs and handling HTTP requests
- **MongoDB and Mongoose for database management:** Designing schemas and performing CRUD operations
- **Local storage and server-side storage management:** Storing data locally and syncing with the backend
- **Responsive web design:** Ensuring the app works well on various devices

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/kislevlevy/todo-app
   ```
2. Navigate to the project directory:
   ```bash
   cd todo-app
   ```

To run the front-end and back-end separately in development mode:

### Back-end

1. Navigate to the back-end directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the back-end server:
   ```bash
   npm run dev
   ```

### Front-end

1. Open a new terminal and navigate to the front-end directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the front-end server:
   ```bash
   npm run dev
   ```

> You can also preview the app by visiting the following link: [Todo App](https://todo-app.kislev.me/)

## How to Use

- **Create a Task:** Enter the task title, set the urgency level, and specify the due date.
- **Edit a Task:** Click on the task to modify its details.
- **Delete a Task:** Click the delete button to remove the task.
- **Mark as Complete:** Click the checkbox to mark the task as complete.
- **Filter Tasks:** Use the filter options to view tasks by urgency or hide completed tasks.
