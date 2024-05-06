import { PartialType } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ROLES } from "src/constant/roles";

export class UserDTO {
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @IsNotEmpty()
    @IsString()
    lastName: string;
    
    @IsNotEmpty()
    @IsNumber()
    age: number;
    
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;
    
    @IsNotEmpty()
    @IsString()
    phone: string;
  
}

export class UserUpdateDTO extends PartialType(UserDTO) {}