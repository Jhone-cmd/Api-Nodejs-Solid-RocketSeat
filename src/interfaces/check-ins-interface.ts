import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
    create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>;
    findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>;
}

export interface CheckInUseCaseInterface {
    userId: string,
    gymId: string,
}

export interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}