import compression from "compression";
import type { Express, Request, Response } from "express";
import helmet from "helmet";
import type { Env } from "./env";

export function registerProductionMiddleware(app: Express, env: Env): void {
  if (env.TRUST_PROXY) {
    app.set("trust proxy", 1);
  }

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(compression());

  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      uptime: process.uptime(),
    });
  });
}
