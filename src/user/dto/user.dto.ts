import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ROLES } from "src/constant/roles";

export class UserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone: string;
  
}

export class UserUpdateDTO extends PartialType(UserDTO) {}