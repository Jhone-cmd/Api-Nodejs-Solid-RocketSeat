import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
       
        const authenticateUseCase = makeAuthenticateUseCase();
        const { user } = await authenticateUseCase.execute({ email, password });

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: user.id,
                expiresIn: '7d', 
            }
        });

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id,
            }
        });
        
        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(200).send({ token });

    } catch (error) {     
        if (error instanceof InvalidCredentialsError) return reply.status(400).send({ message: error.message });

        throw error;
    }
}