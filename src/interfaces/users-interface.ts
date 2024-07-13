import { Prisma, User } from "@prisma/client"

export interface RegisterUseCaseInterface {
    name: string,
    email: string,
    password: string
}

export interface RegisterUseCaseResponse {
    user: User;
}

export interface UsersRepository {
    create: (data: Prisma.UserCreateInput) => Promise<User>;
    findByEmail: (email: string) => Promise<User | null>;
}