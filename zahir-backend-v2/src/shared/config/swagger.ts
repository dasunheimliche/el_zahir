import swaggerJsdoc from "swagger-jsdoc";
import {
  HelloSchemas,
  HelloPaths,
} from "../../components/hello/entry-points/api/hello.schemas";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "A simple Express API using Swagger for documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        ...HelloSchemas,
      },
    },
    paths: {
      ...HelloPaths,
    },
  },
  apis: [], // Ya no necesitamos esto porque definimos los paths manualmente
};

export const specs = swaggerJsdoc(options);
