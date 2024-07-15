import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { CheckInsUseCase } from "../check-ins";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInsUseCase; 

describe('Check In Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInsUseCase(checkInsRepository);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to check in', async () => { 
        const { checkIn } = await sut.execute({
            userId: "user-1",
            gymId: "gym-1"
        });
        
        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('should be able to check in twice in the same day', async () => { 
        vi.setSystemTime(new Date('2024, 5, 15, 8, 0, 0'));

        await sut.execute({
            userId: "user-1",
            gymId: "gym-1"
        });
        
        await expect(() => 
            sut.execute({
                userId: "user-1",
                gymId: "gym-1"
            })
        ).rejects.toBeInstanceOf(Error);
    });
});