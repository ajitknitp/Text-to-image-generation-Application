# AI Text-to-Image Generator — SaaS Backend

A Node.js/Express REST API powering an AI-driven text-to-image SaaS application. Users can register, authenticate, and generate AI images from text prompts using a credit-based system, with MongoDB for persistence and JWT for secure session handling.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Reference](#api-reference)
  - [Auth Routes](#auth-routes)
  - [User Routes](#user-routes)
  - [Image Routes](#image-routes)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Known Issues & Notes](#known-issues--notes)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User authentication** — secure registration and login with hashed passwords (bcrypt) and JWT-based sessions
- **Credit-based image generation** — each user starts with a free credit balance that is decremented per image generated
- **AI image generation** — integrates with the Clipdrop text-to-image API to generate images from user prompts
- **MongoDB persistence** — user accounts and credit balances stored via Mongoose ODM
- **Stateless auth middleware** — protects private routes using JWT verification
- **CORS-enabled API** — ready to be consumed by a separate frontend client

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM modules) |
| Framework | Express 5 |
| Database | MongoDB Atlas (via Mongoose) |
| Authentication | JSON Web Tokens (JWT) + bcrypt |
| Image Generation | Clipdrop Text-to-Image API |
| HTTP Client | Axios + form-data |
| Dev Tooling | Nodemon |

---

## Project Structure

```
server/
├── config/
│   └── mongodb.js          # MongoDB connection logic
├── controllers/
│   ├── userController.js   # Register, login, credits logic
│   └── imageController.js  # Image generation logic
├── middlewares/
│   └── auth.js             # JWT verification middleware
├── models/
│   └── userModel.js        # Mongoose user schema
├── routes/
│   ├── userRoutes.js       # /api/user/* routes
│   └── imageRoutes.js      # /api/image/* routes
├── .env                     # Environment variables (not committed)
├── .env.example             # Template for required env vars
├── .gitignore
├── package.json
└── server.js                # App entry point
```

---

## Prerequisites

- **Node.js** v20+ (tested on v24.18.0)
- **npm** (bundled with Node.js)
- A **MongoDB Atlas** cluster (or local MongoDB instance)
- A **Clipdrop API key** ([clipdrop.co](https://clipdrop.co/apis)) for image generation

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/shivam-singh6110/ai-text-to-image-saas-web-App.git
cd ai-text-to-image-saas-web-App/server
npm install
```

---

## Environment Variables

Create a `.env` file in the `server/` directory (this file is git-ignored and must never be committed). Use `.env.example` as a template:

```env
# MongoDB connection string (Atlas or local)
MONGODB_URI=your_mongodb_connection_string

# Secret key used to sign JWTs — use a long, random string
JWT_SECRET=your_jwt_secret

# Clipdrop API key for AI image generation
CLIPDROP_API=your_clipdrop_api_key

# Port the server listens on (optional, defaults to 4000)
PORT=4000
```

> **Security note:** Never commit `.env` to version control. If credentials are accidentally pushed, rotate them immediately (change your database password, regenerate your JWT secret, and reissue your API key).

### Windows-specific note (Node v24.13+)

If you're on **Windows** with Node.js **v24.13.0 or later**, `mongodb+srv://` connection strings may fail with a `querySrv ECONNREFUSED` error due to a [known upstream Node.js DNS bug](https://github.com/nodejs/node/issues/61435). `config/mongodb.js` in this project already works around it by forcing explicit DNS servers:

```js
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
```

This can be safely removed once the fix ships in a stable Node.js release you're using, or if you're not on an affected Windows/Node combination.

---

## Running the Server

**Development mode** (auto-restarts on file changes via nodemon):

```bash
npm run server
```

**Production mode:**

```bash
npm start
```

On successful startup, you should see:

```
Database connected
server running on port4000
```

The API is now available at `http://localhost:4000`.

---

## API Reference

Base URL: `http://localhost:4000/api`

### Auth Routes

#### Register a new user

```
POST /api/user/register
```

**Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "yourpassword"
}
```

**Success response (200):**
```json
{
  "success": true,
  "token": "<jwt_token>",
  "user": { "name": "Jane Doe" }
}
```

**Error response:**
```json
{ "success": false, "message": "Missing Details" }
```

---

#### Log in

```
POST /api/user/login
```

**Body:**
```json
{
  "email": "jane@example.com",
  "password": "yourpassword"
}
```

**Success response (200):**
```json
{
  "success": true,
  "token": "<jwt_token>",
  "user": { "name": "Jane Doe" }
}
```

**Error responses:**
```json
{ "success": false, "message": "User does not exist" }
{ "success": false, "message": "Invalid credentials" }
```

---

### User Routes

#### Get user credit balance

```
POST /api/user/credits
```

🔒 **Requires authentication** — see [Authentication](#authentication).

**Success response (200):**
```json
{
  "success": true,
  "credits": 5,
  "user": { "name": "Jane Doe" }
}
```

---

### Image Routes

#### Generate an image from a text prompt

```
POST /api/image/generate-image
```

🔒 **Requires authentication** — see [Authentication](#authentication).

**Body:**
```json
{
  "prompt": "a cat wearing sunglasses on a beach"
}
```

**Success response (200):**
```json
{
  "success": true,
  "message": "Image Generated",
  "creditBalance": 4,
  "resultImage": "data:image/png;base64,<...>"
}
```

**Error response (no credits remaining):**
```json
{
  "success": false,
  "message": "No Credit Balance",
  "creditBalance": 0
}
```

---

## Authentication

Protected routes (`/api/user/credits`, `/api/image/generate-image`) require a valid JWT to be sent in the **request headers** as `token`:

```
Headers:
  token: <jwt_token_from_login_or_register>
```

The `auth.js` middleware verifies the token, extracts the user ID, and attaches it to `req.body.userId` before passing control to the route handler. Requests without a valid token receive:

```json
{ "success": false, "message": "Not Authorized. Login Again" }
```

---

## Error Handling

All endpoints follow a consistent response shape:

```json
{ "success": true,  "...": "..." }
{ "success": false, "message": "human-readable error description" }
```

Server-side errors are caught in `try/catch` blocks and logged to the console for debugging, while a safe, generic message is returned to the client.

---

## Known Issues & Notes

- **`mongodb+srv://` on Windows (Node ≥ v24.13.0):** see the [Windows-specific note](#windows-specific-note-node-v2413) above.
- **Credit balance updates:** `creditBalance` is decremented via an explicit `findByIdAndUpdate` call rather than an atomic `$inc` — under concurrent requests this can be subject to race conditions. Consider switching to `{ $inc: { creditBalance: -1 } }` for production use.
- **Email normalization:** emails are lowercased and trimmed before lookup/storage to avoid case-sensitivity login mismatches.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure `.env` and `node_modules/` remain excluded via `.gitignore` in any commits.

---

## License

This project is licensed under the ISC License — see the `package.json` for details.