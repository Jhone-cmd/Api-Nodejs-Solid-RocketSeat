import { MaxDistanceError } from "@/errors/max-distance-error";
import { MaxNumbersOfCheckInsError } from "@/errors/max-numbers-of-check-ins-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { CheckInsRepository, CheckInUseCaseInterface, CheckInUseCaseResponse } from "@/interfaces/check-ins-interface";
import { GymsRepository } from "@/interfaces/gyms-interface";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordenates";

export class CheckInsUseCase {
    
    constructor(private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository
    ) {}

    async execute ({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseInterface): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId);
        if (!gym) throw new ResourceNotFoundError();

        const maxDistanceKilometers = 0.1 // 100 metros

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
        );

        if (distance > maxDistanceKilometers) throw new MaxDistanceError();

        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        );

        if (checkInOnSameDay)  throw new MaxNumbersOfCheckInsError();
        
        const checkIn = await this.checkInsRepository.create({ 
            user_id: userId, 
            gym_id: gymId 
        });
        return { checkIn }
    }
}