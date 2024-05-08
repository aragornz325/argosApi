import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Req,
    UseGuards,
} from "@nestjs/common"
import { UserService } from "../service/user.service"
import { UserDTO, UserUpdateDTO } from "../dto/user.dto"
import { PublicAccess } from "src/auth/decorators/public.decorator"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { ProfileDTO } from "../dto/profile.dto"
import { Request, request } from "express"

@Controller("user")
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @PublicAccess()
    @Post()
    create(@Body() body: UserDTO) {
        return this.userService.createUser(body)
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

    @PublicAccess()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string) {
        return this.userService.getUserById(id)
    }

    @Put(":id")
    update(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() body: UserUpdateDTO,
    ) {
        return this.userService.updateUser(id, body)
    }

    @Delete(":id")
    deleteUser(@Param("id", ParseUUIDPipe) id: string) {
        return this.userService.deleteUser(id)
    }

    @Post('profile')
    createProfile(
        @Body() body: ProfileDTO,
        @Req() req: Request) {
        return this.userService.createProfile({body:body, userId: req.idUser})
    }
}
