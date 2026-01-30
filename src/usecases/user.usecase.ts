import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { User } from '../database/entities';

@Injectable()
export class UserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        // Aquí puedes agregar lógica de negocio, como hashear la contraseña
        return this.userRepository.create(createUserDto);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.getUserById(id);
        return this.userRepository.update(user.id, updateUserDto);
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.getUserById(id);
        await this.userRepository.delete(user.id);
    }
}
