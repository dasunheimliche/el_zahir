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
  Login: {
    type: "object",
    properties: {
      username: {
        type: "string",
        example: "john_doe",
        minLength: 3,
        description: "User's username",
      },
      password: {
        type: "string",
        example: "securePassword123",
        minLength: 6,
        description: "User's password",
      },
    },
    required: ["username", "password"],
  },
  UserResponse: {
    type: "object",
    properties: {
      id: {
        type: "string",
        example: "123e4567-e89b-12d3-a456-426614174000",
        description: "Unique identifier for the user",
      },
      username: {
        type: "string",
        example: "john_doe",
      },
      email: {
        type: "string",
        example: "john.doe@example.com",
      },
      role: {
        type: "string",
        enum: ["USER", "ADMIN", "MODERATOR"],
        description: "User's role in the system",
      },
      profile: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "John",
          },
          lastname: {
            type: "string",
            example: "Doe",
          },
          bio: {
            type: "string",
            nullable: true,
            example: "Software developer",
          },
          mainPanelImg: {
            type: "string",
            nullable: true,
            example: "https://example.com/panel-image.jpg",
          },
          profileImg: {
            type: "string",
            nullable: true,
            example: "https://example.com/profile-image.jpg",
          },
        },
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "User creation timestamp",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Last user update timestamp",
      },
      lastLoginAt: {
        type: "string",
        format: "date-time",
        nullable: true,
        description: "Timestamp of the last user login",
      },
      isActive: {
        type: "boolean",
        description: "Whether the user account is active",
      },
    },
  },
  AuthTokenResponse: {
    type: "object",
    properties: {
      user: {
        $ref: "#/components/schemas/UserResponse",
      },
      accessToken: {
        type: "string",
        description: "JWT access token",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
      refreshToken: {
        type: "string",
        description: "Refresh token for obtaining new access tokens",
        example: "a1b2c3d4e5f6g7h8i9j0",
      },
      expiresIn: {
        type: "string",
        description: "Access token expiration time",
        example: "15m",
      },
    },
  },
  ErrorResponse: {
    type: "object",
    properties: {
      error: {
        type: "string",
        example: "Invalid credentials",
      },
      details: {
        type: "string",
        nullable: true,
        example: "Additional error information",
      },
      field: {
        type: "string",
        nullable: true,
        description: "Specific field causing the error",
        example: "email",
      },
    },
  },
};

export const AuthPaths = {
  "/api/auth/register": {
    post: {
      tags: ["Authentication"],
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
                $ref: "#/components/schemas/AuthTokenResponse",
              },
            },
          },
        },
        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
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
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  "/api/auth/login": {
    post: {
      tags: ["Authentication"],
      summary: "User login",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Login",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Successful login",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AuthTokenResponse",
              },
            },
          },
        },
        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        "401": {
          description: "Invalid credentials or account disabled",
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
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  "/api/auth/refresh-token": {
    post: {
      tags: ["Authentication"],
      summary: "Refresh access token",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                refreshToken: {
                  type: "string",
                  description: "Current refresh token",
                },
              },
              required: ["refreshToken"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "New access token generated",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  accessToken: {
                    type: "string",
                    description: "New JWT access token",
                  },
                  expiresIn: {
                    type: "string",
                    description: "Access token expiration time",
                    example: "15m",
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Invalid or expired refresh token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  "/api/auth/logout": {
    post: {
      tags: ["Authentication"],
      summary: "User logout",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        "200": {
          description: "Successfully logged out",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Logged out successfully",
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Unauthorized - Invalid or missing token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
};
