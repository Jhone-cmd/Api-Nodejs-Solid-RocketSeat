import { FastifyInstance } from "fastify";
import { env } from "./env/schema";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {

    if (env.NODE_ENV !== 'production') {
        console.log(error)
    } else {
        // TODO
    }

    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation Error',
            error: error.flatten().fieldErrors
        });
    }
    
    return reply.status(500).send({ message: 'Internal Server Error' });
}