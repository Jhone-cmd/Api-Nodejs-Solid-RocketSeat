import { CreateGymsUseCase } from "../create-gym";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new CreateGymsUseCase(gymsRepository);
    return useCase;
}