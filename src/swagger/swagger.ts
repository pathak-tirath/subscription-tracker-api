import { PORT } from "@/config/env";
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Subscription API",
    description: "This is API for all the subscriptions",
  },
  host: `localhost:${PORT}`,
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "authorization",
      scheme: "bearer",
      in: "header",
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["../app.ts"];

swaggerAutogen()(outputFile, routes, doc);
