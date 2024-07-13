import { describe, it, expect } from "vitest";
import { RegisterUseCase } from "../register";
import { compare } from "bcryptjs";
import { Prisma } from "@prisma/client";

describe('Register Use Case', () => {

    it("check vitest", () => {
        expect(2+2).toBe(4);
    })
    it.skip('should hash user password upon registration', async () => { 
        const registerUserCase = new RegisterUseCase({

            async findByEmail(email: string) {
                return null
            },
            async create(data) {
               return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password: data.password_hash,
                    created_at: new Date()
                }
            },
        });

        const { user } = await registerUserCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678'
        });
        const isPasswordCorrectlyHashed = await compare('12345678', user.password_hash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });

});