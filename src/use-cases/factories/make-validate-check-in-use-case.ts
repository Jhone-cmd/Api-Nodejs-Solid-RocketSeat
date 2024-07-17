import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInsUseCase } from "../validate-check-in";

export function makeValidateCheckInsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new ValidateCheckInsUseCase(checkInsRepository);
    return useCase;
}