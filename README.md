# News RAG Chatbot Frontend

A React + TypeScript frontend for the RAG chatbot backend that provides a user interface to interact with news-based queries.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend server running (see backend README)

## Setup

### 1. Install dependencies
```bash
npm install
```
### 2. Configure environment
```bash
cp .env.example .env
Edit .env and set your API base URL:

env
VITE_API_BASE_URL=http://localhost:4000
```
### 3. Start development server
```bash
npm run dev
```
The frontend will be available at http://localhost:5173 by default.

### Notes
Ensure the backend server is running before starting the frontend to enable API communication.

You can use either npm or yarn as the package manager.

Update the VITE_API_BASE_URL if your backend is hosted at a different address or port.

### Available Scripts

npm run dev: Starts the development server with hot reloading.
npm run build: Builds the app for production.
npm run preview: Previews the production build locally.