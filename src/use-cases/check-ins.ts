import { CheckInsRepository, CheckInUseCaseInterface, CheckInUseCaseResponse } from "@/interfaces/check-ins-interface";

export class CheckInsUseCase {
    
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute ({ userId, gymId }: CheckInUseCaseInterface): Promise<CheckInUseCaseResponse> {

        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        );

        if (checkInOnSameDay) throw new Error();

        const checkIn = await this.checkInsRepository.create({ 
            user_id: userId, 
            gym_id: gymId 
        });
        return { checkIn }
    }
}