import { GymsRepository, SearchGymsUseCaseInterface, SearchGymsUseCaseResponse } from "@/interfaces/gyms-interface";

export class SearchGymsUseCase {
    
    constructor(private gymsRepository: GymsRepository) {}

    async execute ({ query, page }: SearchGymsUseCaseInterface): Promise<SearchGymsUseCaseResponse> {
       const gyms = await this.gymsRepository.searchGyms(query, page);
       return { gyms }
    }
}