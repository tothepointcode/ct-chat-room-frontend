# CT CHAT ROOM FRONTEND

This project is frontend web app for a chat room application, built with ReactJS, Vite and TypeScript. It supports only 1 chat group and a minimum of 5 users.

> This project was developed as part of a technical assessment for Clank Tech.

## Built With

- ReactJS
- Vite
- TypeScript
- TailwindCSS
- React Router (For navigation / routing)
- Context + LocalStorage (For data handling)
- Axios (For API requests)

## Features

- Joining the group chat with username
- Exiting the group chat
- Resuming / rejoining the group on exiting
- Sending messages
- Reading all messages in a structured format

## How to Install and Run Project

With project cloned onto your machine:

### 1. Install dependencies

```
npm install
```

### 2. Setup API URL

In `src\shared\constants.tsx` is the base API URL for the backend which is `http://localhost:5000/api/v1`.

You can update it if yours is different

### 3. Start Dev Server

- Run `npm run dev` to start the server.
- The project should be available at `http://localhost:5173`.
