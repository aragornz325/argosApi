import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Transform, Type } from 'class-transformer';
import { TYPEOFSERVICE, VEHICLEBRAND } from "constant/ticket";


export class trafficTicketDTO {
    
    @IsNotEmpty()
    @IsDate()
    date: Date;
    
    @ApiProperty()
    @IsNotEmpty()
    location: string;

    @ApiProperty()
    @IsNotEmpty()
    latitude: string;

    @ApiProperty()
    @IsNotEmpty()
    longitude: string;
    
    @ApiProperty()
    @IsNotEmpty()
    plateNumber: string;
     
    @ApiProperty()
    @IsNotEmpty()
    vehicleBrand: string;
    
    @ApiProperty()
    @IsNotEmpty()
    vehicleModel: string;

    @ApiProperty()
    @IsOptional()
    modelYear: string;

    @ApiProperty()
    @IsNotEmpty()
    color: string;
    
    @ApiProperty()
    @IsNotEmpty()
    typeOfService: string;
    
    @ApiProperty()
    @IsOptional()
    infractionCode: string;
    
    @ApiProperty()
    @IsOptional()
    lawArticleNumber: string;
    
    @ApiProperty()
    @IsOptional()
    observations: string;
    
    @ApiProperty()
    @IsOptional()
    driverName: string;
    
    @ApiProperty()
    @IsOptional()
    driverLicenseNumber: string;
    
    @ApiProperty()
    @IsOptional()
    driverAddress: string;
    
    @ApiProperty()
    @IsOptional()
    driverPhone: string;

    @ApiProperty()
    @IsOptional()
    driverEmail: string;


}

export class trafficTicketUpdateDTO extends PartialType(trafficTicketDTO) {}