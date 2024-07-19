import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createCheckIn } from "./create-check-in";
import { historyCheckIns } from "./history-check-in";
import { metricsCheckIns } from "./metrics-check-in";
import { validateCheckIn } from "./validate-check-in";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt);

    app.get('/check-ins/history', historyCheckIns);
    app.get('/check-ins/metrics', metricsCheckIns);
    app.patch('/check-ins/:checkInId/validate', { onRequest: [verifyUserRole('ADMIN')] } , validateCheckIn);

    app.post('/gyms/:gymId/check-in', createCheckIn)

}