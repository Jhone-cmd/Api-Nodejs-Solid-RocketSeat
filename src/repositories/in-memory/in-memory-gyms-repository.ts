import { GymsRepository } from "@/interfaces/gyms-interface";
import { Gym } from "@prisma/client";


export class InMemoryGymsRepository implements GymsRepository {

    public items: Gym[] = [];

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id);
        if (!gym) return null;
        
        return gym;
    }
}