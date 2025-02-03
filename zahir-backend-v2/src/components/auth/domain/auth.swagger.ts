export const AuthSchemas = {
  CreateUser: {
    type: "object",
    properties: {
      username: {
        type: "string",
        example: "john_doe",
        minLength: 3,
        description: "Unique username for the user",
      },
      email: {
        type: "string",
        example: "john.doe@example.com",
        format: "email",
        description: "Valid email address",
      },
      password: {
        type: "string",
        example: "securePassword123",
        minLength: 6,
        description: "Password with at least 6 characters",
      },
      name: {
        type: "string",
        example: "John",
        description: "First name of the user",
      },
      lastname: {
        type: "string",
        example: "Doe",
        description: "Last name of the user",
      },
    },
    required: ["username", "email", "password", "name", "lastname"],
  },
  CreatedUserResponse: {
    type: "object",
    properties: {
      id: {
        type: "string",
        example: "123e4567-e89b-12d3-a456-426614174000",
        description: "Unique identifier for the created user",
      },
      username: {
        type: "string",
        example: "john_doe",
      },
      email: {
        type: "string",
        example: "john.doe@example.com",
      },
      name: {
        type: "string",
        example: "John",
      },
      lastname: {
        type: "string",
        example: "Doe",
      },
    },
  },
  ErrorResponse: {
    type: "object",
    properties: {
      error: {
        type: "string",
        example: "Username or email already exists",
      },
      field: {
        type: "string",
        example: "email",
        description: "Field that caused the conflict",
      },
    },
  },
};

export const AuthPaths = {
  "/api/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateUser",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User successfully created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreatedUserResponse",
              },
            },
          },
        },
        "409": {
          description: "Username or email already exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Internal server error",
                  },
                  details: {
                    type: "string",
                    example: "Error message details",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
