import { describe, it, expect } from "vitest";
import { RegisterUseCase } from "../register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { EmailAlreadyExistsErro } from "@/errors/email-already-exists-error";

describe('Register Use Case', () => {

    it.skip("check vitest", () => {
        expect(2+2).toBe(4);
    });

    it('should be able to register', async () => { 
        const usersRepository = new InMemoryUsersRepository();
        const registerUserCase = new RegisterUseCase(usersRepository);      

        const { user } = await registerUserCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678'
        });
        
        expect(user.id).toEqual(expect.any(String));
    });

    
    it('should not be able to register with same email twice', async () => { 
        const usersRepository = new InMemoryUsersRepository();
        const registerUserCase = new RegisterUseCase(usersRepository);     

        const email = 'johndoe@example.com';

        await registerUserCase.execute({
            name: 'John Doe',
            email,
            password: '12345678'
        });

        await expect(() =>
            registerUserCase.execute({
                name: 'John Doe',
                email,
                password: '12345678'
            })
        ).rejects.toBeInstanceOf(EmailAlreadyExistsErro);
    
    });

    it('should hash user password upon registration', async () => { 
        const usersRepository = new InMemoryUsersRepository();
        const registerUserCase = new RegisterUseCase(usersRepository);  

        const { user } = await registerUserCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678'
        });
        const isPasswordCorrectlyHashed = await compare('12345678', user.password_hash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });


});