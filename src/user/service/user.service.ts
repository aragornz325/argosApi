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
import { ErrorManager } from "src/utils/error.manager"

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
            if (!user) {
                Logger.error("Error creating user")
                throw new ErrorManager({
                    type: "INTERNAL_SERVER_ERROR",
                    message: "Error creating user",
                })
            }
            Logger.log("User created")
            return user
        } catch (error) {
            Logger.error("Error creating user", error.message)
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async getAllUsers(): Promise<UsersEntity[]> {
        try {
            const users: UsersEntity[] = await this.userRepository.find()
            users.forEach(user => {
                delete user.password
            })
            if (users.length === 0) throw new ErrorManager({
                type: "NOT_FOUND",
                message: "No users found"
            })

            return users
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async getUserById(id: string): Promise<UsersEntity> {
        try {
            const user: UsersEntity  = await this.userRepository
                .createQueryBuilder("user")
                .where({ id })
                .getOne()

            if (!user) {
                throw new ErrorManager({
                    type: "NOT_FOUND",
                    message: "User not found",
                })
            }
            delete user.password
            return user
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async updateUser(
        id: string,
        body: UserUpdateDTO,
    ): Promise<UsersEntity> {
        try {
            const user = await this.getUserById(id)

            if (!user) {
                throw new ErrorManager({
                    type: "NOT_FOUND",
                    message: "User not found",
                })
            }

            return this.userRepository.merge(user, {
                ...body,
                updatedAt: new Date(),
            })
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        try {
            const user: DeleteResult = await this.userRepository.delete(id)
        if (user.affected === 0) {
            throw new ErrorManager({
                type: "NOT_FOUND",
                message: "User not found",
            })
        }

        return user
        } catch(error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async findByEmail(email: string): Promise<UsersEntity> {
        try {
            const user: UsersEntity = await this.userRepository
                .createQueryBuilder("user")
                .where({ email })
                .getOne()

            if (!user) {
                throw new ErrorManager({
                    type: "NOT_FOUND",
                    message: "User not found",
                })
            }

            return user
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
}
