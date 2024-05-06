import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDTO } from '../dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() body: UserDTO) {
      return this.userService.createUser(body);
    
    }

}
