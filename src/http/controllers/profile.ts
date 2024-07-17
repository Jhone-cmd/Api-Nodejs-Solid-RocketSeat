import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";


export async function profile(request: FastifyRequest, reply: FastifyReply) {

    try {
        
        const getUserProfileUseCase = makeGetUserProfileUseCase();
        const { user } = await getUserProfileUseCase.execute({
            userId: request.user.sub
        });
            
        return reply.status(200).send({ 
            user: {
                ...user,
                password_hash: undefined
            }
        });

    } catch (error) {     
        if (error instanceof ResourceNotFoundError) return reply.status(404).send({ message: error.message });

        throw error;
    }

}