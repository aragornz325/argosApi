import { Module } from "@nestjs/common"
import { AuthController } from "./controller/auth.controller"
import { AuthService } from "./services/auth.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersEntity } from "user/entities/user.entity"
import { UserModule } from "user/user.module"
import { UserService } from "user/service/user.service"
import { MailingModule } from "mailing/mailing.module"

@Module({
    imports: [UserModule, MailingModule],
    providers: [AuthService, UserService],
    controllers: [AuthController],
})
export class AuthModule {}
