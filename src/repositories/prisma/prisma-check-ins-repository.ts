import { CheckInsRepository } from "@/interfaces/check-ins-interface";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaCheckInsRepository implements CheckInsRepository {
    
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data
        });
        return checkIn;
    }
}