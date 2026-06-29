# GaminLib

GaminLib is a Next.js app for managing a personal game library. It provides a dashboard, searchable library, game import page, and user navigation with Live state managed by Zustand.

## Features

- Dashboard overview with collection metrics
- Latest additions and genre breakdown
- Remove games directly from dashboard or library pages
- Search and filter games by genre and status
- Add games through the Import Game page
- Reusable navigation with active route highlighting

## Project Structure

- `app/layout.tsx` — root layout and site metadata
- `app/page.tsx` — homepage with hero and summary sections
- `app/dashboard/page.tsx` — dashboard page with collection overview
- `app/page/library/page.tsx` — library page with search and filters
- `app/page/addgame/page.tsx` — add/import game form page
- `app/login/page.tsx` — placeholder login page
- `app/components/common/Navbar.tsx` — app navigation bar
- `app/Store/gameStore.ts` — Zustand game state store

## Routes

- `/` — Home
- `/dashboard` — Dashboard overview
- `/page/library` — Game library page
- `/page/addgame` — Add game page
- `/login` — Login placeholder

## Getting Started

### Requirements

- Node.js 20+ recommended
- npm (installed with Node.js)

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open `https://gaminlib.vercel.app/` in your browser.

### Build for production

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` — start the Next.js development server
- `npm run build` — build the production app
- `npm run start` — run the built app in production mode
- `npm run lint` — run ESLint checks

## State Management

This project uses Zustand for client-side state management.

- `useGameStore` keeps the game list and exposes methods to add or remove games.
- The dashboard and library pages consume the same store so changes are reflected across the app.

## Styling

- Tailwind CSS is used via PostCSS
- Global styles are defined in `app/globals.css`

## Customization

- Add new games to the initial store in `app/Store/gameStore.ts`
- Update dashboard cards and library filters in their respective page components
- Modify navigation links in `app/components/common/Navbar.tsx`

## Notes

- The project currently uses a placeholder login page.
- The library removal feature updates state live in the UI, and the app persists only during the browser session.

## Dependencies

- `next` 16.2.1
- `react` 19.2.4
- `react-dom` 19.2.4
- `zustand` ^5.0.12
- `lucide-react` ^1.7.0

## Dev Dependencies

- `typescript` ^5
- `tailwindcss` ^4
- `@tailwindcss/postcss` ^4
- `eslint` ^9
- `eslint-config-next` 16.2.1

## License

This project is currently unlicensed. Add a license file if you want to open-source it.
