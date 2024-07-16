import { FindManyNearbyGymsParams, GymsRepository } from "@/interfaces/gyms-interface";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordenates";
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = [];

    async create(data: Prisma.GymCreateInput) {        
        const gym = {          
                id: data.id ?? randomUUID(),
                title: data.title,
                description: data.description ?? null,
                phone: data.phone ?? null,
                latitude: new Prisma.Decimal(data.latitude.toString()),
                longitude: new Prisma.Decimal(data.longitude.toString())
        }
        this.items.push(gym)
        return gym;
    }

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id);
        if (!gym) return null;
        
        return gym;
    }

    async searchGyms(query: string, page: number) {
        const gyms = this.items
            .filter(item => item.title.toLowerCase().includes(query.toLowerCase())) 
            .slice((page - 1) * 20, page * 20);

        return gyms
    }

    async findNearbyGyms(params: FindManyNearbyGymsParams) {
        const gyms = this.items.filter((item) => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: params.latitude, longitude: params.longitude },
                { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() },
            )
            return distance < 10
        })

        return gyms
    }
}


