import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function metricsCheckIns(request: FastifyRequest, reply: FastifyReply) {
    
    const fetchUserMetricsCheckInsUseCase = makeGetUserMetricsUseCase();
    const { checkInsCount } = await fetchUserMetricsCheckInsUseCase.execute({
        userId: request.user.sub,
    });
   
    return reply.status(200).send({ checkInsCount });
}