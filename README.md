# Web Page Backend

This project is part of the `wsk-web-development` course. The goal is to create a functional backend server that supports a web application fetching and displaying weekly and daily menus from various student restaurants. The backend is designed to handle data inconsistencies and errors gracefully while providing a robust API for the frontend.

## ⭐ Deployment and Server Information

The backend server for this project is accessible at [http://10.120.32.69/web-page](http://10.120.32.69/web-page). Note that the server does not have SSL authentication, so accessing it may require bypassing browser security warnings (e.g., using `thisisunsafe` in Chrome).

For more information about the frontend, visit the [frontend repository](https://github.com/onnikiv/Web-page-frontend/tree/main).

**Note:** The server does not have SSL authentication, so accessing it may require bypassing browser security warnings (e.g., using `thisisunsafe` in Chrome).

## API Endpoints

### Users

- `GET /api/v1/users/` - Retrieve all users.
- `POST /api/v1/users/` - Create a new user.
- `GET /api/v1/users/:id` - Retrieve a user by ID.
- `PUT /api/v1/users/:id` - Update a user's password by ID (requires authentication).
- `DELETE /api/v1/users/:id` - Delete a user by ID (requires admin authentication).

### Authentication

- `POST /api/v1/auth/login` - Authenticate a user and retrieve a token.
- `GET /api/v1/auth/me` - Retrieve the authenticated user's details (requires authentication).

### Favourites

- `GET /api/v1/favourites/` - Retrieve all favourites.
- `POST /api/v1/favourites/` - Add a new favourite.
- `GET /api/v1/favourites/:id` - Retrieve favourites by user ID.
- `DELETE /api/v1/favourites/:id` - Delete a favourite by ID (requires authentication).

### Thumbnails

- `GET /api/v1/thumbnails/` - Retrieve all thumbnails, including user ID, thumbnail ID, and filename.
- `POST /api/v1/thumbnails/` - Upload a new thumbnail for user (requires file upload).
- `GET /api/v1/thumbnails/:id` - Retrieve a thumbnail by user ID.
- `DELETE /api/v1/thumbnails/:id` - Delete a thumbnail by ID (requires authentication).

### Notes

- Thumbnails are stored in the `uploads` directory on the server.
- Ensure the `uploads` directory has the correct permissions for file storage and retrieval.
