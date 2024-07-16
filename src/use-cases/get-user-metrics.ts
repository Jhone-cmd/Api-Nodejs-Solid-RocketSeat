import { CheckInsRepository, GetUserMetricsUseCaseInterface, GetUserMetricsUseCaseResponse } from "@/interfaces/check-ins-interface";

export class GetUserMetricsUseCase {
    
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute ({ userId }: GetUserMetricsUseCaseInterface): Promise<GetUserMetricsUseCaseResponse> {
       const checkInsCount = await this.checkInsRepository.countByUserId(userId);
       return { checkInsCount }
    }
}