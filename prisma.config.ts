import { defineConfig } from "prisma/config";

// Prisma configuration file
export default defineConfig({
  // Where Prisma stores migration files
  migrations: {
    path: "./prisma/migrations",
  },

  // Database connection settings
  datasource: {
    // Database type (SQLite for local development)
    provider: "sqlite",

    // Path to the local SQLite database file
    url: "file:./dev.db",
  },
});
