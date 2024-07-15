import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { AuthenticateUseCaseInterface, AuthenticateUseCaseResponse } from "@/interfaces/authenticate-interface";
import { UsersRepository } from "@/interfaces/users-interface";
import { compare } from "bcryptjs";

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({ email, password }: AuthenticateUseCaseInterface): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) throw new InvalidCredentialsError();

        const doesPasswordsMatches = compare(password, user.password_hash);
        if (!doesPasswordsMatches) throw new InvalidCredentialsError();

        return { user };
    }
}