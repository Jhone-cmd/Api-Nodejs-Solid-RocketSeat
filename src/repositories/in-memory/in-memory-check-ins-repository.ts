import { CheckInsRepository } from "@/interfaces/check-ins-interface";
import { Prisma, CheckIn } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository{

    public items: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date( data.validated_at ) : null,
            created_at: new Date()
        }
        this.items.push(checkIn)
        return checkIn;
    } 

    async findByUserIdOnDate(userId: string, date: Date) {
        const checkInOnSameDay = this.items.find(checkIn => checkIn.user_id === userId);
        if(!checkInOnSameDay) return null;
        return checkInOnSameDay;
    };

}