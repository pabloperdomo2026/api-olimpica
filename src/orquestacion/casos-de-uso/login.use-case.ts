import { Injectable } from "@nestjs/common";

interface SingIn {
    email: string;
    password: string;
}

@Injectable()
export class LoginUseCase {
    async execute(data: SingIn) {
        try {
            
        } catch (error) {
            
        }
    }
}