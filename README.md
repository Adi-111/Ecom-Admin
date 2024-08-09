# E-commerce Store with CMS Integration

This project is an E-commerce store that is seamlessly integrated with a Content Management System (CMS). The project structure follows a modular and scalable architecture, designed for easy maintenance and extensibility.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Actions](#actions)
- [App](#app)
- [Components](#components)
- [Hooks](#hooks)
- [Lib](#lib)
- [API Routes](#api-routes)
- [Providers](#providers)
- [Middleware](#middleware)
- [Prisma](#prisma)
- [Configuration Files](#configuration-files)
- [How to Run](#how-to-run)
- [License](#license)

## Features
- **CMS Integration**: Seamless integration with a CMS for managing products, categories, and other content.
- **Modular Architecture**: Organized file structure for easy navigation and code management.
- **Admin Dashboard**: A powerful admin dashboard for managing products, categories, orders, and more.
- **API Routes**: RESTful API routes to interact with the backend.
- **Authentication**: Secure authentication using modern OAuth providers and custom credentials.
- **Responsive Design**: Fully responsive and optimized for various devices.

## Project Structure

### Actions
The `actions` directory contains functions that interact with the backend to fetch data such as products, categories, and sales reports.

### App
The `app` directory is organized into different sections, including:
- **Auth**: Handles user authentication and authorization.
- **Dashboard**: The admin dashboard where users can manage their store's data.
- **Root**: The root layout of the application.

### Components
Reusable UI components such as modals, tables, and form elements are stored here. This directory is further divided into:
- **UI Components**: Common UI elements like buttons, cards, forms, etc.
- **Models**: Components specific to store models and alerts.

### Hooks
Custom React hooks are defined here to manage logic that needs to be reused across the application, such as modal management and store origin.

### Lib
The `lib` directory includes utility functions, database connections (via Prisma), and third-party API integrations like Stripe.

### API Routes
All the API routes are defined within the `app/api` directory, categorized by resource (e.g., `categories`, `products`, `orders`). Each route is responsible for handling CRUD operations.

### Providers
The `provider` directory contains context providers for managing global state, themes, and modal visibility across the application.

### Middleware
The `middleware.ts` file handles custom middleware logic for the application, including request validation and authorization checks.

### Prisma
The `prisma` directory contains the database schema definition using Prisma ORM.

### Configuration Files
- **Tailwind CSS Configuration**: Tailwind configuration for customizing the design system.
- **TypeScript Configuration**: TypeScript configuration for type-checking.
- **Next.js Configuration**: Next.js configuration for optimizing the application.

## How to Run
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Install Dependencies**:
   ```bash
   yarn install
   ```
3. **Run the Development Server**:
   ```bash
   yarn dev
   ```
4. **Access the Application**:
   Open `http://localhost:3000` in your browser.

file structure : @/tree.txt
## License
This project is licensed under the MIT License. See the LICENSE file for more details.

---

This README gives an overview of the structure and functionality of the E-commerce store connected with a CMS. For further customization and deployment instructions, refer to the detailed documentation within each directory.