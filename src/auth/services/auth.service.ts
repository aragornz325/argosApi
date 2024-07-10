import { Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"

import { UsersEntity } from "user/entities/user.entity"
import { UserService } from "user/service/user.service"
import { ErrorManager } from "utils/error.manager"
import { AuthBody } from "../interfaces/auth.interfaces"
import { JWT } from "utils/jwt"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) {}

    public async login(body: AuthBody): Promise<{ token: string, user: UsersEntity }>{
        try {
            const user: UsersEntity = await this.userService.findByEmail(body.email)
            if (!user) {
                throw new ErrorManager({
                    type: "NOT_FOUND",
                    message: "User not found",
                })
            }
            const passwordMatch = await bcrypt.compare(body.password, user.password)
            if (!passwordMatch) {
                throw new ErrorManager({
                    type: "UNAUTHORIZED",
                    message: "Invalid password",
                })
            }
            const token = JWT.signJWT(user)
            delete user.password
            delete user.createdAt
            delete user.updatedAt
            delete user.profile.id
            delete user.profile.updatedAt
            delete user.profile.createdAt
            return { token, user }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

   


}
