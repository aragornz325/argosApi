import { Module } from "@nestjs/common"
import { AuthController } from "./controller/auth.controller"
import { AuthService } from "./services/auth.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersEntity } from "src/user/entities/user.entity"

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
