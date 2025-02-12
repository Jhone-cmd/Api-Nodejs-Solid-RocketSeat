import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { refreshToken } from "./refresh-token";

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', register);
    app.post('/sessions', authenticate);
    app.patch('/token/refresh', refreshToken);

    //** Authorized */

    app.get('/me', { onRequest: [verifyJwt] }, profile);
}