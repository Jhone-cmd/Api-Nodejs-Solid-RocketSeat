import { EmailAlreadyExistsErro } from "@/errors/email-already-exists-error";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8)
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const usersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);
        await registerUseCase.execute({ name, email, password });

    } catch (error) {     
        if (error instanceof EmailAlreadyExistsErro) return reply.status(409).send({ message: error.message });

        throw error;
    }
    
    return reply.status(201).send();
}