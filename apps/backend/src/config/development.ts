export default {
  environment: "development",

  server: {
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT) || 4000,
  },

  database: {
    url: process.env.DATABASE_URL || "",
  },

  cors: {
    allowedOrigins: ["http://localhost:3000"],
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET || "mock-secret",
  },

  logger: {
    level: process.env.LOG_LEVEL || "debug",
  },
};
