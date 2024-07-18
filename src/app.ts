import fastify from "fastify";
import { appRoutes } from "@/http/routes/routes";
import { errorHandler } from "./error-handler";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env/schema";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
});

app.register(appRoutes);
app.setErrorHandler(errorHandler);