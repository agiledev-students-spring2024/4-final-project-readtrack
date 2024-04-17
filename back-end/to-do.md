## To-Do List for Backend Refactoring


[] - implement userController
[] - implement userBooksController
[] - add middlewares folder and implement logic
[] - refac app.js https://imgur.com/a/gJhhcD2






backend/
│
├── src/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── userRoutes.js
│   │   │   └── bookRoutes.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │   └── bookController.js
│   │   │
│   │   └── middlewares/
│   │       ├── authenticateToken.js
│   │       └── errorHandler.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Book.js
│   │
│   ├── utils/
│   │   └── hashPassword.js
│   │
│   └── app.js
│
├── .env
├── package.json
└── server.js
