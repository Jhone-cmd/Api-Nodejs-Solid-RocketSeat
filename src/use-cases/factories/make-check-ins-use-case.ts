import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInsUseCase } from "../check-ins";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new CheckInsUseCase(checkInsRepository, gymsRepository);
    return useCase;
}