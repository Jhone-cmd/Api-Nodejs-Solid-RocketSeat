import { User } from "@prisma/client"

export interface AuthenticateUseCaseInterface {
    email: string, 
    password: string
}

export interface AuthenticateUseCaseResponse {
   user: User
}