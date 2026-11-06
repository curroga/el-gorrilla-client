# El Gorrilla — Client

React frontend for El Gorrilla, a parking spot finder: browse streets on a map,
see free and occupied spots, register your cars and park them.

Built with **React 18 + Vite**, React Router 6, React Bootstrap, Leaflet
(`react-leaflet`) and Axios. Tests run on **Vitest** + Testing Library.

## Requirements

- Node.js 20 (same version Netlify uses)
- The API from `el-gorrilla-server` running locally or deployed

## Setup

```bash
npm install
```

The API base URL comes from `VITE_SERVER_URL`. When unset it defaults to
`http://localhost:5000/api`. To point elsewhere, create a `.env` file:

```bash
VITE_SERVER_URL=https://your-api.example.com/api
```

## Scripts

| Command            | What it does                                        |
| ------------------ | --------------------------------------------------- |
| `npm run dev`      | Dev server on http://localhost:3000 (alias: `start`) |
| `npm run build`    | Production build into `build/`                      |
| `npm run preview`  | Serve the production build locally                  |
| `npm test`         | Vitest in watch mode                                |
| `npm run test:run` | Run the test suite once                             |
| `npm run coverage` | Run the tests with a coverage report                |

## Project structure

```
src/
├── components/   UI pieces: maps/, cars/, calles/, Navbar, Login, IsPrivate
├── pages/        Routed screens: Home, Signup, Profile, calles/, errores/
├── context/      auth.context.js — session state
├── services/     Axios clients for the API (auth, calles, cars)
└── test/         Vitest setup, mocks and render helpers
```

Routes under `/profile`, `/calles` and `/cars` require login (`IsPrivate`).

## Deployment

Deployed on Netlify (`netlify.toml`): runs `npm run build`, publishes `build/`,
and redirects every path to `index.html` so client-side routing works.
