export const healthSchemas = {
  health: {
    description: "Health check",
    tags: ["Health"],
    response: {
      200: {
        description: "Health check successful",
        type: "object",
        properties: {
          status: {
            type: "string",
          },
        },
      },
    },
  },
};
