import { CheckInsRepository } from "@/interfaces/check-ins-interface";
import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
        
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data
        });

        return checkIn;
    }

    async findManyByCheckIns(userId: string, page: number) {
        const checkIns = await prisma.checkIn.findMany({
            where: { user_id: userId },
            take: 20,
            skip: (page - 1) * 20,
        });

        return checkIns;
    }

    async findByUserIdOnDate(userId: string, date: Date){
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        const checkIn = await prisma.checkIn.findFirst({
            where: { 
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate(),
                }
             }, 
        });

        return checkIn;
    }

    async  countByUserId(userId: string){
        const checkIn = await prisma.checkIn.count({
            where: { user_id: userId }
        });
        
        return checkIn;
    }

    async findById(id: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: { id }
        });
        
        return checkIn;
    }

    async save(data: CheckIn) {
        const checkIn = await prisma.checkIn.update({
            where: { id: data.id },
            data
        });

        return checkIn;
    }
}