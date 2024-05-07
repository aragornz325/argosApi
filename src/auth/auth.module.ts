import { Module } from "@nestjs/common"
import { AuthController } from "./controller/auth.controller"
import { AuthService } from "./services/auth.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersEntity } from "src/user/entities/user.entity"
import { UserModule } from "src/user/user.module"
import { UserService } from "src/user/service/user.service"

@Module({
    imports: [UserModule],
    providers: [AuthService, UserService],
    controllers: [AuthController],
})
export class AuthModule {}
