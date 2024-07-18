import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { searchGyms } from "./search-gyms";
import { createGym } from "./create-gym";
import { nearbyGyms } from "./nearby-gyms";

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt);

    app.get('/gyms/search', searchGyms);
    app.get('/gyms/nearby', nearbyGyms);
    app.post('/gyms', createGym);
}