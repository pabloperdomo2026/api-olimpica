import { Injectable } from "@nestjs/common";

interface SingIn {
    email: string;
    password: string;
}

@Injectable()
export class SignInUseCase {
    async execute(data: SingIn) {
        try {
            
        } catch (error) {
            
        }
    }
}