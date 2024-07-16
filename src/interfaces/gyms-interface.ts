import {  Gym, Prisma } from "@prisma/client";

export interface GymsRepository {
    create(gym: Prisma.GymCreateInput): Promise<Gym>;
    searchGyms(query: string, page: number): Promise<Gym[]>
    findById(id: string): Promise<Gym | null>;
    findNearbyGyms(params: FindManyNearbyGymsParams): Promise<Gym[]>
}

export interface FindManyNearbyGymsParams {
    latitude: number,
    longitude: number
}
export interface GymsUseCaseInterface {
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number
}

export interface GymsUseCaseResponse {
    gym: Gym;
}

export interface SearchGymsUseCaseInterface {
    query: string,
    page: number
}
export interface SearchGymsUseCaseResponse {
    gyms: Gym[];
}

export interface FindMayNearbyGymsUseCaseInterface {
    userLatitude: number,
    userLongitude: number
}
export interface FindMayNearbyGymsUseCaseResponse {
    gyms: Gym[];
}