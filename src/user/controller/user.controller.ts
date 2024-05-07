import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common"
import { UserService } from "../service/user.service"
import { UserDTO, UserUpdateDTO } from "../dto/user.dto"
import { PublicAccess } from "src/auth/decorators/public.decorator"
import { AuthGuard } from "src/auth/guards/auth.guard"

@Controller("user")
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

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
}
