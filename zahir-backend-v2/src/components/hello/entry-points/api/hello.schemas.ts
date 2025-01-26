export const HelloSchemas = {
  HelloResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Hello World!",
      },
    },
  },
};

export const HelloPaths = {
  "/api/hello": {
    get: {
      tags: ["Hello"],
      summary: "Returns a hello world message",
      description: "A simple endpoint that returns a hello world message",
      responses: {
        "200": {
          description: "Hello world message",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/HelloResponse",
              },
            },
          },
        },
      },
    },
  },
  "/api/hello/{name}": {
    get: {
      tags: ["Hello"],
      summary: "Returns a personalized hello message",
      parameters: [
        {
          in: "path",
          name: "name",
          required: true,
          schema: {
            type: "string",
          },
          description: "Name to say hello to",
        },
      ],
      responses: {
        "200": {
          description: "Personalized hello message",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/HelloResponse",
              },
            },
          },
        },
      },
    },
  },
};
