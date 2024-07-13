import { EmailAlreadyExistsErro } from "@/errors/email-already-exists-error";
import { RegisterUseCaseInterface } from "@/interfaces/users-interface";
import { UsersRepository } from "@/interfaces/users-interface";
import { hash } from "bcryptjs";

export class RegisterUseCase {
    
    constructor(private usersRepository: UsersRepository) {}

    async execute ({ name, email, password }: RegisterUseCaseInterface) {

        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);
        
        if (userWithSameEmail) throw new EmailAlreadyExistsErro();

        await this.usersRepository.create({
            name, email, password_hash
        });
    }
}
