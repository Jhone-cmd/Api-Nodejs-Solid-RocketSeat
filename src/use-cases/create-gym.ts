import { GymsRepository, GymsUseCaseInterface, GymsUseCaseResponse } from "@/interfaces/gyms-interface";

export class GymsUseCase {
    
    constructor(private gymsRepository: GymsRepository) {}

    async execute ({ title, description, phone, latitude, longitude }: GymsUseCaseInterface): Promise<GymsUseCaseResponse> {
        const gym = await this.gymsRepository.create({
                title, description, phone, latitude, longitude
        });
        
        return { gym }
    }
}
