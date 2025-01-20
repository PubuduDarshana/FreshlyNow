# FreshlyNow E-Commerce Website

FreshlyNow is a full-stack e-commerce web application that allows users to browse products, add them to the cart, and make purchases. The application includes both a frontend built with React and a backend built with Node.js, Express, and MongoDB.

## Table of Contents

- Features
- Technologies Used
- Project Structure
- Installation
- Running the Application
- API Endpoints
- Contributing
- License

## Features

- User authentication (signup, login)
- Product browsing and search
- Shopping cart management
- Order placement and history
- Admin panel for product and order management
- Responsive design

## Technologies Used

### Frontend

- React
- React Router
- Axios
- JWT Decode
- CSS Modules

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt

## Project Structure

```
.gitignore
Backend/
    .env
    app.js
    controllers/
        adminController.js
        authController.js
        cartController.js
        orderController.js
        paymentController.js
        productController.js
        userController.js
    middlewares/
        admin.js
        auth.js
    models/
        cart.js
        order.js
        product.js
        user.js
    package.json
    public/
        css/
        images/
        js/
        views/
    routes/
        admin.js
        auth.js
        cart.js
        order.js
        payment.js
        user.js
    server.js
Frontend/
    .gitignore
    build/
    package.json
    public/
    src/
        api.js
        App.js
        App.test.js
        components/
        context/
        pages/
        services/
        index.js
        index.css
        setupTests.js
README.md
```

## Installation

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB instance running

### Backend Setup

1. Navigate to the 

Backend

 directory:

```sh
cd Backend
```

2. Install the dependencies:

```sh
npm install
```

3. Create a `.env` file in the `Backend` directory and add your environment variables:
```
DATABASE=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority JWT_SECRET=your_jwt_secret
```
Replace `<username>`, `<password>`, and `<dbname>` with your actual database credentials.


4. Start the backend server:

```sh
npm start
```

### Frontend Setup

1. Navigate to the 

Frontend

 directory:

```sh
cd Frontend
```

2. Install the dependencies:

```sh
npm install
```

3. Start the frontend development server:

```sh
npm start
```

## Running the Application

1. Ensure that both the backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `POST /api/products` - Create a new product (Admin only)
- `PUT /api/products/:id` - Update a product (Admin only)
- `DELETE /api/products/:id` - Delete a product (Admin only)

### Cart

- `POST /api/cart` - Add a product to the cart
- `GET /api/cart/:userId` - Get the cart for a user
- `PUT /api/cart` - Update the cart
- `DELETE /api/cart` - Remove a product from the cart

### Orders

- `POST /api/order` - Create a new order
- `GET /api/order` - Get all orders (Admin only)
- `PATCH /api/order/:orderId/status` - Update order status (Admin only)

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Update user password
- `GET /api/users/orders` - Get user's order history

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
