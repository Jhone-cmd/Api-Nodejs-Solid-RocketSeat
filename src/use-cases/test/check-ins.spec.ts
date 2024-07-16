import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { CheckInsUseCase } from "../check-ins";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "@/errors/max-distance-error";
import { MaxNumbersOfCheckInsError } from "@/errors/max-numbers-of-check-ins-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInsUseCase; 

describe('Check In Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInsUseCase(checkInsRepository, gymsRepository);

        gymsRepository.items.push({
            id: 'gym-1',
            title: 'Gym 1',
            description: '',
            phone: '',
            latitude: new Decimal(-16.0366592),
            longitude: new Decimal(-48.0509952),
        });

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should be able to check in', async () => { 
        const { checkIn } = await sut.execute({
            userId: "user-1",
            gymId: "gym-1",
            userLatitude: -16.0366592,
            userLongitude: -48.0509952,
        });
        
        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('should be able to check in twice in the same day', async () => { 
        vi.setSystemTime(new Date(2024, 5, 15, 8, 0, 0));

        await sut.execute({
            userId: "user-1",
            gymId: "gym-1",
            userLatitude: -16.0366592,
            userLongitude: -48.0509952,
        });
        
        await expect(() => 
            sut.execute({
                userId: "user-1",
                gymId: "gym-1",
                userLatitude: -16.0366592,
                userLongitude: -48.0509952,
            })
        ).rejects.toBeInstanceOf(MaxNumbersOfCheckInsError);
    });

    it('should be able to check in twice but in different days', async () => { 
        vi.setSystemTime(new Date(2024, 5, 15, 8, 0, 0));

        await sut.execute({
            userId: "user-1",
            gymId: "gym-1",
            userLatitude: -16.0366592,
            userLongitude: -48.0509952,
        });

       vi.setSystemTime(new Date(2024, 5, 16, 8, 0, 0));
        
        const { checkIn } = await sut.execute({
            userId: "user-1",
            gymId: "gym-1",
            userLatitude: -16.0366592,
            userLongitude: -48.0509952,
        });
       
        expect(checkIn.id).toEqual(expect.any(String));  
    });

    it('should not be able to check in on distant gym', async () => { 
       
       gymsRepository.items.push({
            id: 'gym-2',
            title: 'Gym 2',
            description: '',
            phone: '',
            latitude: new Decimal(-16.0366283),
            longitude: new Decimal(-48.0532053),
        });

       await expect(() => 
            sut.execute({
                userId: "user-1",
                gymId: "gym-2",
                userLatitude: -16.0366592,
                userLongitude: -48.0509952,
            })
        ).rejects.toBeInstanceOf(MaxDistanceError);
    });
});