# InterviewHelper Frontend

React-based frontend for the InterviewHelper AI project. It communicates with a Django backend via REST API and WebSocket, handling routing, UI, and real-time interview feedback.  
For backend, check this repository: https://github.com/SefaWork/InterviewAssistantAI-backend

## Tech Stack

- **React 19** with TypeScript
- **Vite** for bundling and dev server
- **React Router v7** for client-side routing
- **i18next** for internationalization (English and Turkish)
- **Axios** for HTTP requests
- **Recharts** for data visualization
- **Vitest** and **Testing Library** for unit tests

## Setup

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Other available scripts:

```bash
npm run build       # Production build
npm run lint        # Run ESLint
npm run test        # Run tests (add --run for non-watch mode)
npm run test:coverage
```

## Authentication

The app uses JWT authentication with access tokens stored in React state and refresh tokens stored in HTTP-only cookies. Two Axios instances are configured:

- `axiosServer` — unauthenticated requests (login, register)
- `axiosPrivate` — authenticated requests with automatic token refresh on 401 responses

On app load, `PersistLogin` attempts to silently refresh the token so the user stays logged in across page reloads. `RequireAuth` wraps protected routes and redirects unauthenticated users to `/login/`.

## Routing

Routes are defined in `App.tsx`:

| Path | Component | Auth Required |
|------|-----------|---------------|
| `/` | Home | No |
| `/about/` | About | No |
| `/login/` | Login | No |
| `/register/` | Register | No |
| `/logout/` | Logout | No |
| `/interview/` | InterviewSetup | Yes |
| `/interview/:session/` | InterviewPage | Yes |
| `/result/:session/` | InterviewResults | Yes |
| `/history/` | InterviewHistory | Yes |
| `/history/:session/` | InterviewResults | Yes |
| `/account/` | AccountSettings | Yes |

## Interview Flow

1. **InterviewSetup** — Requests webcam access and creates a session via `POST /api/interview/create/`. Once the camera is ready, the user can start.

2. **InterviewPage** — Opens a WebSocket connection to `ws://localhost:8000/ws/stream/`. Captures webcam frames at 5 fps and sends them as binary blobs. The server responds with real-time feedback including face detection, eye contact scores, and detected emotion. Questions are cycled through and played as audio. The session ends when the user clicks Finish (enabled after 60 seconds) or the server sends a `session_complete` message.

3. **InterviewResults** — Fetches session data and displays total score, emotion score, eye contact score, an emotion distribution pie chart, a per-question breakdown, and AI-generated feedback.

## Theming

The app supports light and dark modes. The active theme is applied as a `dark` class on `<body>`, driven by `PreferenceProvider`. The preference is persisted in `localStorage` and falls back to the user's OS preference via `prefers-color-scheme`. All colors are defined as CSS custom properties in `main.css`.

## Internationalization

Language is detected from `localStorage` or the browser, with English as the fallback. Supported languages are English (`en`) and Turkish (`tr`). Translation files are loaded via `i18next-http-backend` from the `public/` directory. The `LangToggle` component in the header cycles through available languages.

## State Management

Global state is minimal and handled through React context:

- `AuthContext` — stores the current access token and a setter
- `PreferenceContext` — stores dark mode state and a toggle function

## Testing

CI runs linting, tests, and a production build on every push to `main`/`master` via GitHub Actions. Current tests are quite limited, due to small scale of this prototype and the lack of members.