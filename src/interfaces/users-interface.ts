import { Prisma, User } from "@prisma/client"

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
export interface RegisterUseCaseInterface {
    name: string,
    email: string,
    password: string
}

export interface RegisterUseCaseResponse {
    user: User;
}
export interface ProfileUseCaseInterface {
    userId: string
}

export interface ProfileUseCaseResponse {
    user: User;
}