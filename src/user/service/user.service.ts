import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>) {}

    public async createUser(body: UserDTO) :Promise<UsersEntity> {
    try {
        return await this.userRepository.save(body);
    } catch(error) {
        throw new Error(error.message);
    }
    }

    public async getAllUsers() :Promise<UsersEntity[]> {
    try {
        return await this.userRepository.find();
    } catch(error) {
        throw new Error(error.message);
    }
    }

    public async getUserById(id: string) :Promise<UsersEntity> {
    try {
        return await this.userRepository
        .createQueryBuilder('user')
        .where({id})
        .getOne();
    } catch(error) {
        throw new Error(error.message);
    }
    }

    public async updateUser(id: string, body: UserUpdateDTO) :Promise<UsersEntity> {
    try {
        const user = await this.getUserById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }
  
        await this.userRepository
        .createQueryBuilder('user')
        .update(body)
        .where({id})
        .execute();
        return await this.getUserById(id);
    } catch(error) {
        throw new Error(error.message);
    }
    }
}
