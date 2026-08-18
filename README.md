# Blog Management System

## 1. Project Overview
A complete MERN stack application allowing users to register, log in, and manage their blog posts securely. 

## 2. Features
- Secure User Authentication (Register/Login) with JWT.
- Create, Read, Update, Delete (CRUD) operations for Blogs.
- View all published blogs.
- View only specific blogs created by the logged-in user.
- Responsive, modern UI with Dark/Light theme support.
- Fully protected RESTful APIs.

## 3. MERN Stack
- **MongoDB**: Used for storing User and Blog details.
- **Express.js**: Backend framework for building REST APIs.
- **React.js**: Frontend UI library for rendering interactive user interfaces.
- **Node.js**: JavaScript runtime environment.

## 4. Technology Stack
- **Frontend**: React, React Router v6, Context API, Axios, CSS Variables.
- **Backend**: Node, Express, Mongoose, bcryptjs, jsonwebtoken, cors, dotenv.

## 5. Architecture
- **Client-Server Architecture**: The React frontend talks to the Node.js backend over HTTP/REST APIs.
- **Security**: Passwords are mathematically hashed via `bcryptjs`. Endpoints verify JWT from `Authorization` header.

## 6. Project Structure
```
blog-management-system/
├── Backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Route logic
│   ├── middleware/      # Auth checks
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express Routers
│   ├── server.js        # Main entrypoint
│   └── .env             # Secrets
├── Frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI parts
│   │   ├── context/     # AuthContext state
│   │   ├── pages/       # Route components
│   │   ├── services/    # Axios API setup
│   │   ├── App.jsx      # Routing configuration
│   │   ├── main.jsx     # Render entrypoint
│   │   └── index.css    # Premium Styling
```

## 7. MongoDB Setup
Uses `MONGO_URI` to connect to MongoDB Atlas. Ensure IP address is whitelisted on Atlas to grant access.

## 8. Environment Variables
### Backend `.env`
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

## 9. Backend Installation
```bash
cd Backend
npm install
npm run dev
```

## 10. Frontend Installation
```bash
cd Frontend
npm install
npm run dev
```

## 11. Running Locally
Run the Backend on `http://localhost:5000` and the Frontend on `http://localhost:5173`. They communicate via Axios interceptor dynamically.

## 12. Authentication Flow
- **Register**: User submits credentials -> Backend hashes password & saves -> Returns success -> User redirects to login.
- **Login**: User submits credentials -> Backend compares hash -> Returns safe user object & JWT -> Frontend stores in `localStorage`.
- **Protected Action**: Axios interceptor attaches JWT to `Authorization: Bearer <token>` on all requests. Backend intercepts, validates the token, sets `req.user`, and proceeds.

## 13. Blog CRUD
- **Create**: Add title/content. Linked implicitly to `req.user._id`.
- **Read**: Fetch all (sorted), Fetch my blogs (filtered by `req.user._id`), Fetch single blog by `_id`.
- **Update**: Check if logged-in user owns the blog (`req.user._id === blog.author`).
- **Delete**: Check if logged-in user owns the blog. Removable.

## 14. API Documentation
See `API_DOCUMENTATION.md` for specific endpoint structures.

## 15. Future Improvements
- Pagination for blogs grid.
- Commenting system.
- Real-time notification for specific keywords.
- Rich text editor.

## 16. Interview Questions
1. **What is MERN Stack?** -> MongoDB (Database), Express (Backend Framework), React (Frontend Library), Node.js (Runtime Environment) stack.
2. **What is JWT Authentication?** -> JSON Web Tokens represent a stateless, secure way to transmit data as a JSON object, used heavily used to assert identity.
3. **What is Mongoose?** -> An Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema validation and relationship mapping.
4. **What are protected routes?** -> API endpoints or Frontend UI Pages accessible only to authenticated users carrying a valid token or session.
5. **What is Axios?** -> A promise-based HTTP client for the browser and Node.js used to consume APIs.
6. **What is React Router?** -> The standard routing library for React to navigate between different components in a Single Page Application.
7. **Why do we use bcrypt?** -> To hash passwords. It incorporates salt and iterative hashing, preventing rainbow table attacks and making passwords mathematically unrecoverable.
8. **Difference between authentication and authorization?** -> Authentication validates *who* you are (login). Authorization evaluates *what* you can do (Admin vs User, Can edit vs Cannot edit).
9. **How does JWT work?** -> A token string split into three parts: Header, Payload, Signature. The Signature protects data integrity by using a secret key only the server knows.
10. **How do you ensure users can edit only their own blogs?** -> Before saving or deleting, the backend fetches the item, compares the `item.author` field with `req.user._id` from the JWT token. If they mismatch, send a `403 Forbidden` response.

## 17. Author
Novexa Technologies (Generated by AI Assistant) / Vicky Kumar
