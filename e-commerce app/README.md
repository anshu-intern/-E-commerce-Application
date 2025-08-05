# ShoppyGlobe - E-commerce Application

## Project Overview

ShoppyGlobe is a basic e-commerce application built with React that allows users to browse products, view product details, manage a shopping cart, and search products. It leverages Redux for state management, React Router for navigation, and fetches product data from an external API.

---

## Features

- Product listing with data fetched from `https://dummyjson.com/products`
- Product detail pages using dynamic routing
- Shopping cart with add, remove, and quantity update functionality managed by Redux
- Search functionality to filter products
- Client-side routing with React Router
- Lazy loading with React.lazy and Suspense for better performance
- Responsive styling for multiple screen sizes
- Error handling for failed API calls
- 404 Not Found page for unknown routes

---

## Component Structure

- **App** – Main component that defines routes
- **Header** – Navigation menu and cart icon
- **ProductList** – Displays all products; fetches data on mount using a custom hook
- **ProductItem** – Individual product card with "Add to Cart" button
- **ProductDetail** – Shows detailed info about a selected product
- **Cart** – Lists cart items with options to modify quantity or remove
- **CartItem** – Represents a single item in the cart
- **NotFound** – Displays 404 page for invalid URLs

---

## Technologies Used

- React with Hooks and functional components
- Redux for state management (actions, reducers, selectors)
- React Router for routing
- CSS for responsive design

---

## Installation & Running

1. Clone the repo and change directory:

   git clone https://github.com/anshu-intern/-E-commerce-Application.git
   cd e-commerce\ app 

2. Install dependencies:
    npm install

3. Start the development server:
    npm run dev

4. Open your browser at  http://localhost:5173/
    ➜  Local:   http://localhost:5173/
