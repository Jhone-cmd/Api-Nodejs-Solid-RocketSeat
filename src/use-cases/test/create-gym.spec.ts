import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { GymsUseCase } from "../create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: GymsUseCase; 

describe('Gym Use Case', () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new GymsUseCase(gymsRepository);
    });

    it('should be able to create gym', async () => { 
        const { gym } = await sut.execute({
            title: 'JavaScrip Gym',
            description: null,
            phone: null,
            latitude: -16.0366592,
            longitude: -48.0509952
        });

        expect(gym.id).toEqual(expect.any(String));
        
    });

});