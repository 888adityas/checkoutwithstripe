# MERN E-commerce Application

This is a MERN stack e-commerce web application built using React, Tailwind CSS, and React Router. The application provides a seamless shopping experience with features such as product display, cart functionality, and a responsive design.

## Features

- **Product Display**: Users can browse through a list of products displayed in a card format.
- **Product Details**: Users can view detailed information about each product.
- **Shopping Cart**: Users can add products to their cart, view cart contents, and proceed to checkout.
- **Responsive Design**: The application is designed to be fully responsive, providing an optimal experience on both desktop and mobile devices.
- **User Authentication**: Users can register, log in, and manage their profiles.

## Technologies Used

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Node.js, Express, MongoDB
- **State Management**: Context API for managing cart and authentication state

## Project Structure

```
mern-ecommerce
├── client                # Client-side application
│   ├── public            # Public assets
│   ├── src               # Source code for the React app
│   ├── package.json      # Client package configuration
│   └── README.md         # Client documentation
├── server                # Server-side application
│   ├── config            # Configuration files
│   ├── controllers       # Request handlers
│   ├── middleware        # Middleware functions
│   ├── models            # Database models
│   ├── routes            # API routes
│   ├── index.js          # Server entry point
│   └── package.json      # Server package configuration
├── .gitignore            # Git ignore file
├── package.json          # Overall project package configuration
└── README.md             # Overall project documentation
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:
   ```
   cd server
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   cd server
   npm run dev
   ```

2. Start the client:
   ```
   cd client
   npm run dev
   ```

The application should now be running on `http://localhost:5173`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.
