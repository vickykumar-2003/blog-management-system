# API Documentation - Blog Management System

## Base URL
`http://localhost:5000/api`

---

## 1. Authentication APIs

### 1.1 Register User
- **Method**: `POST`
- **URL**: `/auth/register`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "success": true,
    "message": "User registered successfully"
  }
  ```
- **Error Response** (400): Duplicate email, invalid fields.

### 1.2 Login User
- **Method**: `POST`
- **URL**: `/auth/login`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "password123"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "eyJhbG...",
    "user": {
      "id": "60a...",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
  ```

### 1.3 Get Current User
- **Method**: `GET`
- **URL**: `/auth/me`
- **Auth Required**: Yes (Bearer Token)
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "User profile fetched",
    "data": { "_id": "...", "name": "Jane", "email": "jane@example.com", "createdAt": "..." }
  }
  ```

---

## 2. Blog APIs

### 2.1 Get All Blogs
- **Method**: `GET`
- **URL**: `/blogs`
- **Auth Required**: No
- **Success Response** (200): List of all published blogs with populated `author` names.

### 2.2 Get My Blogs
- **Method**: `GET`
- **URL**: `/blogs/my`
- **Auth Required**: Yes (Bearer Token)
- **Success Response** (200): List of logged-in user's blogs.

### 2.3 Get Single Blog
- **Method**: `GET`
- **URL**: `/blogs/:id`
- **Auth Required**: No
- **Success Response** (200): Single blog details.
- **Error Response** (404/400): Blog not found, Invalid ID.

### 2.4 Create Blog
- **Method**: `POST`
- **URL**: `/blogs`
- **Auth Required**: Yes (Bearer Token)
- **Request Body**:
  ```json
  {
    "title": "A New Journey in Tech",
    "content": "Today I started learning..."
  }
  ```
- **Success Response** (201): Returns created blog.

### 2.5 Update Blog
- **Method**: `PUT`
- **URL**: `/blogs/:id`
- **Auth Required**: Yes (Bearer Token)
- **Request Body**: (Optional fields to update)
  ```json
  {
    "title": "Updated Title",
    "content": "Updated Content"
  }
  ```
- **Success Response** (200): Updated blog object.
- **Error Response** (403): If the user does not own the blog.

### 2.6 Delete Blog
- **Method**: `DELETE`
- **URL**: `/blogs/:id`
- **Auth Required**: Yes (Bearer Token)
- **Success Response** (200): Deleted status.
- **Error Response** (403): If the user does not own the blog.
