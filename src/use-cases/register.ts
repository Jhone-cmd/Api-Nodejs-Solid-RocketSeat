import { EmailAlreadyExistsError } from "@/errors/email-already-exists-error";
import { UsersRepository, RegisterUseCaseInterface, RegisterUseCaseResponse } from "@/interfaces/users-interface";
import { hash } from "bcryptjs";

export class RegisterUseCase {
    
    constructor(private usersRepository: UsersRepository) {}

    async execute ({ name, email, password }: RegisterUseCaseInterface): Promise<RegisterUseCaseResponse> {

        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);
        
        if (userWithSameEmail) throw new EmailAlreadyExistsError();

        const user = await this.usersRepository.create({
            name, email, password_hash
        });

        return { user }
    }
}
