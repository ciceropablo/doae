import fromZodSchema from "zod-to-json-schema";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

export const authSchemas = {
  register: {
    description: "User registration",
    tags: ["Auth"],
    body: fromZodSchema(registerSchema),
    response: {
      201: {
        description: "Registration successful",
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              role: { type: "string" },
            },
          },
        },
      },
    },
  },
  login: {
    description: "User login",
    tags: ["Auth"],
    body: fromZodSchema(loginSchema),
    response: {
      200: {
        description: "Login successful",
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              role: { type: "string" },
            },
          },
          token: { type: "string" },
        },
      },
    },
  },
};
