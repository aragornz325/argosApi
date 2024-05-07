import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from "@nestjs/common"
import { UserService } from "../service/user.service"
import { UserDTO, UserUpdateDTO } from "../dto/user.dto"

@Controller("user")
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
