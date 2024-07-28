# Task Manager API

## Description

This is a RESTful API for managing tasks, built with Node.js, Express, and Sequelize (PostgreSQL). The API allows creating, retrieving, updating, and deleting tasks. It also includes Swagger documentation for easy reference and testing of API endpoints.

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```

2. Navigate to the project directory:
    cd task-manager

3. Install dependencies:
    npm install express body-parser cors sequelize pg pg-hstore swagger-jsdoc swagger-ui-express

4. Install development dependencies:
    npm install --save-dev nodemon

5. Configure the database in `src/config/database.js`:

6. Start the server:
    ```sh
    npm run dev
    ```

## API Documentation

Swagger UI is available at `/api-docs`.
Swagger UI link : `http://localhost:5000/api-docs/`

## Endpoints

### POST /api/createTasks

Create a new task.

- **Request Body:**
    {
        "name": "Task Name",
        "description": "Task Description",
        "dueDate": "2023-12-31T23:59:59Z"
    }
    ```

- **Responses:**
    - `201 Created`: Returns the task ID.
    - `400 Bad Request`: Validation error.

### GET /api/getAlltasks

Retrieve the list of tasks.

- **Responses:**
    - `200 OK`: Returns the list of tasks.
    - `500 Internal Server Error`: An error occurred while retrieving the tasks.

### GET /api/getTasksById/{id}

Retrieve a task by ID.

- **Parameters:**
    - `id`: Task ID (integer)

- **Responses:**
    - `200 OK`: Returns the task.
    - `404 Not Found`: Task not found.
    - `500 Internal Server Error`: An error occurred while retrieving the task.

### PUT /api/Updatetasks/{id}

Update a task.

- **Parameters:**
    - `id`: Task ID (integer)

- **Request Body:**
    ```json
    {
        "name": "Updated Task Name",
        "description": "Updated Task Description",
        "dueDate": "2023-12-31T23:59:59Z",
        "status": "UPDATED"
    }
    ```

- **Responses:**
    - `200 OK`: Task updated successfully.
    - `400 Bad Request`: Validation error.
    - `404 Not Found`: Task not found.
    - `500 Internal Server Error`: An error occurred while updating the task.

### DELETE /api/Deletetasks/{id}

Delete a task.

- **Parameters:**
    - `id`: Task ID (integer)

- **Responses:**
    - `200 OK`: Task deleted successfully.
    - `404 Not Found`: Task not found.
    - `500 Internal Server Error`: An error occurred while deleting the task.

## Development

### Running in Development Mode

To run the server in development mode with hot reloading, use the following command:

npm run dev
