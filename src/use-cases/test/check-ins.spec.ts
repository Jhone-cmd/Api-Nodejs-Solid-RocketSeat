import { describe, it, expect, beforeEach } from "vitest";
import { CheckInsUseCase } from "../check-ins";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInsUseCase; 

describe('Check In Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInsUseCase(checkInsRepository);
    });

    it('should be able to register', async () => { 
        const { checkIn } = await sut.execute({
            userId: "user-1",
            gymId: "gym-1"
        });
        
        expect(checkIn.id).toEqual(expect.any(String));
    });
});