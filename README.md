# Sportogether

Sportogether is a mobile application developed with React Native using Expo, enabling users to create and join local sporting events, which also double down as chatrooms. The backend is powered by Node.js and Express.js, providing a robust and scalable environment to handle user interactions and data management.

This app prototype has been developed as a group project by KipaLogix for a college course at UBB Cluj in the Spring 2024 semester.

KipaLogix is formed of Cristian Bacter, Tiberiu Amarie, Florin Baciu and Dominic Bacs. 

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Contact](#contact)

## Introduction

Sportogether is designed to bring sports enthusiasts together by allowing them to create, discover, and join sports events in their local area. Whether you're looking for a casual game of soccer, a competitive tennis match, or a group to go jogging with, Sportogether is here to help you find and connect with like-minded individuals. Users are also given the option to communicate with fellow participants of an event in the event Chat.

## Features

- User Authentication: Secure sign-up and log-in process using JWT Token.
- Event Creation: Users can create new sports events, specifying details such as location, time, and participant limit.
- Event Discovery: Browse and search for upcoming sports events in your area by. Users can browse either the interactive map or the list.
- Event Participation: Join events created by other users.
- My Events: Manage your events - those which you created and which you participate in.
- Chats: Each event features its' separate chatroom meant for participants to discuss matters of organization or feedback.
- User Profiles: View and manage your personal profile.

## Technologies Used

- **Frontend**: React Native, Expo, Expo Router for file based navigation
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Prisma as ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Logging**: Winston for Node.js
- **Web Sockets for dynamic chatrooms**

## Installation

### Prerequisites

- Node.js and npm installed
- Expo CLI installed
- PostgreSQL installed and running

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/KipaLogix/SporTogether.git
    cd sportogether/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your environment variables:
    ```env
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/SporTogether?schema=public"
    PORT=3001
    SECRET=q3049h8gfhq30n9fa3w90vnh08hN89029329@J!E$
    ```
4. Initialize Prisma and run migrations:
   ```bash
    npx prisma init && npx prisma migrate dev
    ```

5. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend/ExpoClient
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the Expo development server:
    ```bash
    npx expo
    ```

## Usage

1. Ensure the backend server is running.
2. Start the Expo development server.
3. Use the Expo client app on your mobile device to scan the QR code displayed in the terminal.
4. Sign up or log in to start creating and joining sports events, chatting and having a great time.

## API Endpoints

### User Authentication

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Log in an existing user.

### Events

- **GET /api/events**: Get a list of all events by location and area.
- **POST /api/events**: Create a new event.
- **GET /api/events/:id**: Get details of a specific event.
- **GET /api/events/myEvents/:userid**: Get a list of all events of a user.
- **POST /api/events/join**: Join an event.
- **POST /api/events/leave**: Leave an event.
- **DELETE /api/events/cancel**: Cancel an event.

### Users

- **POST /api/users/**: Create a new user.
- **GET /api/users/:id**: Get user profile details.
- **PUT /api/users/:id**: Update user profile details.
- **DELETE /api/users/:id**: Delete user.

### Sports

- **GET /api/sports**: Get a list of all sports.

### Messages

- **POST /api/messages/**: Create a new message.
- **GET /api/messages/:eventId**: Get all messages corresponding to an event.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## Contact

If you have any questions or suggestions, please feel free to contact us at [domibacsro@gmail.com](mailto:domibacsro@gmail.com).

---

KipaLogix 2024
