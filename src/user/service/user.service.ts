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
import config from "config/config"
import { ErrorManager } from "utils/error.manager"
import { ProfileEntity } from "../entities/profile.entity"
import { ProfileDTO } from "../dto/profile.dto"
import { MailingService } from "mailing/mailing.service"
import { GENDER } from "constant/gender"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
        @InjectRepository(ProfileEntity)
        private readonly ProfileRepository: Repository<ProfileEntity>,
        private mailingService: MailingService,
    ) {}

    public async createUser(body: UserDTO): Promise<UsersEntity> {
        try {
            Logger.log("Creating user")
            Logger.log('hashing password')
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
            const userProfile: ProfileDTO = {
                firstName: user.username,
                lastName: user.username,
                age: 99,
                phone: '',
                city: '',
                country: '',
                postalCode: '',
                address: '',
                gender: GENDER.MALE,
                dateOfBirth: new Date(1971, 0, 1).toDateString(),
            };
            const userProfileCreated = await this.createProfile({body: userProfile, userId: user.id});
            if (!userProfileCreated.profile) {
                Logger.error("Error creating profile")
                throw new ErrorManager({
                    type: "INTERNAL_SERVER_ERROR",
                    message: "Error creating profile",
                })
            }
            user.profile = userProfileCreated.profile;
            Logger.log("User created");
            return user;
        } catch (error) {
            Logger.error("Error creating user", error.message)
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async getAllUsers(): Promise<UsersEntity[]> {
        try {
            const users: UsersEntity[] = await this.userRepository.find({
                relations: {profile: true},
            })
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
            const user: UsersEntity  = await this.userRepository.findOne({
                where: {id}, 
                relations: {profile: true}
            })
        
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

    public async createProfile({
        body, 
        userId
    }: {
        body: ProfileDTO, 
        userId: string
    }): Promise<UsersEntity> {
        try {
            Logger.log("searching for user")
            const user = await this.getUserById(userId)
            Logger.log("user found, checking for existing profile")
            if (user.profile) {
                Logger.error("User already has a profile")
                throw new ErrorManager({
                    type: "BAD_REQUEST",
                    message: "User already has a profile",
                })
            }
            Logger.log("Creating profile")
            const profile = await this.ProfileRepository.save({...body, user})
            if (!profile) {
                Logger.error("Error creating profile")
                throw new ErrorManager({
                    type: "INTERNAL_SERVER_ERROR",
                    message: "Error creating profile",
                })
            }
            Logger.log("Profile created, updating user")
            user.profile = profile;
            await this.userRepository.save(user);
            const userUpdated = await this.getUserById(userId)
            return userUpdated; 
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
}
