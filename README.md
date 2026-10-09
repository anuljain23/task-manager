# Task Manager API

## Overview

This project is a simple Express.js task management API built for managing tasks in an in-memory database. It supports creating, retrieving, updating, and deleting tasks through a RESTful API.

The app is designed as a lightweight backend service and is ideal for learning CRUD operations, request validation, and route handling in Node.js.

### Tech stack
- Node.js (version 18 or newer)
- Express.js
- JavaScript
- Supertest + Tap for API tests

### Project structure
- `app.js` — Express app configuration
- `server.js` — server startup
- `routes/task.routes.js` — API routes
- `controllers/task.controller.js` — request handlers
- `models/db.tasks.js` — in-memory task data store
- `test/server.test.js` — API test suite

---

## Setup Instructions

### 1. Install dependencies

From the project root, run:

```bash
npm install
```

### 2. Start the server

Development mode:

```bash
npm run dev
```

This uses `nodemon` and automatically restarts the server when files change.

Alternatively, run the server directly:

```bash
node server.js
```

### 3. Configure the port

The app listens on port `3000` by default.

You can override this with an environment variable:

```bash
PORT=4000 node server.js
```

### 4. Run tests

```bash
npm test
```

This runs the test suite in `test/server.test.js`.

---

## API Endpoints

Base URL:

```text
http://localhost:3000
```

### 1. Health check

#### GET /

Returns a simple server status response.

Example response:

```json
{
  "status": "Ok",
  "message": "Server is working"
}
```

Test with:

```bash
curl http://localhost:3000/
```

---

### 2. Get all tasks

#### GET /tasks

Returns an array of all tasks.

Example response:

```json
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
  }
]
```

Test with:

```bash
curl http://localhost:3000/tasks
```

---

### 3. Get a task by ID

#### GET /tasks/:taskId

Returns a single task matching the provided ID.

Example:

```bash
curl http://localhost:3000/tasks/1
```

Example success response:

```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true
}
```

If the task does not exist, the API responds with:

```json
{
  "status": "Error",
  "message": "Task not found"
}
```

Status code: `404`

---

### 4. Create a task

#### POST /tasks

Creates a new task.

Request body:

```json
{
  "title": "Write README",
  "description": "Create project documentation",
  "completed": false
}
```

Validation rules:
- `title` must be a non-empty string
- `description` must be a non-empty string
- `completed` must be a boolean

Example command:

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Write README","description":"Create project documentation","completed":false}'
```

Example success response:

```json
{
  "id": 2,
  "title": "Write README",
  "description": "Create project documentation",
  "completed": false
}
```

Status code: `201`

If the payload is invalid, the API returns `400` with a validation error message.

---

### 5. Update a task by ID

#### PUT /tasks/:taskId

Updates one or more fields of an existing task.

You can send any of the following fields:
- `title`
- `description`
- `completed`

Example request:

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","description":"Updated description","completed":true}'
```

Example success response:

```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true
}
```

If the task does not exist, the API returns `404`.
If the request values are invalid, it returns `400`.

---

### 6. Delete a task by ID

#### DELETE /tasks/:taskId

Deletes a task from the in-memory store.

Example command:

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

Example success response:

```json
{
  "status": "Ok",
  "message": "Task deleted successfully"
}
```

If the task does not exist, the API returns `404`.

---

## Testing the API

### Using curl

Start the server in one terminal:

```bash
npm run dev
```

Then run commands in another terminal.

#### Get all tasks
```bash
curl http://localhost:3000/tasks
```

#### Create a task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express","description":"Practice CRUD APIs","completed":false}'
```

#### Get one task
```bash
curl http://localhost:3000/tasks/1
```

#### Update a task
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

#### Delete a task
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

### Using Postman or Insomnia

1. Open Postman or Insomnia.
2. Set the request method and URL, for example: `http://localhost:3000/tasks`.
3. Add a `Content-Type: application/json` header when sending JSON bodies.
4. Send the request and inspect the response.

---

## Notes

- The task data is stored in memory, so it resets when the server restarts.
- This project is a simple CRUD API for learning and testing backend fundamentals.
- The application already includes an automated test suite using `tap` and `supertest`.

---

## Example Response Codes

| Method | Endpoint | Status | Meaning |
| --- | --- | --- | --- |
| GET | `/` | `200` | Server is healthy |
| GET | `/tasks` | `200` | Returns all tasks |
| GET | `/tasks/:taskId` | `200` / `404` | Gets one task or not found |
| POST | `/tasks` | `201` / `400` | Creates task or invalid payload |
| PUT | `/tasks/:taskId` | `200` / `400` / `404` | Updates task or error |
| DELETE | `/tasks/:taskId` | `200` / `404` | Deletes task or not found |