# Frontend README

## Overview
This is the frontend of the Online Platform for Artistic Works, built using React and TypeScript.

## Tech Stack
- **React** (UI framework)
- **TypeScript** (Static typing)
- **ESLint & Prettier** (Code linting and formatting)
- **Cypress** (End-to-end testing)
- **React Router** (Client-side routing)

## Project Structure
- `src/index.tsx` - Application entry point
- `src/App.tsx` - Main application component
- `src/pages/` - Page components (Home, Login, Register, Artwork Details, etc.)
- `src/components/` - UI components (Navbar, Sidebar, Footer, Forms, etc.)
- `src/api/` - API service functions (Artwork, User, Comment, etc.)
- `public/` - Static files (index.html, manifest.json, images)
- `.husky/` - Git hooks for pre-commit checks

## Installation and Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Run tests:
   ```sh
   npm test
   ```
   or for end-to-end tests:
   ```sh
   npm run e2e
   ```
4. Build for production:
   ```sh
   npm run build
   ```

## Environment Variables
Create a `.env` file (refer to `.env.example` for guidance) and configure:
```
VITE_API_URL=<Backend API URL>
```

## License
This project is licensed under the MIT License.
