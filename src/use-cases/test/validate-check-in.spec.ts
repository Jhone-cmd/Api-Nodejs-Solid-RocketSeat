import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInsUseCase } from "../validate-check-in";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { LateCheckInValidateError } from "@/errors/late-check-in-validate-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInsUseCase; 

describe('Validate Check-In Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new ValidateCheckInsUseCase(checkInsRepository);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should be able to validate check-in', async () => { 
        const createCheckIn = await checkInsRepository.create({
            user_id: 'user-1',
            gym_id: 'gym-1'
        });

        const { checkIn } = await sut.execute({
            id: createCheckIn.id
        });
        
        expect(checkIn.validated_at).toEqual(expect.any(Date));
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
    });

    it('should not be able to validate an inexistent check-in', async () => { 
        await expect(() =>
            sut.execute({
                id: 'inexistent-checkIn=id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should not be able to validate the check-in after 20 minutes of its creation', async () => { 
        vi.setSystemTime(new Date(2024, 6, 16, 14, 40))

        const createCheckIn = await checkInsRepository.create({
            user_id: 'user-1',
            gym_id: 'gym-1'
        });

        const twentyOneMinutes = 1000 * 60 * 21;

        vi.advanceTimersByTime(twentyOneMinutes);

        expect(() => 
            sut.execute({
                id: createCheckIn.id
            })
        ).rejects.toBeInstanceOf(LateCheckInValidateError);
        
        
    });
});