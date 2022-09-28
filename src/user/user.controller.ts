import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserRegisterDto } from './user-register.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Get(':id')
    findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne({ id });
    }

    @Get(':id')
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    async createPost(
        @Body() userRegisterDto: UserRegisterDto
    ) {
        const user = await this.usersService.createUser(userRegisterDto);
    
        return user;
    }
}
