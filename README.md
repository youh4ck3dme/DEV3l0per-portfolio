# DEV3l0per Portfolio

A modern, responsive portfolio website showcasing development projects with cutting-edge web technologies.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **3D Animations**: Interactive particle backgrounds using Three.js and React Three Fiber
- **PWA Support**: Installable as a progressive web app
- **Real-time Status**: Online/offline indicator with smooth animations
- **Interactive Components**: Animated UI elements with Framer Motion
- **Card Scanner**: Unique credential scanning animation
- **Contact Integration**: Client-side contact form (backend integration planned)
- **Project Showcase**: Dynamic project display with filtering

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Three Fiber** for 3D graphics
- **React Query** for data fetching
- **React Hook Form** with Zod validation

### Backend

- **Express.js** with TypeScript
- In-memory storage for demo API routes (`/api/users`)
- Drizzle ORM schema prepared for future PostgreSQL integration
- WebSocket support (scaffolded)

### Development Tools

- **ESLint** and **TypeScript** for code quality
- **Vite** for development server
- **tsx** for TypeScript execution

## 🧪 Automated Testing Setup

This project uses **Vitest** for unit and integration testing, and **Playwright** for end-to-end browser tests.

### Vitest

- Installed via `npm install --save-dev vitest`
- Configuration: `vitest.config.ts`
- Example test: `client/src/hello.test.ts`, `tests/hello.spec.ts`
- Run all tests: `npm test` or `npx vitest`

#### Example Vitest Test

```ts
import { test, expect } from 'vitest';

test('hello world', () => {
  expect(1 + 1).toBe(2);
});
```

### Playwright

- Installed via `npm install --save-dev @playwright/test`
- Configuration: `playwright.config.ts`
- Example test: `tests/hello.spec.ts`
- Run all E2E tests: `npx playwright test`

#### Example Playwright Test

```ts
import { test, expect } from '@playwright/test';

test('hello world!', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});
```

### Scripts

- `npm test` — Runs all Vitest tests
- `npx playwright test` — Runs all Playwright E2E tests

All tests are set up and passing. You can add more tests in the `client/src` or `tests` folders.

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dev3l0per-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment (optional for local dev)**

   ```bash
   cp .env.example .env
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run build:client` - Build only the client
- `npm run build:server` - Build only the server
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts
- `npm run db:push` - Push database schema changes (requires `DATABASE_URL`)

## 🚀 Production Deployment

### Environment Variables

Copy `.env.example` and configure for your environment:

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No (default `5000`) | HTTP port |
| `NODE_ENV` | Yes | Must be `production` |
| `TRUST_PROXY` | No | Set to `1` behind nginx/Caddy/load balancer |
| `DATABASE_URL` | No | Only needed for future PostgreSQL integration |

### Build and Run

```bash
npm ci
npm run build
npm start
```

Verify the deployment:

```bash
curl http://localhost:5000/health
# {"status":"ok","uptime":...}
```

### Docker

```bash
docker build -t portfolio .
docker run -p 5000:5000 -e NODE_ENV=production portfolio
```

Or with Docker Compose:

```bash
docker compose up --build
```

### Reverse Proxy (VPS)

When deploying behind nginx, set `TRUST_PROXY=1` and use the example config in [`deploy/nginx.conf.example`](deploy/nginx.conf.example).

### CI/CD

GitHub Actions runs type checking, tests, and build on every push and pull request. Docker image build runs on pushes to `main`.

### Static-Only Deployment

If you only need the frontend without the Express API, build the client and deploy `dist/public/` to any static host (Vercel, Netlify, Cloudflare Pages):

```bash
npm run build:client
```

## 📁 Project Structure

```text
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Base UI components (shadcn/ui)
│   │   │   └── examples/  # Component examples
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and configurations
│   │   ├── pages/         # Page components
│   │   └── ...
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage logic
│   └── static.ts          # Static file serving
├── shared/                 # Shared types and schemas
├── script/                 # Build and utility scripts
└── package.json
```

## 🎨 Design System

The project follows a brutalist-inspired design system with:

- Monospace fonts for terminal-like aesthetics
- Cyan (#00FFFF) and green (#00FF00) accent colors
- Dark theme with high contrast
- Grid-based layouts
- Subtle animations and transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

./d3v3l0p3r