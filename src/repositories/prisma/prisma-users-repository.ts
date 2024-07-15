import { UsersRepository } from "@/interfaces/users-interface";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository implements UsersRepository{
    async create(data: Prisma.UserCreateInput) {
        const user = prisma.user.create({
            data
        });
        return user
    } 

    async findByEmail(email: string) {
        const user = prisma.user.findUnique({ 
            where: { email }  
        });
        return user
    }
}