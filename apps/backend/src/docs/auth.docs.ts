import fromZodSchema from "zod-to-json-schema";
import { loginSchema } from "../schemas/auth.schema";

export const authSchemas = {
  login: {
    description: "User login (mock)",
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
