import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { hash } from 'bcrypt';
import {CreateUserDto} from "./dtos/createUser.dto";
import { UserEntity } from './intefaces/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}

    async createUser(createUserDto: CreateUserDto):Promise<UserEntity> {
        const saltOrRounds = 10;

        const passwordHashed = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            password:passwordHashed
        })
    }
    async getAllUser(): Promise<UserEntity[]>{
        return this.userRepository.find();
    }
}
