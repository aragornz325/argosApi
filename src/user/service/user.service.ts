import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeleteResult, Repository } from "typeorm"
import * as bcrypt from "bcrypt"

import { UsersEntity } from "../entities/user.entity"
import { UserDTO, UserUpdateDTO } from "../dto/user.dto"
import config from "src/config/config"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
    ) {}

    public async createUser(body: UserDTO): Promise<UsersEntity> {
        try {
            Logger.log("Creating user")
            console.log(config().bcrypt.salt)
            const hashedPassword = bcrypt.hashSync(
                body.password,
                parseInt(config().bcrypt.salt),
            )
            const newUser = {
                ...body,
                password: hashedPassword,
            }
            const user = await this.userRepository.save(newUser)
            Logger.log("User created")
            return user
        } catch (error) {
            Logger.error("Error creating user", error.message)
            throw new InternalServerErrorException(
                "Error: " + error.message,
                "code: " + error.code,
            )
        }
    }

    public async getAllUsers(): Promise<UsersEntity[]> {
        try {
            const users = await this.userRepository.find()
            users.forEach(user => {
                delete user.password
            })
            return users
        } catch (error) {
            throw new InternalServerErrorException(
                "Error: " + error.message,
                "code: " + error.code,
            )
        }
    }

    public async getUserById(id: string): Promise<UsersEntity> {
        try {
            const user = await this.userRepository
                .createQueryBuilder("user")
                .where({ id })
                .getOne()

            if (!user) {
                throw new NotFoundException("User not found")
            }
            delete user.password
            return user
        } catch (error) {
            throw new InternalServerErrorException(
                "Error: " + error.message,
                "code: " + error.code,
            )
        }
    }

    public async updateUser(
        id: string,
        body: UserUpdateDTO,
    ): Promise<UsersEntity> {
        try {
            const user = await this.getUserById(id)

            if (!user) {
                throw new NotFoundException("User not found")
            }

            return this.userRepository.merge(user, {
                ...body,
                updatedAt: new Date(),
            })
        } catch (error) {
            throw new InternalServerErrorException(
                "Error: " + error.message,
                "code: " + error.code,
            )
        }
    }

    public async deleteUser(id: string): Promise<DeleteResult | undefined> {
        const user: DeleteResult = await this.userRepository.delete(id)
        if (user.affected === 0) {
            throw new NotFoundException("User not found")
        }

        return user
    }
}
