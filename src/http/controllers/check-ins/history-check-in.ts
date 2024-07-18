import { makeFetchUserCheckInsUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function historyCheckIns(request: FastifyRequest, reply: FastifyReply) {
    const historyCheckInsParamsSchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = historyCheckInsParamsSchema.parse(request.query);

    const fetchUserCheckInsUseCase = makeFetchUserCheckInsUseCase();
    const { checkIns } = await fetchUserCheckInsUseCase.execute({
        userId: request.user.sub,
        page,
    });
   
    return reply.status(200).send({ checkIns });
}