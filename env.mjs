import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    // Environment variables
    TRUST_PROXY: z.number().optional().default(2),
    SHUTDOWN_DELAY: z.number().optional().default(0),
    HEALTH_CHECK_PORT: z.number().optional().default(8040),
    BASE_URL: z.string().optional().default('https://localhost'),
    NODE_ENV: z.enum(["development", "test", "production"]),
    LOG_LEVEL: z.string().optional().optional().default("info"),
    DEFAULT_HTTP_LOG_LEVEL: z.string().optional().default("trace"),
    BACKEND_PORT: z.number().min(1).optional().default(8080),
    DEBUG: z.enum(['false', 'true']).optional().default('true'),

    // Clerk
    CLERK_SECRET_KEY: z.string().startsWith("sk_"),

    // Redis
    REDIS_DATABASE: z.string().optional().default('0'),
    REDIS_HOST: z.string().min(1).optional().default('redis'),
    REDIS_PORT: z.string().min(1).optional().default('6379'),
    REDIS_USERNAME: z.string().nullable().optional().default(null),
    REDIS_PASSWORD: z.string().min(1).optional().default('HYz1vyeHeAGhhCklU81Futl9yfhLTkEKuvQXpyDqE'),


    // Database
    DATABASE_PORT: z.string().optional().default('5432'),
    DATABASE_NAME: z.string().min(1).optional().default("reachout"),
    DATABASE_HOST: z.string().min(1).optional().default("database"),
    DATABASE_USERNAME: z.string().min(1).optional().default("reachout"),
    DATABASE_PASSWORD: z.string().min(1).optional().default("reachout"),

    // Internal & Admin
    ADMIN_TOKEN: z.string().min(1).optional().default("secret"),
    INTERNAL_TOKEN: z.string().min(1).optional().default("secret"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // Clerk
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // Environment variables
    DEBUG: process.env.DEBUG,
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
    TRUST_PROXY: process.env.TRUST_PROXY,
    BACKEND_PORT: process.env.BACKEND_PORT,
    SHUTDOWN_DELAY: process.env.SHUTDOWN_DELAY,
    HEALTH_CHECK_PORT: process.env.HEALTH_CHECK_PORT,
    DEFAULT_HTTP_LOG_LEVEL: process.env.DEFAULT_HTTP_LOG_LEVEL,

    // Database
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,

    // Redis
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_DATABASE: process.env.REDIS_DATABASE,

    // Internal & Admin
    ADMIN_TOKEN: process.env.ADMIN_TOKEN,
    INTERNAL_TOKEN: process.env.INTERNAL_TOKEN,

    // Clerk
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

    // NextJs
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,

  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
