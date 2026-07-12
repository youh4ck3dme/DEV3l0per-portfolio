import express, { type Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { loadEnv } from "./env";
import { registerProductionMiddleware } from "./middleware";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";

const env = loadEnv();
const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

if (env.NODE_ENV === "production") {
  registerProductionMiddleware(app, env);
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

/**
 * Logs a message with timestamp and source prefix.
 */
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, unknown> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

function registerGracefulShutdown(server: Server): void {
  const shutdown = (signal: string) => {
    log(`Received ${signal}, shutting down gracefully`);
    server.close((error) => {
      if (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
      }
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error(`Error: ${message}`);
    res.status(status).json({ message });
  });

  if (env.NODE_ENV === "production") {
    await serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  httpServer.listen(
    {
      port: env.PORT,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${env.PORT}`);
    },
  );

  registerGracefulShutdown(httpServer);
})();
