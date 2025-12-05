/**
 * TypeScript interface representing the structure of a package.json file.
 * Includes all standard fields and dependencies for the project.
 */
export interface RootObject {
  name: string;
  version: string;
  type: string;
  license: string;
  scripts: Scripts;
  dependencies: Dependencies;
  devDependencies: DevDependencies;
  optionalDependencies: OptionalDependencies;
}

export interface OptionalDependencies {
  bufferutil: string;
}

export interface DevDependencies {
  "@tailwindcss/typography": string;
  "@tailwindcss/vite": string;
  "@types/connect-pg-simple": string;
  "@types/express": string;
  "@types/express-session": string;
  "@types/node": string;
  "@types/passport": string;
  "@types/passport-local": string;
  "@types/react": string;
  "@types/react-dom": string;
  "@types/ws": string;
  "@vitejs/plugin-react": string;
  autoprefixer: string;
  "drizzle-kit": string;
  esbuild: string;
  postcss: string;
  tailwindcss: string;
  tsx: string;
  typescript: string;
  vite: string;
}

export interface Dependencies {
  "@hookform/resolvers": string;
  "@jridgewell/trace-mapping": string;
  "@radix-ui/react-accordion": string;
  "@radix-ui/react-alert-dialog": string;
  "@radix-ui/react-aspect-ratio": string;
  "@radix-ui/react-avatar": string;
  "@radix-ui/react-checkbox": string;
  "@radix-ui/react-collapsible": string;
  "@radix-ui/react-context-menu": string;
  "@radix-ui/react-dialog": string;
  "@radix-ui/react-dropdown-menu": string;
  "@radix-ui/react-hover-card": string;
  "@radix-ui/react-label": string;
  "@radix-ui/react-menubar": string;
  "@radix-ui/react-navigation-menu": string;
  "@radix-ui/react-popover": string;
  "@radix-ui/react-progress": string;
  "@radix-ui/react-radio-group": string;
  "@radix-ui/react-scroll-area": string;
  "@radix-ui/react-select": string;
  "@radix-ui/react-separator": string;
  "@radix-ui/react-slider": string;
  "@radix-ui/react-slot": string;
  "@radix-ui/react-switch": string;
  "@radix-ui/react-tabs": string;
  "@radix-ui/react-toast": string;
  "@radix-ui/react-toggle": string;
  "@radix-ui/react-toggle-group": string;
  "@radix-ui/react-tooltip": string;
  "@react-three/drei": string;
  "@react-three/fiber": string;
  "@tanstack/react-query": string;
  "class-variance-authority": string;
  clsx: string;
  cmdk: string;
  "connect-pg-simple": string;
  "date-fns": string;
  "drizzle-orm": string;
  "drizzle-zod": string;
  "embla-carousel-react": string;
  express: string;
  "express-session": string;
  "framer-motion": string;
  "input-otp": string;
  "lucide-react": string;
  memorystore: string;
  "next-themes": string;
  passport: string;
  "passport-local": string;
  pg: string;
  react: string;
  "react-day-picker": string;
  "react-dom": string;
  "react-hook-form": string;
  "react-icons": string;
  "react-resizable-panels": string;
  recharts: string;
  "tailwind-merge": string;
  "tailwindcss-animate": string;
  three: string;
  "tw-animate-css": string;
  vaul: string;
  wouter: string;
  ws: string;
  zod: string;
  "zod-validation-error": string;
}

export interface Scripts {
  dev: string;
  build: string;
  start: string;
  check: string;
  "db:push": string;
}
