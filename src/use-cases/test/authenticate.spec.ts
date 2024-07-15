import { describe, it, expect, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "../authenticate";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase; 

describe('Register Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });

    it('should be able to authenticate', async () => { 
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('12345678', 6)
        })
        
        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: '12345678'
        })

        expect(user.id).toEqual(expect.any(String));
    });

    it('should not be able to authenticate with wrong email', async () => { 
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('12345678', 6)
        })
        
        await expect(() =>
            sut.execute({
                email: 'johndoe@example2.com',
                password: '12345678'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not be able to authenticate with wrong password', async () => { 
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('12345678', 6)
        })
        
        await expect(() =>
            sut.execute({
                email: 'johndoe@example2.com',
                password: '123456789'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    }); 
});