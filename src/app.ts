import fastify from "fastify";
import { errorHandler } from "./error-handler";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { env } from "./env/schema";
import { usersRoutes } from "@/http/controllers/users/routes";
import { gymsRoutes } from "@/http/controllers/gyms/routes";
import { checkInsRoutes } from "@/http/controllers/check-ins/routes";

export const app = fastify();

app.register(fastifyCookie);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: "10m",
    }
});

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);
app.setErrorHandler(errorHandler);