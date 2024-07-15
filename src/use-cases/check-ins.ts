import { CheckInsRepository, CheckInUseCaseInterface, CheckInUseCaseResponse } from "@/interfaces/check-ins-interface";

export class CheckInsUseCase {
    
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute ({ userId, gymId }: CheckInUseCaseInterface): Promise<CheckInUseCaseResponse> {

        const checkIn = await this.checkInsRepository.create({ 
            user_id: userId, 
            gym_id: gymId 
        });
        return { checkIn }
    }
}