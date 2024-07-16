import { LateCheckInValidateError } from "@/errors/late-check-in-validate-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { CheckInsRepository, ValidateCheckInUseCaseInterface, ValidateCheckInUseCaseResponse } from "@/interfaces/check-ins-interface";
import dayjs from "dayjs";

export class ValidateCheckInsUseCase {
    
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute ({ id }: ValidateCheckInUseCaseInterface): Promise<ValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(id);
        if (!checkIn) throw new ResourceNotFoundError();

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes');
        if (distanceInMinutesFromCheckInCreation > 20) throw new LateCheckInValidateError() 

        checkIn.validated_at = new Date();

        await this.checkInsRepository.save(checkIn);

        return { checkIn }
    }
}