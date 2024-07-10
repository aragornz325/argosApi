import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Put,
    Req,
    UseGuards,
} from "@nestjs/common"
import { UserService } from "../service/user.service"
import { UserDTO, UserUpdateDTO } from "../dto/user.dto"
import { PublicAccess } from "auth/decorators/public.decorator"
import { AuthGuard } from "auth/guards/auth.guard"
import { ProfileDTO, ProfileUpdateDTO } from "../dto/profile.dto"
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

    @Patch('profile')
    updateProfile(
        @Body() body:ProfileUpdateDTO ,
        @Req() req: Request) {

        return this.userService.updateProfile({body:body, userId: req.idUser})
    }

}
