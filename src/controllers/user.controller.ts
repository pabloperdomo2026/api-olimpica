import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { UserUseCase } from '../usecases';
import { CreateUserDto, UpdateUserDto } from '../dtos';

@Controller('users')
export class UserController {
    constructor(private readonly userUseCase: UserUseCase) { }

    @Get()
    async findAll() {
        return this.userUseCase.getAllUsers();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.userUseCase.getUserById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userUseCase.createUser(createUserDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userUseCase.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        return this.userUseCase.deleteUser(id);
    }
}
