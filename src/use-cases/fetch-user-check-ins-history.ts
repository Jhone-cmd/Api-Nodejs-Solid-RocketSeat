import { CheckInsRepository, FetchUserCheckInsUseCaseInterface, FetchUserCheckInsUseCaseResponse } from "@/interfaces/check-ins-interface";

export class FetchUserCheckInsUseCase {
    
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute ({ userId, page }: FetchUserCheckInsUseCaseInterface): Promise<FetchUserCheckInsUseCaseResponse> {
       const checkIns = await this.checkInsRepository.findManyByCheckIns(userId, page)
       return { checkIns }
    }
}