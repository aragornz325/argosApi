import { Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"

import { UsersEntity } from "src/user/entities/user.entity"
import { UserService } from "src/user/service/user.service"
import { ErrorManager } from "src/utils/error.manager"
import { AuthBody } from "../interfaces/auth.interfaces"
import { JWT } from "src/utils/jwt"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) {}

    public async login(body: AuthBody) {
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
            return { token }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

   


}
