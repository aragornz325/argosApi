import { PartialType, ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { ROLES } from "constant/roles"

export class UserDTO { 
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string


}

export class UserUpdateDTO extends PartialType(UserDTO) {}
