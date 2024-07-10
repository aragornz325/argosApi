import { PartialType, ApiProperty } from "@nestjs/swagger"
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { GENDER } from "constant/gender"


export class ProfileDTO {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    country: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    postalCode: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(GENDER)
    gender: GENDER

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    dateOfBirth: string
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    avatarUrl?: string
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    bio?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    socialMediaLinks?: string
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    interests?: string
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    education?: string
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    employment?: string
}

export class UserUpdateDTO extends PartialType(ProfileDTO) {}