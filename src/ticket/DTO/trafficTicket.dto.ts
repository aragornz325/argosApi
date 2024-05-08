import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TYPEOFSERVICE, VEHICLEBRAND } from "src/constant/ticket";


export class trafficTicketDTO {
    
    @ApiProperty()
    @IsNotEmpty()
    date: Date;
    
    //TODO:anybody revisar si el tipado string esta bien
    @ApiProperty()
    @IsNotEmpty()
    time: string;
    
    @ApiProperty()
    @IsNotEmpty()
    location: string;
    
    @ApiProperty()
    @IsNotEmpty()
    plateNumber: string;
     
    @IsEnum(VEHICLEBRAND)
    @IsNotEmpty()
    vehicleBrand: VEHICLEBRAND;
    
    @ApiProperty()
    @IsOptional()
    modelYear: number;
    
    @ApiProperty()
    @IsNotEmpty()
    color: string;
    
    @IsEnum(TYPEOFSERVICE)
    @IsNotEmpty()
    typeOfService: TYPEOFSERVICE;
    
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