import { FindManyNearbyGymsParams, GymsRepository } from "@/interfaces/gyms-interface";
import { prisma } from "@/lib/prisma";
import { Prisma, Gym } from "@prisma/client";

export class PrismaGymsRepository implements GymsRepository {
    async create(data: Prisma.GymCreateInput) {
        const gym = prisma.gym.create({
            data
        });
        
        return gym;
    }

    async searchGyms(query: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {  contains: query },
            },
            take: 20,
            skip: (page -1) * 20
        });

        return gyms;
    }

    async findById(id: string) {
        const gym = await prisma.gym.findUnique({
            where: { id }
        });

        return gym;
    }

    async findNearbyGyms({ latitude, longitude }: FindManyNearbyGymsParams) {
        const gyms = await prisma.$queryRaw<Gym[]>`
            Select * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        
        return gyms;
    }
}
   