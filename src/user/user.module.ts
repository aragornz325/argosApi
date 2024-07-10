import { Module } from "@nestjs/common"
import { UserController } from "./controller/user.controller"
import { UserService } from "./service/user.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersEntity } from "./entities/user.entity"
import { ProfileEntity } from "./entities/profile.entity"
import { MailingModule } from "mailing/mailing.module"

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity, ProfileEntity]), MailingModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, TypeOrmModule],
})
export class UserModule {}
