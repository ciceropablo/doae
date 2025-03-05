export default {
  environment: "test",

  server: {
    host: "0.0.0.0",
    port: 4000,
  },

  database: {
    url: "postgresql://doae_test:doae123_test@postgres:5432/doae_test",
  },

  cors: {
    allowedOrigins: ["http://localhost:3000"],
  },

  auth: {
    jwtSecret: "test-secret",
  },

  logger: {
    level: "debug",
  },
};
