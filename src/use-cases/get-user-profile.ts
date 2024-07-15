import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ProfileUseCaseInterface, ProfileUseCaseResponse, UsersRepository } from "@/interfaces/users-interface";

export class GetProfileUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({ userId }: ProfileUseCaseInterface): Promise<ProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId);
        if (!user) throw new ResourceNotFoundError();

        return { user }
    }
}