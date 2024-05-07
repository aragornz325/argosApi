import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import * as bcrypt from "bcrypt"

import { UsersEntity } from "src/user/entities/user.entity"
import { Repository } from "typeorm"

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
    ) {}

    public async login(body: { email: string; password: string }) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email: body.email,
                },
            })
            if (!user) {
                return {
                    message: "User not found",
                }
            }
            const isMatch = await bcrypt.compare(body.password, user.password)
            if (!isMatch) {
                return {
                    message: "Invalid credentials",
                }
            }
            return {
                message: "Login successful",
            }
        } catch (error) {}
    }
}
