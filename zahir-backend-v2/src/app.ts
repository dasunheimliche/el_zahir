import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { specs } from "./shared/config/swagger";
import { helloController } from "./components/hello/entry-points/api/hello.controller";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/hello", helloController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`
  );
});
