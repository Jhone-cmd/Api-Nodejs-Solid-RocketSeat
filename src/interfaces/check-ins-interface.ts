import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
    create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>;
}

export interface CheckInUseCaseInterface {
    userId: string,
    gymId: string,
}

export interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}