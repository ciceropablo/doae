export default {
  environment: "production",

  server: {
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT) || 4000,
  },

  database: {
    url: process.env.DATABASE_URL || "",
  },

  cors: {
    allowedOrigins: ["https://doae.app"],
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET || "",
  },

  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
};
