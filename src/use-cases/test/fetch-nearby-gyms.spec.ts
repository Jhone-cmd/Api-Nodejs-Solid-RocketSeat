import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase; 

describe('Find Many Nearby Gyms Use Case', () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);
    });

    it('should be able to fetch nearby gyms', async () => { 
        await gymsRepository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: -16.0366592,
            longitude: -48.0509952
        });

        await gymsRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -15.5560727,
            longitude: -47.9912768
        });     

        
        const { gyms } = await sut.execute({
            userLatitude: -16.0366592,
            userLongitude: -48.0509952
        });

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([ expect.objectContaining({ title: "Near Gym" }) ])
        
    });
});