import { describe, it, expect, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "../authenticate";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { GetProfileUseCase } from "../get-user-profile";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetProfileUseCase; 

describe('Register Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetProfileUseCase(usersRepository);
    });

    it('should be able to get profile', async () => { 
        const createUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('12345678', 6)
        })
        
        const { user } = await sut.execute({
            userid: createUser.id
        })

        expect(user.id).toEqual(expect.any(String));
        expect(user.name).toEqual('John Doe');
    });

    it('should not be able to get profile with wrong userid', async () => {        
        expect(() =>
            sut.execute({
                userid: 'no-existing-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

});