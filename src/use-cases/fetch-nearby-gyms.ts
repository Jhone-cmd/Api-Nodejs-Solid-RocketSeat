import { FindMayNearbyGymsUseCaseInterface, FindMayNearbyGymsUseCaseResponse, GymsRepository } from "@/interfaces/gyms-interface";

export class FetchNearbyGymsUseCase {
    
    constructor(private gymsRepository: GymsRepository) {}

    async execute ({ userLatitude, userLongitude }: FindMayNearbyGymsUseCaseInterface): Promise<FindMayNearbyGymsUseCaseResponse> {
       const gyms = await this.gymsRepository.findNearbyGyms({
            latitude: userLatitude,
            longitude: userLongitude
       });
       
       return { gyms }
    }
}