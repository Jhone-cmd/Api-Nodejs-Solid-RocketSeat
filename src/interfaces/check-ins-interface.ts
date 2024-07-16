import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
    findManyByCheckIns(userId: string, page: number): Promise<CheckIn[]>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
    countByUserId(userId: string): Promise<number>
}

export interface CheckInUseCaseInterface {
    userId: string,
    gymId: string,
    userLatitude: number,
    userLongitude: number,
}

export interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}

export interface FetchUserCheckInsUseCaseInterface {
    userId: string,
    page: number
}

export interface FetchUserCheckInsUseCaseResponse {
    checkIns: CheckIn[];
}

export interface GetUserMetricsUseCaseInterface {
    userId: string,
}

export interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}