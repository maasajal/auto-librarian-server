# Auto Librarian Server-Side Project Overview

### [Client side Repo Link](https://github.com/maasajal/auto-librarian-client)

The Auto Librarian server-side project is a robust backend application for managing an e-library system. Built with Node.js and Express, it leverages several key technologies to provide secure, scalable, and efficient management of e-library resources. Below are the main features and functionalities of this server-side project

## Main Features:

- Node.js: A powerful JavaScript runtime built on Chrome's V8 engine, providing an efficient and scalable platform for server-side development.
- Express Framework: Utilizes Express.js for building a flexible and scalable web application.
- MongoDB Integration: Implements MongoDB for database management, ensuring efficient storage and retrieval of book data.
- User Authentication: Uses JSON Web Tokens (JWT) for secure user authentication and authorization.
- Cookie Handling: Utilizes cookie-parser for parsing and managing cookies, enhancing session management and user authentication.
- CORS Management: Implements CORS (Cross-Origin Resource Sharing) to control access and ensure secure communication between the server and client applications.
- Environment Configuration: Manages environment variables using dotenv for secure and flexible configuration.
- Firebase Integration: Supports Firebase for real-time database functionality, ensuring seamless data synchronization across multiple clients.

## Key Functionalities:

- Book Management: CRUD operations for managing books, including adding, updating, and deleting book records.
- Category Management: CRUD operations for managing book categories, ensuring an organized and easily navigable collection.
- Borrowing System: Allows users to borrow books, with functionality to decrease book quantity upon borrowing and increase it upon return.
- JWT Authentication: Secure user login and token-based authentication to protect routes and manage user sessions.
- Role-Based Access: Implements role-based access control to restrict certain operations to authorized users only.
- Error Handling: Comprehensive error handling to manage and log errors, ensuring smooth operation and debugging.

This server-side project provides a solid foundation for managing an e-library system, ensuring secure and efficient operations with a user-friendly interface.

### Run the project on your Local machine

- Clone: `git clone https://github.com/maasajal/auto-librarian-server.git`
- Change Directory: `cd auto-librarian-server`
- Install packages: `npm i` or `npm install`
- Run: `nodemon index.js` if you don't have nodemon run `node index.js`
