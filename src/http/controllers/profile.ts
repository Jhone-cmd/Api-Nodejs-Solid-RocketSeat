import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";


export async function profile(request: FastifyRequest, reply: FastifyReply) {

    try {
    await request.jwtVerify();   
            
    return reply.status(200).send();

    } catch (error) {     
        if (error instanceof InvalidCredentialsError) return reply.status(400).send({ message: error.message });

        throw error;
    }

}