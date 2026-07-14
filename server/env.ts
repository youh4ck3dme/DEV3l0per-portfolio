import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  // Default 3000 — macOS AirPlay Receiver occupies port 5000 and returns 403
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  TRUST_PROXY: z
    .enum(["0", "1", "true", "false"])
    .default("0")
    .transform((value) => value === "1" || value === "true"),
  DATABASE_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;

function formatEnvErrors(error: z.ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "env"}: ${issue.message}`)
    .join("\n");
}

export function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("Invalid environment configuration:\n", formatEnvErrors(result.error));
    process.exit(1);
  }

  return result.data;
}
