# Movie Management API

A RESTful API for managing a collection of movies, supporting full CRUD (Create, Read, Update, Delete) operations. This project is built with Node.js, Express, and MongoDB, and follows a clean, layered architecture for maintainability and scalability.

It includes automated API documentation with Swagger, comprehensive unit tests, and is fully containerized with Docker.

## Features

- **Full CRUD Operations:** Create, retrieve, update, and delete movies.
- **Layered Architecture:** Follows Handler (Controller), Service, and DAO (Repository) patterns for separation of concerns.
- **Validation:** Server-side validation for incoming data.
- **Pagination:** The endpoint to list all movies (`GET /movies`) supports pagination via query parameters.
- **API Documentation:** Auto-generated interactive API documentation using Swagger UI.
- **Unit Testing:** Complete test suite covering all API endpoints.
- **Dockerized:** Ready-to-run containerized application using a multi-stage Docker build for a lightweight production image.
- **Centralized Error Handling:** A dedicated middleware for consistent error responses.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Testing:** Jest, Supertest
- **API Documentation:** Swagger (OpenAPI 3.0) via `swagger-jsdoc` and `swagger-ui-express`
- **Environment Management:** `dotenv`
- **Containerization:** Docker

## API Documentation (Swagger)

Once the application is running, the interactive Swagger UI documentation is available at:

[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or newer recommended)
- npm (Node Package Manager)
- Docker (Optional, for containerized deployment)

### Local Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <your-repository-url>
   cd movie-management-api
   ```
   *(Note: Replace `<your-repository-url>` with the actual URL of your GitHub repository.)*

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create an environment file:**
   Create a `.env` file in the root of the project and add your MongoDB connection string.
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/?retryWrites=true&w=majority
   ```

4. **Run the application:**

   - For development (with automatic restarts on file changes):
     ```sh
     npm run dev
     ```

   - For production:
     ```sh
     npm start
     ```

The server will start on `http://localhost:3000`.

### Running with Docker

1. **Build the Docker image:**
   ```sh
   docker build -t movie-management-api .
   ```

2. **Run the Docker container:**
   Make sure to pass the `MONGODB_URI` environment variable to the container.
   ```sh
   docker run -p 3000:3000 -d      -e MONGODB_URI="mongodb+srv://username:password@cluster0.mongodb.net/?retryWrites=true&w=majority"      --name movie-api-container movie-management-api
   ```

The application will be accessible at `http://localhost:3000`.

## Running Tests

To run the unit tests for the API, use the following command:

```sh
npm test
```

This will execute all test files located in the `tests/` directory using Jest.

## API Endpoints

| Method | Endpoint      | Description                              |
|--------|--------------|------------------------------------------|
| GET    | /movies      | Get a list of all movies (supports pagination) |
| GET    | /movies/{id} | Get a single movie by its unique ID       |
| POST   | /movies      | Create a new movie                        |
| PUT    | /movies/{id} | Update an existing movie by its ID        |
| DELETE | /movies/{id} | Delete a movie by its ID                  |

### Pagination Example:

To get the second page with 5 movies per page:

```http
GET /movies?page=2&limit=5
```

## Project Structure

The project follows a layered architecture to ensure separation of concerns:

```
src/
├── controllers/    # (Handlers) - Handles incoming requests and sends responses.
│   └── movie_controller.js
├── services/       # (Business Logic) - Contains the core application logic.
│   └── movie_service.js
├── repositories/   # (DAO) - Interacts with the database.
│   └── movie_repository.js
├── models/         # Mongoose data models.
│   └── movie_model.js
├── routes/         # Express routes and Swagger annotations.
│   └── movie_routes.js
├── middleware/     # Custom middleware (e.g., error handling).
│   └── errorHandler.js
├── db/             # Database connection logic.
│   └── mongoose.js
├── errors/         # Custom error classes.
│   └── errors.js
└── app.js          # Main application entry point.
```
