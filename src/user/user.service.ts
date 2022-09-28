import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserRegisterDto } from './user-register.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) {
    }
    
    findOne(findData: FindOptionsWhere<User>): Promise<User | null> {
        return this.userRepository.findOneBy(findData);
    }

    findAll(): Promise<User[] | null> {
        return this.userRepository.find({});
    }

    async createUser(
        userRegisterDto: UserRegisterDto,
    ): Promise<User> {
        const user = this.userRepository.create(userRegisterDto);
        await this.userRepository.save(user);

        return user;
    }
}
