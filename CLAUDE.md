# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start development server (opens at http://localhost:3000)
- `npm test` - Run tests in interactive watch mode  
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (irreversible)

## Architecture Overview

This is a React.js frontend client for "El Gorrilla", a parking management application. The app helps users find and manage parking spaces in streets, with role-based access (admin/user) and interactive maps.

### Core Structure

**Authentication System:**
- JWT-based authentication with token stored in localStorage
- `AuthContext` (src/context/auth.context.js) provides global auth state
- `IsPrivate` component wraps protected routes
- Role-based access: regular users and admins

**Data Entities:**
- **Calles** (Streets): Main entity with parking spots, position data, and car assignments
- **Cars**: Vehicle data managed by users
- Street-car relationships managed through the calles service

**Key Architecture Patterns:**
- React Context for global authentication state
- Service layer pattern with Axios interceptors for API calls
- Route protection using HOC pattern
- Controlled environment variables via REACT_APP_SERVER_URL

### Service Layer

All API calls go through `config.service.js` which:
- Configures base URL from environment
- Automatically attaches JWT tokens via request interceptors
- Centralizes HTTP error handling

Services follow consistent naming: `get*Service`, `create*Service`, `update*Service`, `delete*Service`

### Map Integration

Uses React Leaflet for interactive maps:
- `MapView.jsx` - Display multiple street markers with parking info
- `MapViewDetails.jsx` - Detailed view for specific locations  
- `MapWithClickable.jsx` - Interactive map for admin actions
- `MapWithDrag.jsx` - Drag-and-drop functionality for positioning

Hardcoded to Sevilla, Spain coordinates (37.179, -5.775) as default center.

### Component Organization

- `/components` - Reusable UI components and auth wrapper
- `/pages` - Route-level components organized by feature
- `/services` - API interaction layer
- `/context` - Global state management
- `/styles` - Component-specific CSS files

### Environment Setup

Requires `REACT_APP_SERVER_URL` environment variable pointing to the backend API.