# User Management Application

A React application that integrates with the Reqres API to perform basic user management functions. This project demonstrates a complete user management system with authentication, CRUD operations, and a responsive user interface.

## Features

### Authentication
- Secure login system with email/password
- Form validation and error handling
- Loading states and user feedback
- Token-based authentication
- Protected routes

### User Management
- Paginated list of users
- Responsive card layout
- Search functionality
- Edit user details
- Delete users
- Success/error notifications

### UI/UX
- Modern Material-UI components
- Responsive design (mobile-first)
- Loading states
- Error handling
- Toast notifications
- Clean and intuitive interface

## Technologies Used

- React 18 with TypeScript
- Material-UI for components
- React Router for navigation
- Axios for API calls
- React-Toastify for notifications
- Local Storage for token persistence

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd <project-directory>
```

3. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Usage

### Login
- Use the following credentials:
  - Email: eve.holt@reqres.in
  - Password: cityslicka

### Users List
- View all users in a responsive grid
- Search users by name or email
- Navigate through pages using pagination
- Edit or delete users using the card actions

### Edit User
- Click the Edit button on a user card
- Modify user details in the modal form
- Save or cancel changes

## API Integration

The application integrates with the following Reqres API endpoints:
- POST /api/login - User authentication
- GET /api/users?page={page} - Fetch users list
- PUT /api/users/{id} - Update user
- DELETE /api/users/{id} - Delete user

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Main page components
│   ├── Login.tsx  # Authentication screen
│   └── Users.tsx  # Users management screen
├── services/      # API and other services
├── utils/         # Utility functions
└── App.tsx        # Main application component
```

## Features Implementation

### Authentication
- Login screen with form validation
- Token-based authentication
- Protected routes
- Automatic redirect to login

### User Management
- Display users in a responsive grid layout
- Pagination support
- Search functionality
- Edit user details
- Delete users
- Error handling and loading states

### Bonus Features
- Client-side search and filtering
- React Router for navigation
- Responsive design
- Modern UI components

## Error Handling
- Form validation
- API error handling
- User feedback through toast notifications
- Loading states
- Protected routes

## Security Features
- Token-based authentication
- Protected routes
- Secure password handling
- API error handling

## Assumptions and Considerations
1. The Reqres API is a mock API, so changes are not persisted
2. Token expiration is not implemented (mock API limitation)
3. Search is implemented client-side for better user experience
4. Error messages are user-friendly and informative

## Future Improvements
1. Implement user registration
2. Add sorting functionality
3. Add user roles and permissions
4. Implement token refresh mechanism
5. Add unit tests
6. Add dark mode support

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
